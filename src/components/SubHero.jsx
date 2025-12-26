import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CalendarCheck2, Sparkles, Zap } from 'lucide-react';

function SubHero() {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      className="bg-light-body dark:bg-dark-body transition-colors duration-500 ease-smooth font-inter relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-50/30 via-transparent to-transparent dark:from-violet-950/10 dark:via-transparent" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating orbs - subtle violet glow */}
        <motion.div
          className="absolute top-10 right-1/4 w-64 h-64 bg-violet-500/5 dark:bg-violet-500/5 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-1/4 w-48 h-48 bg-violet-500/5 dark:bg-violet-500/3 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <motion.div
        className="w-full md:w-4/5 mx-auto pt-16 pb-12 px-6 md:px-0 relative z-10"
        variants={containerVariants}
      >
        {/* Section indicator */}
        <motion.div
          className="flex items-center gap-2 mb-6"
          variants={itemVariants}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          </motion.div>
          <span className="text-sm font-medium text-violet-600 dark:text-violet-400 tracking-wide uppercase">
            {t('lets_collaborate', "Let's Collaborate")}
          </span>
        </motion.div>

        <motion.h2
          className="text-3xl md:text-5xl font-bold font-montserrat-alt mb-4 text-slate-800 dark:text-slate-50"
          variants={itemVariants}
        >
          {t('vision_execution')}
        </motion.h2>

        <motion.h2
          className="text-xl md:text-3xl font-semibold mb-6"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-rose-500 dark:from-violet-400 dark:via-purple-400 dark:to-rose-400 bg-clip-text text-transparent">
            {t('design_partner')}
          </span>
        </motion.h2>

        <motion.p
          className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 max-w-2xl mb-10"
          variants={itemVariants}
        >
          {t('product_transformation')}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-4 mb-10"
          variants={itemVariants}
        >
          <a href="https://calendar.app.google/PNDeZmc1AHQjAV9L8" target="_blank" rel="noopener noreferrer">
            <motion.button
              className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 
                       dark:from-violet-500 dark:to-purple-500 text-white rounded-xl font-medium 
                       shadow-lg shadow-violet-500/25 dark:shadow-violet-500/20
                       hover:shadow-xl hover:shadow-violet-500/30 dark:hover:shadow-violet-500/25
                       transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CalendarCheck2 className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{t('schedule_call')}</span>
            </motion.button>
          </a>

          <a href="https://preply.com/en/tutor/6173769" target="_blank" rel="noopener noreferrer">
            <motion.button
              className="group flex items-center gap-2 px-8 py-3.5 bg-transparent text-slate-700 dark:text-white 
                       border-2 border-violet-200 dark:border-zinc-700 rounded-xl font-medium 
                       hover:border-violet-500 dark:hover:border-violet-500
                       hover:bg-violet-50 dark:hover:bg-violet-500/10
                       transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-5 h-5 text-violet-600 dark:text-violet-400" />
              {t('i_teach_preply', 'I teach on Preply')}
            </motion.button>
          </a>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 text-base"
          variants={itemVariants}
        >
          <span className="text-slate-500 dark:text-slate-400">{t('drop_email')}</span>
          <motion.span
            className="text-violet-600 dark:text-violet-400"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <FaArrowRightLong />
          </motion.span>
          <motion.span
            className="bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent font-medium hover:underline cursor-pointer"
            whileHover={{ scale: 1.02 }}
          >
            {t('email')}
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SubHero;