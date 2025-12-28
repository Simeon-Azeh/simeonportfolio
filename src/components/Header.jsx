import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt } from 'react-icons/bi';

function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const langDropdownRef = useRef(null);
  const mobileLangDropdownRef = useRef(null);

  // Mouse tracking for parallax effect on glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
      // Check if scrolled more than 50px for header style change
      setScrolled(window.scrollY > 50);

      // Calculate scroll progress percentage
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = Math.min(scrolled / windowHeight * 100, 100);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target) &&
        mobileLangDropdownRef.current && !mobileLangDropdownRef.current.contains(event.target)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setVisible(false);
  }, [location]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  const toggleDrawer = () => {
    setVisible(!visible);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleLangDropdown = () => {
    setLangDropdownOpen(!langDropdownOpen);
  };

  const handleLanguageChange = (langCode) => {
    if (i18n.language === langCode) return;

    setIsChangingLang(true);
    setLangDropdownOpen(false);

    // Simulate loading time
    setTimeout(() => {
      i18n.changeLanguage(langCode);
      setTimeout(() => {
        setIsChangingLang(false);
      }, 300);
    }, 700);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Check if current route matches to highlight active link
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Language options
  const languages = [
    { code: 'en', label: 'English', flag: 'uk.png' },
    { code: 'fr', label: 'Français', flag: 'france.png' },
  ];

  // Get current language
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ease-smooth will-change-[background-color,box-shadow]
      ${scrolled
        ? 'bg-white/95 dark:bg-dark-body/95 shadow-lg shadow-slate-200/50 dark:shadow-violet-500/10 border-b border-slate-100 dark:border-zinc-800'
        : 'bg-gradient-to-b from-slate-50 via-white/95 to-white/90 dark:from-dark-body dark:via-dark-body/95 dark:to-dark-body/90'
      } backdrop-blur-xl`}>
      {/* Subtle glow effect for dark mode - violet gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-48 w-[400px] h-[300px] rounded-full blur-[100px] opacity-0 dark:opacity-60 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)',
            x: moveX,
            y: moveY
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Scroll Progress Indicator */}
      <motion.div
        className={`absolute top-0 left-0 h-0.5 z-50 bg-gradient-to-r from-violet-500 via-purple-500 to-violet-500`}
        style={{ width: `${scrollProgress}%` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0 ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`relative z-10 flex justify-between w-full md:w-4/5 mx-auto items-center py-3 md:py-4 px-4 sm:px-6 md:px-0 font-inter
          transition-all duration-500 ease-in-out`}
      >
        <Link to="/" className="text-lg font-semibold group">
          <motion.h1
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className={`font-montserrat-alt relative transition-colors duration-300 text-slate-800 dark:text-white`}
          >
            Simeon <span className={`transition-colors duration-300 dark:text-violet-300 text-violet-600`}>Azeh</span>
            <motion.span
              className={`absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400`}
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
            />
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className={`hidden md:flex space-x-6 lg:space-x-8 transition-colors duration-300 text-slate-600 dark:text-slate-200`}>
          <NavLink to="/" isActive={isActive("/")} label={t('home')} />

          <div className="relative">
            <motion.button
              onClick={toggleDropdown}
              className={`flex items-center transition-colors duration-300 hover:text-violet-600 dark:hover:text-violet-400 ${dropdownOpen ? 'text-violet-600 dark:text-violet-400' : ''}`}
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
                  className="absolute dark:bg-zinc-900 py-2 mt-2 rounded-lg border bg-white/95 backdrop-blur-xl text-slate-600 dark:text-slate-200 dark:border-zinc-700 shadow-xl shadow-violet-500/10 min-w-[140px]"
                >
                  <Link to="/resume">
                    <motion.p
                      whileHover={{ x: 5 }}
                      className={`block py-2 px-4 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 ${isActive("/resume") ? 'text-violet-600 dark:text-violet-400 font-medium' : ''}`}
                    >
                      {t('resume')}
                    </motion.p>
                  </Link>
                  <Link to="/portfolio">
                    <motion.p
                      whileHover={{ x: 5 }}
                      className={`block py-2 px-4 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 ${isActive("/portfolio") ? 'text-violet-600 dark:text-violet-400 font-medium' : ''}`}
                    >
                      {t('portfolio')}
                    </motion.p>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/services" isActive={isActive("/services")} label={t('services')} />
          <NavLink to="/seo" isActive={isActive("/seo")} label={t('seo', 'SEO')} />

          {/* Referrals Link with New Badge */}
          <div className="relative">
            <NavLink to="/referrals" isActive={isActive("/referrals")} label={t('referrals', 'Referrals')} />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 10,
                delay: 0.3
              }}
              className={`absolute -top-3 -right-8 text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-violet-500/30`}
            >
              {t('new', 'NEW')}
            </motion.div>
          </div>

          <NavLink to="/contact" isActive={isActive("/contact")} label={t('contact')} />

        </nav>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-5">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`relative p-2 rounded-xl transition-all duration-300 hover:bg-violet-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400`}
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="light"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdOutlineLightMode size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="dark"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdOutlineDarkMode size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Custom Language Selector - Desktop */}
          <div className="relative" ref={langDropdownRef}>
            <motion.button
              onClick={toggleLangDropdown}
              disabled={isChangingLang}
              className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded-lg transition-all duration-300 text-slate-600 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-zinc-800`}
              whileHover={{ scale: isChangingLang ? 1 : 1.05 }}
            >
              {isChangingLang ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <BiLoaderAlt size={20} className={'text-violet-600 dark:text-violet-400'} />
                </motion.div>
              ) : (
                <>
                  <img
                    src={`/images/${currentLang.flag}`}
                    alt={currentLang.code}
                    className="w-5 h-5 rounded-sm ring-2 ring-white/50 dark:ring-white/30"
                  />
                  <span className="text-sm">{currentLang.code.toUpperCase()}</span>
                  <IoIosArrowDown
                    className={`transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`}
                    size={14}
                  />
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-1 bg-white/95 dark:bg-zinc-900 backdrop-blur-xl border border-slate-200 dark:border-zinc-700 rounded-lg shadow-xl shadow-violet-500/10 py-1 min-w-[120px]"
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{
                        x: 3,
                        backgroundColor: "rgba(139, 92, 246, 0.1)"
                      }}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center space-x-2 w-full text-left px-3 py-2 transition-colors duration-300 ${lang.code === i18n.language
                        ? 'text-violet-600 dark:text-violet-400 font-medium'
                        : 'text-slate-600 dark:text-slate-200'
                        }`}
                    >
                      <img
                        src={`/images/${lang.flag}`}
                        alt={lang.code}
                        className="w-5 h-5 rounded-sm"
                      />
                      <span className="text-sm">{lang.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <SocialLinks />
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`p-1.5 rounded-lg transition-all duration-300 hover:bg-violet-100 dark:hover:bg-zinc-800 text-slate-600 dark:text-slate-200`}
          >
            <AnimatePresence mode="wait">
              {darkMode ? (
                <motion.div
                  key="light-mobile"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdOutlineLightMode size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="dark-mobile"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <MdOutlineDarkMode size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Custom Language Selector - Mobile */}
          <div className="relative" ref={mobileLangDropdownRef}>
            <motion.button
              onClick={toggleLangDropdown}
              disabled={isChangingLang}
              className={`flex items-center text-slate-600 dark:text-slate-200`}
              whileHover={{ scale: isChangingLang ? 1 : 1.05 }}
            >
              {isChangingLang ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                >
                  <BiLoaderAlt size={18} className={'text-violet-600 dark:text-violet-400'} />
                </motion.div>
              ) : (
                <img
                  src={`/images/${currentLang.flag}`}
                  alt={currentLang.code}
                  className="w-5 h-5 rounded-sm ring-2 ring-white/50 dark:ring-white/30"
                />
              )}
            </motion.button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-1 bg-white/95 dark:bg-zinc-900 backdrop-blur-xl border border-slate-200 dark:border-zinc-700 rounded-lg shadow-xl shadow-violet-500/10 py-1 min-w-[120px] z-50"
                >
                  {languages.map((lang) => (
                    <motion.button
                      key={lang.code}
                      whileHover={{
                        x: 3,
                        backgroundColor: "rgba(139, 92, 246, 0.1)"
                      }}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`flex items-center space-x-2 w-full text-left px-3 py-2 transition-colors duration-300 ${lang.code === i18n.language
                        ? 'text-violet-600 dark:text-violet-400 font-medium'
                        : 'text-slate-600 dark:text-slate-200'
                        }`}
                    >
                      <img
                        src={`/images/${lang.flag}`}
                        alt={lang.code}
                        className="w-5 h-5 rounded-sm"
                      />
                      <span className="text-sm">{lang.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDrawer}
            className={`p-1 dark:text-slate-200 text-slate-700`}
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
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[75] md:hidden"
              onClick={toggleDrawer}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-screen w-80 z-[80] bg-white dark:bg-zinc-900 shadow-2xl md:hidden overflow-y-auto"
            >
              <div className="p-6 min-h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-semibold text-slate-800 dark:text-white font-montserrat-alt">{t('menu')}</h2>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={toggleDrawer}
                    className="text-slate-700 dark:text-slate-200 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors duration-300"
                  >
                    <CloseOutlined className="text-xl" />
                  </motion.button>
                </div>

                <nav className="flex flex-col space-y-3 mb-6">
                  <MobileNavLink to="/" label={t('home')} isActive={isActive("/")} />
                  <MobileNavLink to="/resume" label={t('resume')} isActive={isActive("/resume")} />
                  <MobileNavLink to="/services" label={t('services')} isActive={isActive("/services")} />
                  <MobileNavLink to="/seo" label={t('seo', 'SEO')} isActive={isActive("/seo")} />
                  <MobileNavLink to="/portfolio" label={t('portfolio')} isActive={isActive("/portfolio")} />

                  {/* Mobile Referral Link with New Badge */}
                  <div className="relative">
                    <MobileNavLink to="/referrals" label={t('referrals', 'Referrals')} isActive={isActive("/referrals")} />
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 10,
                        delay: 0.3
                      }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-violet-600 to-purple-600 
                                text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm shadow-violet-500/30"
                    >
                      {t('new', 'NEW')}
                    </motion.div>
                  </div>

                  <MobileNavLink to="/contact" label={t('contact')} isActive={isActive("/contact")} />
                </nav>

                <div className="flex space-x-5 mt-auto pt-8 border-t border-slate-200 dark:border-zinc-700">
                  <SocialLinks mobile />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full page loading overlay when changing language */}
      <AnimatePresence>
        {isChangingLang && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <BiLoaderAlt size={40} className="text-white" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Component for desktop nav links
const NavLink = ({ to, label, isActive }) => (
  <Link to={to}>
    <motion.span
      className={`relative py-2 transition-colors duration-300 ${isActive
        ? 'text-violet-600 dark:text-violet-400 font-medium'
        : 'hover:text-violet-600 dark:hover:text-violet-400'
        }`}
      whileHover={{ scale: 1.05 }}
    >
      {label}
      <motion.span
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 ${isActive ? 'w-full' : 'w-0'}`}
        whileHover={{ width: "100%" }}
        initial={{ width: isActive ? "100%" : "0%" }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
    </motion.span>
  </Link>
);

// Component for mobile nav links
const MobileNavLink = ({ to, label, isActive }) => (
  <Link to={to} className="block">
    <motion.div
      whileHover={{
        x: 8,
        backgroundColor: isActive ? "" : "rgba(139, 92, 246, 0.1)",
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.97 }}
      initial={{ borderRadius: "0.5rem" }}
      className={`py-3.5 px-4 rounded-lg transition-all duration-300 flex items-center ${isActive
        ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 font-semibold border-l-4 border-violet-600 dark:border-violet-400 shadow-sm'
        : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-200 hover:bg-violet-50 dark:hover:bg-violet-500/10'
        }`}
    >
      <motion.span
        initial={{ width: 0 }}
        whileHover={{ width: isActive ? 0 : 3 }}
        className={`mr-2 h-4 bg-violet-600 dark:bg-violet-400 rounded-full ${isActive ? 'hidden' : ''}`}
        transition={{ duration: 0.2 }}
      />
      {label}
    </motion.div>
  </Link>
);

// Component for social media links
const SocialLinks = ({ mobile = false }) => {
  const linkClass = mobile
    ? "text-slate-600 dark:text-slate-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
    : "text-slate-600 dark:text-slate-200 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300";

  return (
    <>
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
        href="https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        whileHover={{ scale: 1.2, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaFacebook size={20} />
      </motion.a>


    </>
  );
};

export default Header;