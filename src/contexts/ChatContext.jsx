import React, { createContext, useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForEmail, setWaitingForEmail] = useState(false);
  const [escalatedToHuman, setEscalatedToHuman] = useState(false);

  // Load chat history from localStorage when component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    const savedHistory = localStorage.getItem('chatHistory');
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
    
    if (savedHistory) {
      setChatHistory(JSON.parse(savedHistory));
    } else {
      // Initialize with an empty current chat if no history
      startNewChat();
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  // Generate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting;
    
    if (hour >= 5 && hour < 12) {
      greeting = t('good_morning', 'Good morning');
    } else if (hour >= 12 && hour < 18) {
      greeting = t('good_afternoon', 'Good afternoon');
    } else {
      greeting = t('good_evening', 'Good evening');
    }
    
    return `${greeting}! ${t('chat_greeting', "I'm Simeon's virtual assistant. How can I help you today?")}`;
  };

  // Start a new chat session
  const startNewChat = () => {
    // Reset escalation state for new chat
    setWaitingForEmail(false);
    setEscalatedToHuman(false);

    // If there's an existing chat, save it to history first
    if (currentChat && currentChat.messages.length > 0) {
      const updatedHistory = [...chatHistory];
      const existingIndex = updatedHistory.findIndex(chat => chat.id === currentChat.id);
      
      if (existingIndex >= 0) {
        updatedHistory[existingIndex] = { ...currentChat };
      } else {
        updatedHistory.push({ ...currentChat });
      }
      
      setChatHistory(updatedHistory);
    }
    
    // Create a new chat
    const newChat = {
      id: Date.now(),
      title: `Chat ${chatHistory.length + 1}`,
      timestamp: new Date().toISOString(),
      messages: [
        {
          id: Date.now(),
          type: 'system',
          text: getGreeting(),
          timestamp: new Date().toISOString()
        }
      ]
    };
    
    setCurrentChat(newChat);
    setMessages(newChat.messages);
  };

  // Load a previous chat from history
  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
      setMessages(chat.messages);
      
      // Check if this chat was escalated to human
      const wasEscalated = chat.messages.some(
        m => m.type === 'assistant' && m.text.includes("hold while I connect you to my boss")
      );
      setEscalatedToHuman(wasEscalated);
      
      // Check if we were waiting for email
      const waitingEmail = chat.messages.some(
        m => m.type === 'assistant' && 
        m.text.includes("please kindly provide your email") && 
        !chat.messages.some(msg => msg.type === 'assistant' && msg.text.includes("Thank you for providing your email"))
      );
      setWaitingForEmail(waitingEmail);
    }
  };

  // Add a new message to the current chat
  const addMessage = (message, type = 'user') => {
    const newMessage = {
      id: Date.now(),
      type,
      text: message,
      timestamp: new Date().toISOString()
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    
    if (currentChat) {
      const updatedChat = {
        ...currentChat,
        messages: updatedMessages
      };
      setCurrentChat(updatedChat);
      
      // Update in history if it exists there
      const updatedHistory = [...chatHistory];
      const existingIndex = updatedHistory.findIndex(chat => chat.id === currentChat.id);
      
      if (existingIndex >= 0) {
        updatedHistory[existingIndex] = updatedChat;
        setChatHistory(updatedHistory);
      }
    }
    
    if (type === 'user') {
      if (waitingForEmail) {
        handleEmailSubmission(message);
      } else {
        handleUserMessage(message);
      }
    }
  };

  // Handle when user submits their email
  const handleEmailSubmission = (email) => {
    setIsTyping(true);
    
    // Simple email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    setTimeout(() => {
      if (isValidEmail) {
        // Here you would typically send this email to your backend
        // For now we'll just acknowledge it
        addMessage(t('email_received', 
          `Thank you for providing your email. Simeon will reach out to you at ${email} as soon as possible.`), 
          'assistant'
        );
        setWaitingForEmail(false);
        
        // You could also add a final follow-up message
        setTimeout(() => {
          addMessage(t('closing_message', 
            "Is there anything else you'd like to mention before Simeon reviews your request?"), 
            'assistant'
          );
        }, 1000);
      } else {
        addMessage(t('invalid_email', 
          "That doesn't look like a valid email address. Could you please provide a valid email so Simeon can contact you?"), 
          'assistant'
        );
      }
      setIsTyping(false);
    }, 1500);
  };

  // Check if the bot can understand the query
  const canUnderstandQuery = (message) => {
    const keywords = [
      'hello', 'hi', 'service', 'offer', 'contact', 'reach', 
      'price', 'cost', 'quote', 'portfolio', 'work', 'project', 
      'website', 'app', 'design', 'development', 'marketing',
      'about', 'experience', 'skills', 'resume', 'cv'
    ];
    
    // Check if any keywords are in the message
    const messageLower = message.toLowerCase();
    return keywords.some(keyword => messageLower.includes(keyword));
  };

  // Simulate response to user message
  const handleUserMessage = (message) => {
    setIsTyping(true);
    
    // Simulate a delay before assistant responds
    setTimeout(() => {
      let response;
      
      // Check if we can understand the query or if we need to escalate
      if (escalatedToHuman) {
        // If already escalated, continue in human mode
        response = t('human_follow_up', 
          "Thanks for your message. Simeon will review this when he sees your conversation.");
      } else if (!canUnderstandQuery(message)) {
        // If we don't understand, escalate to human
        response = t('escalate_to_human', 
          "I'm sorry, I don't quite understand your request. Let me connect you to Simeon directly. Please hold while I connect you to my boss, please kindly provide your email so he can reach out to you there too.");
        setEscalatedToHuman(true);
        setWaitingForEmail(true);
      } else {
        // Regular bot responses for understood queries
        if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
          response = t('chat_greeting_response', "Hi there! How can I assist you with Simeon's services today?");
        } else if (message.toLowerCase().includes('service') || message.toLowerCase().includes('offer')) {
          response = t('chat_services_response', "Simeon offers web development, UI/UX design, and digital marketing services. Would you like more details about any specific service?");
        } else if (message.toLowerCase().includes('contact') || message.toLowerCase().includes('reach')) {
          response = t('chat_contact_response', "You can reach Simeon directly at hello@simeonazeh.com or through the contact form on the Contact page.");
        } else if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost') || message.toLowerCase().includes('quote')) {
          response = t('chat_pricing_response', "Pricing depends on the specific requirements of your project. Would you like to request a custom quote?");
        } else if (message.toLowerCase().includes('portfolio') || message.toLowerCase().includes('work') || message.toLowerCase().includes('project')) {
          response = t('chat_portfolio_response', "You can view Simeon's portfolio on the Portfolio page. Is there a specific type of project you're interested in?");
        } else {
          response = t('chat_default_response', "Thanks for your message! I'll try my best to help. If your question is complex, would you like me to connect you with Simeon directly?");
        }
      }
      
      addMessage(response, 'assistant');
      setIsTyping(false);
      
      // If chat widget is closed, increment unread count
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1500);
  };

  // Clear unread count when opening the chat
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  // Delete a chat from history
  const deleteChat = (chatId) => {
    const updatedHistory = chatHistory.filter(chat => chat.id !== chatId);
    setChatHistory(updatedHistory);
    
    // If deleting the current chat, start a new one
    if (currentChat && currentChat.id === chatId) {
      startNewChat();
    }
  };

  return (
    <ChatContext.Provider value={{
      isOpen,
      messages,
      chatHistory,
      currentChat,
      unreadCount,
      userInput,
      isTyping,
      waitingForEmail,
      escalatedToHuman,
      setUserInput,
      toggleChat,
      addMessage,
      startNewChat,
      loadChat,
      deleteChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};