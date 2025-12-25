import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { FiExternalLink, FiGithub, FiCode, FiDownload, FiLayers } from 'react-icons/fi';
import { FaReact, FaAppStore, FaGooglePlay } from 'react-icons/fa';
import { SiFirebase, SiExpo } from 'react-icons/si';

// Updated mockup data with light/dark theme images
const mockupImages = [
  {
    id: 1,
    src: '/images/bucabus-mockup3.png',
    src_light: '/images/bucabus-mockup3.png',
    src_dark: '/images/bucabus-mockup3.png',
    screenshots: ['/images/bucabus-mockup3.png', '/images/bucabus-mockup-2.png', '/images/bucabus-mockup1.png'],
    screenshots_light: ['/images/bucabus-mockup3.png', '/images/bucabus-mockup-2.png', '/images/bucabus-mockup1.png'],
    screenshots_dark: ['/images/bucabus-mockup3.png', '/images/bucabus-mockup-2.png', '/images/bucabus-mockup1.png'],
    alt: 'BucaBus App',
    title: 'BucaBus',
    badge: 'app_badge_released',
    year: '2023',
    description: 'bucabus_description',
    longDescription: 'bucabus_long_description',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'Stripe'],
    features: [
      'bucabus_feature_1',
      'bucabus_feature_2',
      'bucabus_feature_3',
      'bucabus_feature_4',
      'bucabus_feature_5'
    ],
    appStoreLink: 'https://apps.apple.com/us/app/bucabus',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.bucabus',
    githubLink: null,
    caseStudyLink: '/projects/bucabus',
    color: '#0758b8'
  },
  {
    id: 2,
    src: '/images/sidec-mockup.png',
    src_light: '/images/sidec-mockup.png',
    src_dark: '/images/sidec-mockup-dark.png',
    screenshots: ['/images/work10.png', '/images/work11.png', '/images/work8.png'],
    screenshots_light: ['/images/sidec-mockup-3.png', '/images/sidec-mockup-2.png', '/images/sidec-mockup-6.png'],
    screenshots_dark: ['/images/sidec-mockup-5.png', '/images/sidec-mockup-4.png', '/images/sidec-mockup-dark.png'],
    alt: 'SIDEC Learning App',
    title: 'SIDEC E-Learning',
    badge: 'app_badge_featured',
    year: '2022',
    description: 'sidec_description',
    longDescription: 'sidec_long_description',
    technologies: ['React Native', 'Firebase', 'Node.js', 'Express', 'MongoDB'],
    features: [
      'sidec_feature_1',
      'sidec_feature_2',
      'sidec_feature_3',
      'sidec_feature_4',
      'sidec_feature_5'
    ],
    appStoreLink: 'https://apps.apple.com/us/app/sidec-learning',
    playStoreLink: 'https://play.google.com/store/apps/details?id=com.sidec',
    githubLink: 'https://github.com/simeonazeh/sidec-app',
    caseStudyLink: '/projects/sidec',
    color: '#9835ff'
  }
];

