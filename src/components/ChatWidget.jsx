import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiMessageSquare, FiX, FiSend, FiPlus, FiTrash2, 
  FiMessageCircle, FiClock, FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import { useChat } from '../contexts/ChatContext';
import { format } from 'date-fns';

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
    addMessage,
    startNewChat,
    loadChat,
    deleteChat
  } = useChat();
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [showHistory, setShowHistory] = React.useState(false);
  
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
  }, [isOpen]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim()) {
      addMessage(userInput);
      setUserInput('');
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
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
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
                <p className="text-sm text-white/90">{t('chat_subtitle', 'How can I help you today?')}</p>
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
                            <p className={`text-sm font-medium truncate ${currentChat?.id === chat.id ? 'text-pink-600 dark:text-pink-400' : 'text-gray-700 dark:text-gray-200'}`}>
                              {chat.title || t('untitled_chat', 'Untitled Chat')}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                              <FiClock className="mr-1" />
                              <span>{formatChatDate(chat.timestamp)}</span>
                            </div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteChat(chat.id);
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
                        <div 
                          className={`max-w-[75%] rounded-2xl px-4 py-2 shadow-sm ${
                            message.type === 'user' 
                              ? 'bg-pink-600 dark:bg-pink-600 text-white rounded-br-none' 
                              : message.type === 'system'
                                ? 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-800 dark:text-white text-center max-w-[90%] mx-auto'
                                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-none'
                          }`}
                        >
                          <div className="text-sm md:text-base">{message.text}</div>
                          <div className={`text-right text-xs mt-1 ${
                            message.type === 'user' 
                              ? 'text-white/70' 
                              : 'text-gray-500 dark:text-gray-400'
                          }`}>
                            {formatTimestamp(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl px-4 py-3 text-gray-800 dark:text-white rounded-bl-none max-w-[75%] shadow-sm">
                          <div className="flex space-x-1 items-center">
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        </div>
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
                      placeholder={t('message_placeholder', 'Type your message...')}
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
                    <FiMessageCircle className="inline-block mr-1" />
                    {t('chat_footer', 'Messages are stored locally for your convenience')}
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