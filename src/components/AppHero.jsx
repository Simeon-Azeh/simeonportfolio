import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import { FiExternalLink } from 'react-icons/fi';


const mockupImages = [
  {
    id: 1,
    src: '/images/work9.png', 
    alt: 'Ecommerce Mobile App',
    title: 'Ecommerce App',
    description: 'A modern shopping experience built with React Native',
    link: '#'
  },
  {
    id: 2,
    src: '/images/work10.png',
    alt: 'Health Tracking App',
    title: 'Health Tracker',
    description: 'Fitness tracking app with personalized recommendations',
    link: '#'
  },
  {
    id: 3,
    src: '/images/work11.png',
    alt: 'Finance Management App',
    title: 'Finance Manager',
    description: 'Personal finance management with clean analytics',
    link: '#'
  }
];

function AppHero() {
  const { t } = useTranslation();
  const [currentMockup, setCurrentMockup] = useState(0);

  const nextMockup = () => {
    setCurrentMockup((prev) => (prev === mockupImages.length - 1 ? 0 : prev + 1));
  };

  const prevMockup = () => {
    setCurrentMockup((prev) => (prev === 0 ? mockupImages.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-light-body to-[#F9FEFF] dark:from-dark-body dark:to-[#1a1818] transition-colors duration-500 py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-2 font-inter relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6 mx-auto"
          />
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-white mb-4 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:to-gray-300">
              {t('app_showcase_title', 'Mobile Applications')}
            </span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
          >
            {t('app_showcase_description', 'Explore some of my latest mobile app projects with beautiful UI/UX design and powerful functionality')}
          </motion.p>
        </div>

        {/* Mockups Display Section */}
        <div className="relative">
          {/* Phone Frame Carousel */}
          <div className="flex justify-center items-center relative">
            {/* Navigation Buttons */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute left-0 md:left-10 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg text-pink-600 dark:text-white opacity-80 hover:opacity-100"
              onClick={prevMockup}
            >
              <HiOutlineChevronLeft size={24} />
            </motion.button>
            
            {/* Phone Mockups */}
            <div className="flex justify-center items-center h-[500px] md:h-[600px] w-full">
              {mockupImages.map((mockup, index) => (
                <motion.div
                  key={mockup.id}
                  className={`absolute transition-all duration-500 ${getPositionClass(index, currentMockup, mockupImages.length)}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: index === currentMockup ? 1 : 0.7,
                    y: 0,
                    scale: index === currentMockup ? 1 : 0.8,
                    zIndex: index === currentMockup ? 20 : 10
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    {/* Phone image */}
                    <img
                      src={mockup.src}
                      alt={mockup.alt}
                      className="h-[450px] md:h-[550px] object-contain drop-shadow-2xl"
                    />
                    
                    {/* Info card for the active mockup */}
                    {index === currentMockup && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#1a1a1a] 
                                  rounded-xl p-4 shadow-xl dark:shadow-gray-900/30 w-[250px] md:w-[300px]"
                      >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {mockup.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                          {mockup.description}
                        </p>
                        <a
                          href={mockup.link}
                          className="inline-flex items-center text-pink-600 dark:text-pink-400 hover:underline text-sm font-medium"
                        >
                          {t('view_details')} <FiExternalLink className="ml-1" />
                        </a>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-0 md:right-10 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg text-pink-600 dark:text-white opacity-80 hover:opacity-100"
              onClick={nextMockup}
            >
              <HiOutlineChevronRight size={24} />
            </motion.button>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center mt-12">
            {mockupImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentMockup(idx)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  idx === currentMockup 
                    ? "bg-pink-600 dark:bg-white" 
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to position the mockups
function getPositionClass(index, currentIndex, totalItems) {
  if (index === currentIndex) return "center-item";
  
  // Calculate the position based on the difference between the current index and this item's index
  const diff = ((index - currentIndex + totalItems) % totalItems);
  
  if (diff === 1 || diff === totalItems - 1) {
    return diff === 1 ? "ml-[200px] md:ml-[300px] opacity-60" : "mr-[200px] md:mr-[300px] opacity-60";
  }
  
  return "opacity-0 hidden";
}

export default AppHero;