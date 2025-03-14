import React from 'react';
import { motion } from 'framer-motion';
import { BsStars } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

const WhyMe = () => {
  const { t } = useTranslation();

  const points = [
    { text: 'why_me_point_1', delay: 0.2 },
    { text: 'why_me_point_2', delay: 0.4 },
    { text: 'why_me_point_3', delay: 0.6 }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-light-body dark:bg-dark-body transition-colors duration-500 font-inter relative overflow-hidden"
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 dark:opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-pink-600/5 dark:bg-white/5 rounded-full blur-3xl"
            initial={{ x: -100, y: -100 }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {/* Title with Gradient - Left aligned */}
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:to-gray-300">
              {t('why_me_title')}
            </span>
          </motion.h2>

          {/* Introduction - Left aligned */}
          <motion.p 
            className="text-base text-gray-600 dark:text-gray-400 text-left mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {t('why_me_intro')}
          </motion.p>

          {/* Points List */}
          <div className="space-y-6">
            {points.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: point.delay }}
                className="flex items-start gap-4 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 
                           dark:from-white/5 dark:to-white/10 backdrop-blur-sm
                           border border-pink-500/20 dark:border-white/10"
                >
                  <BsStars className="text-pink-600 dark:text-white text-xl" />
                </motion.div>
                
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex-1 bg-white/50 dark:bg-[#1a1a1a] backdrop-blur-sm
                           p-4 rounded-xl border border-gray-200/50 dark:border-gray-700/50
                           group-hover:border-pink-500/30 dark:group-hover:border-white/20
                           transition-all duration-300"
                >
                  <p className="text-gray-700 dark:text-gray-300 text-left">
                    {t(point.text)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Conclusion - Left aligned */}
          <motion.p 
            className="text-base text-gray-600 dark:text-gray-400 text-left mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            {t('why_me_conclusion')}
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyMe;