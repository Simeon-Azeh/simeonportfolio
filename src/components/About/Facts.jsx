import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CountUp } from 'countup.js';
import { FaRegSmile, FaAward } from 'react-icons/fa';
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { useTranslation } from 'react-i18next';

const facts = [
  {
    key: 'happy_clients',
    count: 12,
    icon: FaRegSmile,
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/10',
    shadowColor: 'shadow-violet-500/20'
  },
  {
    key: 'completed_projects',
    count: 15,
    icon: MdPlaylistAddCheckCircle,
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/10',
    shadowColor: 'shadow-violet-500/20'
  },
  {
    key: 'hours_of_support',
    count: 3925,
    icon: RiCustomerService2Fill,
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/10',
    shadowColor: 'shadow-violet-500/20'
  },
  {
    key: 'awards',
    count: 10,
    icon: FaAward,
    color: 'from-violet-500 to-purple-600',
    bgGlow: 'bg-violet-500/10',
    shadowColor: 'shadow-violet-500/20'
  }
];

const Facts = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const countUpRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.querySelector('#facts-section');
    if (element) observer.observe(element);
    return () => element && observer.unobserve(element);
  }, []);

  useEffect(() => {
    if (isVisible) {
      countUpRefs.current.forEach((ref, index) => {
        if (ref) {
          new CountUp(ref, facts[index].count, {
            duration: 2.5,
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            suffix: index === 2 ? '+' : '' // Add + to hours of support
          }).start();
        }
      });
    }
  }, [isVisible]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <motion.section
      id="facts-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 dark:bg-[#09090b] transition-colors py-20 relative overflow-hidden font-inter"
    >
      {/* Enhanced Background Pattern with Gradient Orbs */}
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

      {/* Animated gradient blobs */}
      <motion.div
        className="absolute top-10 -left-20 w-64 h-64 bg-violet-300/20 dark:bg-violet-900/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute -bottom-20 -right-20 w-72 h-72 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          y: [0, -20, 0],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="relative z-10 w-full md:w-4/5 mx-auto px-6 md:px-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "60px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-violet-600 dark:bg-violet-500 rounded-full mb-6 mx-auto"
          />
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 bg-clip-text text-transparent font-montserrat-alt">
            {t('achievements_title', 'My Achievements')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl mx-auto font-inter">
            {t('achievements_subtitle', 'Numbers that reflect my dedication and commitment to excellence')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {facts.map((fact, index) => (
            <motion.div
              key={fact.key}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, type: "spring", stiffness: 300 }
              }}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8
                         border border-slate-100 dark:border-zinc-700
                         hover:border-violet-200 dark:hover:border-violet-800
                         transition-all duration-300
                         hover:shadow-xl hover:shadow-violet-500/10 dark:hover:shadow-violet-500/5"
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
                }}
              />

              <div className="relative flex flex-col items-center space-y-4">
                {/* Icon with enhanced styling */}
                <motion.div
                  whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="relative"
                >
                  {/* Icon glow background */}
                  <div className={`absolute inset-0 ${fact.bgGlow} rounded-xl blur-lg scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${fact.color} 
                                 flex items-center justify-center text-white
                                 shadow-lg ${fact.shadowColor} group-hover:shadow-xl group-hover:${fact.shadowColor}
                                 transition-all duration-300`}
                  >
                    <fact.icon size={28} className="md:w-8 md:h-8" />
                  </div>
                </motion.div>

                <div className="text-center">
                  {/* Animated counter with gradient */}
                  <motion.h3
                    ref={el => countUpRefs.current[index] = el}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent
                               bg-gradient-to-r from-violet-600 to-purple-600
                               dark:from-violet-400 dark:to-purple-400
                               group-hover:from-violet-500 group-hover:to-purple-500
                               dark:group-hover:from-violet-300 dark:group-hover:to-purple-300
                               transition-all duration-300 font-montserrat-alt"
                  >
                    0
                  </motion.h3>

                  {/* Label with better spacing */}
                  <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mt-3
                               group-hover:text-slate-800 dark:group-hover:text-slate-300
                               transition-colors duration-300 font-medium font-inter">
                    {t(fact.key)}
                  </p>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-violet-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Optional: Add a call-to-action or testimonial below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 italic text-sm md:text-base font-inter">
            {t('facts_footnote', '"Success is not just about numbers, but the impact we create"')}
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Facts;