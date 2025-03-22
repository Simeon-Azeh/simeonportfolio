import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiSave, FiRefreshCw, FiMessageSquare, FiCpu, 
  FiAlertCircle, FiCheck, FiToggleLeft, FiToggleRight, 
  FiMoon, FiSun
} from 'react-icons/fi';

const Settings = () => {
  // General settings
  const [botName, setBotName] = useState('');
  const [greetingMessage, setGreetingMessage] = useState('');
  const [defaultResponses, setDefaultResponses] = useState({
    greeting: '',
    fallback: '',
    contactRequest: '',
    serviceInfo: '',
  });
  
  // Advanced settings
  const [messageRetention, setMessageRetention] = useState(30);
  const [autoDeleteRead, setAutoDeleteRead] = useState(false);
  const [darkModeDefault, setDarkModeDefault] = useState(false);
  
  // Status states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(null);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const loadSettings = () => {
      setIsLoading(true);
      
      // Simulating a delay for loading
      setTimeout(() => {
        try {
          const savedSettings = localStorage.getItem('chatSettings');
          
          if (savedSettings) {
            const parsedSettings = JSON.parse(savedSettings);
            
            // Apply saved settings to state
            setBotName(parsedSettings.botName || 'Chat Assistant');
            setGreetingMessage(parsedSettings.greetingMessage || "Hello! I'm Simeon's virtual assistant. How can I help you today?");
            setDefaultResponses({
              greeting: parsedSettings.defaultResponses?.greeting || "Hi there! How can I assist you with Simeon's services today?",
              fallback: parsedSettings.defaultResponses?.fallback || "I'm sorry, I don't quite understand. Would you like me to connect you with Simeon?",
              contactRequest: parsedSettings.defaultResponses?.contactRequest || "You can reach Simeon at hello@simeonazeh.com or through the contact form.",
              serviceInfo: parsedSettings.defaultResponses?.serviceInfo || "Simeon offers web development, UI/UX design, and digital marketing services.",
            });
            setMessageRetention(parsedSettings.messageRetention || 30);
            setAutoDeleteRead(parsedSettings.autoDeleteRead || false);
            setDarkModeDefault(parsedSettings.darkModeDefault || false);
          } else {
            // Default values if no settings are saved
            setBotName('Chat Assistant');
            setGreetingMessage("Hello! I'm Simeon's virtual assistant. How can I help you today?");
            setDefaultResponses({
              greeting: "Hi there! How can I assist you with Simeon's services today?",
              fallback: "I'm sorry, I don't quite understand. Would you like me to connect you with Simeon?",
              contactRequest: "You can reach Simeon at hello@simeonazeh.com or through the contact form.",
              serviceInfo: "Simeon offers web development, UI/UX design, and digital marketing services.",
            });
            setMessageRetention(30);
            setAutoDeleteRead(false);
            setDarkModeDefault(false);
          }
          
          setIsLoading(false);
        } catch (error) {
          console.error('Error loading settings:', error);
          setIsLoading(false);
          setSaveError('Failed to load settings. Using defaults.');
        }
      }, 800);
    };
    
    loadSettings();
  }, []);
  
  // Save settings to localStorage
  const saveSettings = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(null);
    
    // Simulate delay for API call
    setTimeout(() => {
      try {
        const settingsToSave = {
          botName,
          greetingMessage,
          defaultResponses,
          messageRetention,
          autoDeleteRead,
          darkModeDefault,
        };
        
        localStorage.setItem('chatSettings', JSON.stringify(settingsToSave));
        
        setIsSaving(false);
        setSaveSuccess(true);
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      } catch (error) {
        console.error('Error saving settings:', error);
        setIsSaving(false);
        setSaveError('Failed to save settings. Please try again.');
      }
    }, 1000);
  };
  
  // Reset to default settings
  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This cannot be undone.')) {
      setBotName('Chat Assistant');
      setGreetingMessage("Hello! I'm Simeon's virtual assistant. How can I help you today?");
      setDefaultResponses({
        greeting: "Hi there! How can I assist you with Simeon's services today?",
        fallback: "I'm sorry, I don't quite understand. Would you like me to connect you with Simeon?",
        contactRequest: "You can reach Simeon at hello@simeonazeh.com or through the contact form.",
        serviceInfo: "Simeon offers web development, UI/UX design, and digital marketing services.",
      });
      setMessageRetention(30);
      setAutoDeleteRead(false);
      setDarkModeDefault(false);
      
      // Show success message after reset
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings();
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading settings...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
            <FiCpu className="mr-2" />
            Chat System Settings
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Customize how your chat widget behaves and appears to visitors
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {/* Status messages */}
          {saveSuccess && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg flex items-center"
            >
              <FiCheck className="mr-2 flex-shrink-0" />
              <span>Settings saved successfully!</span>
            </motion.div>
          )}
          
          {saveError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg flex items-center"
            >
              <FiAlertCircle className="mr-2 flex-shrink-0" />
              <span>{saveError}</span>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* General Settings Section */}
            <div className="md:col-span-2">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                General Settings
              </h3>
            </div>
            
            {/* Bot Name */}
            <div>
              <label htmlFor="botName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bot Name
              </label>
              <input
                type="text"
                id="botName"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Chat Assistant"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                The name displayed to users in the chat widget
              </p>
            </div>
            
            {/* Greeting Message */}
            <div>
              <label htmlFor="greetingMessage" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Greeting Message
              </label>
              <input
                type="text"
                id="greetingMessage"
                value={greetingMessage}
                onChange={(e) => setGreetingMessage(e.target.value)}
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Hello! How can I help you today?"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                First message sent when a user opens the chat
              </p>
            </div>
            
            {/* Default Responses Section */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Default Responses
              </h3>
            </div>
            
            {/* Greeting Response */}
            <div>
              <label htmlFor="greetingResponse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Greeting Response
              </label>
              <textarea
                id="greetingResponse"
                value={defaultResponses.greeting}
                onChange={(e) => setDefaultResponses({...defaultResponses, greeting: e.target.value})}
                rows="3"
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Hi there! How can I assist you today?"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Response to greetings like "hello" or "hi"
              </p>
            </div>
            
            {/* Fallback Response */}
            <div>
              <label htmlFor="fallbackResponse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Fallback Response
              </label>
              <textarea
                id="fallbackResponse"
                value={defaultResponses.fallback}
                onChange={(e) => setDefaultResponses({...defaultResponses, fallback: e.target.value})}
                rows="3"
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="I'm sorry, I don't understand. Would you like to speak with a human?"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Response when the bot doesn't understand the user's message
              </p>
            </div>
            
            {/* Contact Request Response */}
            <div>
              <label htmlFor="contactResponse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Contact Information Response
              </label>
              <textarea
                id="contactResponse"
                value={defaultResponses.contactRequest}
                onChange={(e) => setDefaultResponses({...defaultResponses, contactRequest: e.target.value})}
                rows="3"
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="You can reach me at hello@example.com or through the contact form."
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Response when users ask for contact information
              </p>
            </div>
            
            {/* Services Information Response */}
            <div>
              <label htmlFor="servicesResponse" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Services Information Response
              </label>
              <textarea
                id="servicesResponse"
                value={defaultResponses.serviceInfo}
                onChange={(e) => setDefaultResponses({...defaultResponses, serviceInfo: e.target.value})}
                rows="3"
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="I offer web development, design, and marketing services."
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Response when users ask about your services
              </p>
            </div>
            
            {/* Advanced Settings Section */}
            <div className="md:col-span-2 mt-4">
              <h3 className="text-md font-medium text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                Advanced Settings
              </h3>
            </div>
            
            {/* Message Retention */}
            <div>
              <label htmlFor="messageRetention" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message Retention (Days)
              </label>
              <input
                type="number"
                id="messageRetention"
                value={messageRetention}
                onChange={(e) => setMessageRetention(parseInt(e.target.value) || 30)}
                min="1"
                max="365"
                className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Number of days to keep chat messages before auto-deletion
              </p>
            </div>
            
            {/* Toggle Switches */}
            <div className="space-y-4">
              {/* Auto Delete Read Chats */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto Delete Read Chats</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Automatically delete chats after admin has viewed them</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setAutoDeleteRead(!autoDeleteRead)}
                  className="text-2xl text-gray-400 hover:text-pink-500 dark:text-gray-500 dark:hover:text-pink-400"
                >
                  {autoDeleteRead ? (
                    <FiToggleRight className="text-pink-500 dark:text-pink-400" />
                  ) : (
                    <FiToggleLeft />
                  )}
                </button>
              </div>
              
              {/* Dark Mode Default */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Mode Default</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Use dark mode by default for the chat widget</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setDarkModeDefault(!darkModeDefault)}
                  className="text-2xl text-gray-400 hover:text-pink-500 dark:text-gray-500 dark:hover:text-pink-400"
                >
                  {darkModeDefault ? (
                    <div className="flex items-center">
                      <FiMoon className="mr-1 text-pink-500 dark:text-pink-400" />
                      <FiToggleRight className="text-pink-500 dark:text-pink-400" />
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <FiSun className="mr-1" />
                      <FiToggleLeft />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Form Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <button
              type="button"
              onClick={resetToDefaults}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <FiRefreshCw className="mr-2" />
              Reset to Defaults
            </button>
            
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FiSave className="mr-2" />
              )}
              {isSaving ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mt-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
            <FiMessageSquare className="mr-2" />
            Chat Widget Preview
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            See how your chat widget will appear to visitors (coming soon)
          </p>
        </div>
        
        <div className="p-6 text-center">
          <div className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400 mb-3">Widget preview will be available in a future update</p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <span className="mr-2">•</span>
              <span>Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;