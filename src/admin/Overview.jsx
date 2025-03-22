import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiUserPlus, FiPieChart, FiTrendingUp, FiCalendar, FiArrowRight, FiSettings  } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Overview = () => {
  const [stats, setStats] = useState({
    totalChats: 0,
    needsAttention: 0,
    recentChats: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Load chats from localStorage to calculate stats
    const loadStats = () => {
      const savedHistory = localStorage.getItem('chatHistory');
      let chatHistory = [];
      
      if (savedHistory) {
        chatHistory = JSON.parse(savedHistory);
      }
      
      // Get chats needing attention
      const needsAttention = chatHistory.filter(chat => {
        return chat.messages.some(
          m => m.type === 'assistant' && m.text.includes("hold while I connect you to my boss")
        );
      });
      
      // Sort by most recent first
      const sortedHistory = chatHistory.sort((a, b) => 
        new Date(b.timestamp) - new Date(a.timestamp)
      );
      
      // Get the 5 most recent chats
      const recentChats = sortedHistory.slice(0, 5);
      
      setStats({
        totalChats: chatHistory.length,
        needsAttention: needsAttention.length,
        recentChats
      });
      
      setIsLoading(false);
    };
    
    loadStats();
  }, []);
  
  const extractUserEmail = (chat) => {
    // Find if there's an email in the chat
    for (let i = 0; i < chat.messages.length; i++) {
      const message = chat.messages[i];
      if (message.type === 'user') {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
        const match = message.text.match(emailRegex);
        if (match) return match[0];
      }
    }
    return null;
  };
  
  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, Admin</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-1">Here's what's happening with your website today.</p>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
        </div>
      ) : (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center">
              <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mr-4">
                <FiMessageSquare size={24} />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Chats</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.totalChats}</h3>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center">
              <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-4">
                <FiPieChart size={24} />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Needs Attention</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{stats.needsAttention}</h3>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4">
                <FiTrendingUp size={24} />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Response Rate</p>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">100%</h3>
              </div>
            </div>
          </div>
          
          {/* Recent chats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Conversations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your latest chat interactions are shown below.
              </p>
            </div>
            
            {stats.recentChats.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No chat conversations found.
              </div>
            ) : (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {stats.recentChats.map(chat => {
                  const email = extractUserEmail(chat);
                  const needsAttention = chat.messages.some(
                    m => m.type === 'assistant' && m.text.includes("hold while I connect you to my boss")
                  );
                  
                  return (
                    <div key={chat.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full flex-shrink-0 ${
                            needsAttention 
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                          }`}>
                            <FiMessageSquare size={18} />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800 dark:text-white">{chat.title}</h4>
                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="inline-flex items-center mr-3">
                                <FiCalendar className="mr-1" />
                                {formatDate(chat.timestamp)}
                              </span>
                              {email && (
                                <span className="inline-flex items-center">
                                  <FiUserPlus className="mr-1" />
                                  {email}
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {chat.messages[chat.messages.length - 1]?.text}
                            </p>
                          </div>
                        </div>
                        
                        {needsAttention && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                            Attention Required
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="p-4 bg-gray-50 dark:bg-gray-750 border-t border-gray-200 dark:border-gray-700">
              <Link 
                to="/admin/dashboard/chats" 
                className="inline-flex items-center text-sm font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
              >
                View all conversations
                <FiArrowRight className="ml-1" />
              </Link>
            </div>
          </div>
          
          {/* Quick actions panel */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                to="/admin/dashboard/chats" 
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="p-2 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 mr-3">
                  <FiMessageSquare size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Respond to Chats</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Check and reply to your visitor conversations
                  </p>
                </div>
              </Link>
              
              <Link 
                to="/admin/dashboard/settings" 
                className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
                  <FiSettings size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Customize Settings</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Update your preferences and account details
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Overview;