import React, { createContext, useState, useEffect, useContext } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const startNewChat = () => {
    setCurrentChat(null);
    setMessages([]);
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        messages,
        chatHistory,
        currentChat,
        unreadCount,
        userInput,
        isTyping,
        setIsTyping,
        setUserInput,
        toggleChat,
        startNewChat,
        loadChat,
        setMessages,
        setChatHistory,
        setCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};