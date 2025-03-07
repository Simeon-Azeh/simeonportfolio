import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import ReactFlagsSelect from 'react-flags-select';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setVisible(false);
  }, [location]);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (countryCode) => {
    i18n.changeLanguage(countryCode === 'US' ? 'en' : 'fr');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if current route matches to highlight active link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`sticky top-0 z-50
      ${scrolled 
        ? 'bg-white/90 dark:bg-dark-body/90' 
        : 'bg-light-body/90 dark:bg-dark-body/90'
      }`}>
    <motion.div 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex justify-between w-full md:w-4/5 mx-auto items-center py-4 px-6 md:px-0 font-inter
        backdrop-blur-sm transition-colors duration-500
        ${scrolled 
          ? 'bg-white/90 dark:bg-dark-body/90' 
          : 'bg-light-body/90 dark:bg-dark-body/90'
        }`}
    >
        <Link to="/" className="text-lg font-semibold group">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className='font-montserrat-alt text-light-text dark:text-slate-50 relative'
          >
            Simeon <span className='dark:text-gray-300 text-pink-600'>Azeh</span>
            <motion.span 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-600 dark:bg-gray-300 group-hover:w-full transition-all duration-300"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </motion.h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-[#414760] dark:text-slate-50">
          <NavLink to="/" isActive={isActive("/")} label={t('home')} />
          
          <div className="relative">
            <motion.button 
              onClick={toggleDropdown} 
              className={`flex items-center hover:text-pink-600 dark:hover:text-gray-400 ${dropdownOpen ? 'text-pink-600 dark:text-gray-400' : ''}`}
              whileHover={{ scale: 1.05 }}
            >
              {t('about')}
              {dropdownOpen ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />}
            </motion.button>
            
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute dark:bg-dark-body py-2 mt-2 rounded-md border bg-white text-[#414760] dark:border-gray-600 shadow-lg min-w-[140px]"
                >
                  <Link to="/resume">
                    <motion.p 
                      whileHover={{ x: 5 }}
                      className={`block py-2 px-4 hover:text-pink-600 dark:hover:text-slate-300 ${isActive("/resume") ? 'text-pink-600 dark:text-slate-300 font-medium' : ''}`}
                    >
                      {t('resume')}
                    </motion.p>
                  </Link>
                  <Link to="/portfolio">
                    <motion.p 
                      whileHover={{ x: 5 }}
                      className={`block py-2 px-4 hover:text-pink-600 dark:hover:text-slate-300 ${isActive("/portfolio") ? 'text-pink-600 dark:text-slate-300 font-medium' : ''}`}
                    >
                      {t('portfolio')}
                    </motion.p>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <NavLink to="/services" isActive={isActive("/services")} label={t('services')} />
          <NavLink to="/contact" isActive={isActive("/contact")} label={t('contact')} />
        </nav>
        
        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-5">
          <motion.button 
            onClick={toggleDarkMode} 
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="hover:text-pink-600 dark:hover:text-gray-300 dark:text-slate-50 text-[#414760]"
          >
            {darkMode ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
          </motion.button>
          
          <ReactFlagsSelect
            countries={["US", "FR"]}
            customLabels={{ US: "EN", FR: "FR" }}
            selected={i18n.language === 'en' ? 'US' : 'FR'}
            onSelect={handleLanguageChange}
            className="custom-flag-select text-[#414760] dark:text-slate-50 !min-w-[80px] !p-0"
          />
          
          <SocialLinks />
        </div>
        
        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button 
            onClick={toggleDarkMode} 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.3 }}
            className="hover:text-pink-600 dark:hover:text-slate-300 dark:text-slate-50 text-[#414760]"
          >
            {darkMode ? <MdOutlineLightMode size={22} /> : <MdOutlineDarkMode size={22} />}
          </motion.button>
          
          <ReactFlagsSelect
            countries={["US", "FR"]}
            customLabels={{ US: "EN", FR: "FR" }}
            selected={i18n.language === 'en' ? 'US' : 'FR'}
            onSelect={handleLanguageChange}
            className="custom-flag-select !min-w-[80px] !p-0"
            optionsSize={14}
          />
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={toggleDrawer} 
            className="dark:text-slate-50 text-light-text"
          >
            {visible ? <CloseOutlined size={24} /> : <MenuOutlined size={24} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Custom Mobile Drawer */}
      <AnimatePresence>
        {visible && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 md:hidden"
              onClick={toggleDrawer}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-3/4 max-w-xs z-50 bg-[#fff] dark:bg-dark-body shadow-xl md:hidden flex flex-col"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-semibold dark:text-white">{t('menu')}</h2>
                  <motion.button 
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDrawer}
                    className="text-light-text dark:text-white"
                  >
                    <CloseOutlined />
                  </motion.button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <MobileNavLink to="/" label={t('home')} isActive={isActive("/")} />
                  <MobileNavLink to="/resume" label={t('resume')} isActive={isActive("/resume")} />
                  <MobileNavLink to="/services" label={t('services')} isActive={isActive("/services")} />
                  <MobileNavLink to="/portfolio" label={t('portfolio')} isActive={isActive("/portfolio")} />
                  <MobileNavLink to="/contact" label={t('contact')} isActive={isActive("/contact")} />
                </nav>
                
                <div className="flex space-x-5 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <SocialLinks mobile />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Component for desktop nav links
const NavLink = ({ to, label, isActive }) => (
  <Link to={to}>
    <motion.a 
      className={`relative py-2 ${isActive ? 'text-pink-600 dark:text-gray-300' : ''}`}
      whileHover={{ scale: 1.05 }}
    >
      {label}
      <motion.span 
        className={`absolute bottom-0 left-0 h-0.5 bg-pink-600 dark:bg-gray-300 ${isActive ? 'w-full' : 'w-0'}`}
        whileHover={{ width: "100%" }}
        initial={{ width: isActive ? "100%" : "0%" }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
    </motion.a>
  </Link>
);

// Component for mobile nav links
const MobileNavLink = ({ to, label, isActive }) => (
  <Link to={to} className="block">
    <motion.div 
      whileHover={{ 
        x: 8,
        backgroundColor: isActive ? "" : "rgba(249, 168, 212, 0.1)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ borderRadius: "0.375rem" }}
      className={`py-3 px-3 rounded-md transition-colors duration-200 flex items-center ${
        isActive 
          ? 'bg-pink-100 dark:bg-gray-800 text-pink-600 dark:text-gray-300 font-medium border-l-2 border-pink-600 dark:border-gray-300' 
          : 'text-[#414760] dark:text-slate-200'
      }`}
    >
      <motion.span
        initial={{ width: 0 }}
        whileHover={{ width: isActive ? 0 : 3 }}
        className={`mr-1 h-4 bg-pink-600 dark:bg-gray-300 rounded-full ${isActive ? 'hidden' : ''}`}
        transition={{ duration: 0.2 }}
      />
      {label}
    </motion.div>
  </Link>
);

// Component for social media links
const SocialLinks = ({ mobile = false }) => {
  const linkClass = mobile 
    ? "text-[#414760] dark:text-slate-200 hover:text-pink-600 dark:hover:text-gray-400"
    : "dark:hover:text-gray-400 dark:text-slate-50 text-light-text hover:text-pink-600";
    
  return (
    <>
      <motion.a 
        href="https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL" 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClass}
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaFacebook size={20} />
      </motion.a>
      <motion.a 
        href="https://www.linkedin.com/in/simeonazeh" 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClass}
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaLinkedin size={20} />
      </motion.a>
      <motion.a 
        href="https://github.com/Simeon-Azeh" 
        target="_blank" 
        rel="noopener noreferrer"
        className={linkClass}
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaGithub size={20} />
      </motion.a>
    </>
  );
};

export default Header;