function AppHero() {
  const { t } = useTranslation();
  const [currentMockup, setCurrentMockup] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check for screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check for dark mode and observe theme changes
  useEffect(() => {
    // Initial check for dark mode
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Set up a mutation observer to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Clean up
    return () => observer.disconnect();
  }, []);

  const nextMockup = () => {
    setCurrentMockup((prev) => (prev === mockupImages.length - 1 ? 0 : prev + 1));
    setIsExpanded(false);
    setCurrentScreenshot(0);
  };

  const prevMockup = () => {
    setCurrentMockup((prev) => (prev === 0 ? mockupImages.length - 1 : prev - 1));
    setIsExpanded(false);
    setCurrentScreenshot(0);
  };

  const nextScreenshot = () => {
    const screenshots = isDarkMode ?
      mockupImages[currentMockup].screenshots_dark :
      mockupImages[currentMockup].screenshots_light;
    setCurrentScreenshot((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  };

  // Auto-rotate screenshots
  useEffect(() => {
    if (!autoplay || isExpanded) return;

    const interval = setInterval(() => {
      nextScreenshot();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentScreenshot, autoplay, isExpanded, isDarkMode]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // Get the appropriate image src based on theme
  const getThemeBasedSrc = (mockup) => {
    return isDarkMode ? mockup.src_dark : mockup.src_light;
  };

  // Get the appropriate screenshots based on theme
  const getThemeBasedScreenshots = (mockup) => {
    return isDarkMode ? mockup.screenshots_dark : mockup.screenshots_light;
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-light-body to-[#F9FEFF] dark:from-dark-body  transition-colors duration-500 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:hidden">
        <div className="absolute inset-0 bg-grid-pattern dark:hidden"></div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 right-10 w-40 h-40 rounded-full bg-violet-200/30 dark:bg-violet-500/20 blur-xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-60 h-60 rounded-full bg-blue-200/30 dark:bg-white/10 blur-xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />

      <div className="w-full lg:w-4/5 mx-auto px-4 sm:px-6 md:px-8 font-inter relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-violet-600 dark:bg-violet-400 rounded-full mb-6 mx-auto"
          />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-white mb-4 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
              {t('app_showcase_title', 'Mobile Applications')}
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto px-4"
          >
            {t('app_showcase_description', 'Discover mobile solutions I\'ve built with modern technologies to deliver exceptional user experiences')}
          </motion.p>
        </div>

        {/* Main content */}
        <div className={`relative transition-all duration-500 ${isExpanded ? 'pt-14' : ''}`}>
          {/* Expanded view toggle */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute top-0 right-4 z-30 bg-white/80 border border-violet-600 dark:bg-[#1a1a1a] dark:border dark:border-gray-800 backdrop-blur-sm rounded-full py-1.5 px-4 text-sm font-medium text-violet-600 dark:text-violet-400 "
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isExpanded ? t('view_showcase', 'View Showcase') : t('view_details', 'View Details')}
          </motion.button>

          {/* Showcase view */}
          <AnimatePresence mode="wait">
            {!isExpanded && (
              <motion.div
                key="showcase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Phone Frame Carousel */}
                <div className="flex justify-center items-center relative">
                  {/* Navigation Buttons */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute left-0 sm:left-6 md:left-10 z-20 border border-violet-600 bg-white/90 dark:bg-[#1a1a1a] dark:border dark:border-gray-800 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg text-violet-600 dark:text-violet-400"
                    onClick={prevMockup}
                    aria-label="Previous project"
                  >
                    <HiOutlineChevronLeft size={isMobile ? 20 : 24} />
                  </motion.button>

                  {/* Phone Mockups */}
                  <div
                    className="flex justify-center items-center relative w-full min-h-[550px] xs:min-h-[600px] sm:min-h-[650px] md:min-h-[750px] 
  overflow-visible px-4 sm:px-8 md:px-12 mb-28"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {mockupImages.map((mockup, index) => (
                      <motion.div
                        key={`${mockup.id}-${isDarkMode ? 'dark' : 'light'}`}
                        className={`absolute transition-all duration-500 ${getPositionClass(index, currentMockup, mockupImages.length, isMobile)}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{
                          opacity: index === currentMockup ? 1 : 0.3,
                          y: 0,
                          scale: index === currentMockup ? 1 : 0.85,
                          zIndex: index === currentMockup ? 20 : 10,
                          filter: index === currentMockup ? 'blur(0px)' : 'blur(3px)'
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative group">
                          {/* Display main mockup with theme-based image */}
                          <motion.div className="relative w-full flex justify-center items-center">
                            <motion.img
                              key={`mockup-${mockup.id}-${isDarkMode ? 'dark' : 'light'}`}
                              src={getThemeBasedSrc(mockup)}
                              alt={mockup.alt}
                              className="w-auto h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] object-contain drop-shadow-2xl"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>

                          {/* Project badge - adjusted position */}
                          {index === currentMockup && mockup.badge && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="absolute top-4 sm:top-6 left-0 sm:left-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white dark:from-violet-500 dark:to-purple-500 text-xs font-bold px-3 py-1 rounded-r-full sm:rounded-full shadow-lg"
                            >
                              {t(mockup.badge)}
                            </motion.div>
                          )}

                          {/* Tech icons - adjusted for better mobile visibility */}
                          {index === currentMockup && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                              className="absolute -left-2 sm:-left-6 top-1/4 flex flex-col gap-3 sm:gap-4"
                            >
                              {renderTechIcons(mockup).map((Icon, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.2 + (idx * 0.1) }}
                                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-md text-violet-600 dark:text-violet-400"
                                >
                                  {Icon}
                                </motion.div>
                              ))}
                            </motion.div>
                          )}

                          {/* Info card - adjusted positioning and sizing */}
                          {index === currentMockup && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a1a1a] dark:border dark:border-gray-800 dark:text-white text-gray-900 
                      rounded-xl p-3 sm:p-4 md:p-5 shadow-xl dark:shadow-gray-900/30 w-[200px] sm:w-[320px] md:w-[380px]"
                              style={{
                                borderTop: `3px solid ${mockup.color}`
                              }}
                            >

                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                                  {mockup.title}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {mockup.year}
                                </span>
                              </div>
                              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                {t(mockup.description)}
                              </p>

                              {/* App Store buttons */}
                              <div className="flex gap-2 md:flex-row flex-col  ">
                                {mockup.playStoreLink && (
                                  <motion.a
                                    href={mockup.playStoreLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 dark:bg-[#1a1a1a]/20 dark:border dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors rounded-full p-2 w-10 h-10 flex items-center justify-center"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="Download from Google Play"
                                  >
                                    <FiDownload className="text-gray-700 dark:text-gray-300" size={18} />

                                  </motion.a>
                                )}

                                {mockup.githubLink && (
                                  <motion.a
                                    href={mockup.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors rounded-full p-2  w-10 h-10 flex items-center justify-center"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label="View source code on GitHub"
                                  >
                                    <FiGithub className="text-gray-700 dark:text-gray-300" size={18} />
                                  </motion.a>
                                )}

                                <motion.a
                                  href={mockup.caseStudyLink}
                                  className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white dark:from-violet-500 dark:to-purple-500 text-sm font-medium px-4 py-2 rounded-full transition-colors"
                                  whileHover={{ y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {t('view_case_study')} <FiExternalLink size={16} />
                                </motion.a>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-0 sm:right-6 md:right-10 z-20 bg-white/90 dark:bg-[#1a1a1a] dark:border dark:border-gray-800 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg text-violet-600 dark:text-violet-400"
                    onClick={nextMockup}
                    aria-label="Next project"
                  >
                    <HiOutlineChevronRight size={isMobile ? 20 : 24} />
                  </motion.button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-20">
                  {mockupImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMockup(idx)}
                      className={`w-8 sm:w-10 h-1.5 mx-1 rounded-full transition-all duration-300 ${idx === currentMockup
                        ? "bg-violet-600 dark:bg-violet-400 w-12 sm:w-16"
                        : "bg-gray-300 dark:bg-gray-700"
                        }`}
                      aria-label={`Go to project ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Detailed view */}
            {isExpanded && (
              <motion.div
                key={`details-${isDarkMode ? 'dark' : 'light'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col lg:flex-row gap-8 lg:gap-10 py-8"
              >
                {/* Left: Screenshots gallery */}
                <div className="flex-1">
                  <div className="relative rounded-xl overflow-hidden bg-white/5 dark:bg-[#1a1a1a] backdrop-blur-sm border border-gray-200 dark:border-gray-800 shadow-xl">
                    {/* Current screenshot with theme-based images */}
                    <div className="relative aspect-mobile md:aspect-[9/16] w-full max-h-[600px] overflow-hidden flex items-center justify-center bg-white dark:bg-[#1a1a1a]">
                      {getThemeBasedScreenshots(mockupImages[currentMockup]).map((screenshot, idx) => (
                        <motion.div
                          key={`screenshot-${idx}-${isDarkMode ? 'dark' : 'light'}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: idx === currentScreenshot ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                          className={`absolute inset-0 flex items-center justify-center ${idx === currentScreenshot ? '' : 'pointer-events-none'}`}
                        >
                          <img
                            src={screenshot}
                            alt={`${mockupImages[currentMockup].title} screenshot ${idx + 1}`}
                            className="w-full h-full object-contain max-h-full"
                          />
                        </motion.div>
                      ))}

                      {/* Screenshot navigation */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                        {getThemeBasedScreenshots(mockupImages[currentMockup]).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentScreenshot(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentScreenshot
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/70"
                              }`}
                            aria-label={`View screenshot ${idx + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* App info overlay */}
                    <div className="absolute top-4 left-4 bg-white border dark:bg-[#1a1a1a] backdrop-blur-sm rounded-lg px-3 py-2 shadow-md dark:border-gray-800">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                        {mockupImages[currentMockup].title}
                        <span className="ml-2 text-xs font-normal px-2 py-0.5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full">
                          {t(mockupImages[currentMockup].badge)}
                        </span>
                      </h3>
                    </div>
                  </div>

                  {/* App store badges */}
                  <div className="flex justify-center gap-4 mt-6">
                    {mockupImages[currentMockup].playStoreLink && (
                      <motion.a
                        href={mockupImages[currentMockup].playStoreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#1a1a1a] dark:border dark:border-gray-800 text-white px-4 py-2 rounded-lg"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      >
                        <FaGooglePlay size={20} className='text-orange-200' />
                        <div className="flex flex-col">
                          <span className="text-xs">{t('download_on', 'Download on')}</span>
                          <span className="text-sm font-semibold">Google Play</span>
                        </div>
                      </motion.a>
                    )}

                    {mockupImages[currentMockup].appStoreLink && (
                      <motion.a
                        href={mockupImages[currentMockup].appStoreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-lg dark:border dark:border-gray-800"
                        whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                      >
                        <FaAppStore size={20} />
                        <div className="flex flex-col">
                          <span className="text-xs">{t('download_on', 'Download on')}</span>
                          <span className="text-sm font-semibold">App Store</span>
                        </div>
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Right: Project details */}
                <div className="flex-1 mt-8 lg:mt-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {mockupImages[currentMockup].title}
                  </h2>

                  <div className="prose dark:prose-invert mb-6 max-w-none">
                    <p className="text-gray-700 dark:text-gray-300">
                      {t(mockupImages[currentMockup].longDescription)}
                    </p>
                  </div>

                  {/* Tech stack */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FiCode className="mr-2" /> {t('technologies', 'Technologies')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {mockupImages[currentMockup].technologies.map((tech, idx) => (
                        <motion.span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 dark:bg-white text-gray-700 dark:text-light-text rounded-full text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Key features */}
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <FiLayers className="mr-2" /> {t('key_features', 'Key Features')}
                    </h3>
                    <ul className="space-y-2">
                      {mockupImages[currentMockup].features.map((featureKey, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (idx * 0.1) }}
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400 mt-2 mr-2"></span>
                          <span className="text-gray-700 dark:text-gray-300">{t(featureKey)}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA buttons */}
                  <div className="flex flex-wrap gap-3 mt-8">
                    <motion.a
                      href={mockupImages[currentMockup].caseStudyLink}
                      className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white dark:from-violet-500 dark:to-purple-500 font-medium rounded-lg flex items-center gap-2 shadow-lg shadow-violet-600/20"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {t('view_case_study', 'View Case Study')} <FiExternalLink />
                    </motion.a>

                    {mockupImages[currentMockup].githubLink && (
                      <motion.a
                        href={mockupImages[currentMockup].githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-lg flex items-center gap-2"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {t('source_code', 'Source Code')} <FiGithub />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Helper function to get the tech icons
function renderTechIcons(mockup) {
  const iconMap = {
    'React Native': <FaReact size={22} />,
    'Firebase': <SiFirebase size={22} />,
    'Expo': <SiExpo size={22} />
  };

  // Return first 3 tech icons or placeholders
  return mockup.technologies
    .slice(0, 3)
    .map(tech => iconMap[tech] || <FiCode size={22} />);
}

// Helper function to position the mockups
function getPositionClass(index, currentIndex, totalItems, isMobile) {
  if (index === currentIndex) return "center-item";

  const diff = ((index - currentIndex + totalItems) % totalItems);

  // Adjust offsets based on screen size
  const baseOffset = isMobile ? "100" : "180";
  const mdOffset = isMobile ? "150" : "250";
  const lgOffset = isMobile ? "200" : "350";

  if (diff === 1 || diff === totalItems - 1) {
    return diff === 1
      ? `ml-[${baseOffset}px] sm:ml-[${mdOffset}px] lg:ml-[${lgOffset}px] opacity-60`
      : `mr-[${baseOffset}px] sm:mr-[${mdOffset}px] lg:mr-[${lgOffset}px] opacity-60`;
  }

  return "opacity-0 pointer-events-none";
}

export default AppHero;