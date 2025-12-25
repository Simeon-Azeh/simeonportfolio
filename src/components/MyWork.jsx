import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowForward, IoArrowBack } from 'react-icons/io5';
import work1 from '../../public/images/work1.png';
import work2 from '../../public/images/work2.png';
import work3 from '../../public/images/work3.png';
import work4 from '../../public/images/work4.png';
import work5 from '../../public/images/work5.png';
import work6 from '../../public/images/work6.png';
import work7 from '../../public/images/work7.png';
import work8 from '../../public/images/work8.png';
import work9 from '../../public/images/work9.png';
import work10 from '../../public/images/work10.png';
import work11 from '../../public/images/work11.png';
import { useTranslation } from 'react-i18next';

const works = [
  { image: work1, title: "Project 1" },
  { image: work2, title: "Project 2" },
  { image: work3, title: "Project 3" },
  { image: work4, title: "Project 4" },
  { image: work5, title: "Project 5" },
  { image: work6, title: "Project 6" },
  { image: work7, title: "Project 7" },
  { image: work8, title: "Project 8" },
  { image: work9, title: "Project 9" },
  { image: work10, title: "Project 10" },
  { image: work11, title: "Project 11" }
];

const MyWork = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % works.length);
      }, 5000); // Changes slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-light-body dark:bg-[#09090b] transition-colors duration-500 font-inter relative overflow-hidden py-16"
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

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full lg:w-2/5"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 rounded-full mb-6"
            />

            <motion.h2
              className="text-4xl md:text-5xl font-bold font-montserrat-alt mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-slate-700 dark:from-violet-400 dark:to-slate-200">
                {t('MyWork')}
              </span>
            </motion.h2>

            <motion.p
              className="text-lg text-slate-600 dark:text-slate-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t('my_work_description')}
            </motion.p>

            <Link to="/portfolio">
              <motion.button
                className="group px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 
                         dark:from-violet-500 dark:to-purple-500 text-white rounded-xl font-medium 
                         shadow-lg shadow-violet-500/25 dark:shadow-violet-500/20
                         hover:shadow-xl hover:shadow-violet-500/30 dark:hover:shadow-violet-500/25
                         transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('ViewMore')}
                  <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-rose-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Content - Slider */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 w-full lg:w-3/5"
          >
            <div
              className="relative h-[400px] md:h-[500px] group rounded-2xl overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src={works[currentIndex].image}
                      alt={works[currentIndex].title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                  </div>
                </motion.div>
              </AnimatePresence>



              {/* Navigation Controls */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-30">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setDirection(-1);
                    setCurrentIndex((prev) => (prev - 1 + works.length) % works.length);
                  }}
                  className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white 
               hover:bg-black/30 transition-colors transform -translate-x-2
               shadow-lg border border-white/10 opacity-0 group-hover:opacity-100"
                >
                  <IoArrowBack size={24} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setDirection(1);
                    setCurrentIndex((prev) => (prev + 1) % works.length);
                  }}
                  className="p-3 rounded-full bg-black/20 backdrop-blur-md text-white 
               hover:bg-black/30 transition-colors transform translate-x-2
               shadow-lg border border-white/10 opacity-0 group-hover:opacity-100"
                >
                  <IoArrowForward size={24} />
                </motion.button>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-3 z-20">
                {works.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentIndex ? 1 : -1);
                      setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-violet-600 dark:bg-violet-400 w-4'
                        : 'bg-slate-400/50 dark:bg-slate-600/50 hover:bg-violet-500/50 dark:hover:bg-violet-400/50'
                      }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MyWork;