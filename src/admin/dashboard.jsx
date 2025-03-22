import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiHome, FiMessageSquare, FiUsers, FiSettings, FiLogOut, 
  FiMenu, FiX, FiChevronDown, FiMail, FiClock, FiSend, FiRefreshCw,
  FiUser, FiCoffee, FiBell, FiBox
} from 'react-icons/fi';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';
import Chats from './Chats';
import Overview from './Overview';
import Settings from './Settings';

const Dashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Extract current page from URL
  const currentPath = location.pathname.split('/').pop();
  
  useEffect(() => {
    // Close mobile menu when changing routes
    setMobileMenuOpen(false);
    
    // Load chat history from localStorage
    const loadChats = () => {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        // Sort by most recent first
        const sortedHistory = parsedHistory.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        );
        setChatHistory(sortedHistory);
      }
      setIsLoading(false);
    };
    
    loadChats();
  }, [location.pathname]);
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Count chats needing attention
  const needsAttentionCount = chatHistory.filter(chat => {
    return chat.messages.some(
      m => m.type === 'assistant' && m.text.includes("hold while I connect you to my boss")
    );
  }).length;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:inset-y-auto`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-md flex items-center justify-center text-white">
              <span className="font-bold">S</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FiX size={20} />
          </button>
        </div>
        
        {/* Navigation */}
        <div className="flex flex-col h-[calc(100%-4rem)]">
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <div className="space-y-1">
              <NavLink 
                to="/admin/dashboard" 
                end
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                <FiHome className="mr-3 flex-shrink-0" />
                <span>Overview</span>
              </NavLink>
              
              <NavLink 
                to="/admin/chats" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                <FiMessageSquare className="mr-3 flex-shrink-0" />
                <span>Chat Support</span>
                {needsAttentionCount > 0 && (
                  <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                    {needsAttentionCount}
                  </span>
                )}
              </NavLink>
              
              <NavLink 
                to="/admin/settings" 
                className={({isActive}) => 
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-pink-50 text-pink-700 dark:bg-pink-900/20 dark:text-pink-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                  }`
                }
              >
                <FiSettings className="mr-3 flex-shrink-0" />
                <span>Settings</span>
              </NavLink>
            </div>
            
            <div className="mt-10">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User Management
              </h3>
              <div className="mt-3 space-y-1">
                <button 
                  className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiUsers className="mr-3 flex-shrink-0" />
                  <span>Clients</span>
                </button>
              </div>
            </div>
            
            <div className="mt-10">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
              >
                <FiLogOut className="mr-3 flex-shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
          
          {/* Stats at bottom */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Active Chats</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-white">{chatHistory.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Need Attention</span>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">{needsAttentionCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="h-16 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <FiMenu size={24} />
            </button>
            
            {/* Page title */}
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white ml-4 lg:ml-0">
              {currentPath === 'dashboard' && 'Dashboard Overview'}
              {currentPath === 'chats' && 'Chat Support'}
              {currentPath === 'settings' && 'Settings'}
            </h1>
            
            {/* Right side header elements */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setUnreadNotifications(0)}
                >
                  <FiBell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute top-1 right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </div>
              
              {/* User dropdown */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white">
                    <FiUser size={16} />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Admin
                  </span>
                  <FiChevronDown 
                    className="hidden md:block text-gray-500 dark:text-gray-400" 
                    size={16} 
                  />
                </button>
                
                {/* Dropdown menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700"
                  >
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                      onClick={() => {
                        navigate('/admin/dashboard/settings');
                        setUserDropdownOpen(false);
                      }}
                    >
                      <FiSettings className="inline-block mr-2" />
                      Account Settings
                    </button>
                    <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="inline-block mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
          <Routes>
            <Route index element={<Overview />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/settings" element={<Settings />} />
            {/* Add a redirect for /admin/chats */}
            <Route path="*" element={<Overview />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;