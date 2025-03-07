import React, { useState, useEffect } from 'react';
import HeroImg from '../../public/images/HeroImg.png';
import { MdWavingHand } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const roles = ["Frontend Engineer", "Brand Manager", "Graphic Designer", "Web Developer"];

function Hero() {
  const { t } = useTranslation();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing effect logic
  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        
        // When done typing, wait longer and then start deleting
        if (displayedText === currentRole) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        
        // When done deleting, move to next role
        if (displayedText === '') {
          setIsDeleting(false);
          setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? typingSpeed / 2 : displayedText === roles[roleIndex] ? 1000 : typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex, typingSpeed]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[90vh] flex items-center bg-gradient-to-b from-light-body to-[#F9FEFF] dark:from-dark-body dark:to-[#1a1818] transition-colors duration-500 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Content Container */}
      <div className="w-full md:w-4/5 mx-auto px-6 md:px-2 py-12 font-inter relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Side - Text Content */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 text-left space-y-6 md:pr-4"
          >
            <div className="flex items-center gap-3">
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
                className="px-5 py-2 bg-pink-100 dark:bg-slate-800 rounded-full text-pink-600 dark:text-slate-300 font-medium inline-flex items-center"
              >
                {t('hello')}
                <motion.span 
                  animate={{ rotate: [0, 20, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                  className="text-2xl ml-2"
                >
                  <MdWavingHand />
                </motion.span>
              </motion.span>
            </div>

            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-white leading-tight"
            >
              {t('building_products')}{' '}
              <span className="text-pink-600 dark:text-slate-300">{t('brands')}</span>{' '}
              {t('and')}{' '}
              <span className="text-pink-600 dark:text-slate-300">{t('experiences')}</span>
            </motion.h1>

            <div className="h-16 flex items-center">
              <div className="relative">
                <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 flex">
                  <span>{displayedText}</span>
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-[3px] h-[24px] md:h-[28px] bg-pink-600 dark:bg-gray-400 ml-1"
                  />
                </div>
                <motion.div 
                  className="absolute -bottom-1 left-0 h-[2px] bg-pink-600/30 dark:bg-gray-400/30"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                />
              </div>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 pt-4"
            >
              <Link to="/services">
                <motion.button 
                  className="group px-8 py-3 bg-pink-600 dark:bg-white text-white dark:text-[#414760] rounded-lg font-medium 
                           flex items-center gap-2
                           shadow-lg shadow-pink-600/20 dark:shadow-white/10
                           transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    y: -2,
                    boxShadow: "0 20px 25px -5px rgba(236, 72, 153, 0.3)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('explore')} 
                  <motion.span 
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <IoMdArrowForward className="text-lg" />
                  </motion.span>
                </motion.button>
              </Link>
              
              <Link to="/contact">
                <motion.button 
                  className="group px-8 py-3 border-2 border-pink-600 dark:border-slate-300 text-pink-600 dark:text-slate-300 
                           rounded-lg font-medium transition-all duration-300
                           hover:bg-pink-600/5 dark:hover:bg-slate-300/5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('contact')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Right side remains unchanged */}
          <motion.div 
            className="flex-1 relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Rest of the right side code */}
            <div className="relative md:ml-auto w-[280px] h-[280px] md:w-[380px] md:h-[380px] max-w-full">
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-32 h-32 bg-pink-200 dark:bg-slate-700 rounded-full opacity-50"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 5 }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-200 dark:bg-slate-600 rounded-full opacity-50"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 4, delay: 1 }}
              />
              
              {/* Image container */}
              <motion.div 
                className="w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800  relative z-10"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <img 
                  src={HeroImg} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50"></div>
              </motion.div>
              
              {/* Animated dots decoration */}
              <div className="absolute -right-8 top-1/4 flex flex-col gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div 
                    key={i}
                    className="w-2 h-2 bg-pink-500 dark:bg-slate-400 rounded-full"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      delay: i * 0.2,
                      ease: "easeInOut" 
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default Hero;