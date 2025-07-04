import React from 'react';
import HeroImg from '../../public/images/HeroImg.png';
import { MdWavingHand } from "react-icons/md";
import { Link } from 'react-router-dom';
import { CloudDownload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCode, FiMonitor, FiSmartphone } from 'react-icons/fi';

// Skills are now referenced by translation keys
const skillKeys = [
  'skill_web_developer',
  'skill_mobile_developer',
  'skill_ui_ux_designer',
  'skill_brand_manager',
  'skill_graphic_designer',
  'skill_tech_tutor'
];

// Info boxes data
const infoBoxes = [
  {
    id: 'frontend',
    icon: <FiCode />,
    label: 'info_frontend_label',
    value: 'info_frontend_value',
    position: 'top-0 -right-12 md:-right-10',
    delay: 0.8,
  },
  {
    id: 'ui-design',
    icon: <FiMonitor />,
    label: 'info_ui_design_label',
    value: 'info_ui_design_value',
    position: 'top-1/3 -left-16 md:-left-12',
    delay: 1.0,
  },
  {
    id: 'mobile',
    icon: <FiSmartphone />,
    label: 'info_mobile_label',
    value: 'info_mobile_value',
    position: 'bottom-10 -right-14 md:-right-6',
    delay: 1.2,
  }
];

function Hero() {
  const { t } = useTranslation();

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
                className="px-5 py-2 bg-pink-100 dark:bg-[#1a1a1a] dark:border dark:border-gray-800 rounded-full text-pink-600 dark:text-slate-300 font-medium inline-flex items-center"
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

            {/* Translated skills tags */}
            <motion.div
              className="flex flex-wrap gap-2 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {skillKeys.map((skillKey, index) => (
                <motion.span
                  key={skillKey}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + (index * 0.1) }}
                  className="px-4 py-2 rounded-full bg-white dark:bg-[#1a1a1a] text-gray-700 dark:text-gray-300 
                                              border border-gray-200 border-solid dark:border-gray-800 text-sm font-medium shadow-sm"
                >
                  {t(skillKey)}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                onClick={() => window.open('/simeonazehPortfolioUpdated.pdf', '_blank')}
                className="group px-8 py-3 bg-pink-600 dark:bg-white text-white dark:text-[#414760] rounded-lg font-medium 
          flex items-center justify-center gap-2 w-full sm:w-auto
          shadow-lg shadow-pink-600/20 dark:shadow-none
          transition-all duration-300 dark:hover:bg-gray-50 hover:shadow-sm"
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                variants={{
                  light: {
                    boxShadow: "0 20px 25px -5px rgba(236, 72, 153, 0.03)"
                  },
                  dark: {
                    boxShadow: "none"
                  }
                }}
                animate={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                whileTap={{ scale: 0.98 }}
              >
                {t('download_cv')}
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <CloudDownload />
                </motion.span>
              </motion.button>

              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button
                  className="group px-8 py-3 border border-pink-600 border-solid dark:bg-[#1a1a1a] dark:border-gray-800 text-pink-600 dark:text-slate-300 
                                            rounded-lg font-medium transition-all duration-300 w-full
                                            hover:bg-pink-600/5 dark:hover:bg-gray-800/5"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t('contact')}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right side with animated image and info boxes */}
          <motion.div
            className="flex-1 relative"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
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
                className="w-full h-full rounded-2xl overflow-hidden border-4 border-white border-solid dark:border-gray-800 relative z-10"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <img
                  src={HeroImg}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />

                {/* Overlay gradient */}

              </motion.div>

              {/* Info boxes */}
              {infoBoxes.map((box) => (
                <motion.div
                  key={box.id}
                  className={`absolute z-20 ${box.position} flex items-center bg-white dark:bg-[#1a1a1a] 
                            rounded-lg p-3 shadow-lg dark:shadow-gray-900/30 border border-transparent
                            cursor-pointer`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: box.delay }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    y: -3
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Border light effect */}
                  <motion.div
                    className="absolute inset-x-0 -top-0.5 h-0.5 bg-gradient-to-r from-transparent via-pink-500 dark:via-white to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 -right-0.5 w-0.5 bg-gradient-to-b from-transparent via-pink-500 dark:via-white to-transparent"
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileHover={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                  <motion.div
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-transparent via-pink-500 dark:via-white to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                  <motion.div
                    className="absolute inset-y-0 -left-0.5 w-0.5 bg-gradient-to-b from-transparent via-pink-500 dark:via-white to-transparent"
                    initial={{ scaleY: 0, opacity: 0 }}
                    whileHover={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  />

                  {/* Content */}
                  <div className="bg-white dark:bg-[#1a1a1a] rounded-lg p-1.5 flex items-center gap-2 relative z-10">
                    <motion.div
                      className="text-pink-600 dark:text-white text-xl"
                      whileHover={{
                        rotate: [0, -10, 10, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      {box.icon}
                    </motion.div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-white">{t(box.label)}</p>
                      <motion.p
                        className="text-sm font-semibold text-gray-900 dark:text-white"
                        whileHover={{ color: "#ec4899" }}
                      >
                        {t(box.value)}
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              ))}

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