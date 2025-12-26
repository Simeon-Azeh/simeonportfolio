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
      className="py-16 bg-light-body dark:bg-dark-body transition-colors duration-500 ease-smooth font-inter relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-72 h-72 bg-violet-500/5 dark:bg-violet-400/5 rounded-full blur-3xl"
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
            className="text-3xl md:text-4xl font-bold font-montserrat-alt mb-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-slate-700 dark:from-violet-400 dark:to-slate-200">
              {t('why_me_title')}
            </span>
          </motion.h2>

          {/* Introduction - Left aligned */}
          <motion.p
            className="text-base text-slate-600 dark:text-slate-400 text-left mb-12"
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
                  className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 
                           dark:from-violet-400/10 dark:to-purple-400/10 backdrop-blur-sm
                           border border-violet-500/20 dark:border-violet-400/20"
                >
                  <BsStars className="text-violet-600 dark:text-violet-400 text-xl" />
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex-1 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm
                           p-4 rounded-xl border border-slate-200/50 dark:border-zinc-700/50
                           group-hover:border-violet-500/30 dark:group-hover:border-violet-400/30
                           transition-all duration-300"
                >
                  <p className="text-slate-700 dark:text-slate-300 text-left">
                    {t(point.text)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Conclusion - Left aligned */}
          <motion.p
            className="text-base text-slate-600 dark:text-slate-400 text-left mt-12"
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