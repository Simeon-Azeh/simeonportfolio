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
    color: 'from-pink-500 to-light-text'
  },
  {
    key: 'completed_projects',
    count: 15,
    icon: MdPlaylistAddCheckCircle,
   color: 'from-pink-500 to-light-text'
  },
  {
    key: 'hours_of_support',
    count: 3700,
    icon: RiCustomerService2Fill,
    color: 'from-pink-500 to-light-text'
  },
  {
    key: 'awards',
    count: 10,
    icon: FaAward,
     color: 'from-pink-500 to-light-text'
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
            decimal: '.'
          }).start();
        }
      });
    }
  }, [isVisible]);

  return (
    <motion.section
      id="facts-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-light-body dark:bg-dark-body transition-colors py-16 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 dark:opacity-10 font-inter"
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

      <div className="relative z-10 w-full md:w-4/5 mx-auto px-6 md:px-0 font-inter">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {facts.map((fact, index) => (
            <motion.div
              key={fact.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6  dark:shadow-none
                         border border-gray-100 dark:border-gray-700"
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${fact.color} 
                             flex items-center justify-center text-white`}
                >
                  <fact.icon size={24} />
                </motion.div>
                
                <div className="text-center">
                  <h3 
                    ref={el => countUpRefs.current[index] = el}
                    className="text-3xl md:text-4xl font-bold bg-clip-text text-pink-500
                               bg-gradient-to-r dark:from-white dark:to-gray-300"
                  >
                    0
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
                    {t(fact.key)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Facts;