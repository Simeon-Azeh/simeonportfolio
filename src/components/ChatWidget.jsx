import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiMessageSquare, FiX, FiSend, FiPlus, FiTrash2, 
  FiMessageCircle, FiClock, FiChevronDown, FiChevronUp, FiUser
} from 'react-icons/fi';
import { useChat } from '../contexts/ChatContext';
import { format } from 'date-fns';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp,
  getDocs,
  where
} from 'firebase/firestore';
import { db } from '../firebase';

const ChatWidget = () => {
  const { t } = useTranslation();
  const {
    isOpen,
    messages,
    chatHistory,
    currentChat,
    unreadCount,
    userInput,
    isTyping,
    setUserInput,
    toggleChat,
    startNewChat,
    loadChat,
    setMessages,
    setChatHistory,
    setCurrentChat,
    setIsTyping,
    setUnreadCount
  } = useChat();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [showHistory, setShowHistory] = useState(false);
  const [waitingForContact, setWaitingForContact] = useState(false);
  const [hasAdminReplies, setHasAdminReplies] = useState(false);
  const [newAdminReply, setNewAdminReply] = useState(false);

  // Generate a unique visitor ID if not already in localStorage
  useEffect(() => {
    if (!localStorage.getItem('visitorId')) {
      const visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('visitorId', visitorId);
    }
  }, []);

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input when chat is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
    
    // Clear unread count when chat is opened
    if (isOpen && newAdminReply) {
      setNewAdminReply(false);
      setUnreadCount(0);
    }
  }, [isOpen]);

  // When a new chat is started, send the initial greeting asking for contact info
  useEffect(() => {
    if (currentChat && (!messages || messages.length === 0) && !hasAdminReplies) {
      sendInitialGreeting();
    }
  }, [currentChat, messages, hasAdminReplies]);

  // Load chat history from localStorage on first load
  useEffect(() => {
    const visitorId = localStorage.getItem('visitorId');
    if (visitorId) {
      // First check Firestore for chats associated with this visitor
      const loadChatsFromFirestore = async () => {
        try {
          const chatsRef = collection(db, 'chats');
          const q = query(chatsRef, where('visitorId', '==', visitorId), orderBy('timestamp', 'desc'));
          const snapshot = await getDocs(q);
          
          const chats = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
          }));
          
          if (chats.length > 0) {
            setChatHistory(chats);
            // If we haven't set a current chat yet, load the most recent one
            if (!currentChat) {
              setCurrentChat(chats[0]);
              loadChat(chats[0].id);
              
              // Check if this chat is waiting for contact info
              const messagesRef = collection(db, 'chats', chats[0].id, 'messages');
              const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'));
              const messagesSnapshot = await getDocs(messagesQuery);
              const chatMessages = messagesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
              }));
              
              // Check if there are admin replies
              const hasAdmin = chatMessages.some(msg => msg.type === 'admin');
              setHasAdminReplies(hasAdmin);
              
              // If there's a message asking for contact info but no user response yet
              // and no admin replies, set waiting for contact
              const askingForContact = chatMessages.some(msg => 
                msg.type === 'assistant' && 
                msg.text.includes("Could you please share your email or phone number")
              );
              
              const providedContact = chatMessages.some(msg => 
                msg.type === 'assistant' && 
                msg.text.includes("Thank you for providing your contact information")
              );
              
              setWaitingForContact(askingForContact && !providedContact && !hasAdmin);
            }
          } else {
            // If no chats in Firestore, check localStorage as fallback
            const savedHistory = localStorage.getItem('chatHistory');
            if (savedHistory) {
              setChatHistory(JSON.parse(savedHistory));
            } else {
              // If no history at all, start a new chat
              startNewChat();
            }
          }
        } catch (error) {
          console.error('Error loading chats from Firestore:', error);
          // Fallback to localStorage if Firestore fails
          const savedHistory = localStorage.getItem('chatHistory');
          if (savedHistory) {
            setChatHistory(JSON.parse(savedHistory));
          } else {
            startNewChat();
          }
        }
      };
      
      loadChatsFromFirestore();
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Fetch messages from Firestore for the current chat
  useEffect(() => {
    if (currentChat?.id) {
      const messagesRef = collection(db, 'chats', currentChat.id, 'messages');
      const q = query(messagesRef, orderBy('timestamp', 'asc'));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        let hasNewAdminMessage = false;
        const newMessages = snapshot.docs.map((doc) => {
          const data = {
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp?.toDate() || new Date(),
          };
          
          // Check if this is a new admin message
          if (data.type === 'admin' && 
              !messages.some(m => m.id === doc.id)) {
            hasNewAdminMessage = true;
          }
          
          return data;
        });
        
        // Check if there are any admin messages
        const adminReplies = newMessages.some(msg => msg.type === 'admin');
        setHasAdminReplies(adminReplies);
        
        // If there's a new admin message and the chat isn't open, increment unread count
        if (hasNewAdminMessage && !isOpen) {
          setNewAdminReply(true);
          setUnreadCount(prev => prev + 1);
        }
        
        setMessages(newMessages);
        
        // Also update the messages in localStorage
        const updatedHistory = [...chatHistory];
        const chatIndex = updatedHistory.findIndex(c => c.id === currentChat.id);
        if (chatIndex !== -1) {
          updatedHistory[chatIndex] = {
            ...updatedHistory[chatIndex],
            messages: newMessages,
            hasAdminReplies: adminReplies
          };
          setChatHistory(updatedHistory);
        }
      });

      return () => unsubscribe();
    }
  }, [currentChat?.id, setMessages, isOpen]);

  // Fetch chat history from Firestore
  useEffect(() => {
    const visitorId = localStorage.getItem('visitorId');
    if (!visitorId) return;
    
    const chatsRef = collection(db, 'chats');
    const q = query(chatsRef, where('visitorId', '==', visitorId), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date(),
      }));
      setChatHistory(chats);
    });

    return () => unsubscribe();
  }, [setChatHistory]);

  // Send the initial greeting message when starting a new chat
  const sendInitialGreeting = async () => {
    if (!currentChat?.id || hasAdminReplies) return;
    
    const messagesRef = collection(db, 'chats', currentChat.id, 'messages');
    
    setIsTyping(true);
    
    setTimeout(async () => {
      await addDoc(messagesRef, {
        text: "👋 Welcome to Simeon's chat! I'm his virtual assistant.",
        type: 'assistant',
        timestamp: serverTimestamp(),
      });
      
      setTimeout(async () => {
        await addDoc(messagesRef, {
          text: "Could you please share your email or phone number so Simeon can contact you directly?",
          type: 'assistant',
          timestamp: serverTimestamp(),
        });
        
        setWaitingForContact(true);
        setIsTyping(false);
      }, 1000);
    }, 500);
  };

  // Check if input is potentially a contact (email or phone)
  const isValidContact = (input) => {
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Simple phone regex (at least 10 digits)
    const phoneRegex = /(\d{10,})/;
    
    return emailRegex.test(input) || phoneRegex.test(input.replace(/[^0-9]/g, ''));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      try {
        const visitorId = localStorage.getItem('visitorId');
        let chatId = currentChat?.id;
        
        if (!chatId) {
          // Create a new chat in Firestore
          const newChat = await addDoc(collection(db, 'chats'), {
            title: `Chat ${chatHistory.length + 1}`,
            timestamp: serverTimestamp(),
            visitorId: visitorId,
          });
          
          chatId = newChat.id;
          const chatData = { 
            id: chatId, 
            title: `Chat ${chatHistory.length + 1}`,
            timestamp: new Date(),
            visitorId: visitorId
          };
          
          setCurrentChat(chatData);
          setChatHistory(prev => [chatData, ...prev]);
        }
  
        // Add the user's message to Firestore
        const messagesRef = collection(db, 'chats', chatId, 'messages');
        await addDoc(messagesRef, {
          text: userInput,
          type: 'user',
          timestamp: serverTimestamp(),
        });
  
        setUserInput('');
        
        // Only show typing and send automated responses if there are no admin replies
        if (!hasAdminReplies) {
          // Show typing indicator
          setIsTyping(true);
          
          // Handle different responses based on conversation state
          if (waitingForContact) {
            setTimeout(async () => {
              if (isValidContact(userInput)) {
                // If it looks like a valid contact, thank them
                await addDoc(messagesRef, {
                  text: "Thank you for providing your contact information! Simeon will reach out to you soon.",
                  type: 'assistant',
                  timestamp: serverTimestamp(),
                });
                
                setTimeout(async () => {
                  await addDoc(messagesRef, {
                    text: "While you wait, feel free to share more details about what you'd like to discuss with Simeon.",
                    type: 'assistant',
                    timestamp: serverTimestamp(),
                  });
                  setWaitingForContact(false);
                  setIsTyping(false);
                }, 1500);
              } else {
                // If it doesn't look like contact info, ask again
                await addDoc(messagesRef, {
                  text: "I don't recognize that as an email or phone number. Could you please provide a valid email address or phone number so Simeon can contact you?",
                  type: 'assistant',
                  timestamp: serverTimestamp(),
                });
                setIsTyping(false);
              }
            }, 1000);
          } else {
            // Regular conversation flow
            setTimeout(async () => {
              await addDoc(messagesRef, {
                text: "Thank you for your message! I'll make sure Simeon sees this.",
                type: 'assistant',
                timestamp: serverTimestamp(),
              });
              
              setIsTyping(false);
            }, 1000);
          }
        } else {
          // If there are admin replies, don't send automated responses
          console.log("Not sending automated response because there are admin replies");
        }
      } catch (error) {
        console.error('Error sending message:', error);
        setIsTyping(false);
      }
    }
  };

  const handleDeleteChat = async (chatId) => {
    try {
      await deleteDoc(doc(db, 'chats', chatId));
      setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
      
      // Remove from localStorage too
      const storedHistory = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      const updatedHistory = storedHistory.filter(chat => chat.id !== chatId);
      localStorage.setItem('chatHistory', JSON.stringify(updatedHistory));
      
      if (currentChat?.id === chatId) {
        startNewChat();
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    try {
      return format(new Date(timestamp), 'h:mm a');
    } catch (error) {
      return '';
    }
  };

  const formatChatDate = (timestamp) => {
    try {
      return format(new Date(timestamp), 'MMM d, yyyy');
    } catch (error) {
      return 'Unknown date';
    }
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  return (
    <>
      {/* Chat button - always visible */}
      <motion.button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 md:right-20 z-50 bg-gradient-to-r from-pink-500 to-pink-600 dark:from-white dark:bg-white text-white dark:text-light-text w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <FiX className="text-2xl" />
        ) : (
          <div className="relative">
            <FiMessageSquare className="text-2xl" />
            {unreadCount > 0 && (
              <motion.span 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </div>
        )}
      </motion.button>
      
      {/* Chat widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[400px] h-[520px] bg-white dark:bg-[#1E1E24] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100 dark:border-gray-800"
          >
            {/* Chat widget header */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-500 dark:to-pink-600 text-white p-4 flex justify-between items-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-16 w-16 h-16 bg-white/10 rounded-full translate-y-1/2"></div>
              
              <div className="relative z-10">
                <h3 className="font-bold text-lg">{t('chat_title', 'Let\'s Chat')}</h3>
                <p className="text-sm text-white/90">
                  {hasAdminReplies 
                    ? t('admin_subtitle', 'Simeon is in the conversation') 
                    : t('chat_subtitle', 'How can I help you today?')}
                </p>
              </div>
              <button 
                onClick={() => startNewChat()}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors relative z-10"
                title={t('new_chat', 'Start New Chat')}
              >
                <FiPlus className="text-lg" />
              </button>
            </div>
            
            {/* History toggle (mobile only) */}
            <button
              onClick={toggleHistory}
              className="md:hidden flex items-center justify-center space-x-1 py-2 bg-gray-50 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-800"
            >
              <span>{t('chat_history', 'Chat History')}</span>
              {showHistory ? <FiChevronUp /> : <FiChevronDown />}
            </button>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Chat history sidebar */}
              <AnimatePresence>
                {(showHistory || window.innerWidth >= 768) && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "33.333%", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-1/3 border-r border-gray-200 dark:border-gray-800 overflow-y-auto bg-gray-50 dark:bg-[#1a1a1a]"
                  >
                    <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                      <h4 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400">{t('chat_history', 'Chat History')}</h4>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-800">
                      {chatHistory.map(chat => (
                        <div key={chat.id} className="flex items-center justify-between p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                          <div 
                            className="flex-1 truncate"
                            onClick={() => loadChat(chat.id)}
                          >
                            <div className="flex items-center">
                              <p className={`text-sm font-medium truncate ${currentChat?.id === chat.id ? 'text-pink-600 dark:text-pink-400' : 'text-gray-700 dark:text-gray-200'}`}>
                                {chat.title || t('untitled_chat', 'Untitled Chat')}
                              </p>
                              {chat.hasAdminReplies && (
                                <span className="ml-2 flex h-2 w-2 bg-green-500 rounded-full"></span>
                              )}
                            </div>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <FiClock className="mr-1" />
                              <span>{formatChatDate(chat.timestamp)}</span>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteChat(chat.id);
                            }} 
                            className="p-1.5 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-800 rounded-full"
                            title={t('delete_chat', 'Delete Chat')}
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                      ))}
                      {chatHistory.length === 0 && (
                        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                          {t('no_chat_history', 'No chat history yet')}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Main chat area */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Messages container */}
                <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 dark:bg-[#1E1E24]">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                            message.type === 'user' 
                              ? 'bg-pink-600 dark:bg-pink-600 text-white rounded-br-none' 
                              : message.type === 'system'
                                ? 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-white text-center max-w-[90%] mx-auto'
                                : message.type === 'admin'
                                  ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200 rounded-bl-none'
                                  : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-none'
                          }`}
                        >
                          <div className="text-sm md:text-base">{message.text}</div>
                          <div className="flex justify-between items-center text-xs mt-1">
                            {message.type === 'admin' && (
                              <span className="font-medium flex items-center gap-1 text-green-700 dark:text-green-300">
                                <FiUser size={12} />
                                Simeon
                              </span>
                            )}
                           <span className={`${
  message.type === 'user' 
    ? 'text-white/70' 
    : message.type === 'admin'
      ? 'text-green-600/70 dark:text-green-400/70 ml-auto'
      : 'text-gray-500 dark:text-gray-400'
}`}>
  {formatTimestamp(message.timestamp)}
</span>
                          </div>
                        </motion.div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 text-gray-800 dark:text-white rounded-bl-none max-w-[75%] shadow-sm"
                        >
                          <div className="flex space-x-1 items-center">
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Input area */}
                <div className="p-3 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E24]">
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <input
                      type="text"
                      ref={inputRef}
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={waitingForContact 
                        ? t('contact_placeholder', 'Enter your email or phone...') 
                        : t('message_placeholder', 'Type your message...')}
                      className="flex-1 py-2.5 px-4 bg-gray-100 dark:bg-gray-800 border-none rounded-l-full text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!userInput.trim()}
                      className={`p-2.5 rounded-r-full ${
                        userInput.trim() 
                          ? 'bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-500 dark:to-pink-600 text-white shadow-md hover:shadow-lg' 
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      } transition-all`}
                    >
                      <FiSend className="text-lg" />
                    </button>
                  </form>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                    {hasAdminReplies ? (
                      <div className="text-green-600 dark:text-green-400 flex items-center justify-center">
                        <FiUser className="inline-block mr-1" />
                        {t('admin_footer', 'Simeon is actively responding to your messages')}
                      </div>
                    ) : (
                      <>
                        <FiMessageCircle className="inline-block mr-1" />
                        {waitingForContact 
                          ? t('contact_footer', 'Your contact info will only be used to respond to your inquiry')
                          : t('chat_footer', 'Messages are stored for your convenience')}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
                                  