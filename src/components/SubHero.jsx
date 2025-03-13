import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CalendarCheck2 } from 'lucide-react';

function SubHero() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="bg-light-body dark:bg-dark-body transition-colors font-inter relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/5 dark:to-gray-900/5" />

      <motion.div 
        className="w-full md:w-4/5 mx-auto pt-12 pb-8 px-6 md:px-0 relative z-10"
        variants={containerVariants}
      >
        <motion.h2 
          className="text-3xl md:text-5xl font-bold mb-4 dark:text-slate-50 text-light-text"
          variants={itemVariants}
        >
          {t('vision_execution')}
        </motion.h2>

        <motion.h2 
          className="text-xl md:text-3xl font-semibold dark:text-slate-300 text-pink-600 mb-6"
          variants={itemVariants}
        >
          {t('design_partner')}
        </motion.h2>

        <motion.p 
          className="text-lg leading-relaxed dark:text-slate-300 text-light-text max-w-2xl mb-8"
          variants={itemVariants}
        >
          {t('product_transformation')}
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-4 mb-8"
          variants={itemVariants}
        >
           <a href="https://calendar.app.google/PNDeZmc1AHQjAV9L8" target="_blank" rel="noopener noreferrer">
            <motion.button 
              className="group flex items-center gap-2 px-8 py-3 bg-pink-600 dark:bg-white text-white dark:text-[#414760] rounded-lg font-medium 
                       shadow-lg shadow-pink-600/20 dark:shadow-white/10
                       hover:transform hover:translate-y-[-2px] transition-all duration-300
                       hover:shadow-xl hover:shadow-pink-600/30 dark:hover:shadow-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
               <CalendarCheck2 />
              {t('schedule_call')}
              
            </motion.button>
          </a>

          <a href="https://preply.com/en/tutor/6173769" target="_blank" rel="noopener noreferrer">
            <motion.button 
              className="group px-8 py-3 bg-transparent text-[#414760] dark:text-white border border-pink-600/20 
                       dark:border-gray-800 rounded-lg font-medium hover:border-pink-600 dark:hover:border-white
                       hover:transform hover:translate-y-[-2px] transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              I teach on Preply
            </motion.button>
          </a>
        </motion.div>

        <motion.p 
          className="flex items-center gap-4 text-base dark:text-slate-300 text-[#6b7280]"
          variants={itemVariants}
        >
          <span>{t('drop_email')}</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <FaArrowRightLong />
          </motion.span>
          <span className="dark:text-white text-pink-600 hover:underline cursor-pointer">
            {t('email')}
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default SubHero;