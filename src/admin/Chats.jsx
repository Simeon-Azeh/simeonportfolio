import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  FiMessageSquare, FiUser, FiMail, FiClock, FiSend, 
  FiTrash2, FiRefreshCw, FiSearch, FiX, FiPhone
} from 'react-icons/fi';
import { format } from 'date-fns';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  serverTimestamp, 
  where, 
  getDocs 
} from 'firebase/firestore';
import { db } from '../firebase';

const Chats = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatMessages, setSelectedChatMessages] = useState([]);
  const [responseText, setResponseText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'attention', 'replied'
  const messagesEndRef = useRef(null);
  const [userContacts, setUserContacts] = useState({});
  
  // Fetch all chats from Firestore
  useEffect(() => {
    setIsLoading(true);
    
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, orderBy('timestamp', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedChats = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));
      
      setChatHistory(fetchedChats);
      
      // Auto-select the first chat if available and none is selected
      if (fetchedChats.length > 0 && !selectedChat) {
        setSelectedChat(fetchedChats[0]);
      }
      
      setIsLoading(false);
    });
    
    return () => unsubscribe();
  }, []);
  
  // Fetch messages for the selected chat
  useEffect(() => {
    if (selectedChat?.id) {
      const messagesRef = collection(db, 'chats', selectedChat.id, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date()
        }));
        
        setSelectedChatMessages(fetchedMessages);
        
        // Extract contact information
        const contact = extractContactInfo(fetchedMessages);
        if (contact.email || contact.phone) {
          setUserContacts(prev => ({
            ...prev,
            [selectedChat.id]: contact
          }));
        }
      });
      
      return () => unsubscribe();
    }
  }, [selectedChat]);

  // Scroll to bottom of messages when selected chat changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedChatMessages]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendResponse = async () => {
    if (!responseText.trim() || !selectedChat) return;
    
    setIsSubmitting(true);
    
    try {
      // Add admin response to the selected chat
      const messagesRef = collection(db, 'chats', selectedChat.id, 'messages');
      await addDoc(messagesRef, {
        text: responseText,
        type: 'admin', // Special type for admin responses
        timestamp: serverTimestamp(),
      });
      
      // Update chat metadata
      await updateDoc(doc(db, 'chats', selectedChat.id), {
        lastAdminReply: serverTimestamp(),
        hasAdminReplies: true
      });
      
      setResponseText('');
    } catch (error) {
      console.error("Error sending admin response:", error);
      alert("Failed to send response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteChat = async (chatId) => {
    if (window.confirm('Are you sure you want to delete this chat? This action cannot be undone.')) {
      try {
        setIsLoading(true);
        
        // First, get all messages in this chat
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        const messagesSnapshot = await getDocs(messagesRef);
        
        // Delete each message
        const deletePromises = messagesSnapshot.docs.map(doc => 
          deleteDoc(doc.ref)
        );
        
        await Promise.all(deletePromises);
        
        // Then delete the chat itself
        await deleteDoc(doc(db, 'chats', chatId));
        
        if (selectedChat && selectedChat.id === chatId) {
          const remainingChats = chatHistory.filter(chat => chat.id !== chatId);
          setSelectedChat(remainingChats[0] || null);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error deleting chat:", error);
        alert("Failed to delete chat. Please try again.");
        setIsLoading(false);
      }
    }
  };

  const extractContactInfo = (messages) => {
    const contact = { email: null, phone: null };
    
    for (const message of messages) {
      if (message.type === 'user') {
        // Email regex
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const emailMatch = message.text.match(emailRegex);
        
        // Phone regex - matches common formats with optional country codes
        const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/;
        const phoneMatch = message.text.match(phoneRegex);
        
        if (emailMatch && !contact.email) contact.email = emailMatch[0];
        if (phoneMatch && !contact.phone) contact.phone = phoneMatch[0];
        
        // If we found both, no need to continue
        if (contact.email && contact.phone) break;
      }
    }
    
    return contact;
  };

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy • h:mm a');
    } catch (error) {
      return 'Unknown date';
    }
  };

  const isEscalated = (chat) => {
    // Check if any message in this chat indicates escalation
    const messages = selectedChatMessages;
    return messages.some(m => 
      m.type === 'assistant' && 
      (m.text.includes("connect you with") || 
       m.text.includes("Let me connect you") ||
       m.text.includes("connect you to"))
    );
  };

  const hasAdminReplies = (chat) => {
    // Check if this chat has any admin replies
    return chat.hasAdminReplies || selectedChatMessages.some(m => m.type === 'admin');
  };

  // Filter and search chats
  const filteredChats = chatHistory
    .filter(chat => {
      if (filterType === 'attention') {
        // For the attention filter, we need to check each chat's messages
        if (chat.id === selectedChat?.id) {
          return isEscalated(chat);
        }
        // For non-selected chats, rely on metadata
        return !chat.hasAdminReplies;
      } else if (filterType === 'replied') {
        return chat.hasAdminReplies || (chat.id === selectedChat?.id && hasAdminReplies(chat));
      }
      return true; // 'all' filter
    })
    .filter(chat => {
      if (!searchTerm) return true;
      
      const searchLower = searchTerm.toLowerCase();
      
      // Search in chat title
      if (chat.title?.toLowerCase().includes(searchLower)) return true;
      
      // Search in visitor ID
      if (chat.visitorId?.toLowerCase().includes(searchLower)) return true;
      
      // Search in user contact
      const contact = userContacts[chat.id];
      if (contact) {
        if (contact.email && contact.email.toLowerCase().includes(searchLower)) return true;
        if (contact.phone && contact.phone.toLowerCase().includes(searchLower)) return true;
      }
      
      // For selected chat, search in messages
      if (chat.id === selectedChat?.id) {
        if (selectedChatMessages.some(m => m.text.toLowerCase().includes(searchLower))) return true;
      }
      
      return false;
    });

  return (
    <div className="h-screen overflow-hidden grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      {/* Chat list panel */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white">Conversations</h2>
            <button 
              onClick={() => window.location.reload()}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Refresh conversations"
            >
              <FiRefreshCw size={16} />
            </button>
          </div>
          
          {/* Search and filter */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search conversations..."
                className="pl-10 w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white placeholder-gray-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  filterType === 'all'
                    ? 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterType('attention')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  filterType === 'attention'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Needs Attention
              </button>
              <button
                onClick={() => setFilterType('replied')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                  filterType === 'replied'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Replied
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100vh-280px)]">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Loading conversations...</p>
            </div>
          ) : filteredChats.length === 0 ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
              {searchTerm 
                ? "No conversations matching your search." 
                : filterType !== 'all'
                  ? `No conversations in the "${filterType}" category.`
                  : "No conversations available."
              }
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredChats.map((chat) => {
                const contact = userContacts[chat.id] || {};
                const needsAttention = chat.id === selectedChat?.id ? isEscalated(chat) : !chat.hasAdminReplies;
                const replied = chat.hasAdminReplies || (chat.id === selectedChat?.id && hasAdminReplies(chat));
                
                return (
                  <li key={chat.id} className="relative">
                    <button
                      onClick={() => handleChatSelect(chat)}
                      className={`w-full text-left px-4 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-pink-50 dark:bg-pink-900/10' : ''
                      }`}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium text-gray-900 dark:text-white truncate pr-8">
                          {chat.title || `Chat ${chat.id.substring(0, 6)}`}
                          {needsAttention && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                              Attention
                            </span>
                          )}
                          {replied && !needsAttention && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                              Replied
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          <FiClock className="inline mr-1" />
                          {format(new Date(chat.timestamp), 'MMM d')}
                        </span>
                      </div>
                      
                      {contact.email && (
                        <div className="mt-1 flex items-center text-xs text-gray-600 dark:text-gray-300">
                          <FiMail className="mr-1 flex-shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </div>
                      )}
                      
                      {contact.phone && (
                        <div className="mt-1 flex items-center text-xs text-gray-600 dark:text-gray-300">
                          <FiPhone className="mr-1 flex-shrink-0" />
                          <span className="truncate">{contact.phone}</span>
                        </div>
                      )}
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteChat(chat.id);
                      }}
                      className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-700 rounded-full"
                      title="Delete conversation"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      {/* Chat detail panel */}
      <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {selectedChat ? (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                {selectedChat.title || `Chat ${selectedChat.id.substring(0, 6)}`}
                {isEscalated(selectedChat) && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    Needs Attention
                  </span>
                )}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Started {format(new Date(selectedChat.timestamp), 'MMM d, yyyy • h:mm a')}
              </p>
              
              <div className="mt-3 flex flex-wrap gap-2">
                {userContacts[selectedChat.id]?.email && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <FiMail className="mr-1" />
                    {userContacts[selectedChat.id].email}
                  </div>
                )}
                
                {userContacts[selectedChat.id]?.phone && (
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <FiPhone className="mr-1" />
                    {userContacts[selectedChat.id].phone}
                  </div>
                )}
                
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  <FiUser className="mr-1" />
                  Visitor ID: {selectedChat.visitorId?.substring(0, 10)}...
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/20 h-[calc(100vh-380px)]">
              {selectedChatMessages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                  Loading messages...
                </div>
              ) : (
                selectedChatMessages.map((message) => (
                  <div key={message.id} className={`flex ${
                    message.type === 'user' ? 'justify-start' : 'justify-end'
                  }`}>
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 shadow-sm ${
                      message.type === 'user' 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' 
                        : message.type === 'system'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-center mx-auto'
                          : message.type === 'admin'
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200'
                            : 'bg-pink-50 dark:bg-pink-900/20 text-pink-800 dark:text-pink-200'
                    }`}>
                      <div className="text-sm">
                        {message.text}
                      </div>
                      <div className="mt-1 text-right text-xs text-gray-500 dark:text-gray-400 flex justify-between items-center">
                        <span className="text-xs font-medium">
                          {message.type === 'user' 
                            ? 'User' 
                            : message.type === 'system'
                              ? 'System'
                              : message.type === 'admin'
                                ? 'You (Admin)'
                                : 'Bot'}
                        </span>
                        <span>{formatTimestamp(message.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Response input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendResponse();
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  placeholder="Type your response as admin..."
                  className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!responseText.trim() || isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <FiSend className="mr-2" />
                  )}
                  Send
                </button>
              </form>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Your response will be displayed to the user as an admin message.
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-500 dark:text-gray-400">
            <FiMessageSquare className="w-12 h-12 mb-4" />
            <h3 className="font-medium text-lg mb-1">No Chat Selected</h3>
            <p>Select a conversation from the list to view details and respond.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;