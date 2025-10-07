import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function AboutHero() {
  const { t } = useTranslation();
  const roles = [
    t('frontend_engineer'), 
    t('brand_manager'), 
    t('graphic_designer'), 
    t('web_developer'), 
    t('ui_ux_designer')
  ];
  
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentRole((prevRole) => {
          const currentIndex = roles.indexOf(prevRole);
          return roles[(currentIndex + 1) % roles.length];
        });
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [roles]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='bg-light-body dark:bg-dark-body transition-colors py-20 md:py-32 relative overflow-hidden'>
      {/* Decorative Background Elements */}
      <motion.div 
        className="absolute top-20 right-10 w-72 h-72 bg-pink-500/5 dark:bg-pink-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className='w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          {/* Left Side - Text Content */}
          <div className='space-y-6' data-aos="fade-right">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className='inline-flex items-center gap-2 bg-pink-100 dark:bg-pink-900/20 px-4 py-2 rounded-full mb-6'>
                <span className='w-2 h-2 bg-pink-600 dark:bg-pink-400 rounded-full animate-pulse'></span>
                <span className='text-pink-600 dark:text-pink-400 font-medium text-sm'>
                  {t('about_me', 'About Me')}
                </span>
              </div>

              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold dark:text-slate-50 text-light-text mb-6 font-montserrat-alt leading-tight'>
                {t('hello_im', "Hello, I'm")} <br />
                <span className='bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent'>
                  Simeon Azeh
                </span>
              </h1>

              <div className='flex flex-col gap-3'>
                <p className='text-xl md:text-2xl font-medium dark:text-slate-200 text-gray-700 font-inter'>
                  {t('i_am_a', "I'm a")}{' '}
                </p>
                <div className='h-20 md:h-24 flex items-center'>
                  <span className={`text-3xl md:text-4xl lg:text-5xl font-bold transition-all duration-500 dark:text-slate-300 text-pink-600 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    {currentRole}
                  </span>
                </div>
              </div>

              <p className='text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed font-inter max-w-xl'>
                {t('about_intro', 'Passionate about creating beautiful, functional digital experiences. I combine technical expertise with creative vision to bring ideas to life.')}
              </p>

              {/* Stats */}
              <div className='grid grid-cols-3 gap-6 pt-8'>
                <div>
                  <h3 className='text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 font-montserrat-alt'>5+</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mt-1 font-inter'>{t('years_experience', 'Years Experience')}</p>
                </div>
                <div>
                  <h3 className='text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 font-montserrat-alt'>50+</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mt-1 font-inter'>{t('projects_completed', 'Projects Completed')}</p>
                </div>
                <div>
                  <h3 className='text-3xl md:text-4xl font-bold text-pink-600 dark:text-pink-400 font-montserrat-alt'>30+</h3>
                  <p className='text-sm text-gray-600 dark:text-gray-400 mt-1 font-inter'>{t('happy_clients', 'Happy Clients')}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Image */}
          <div className='relative' data-aos="fade-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='relative'
            >
              {/* Decorative Frame */}
              <div className='absolute -inset-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur-2xl opacity-20 dark:opacity-30'></div>
              
              {/* Image Container */}
              <div className='relative bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-2 border-2 border-pink-200 dark:border-pink-800'>
                <div className='relative rounded-xl overflow-hidden aspect-square md:aspect-[4/5]'>
                  <img 
                    src='/images/about4.jpg' // Replace with your image path
                    alt='Simeon Azeh' 
                    className='w-full h-full object-cover object-center'
                  />
                  
                  {/* Overlay Gradient */}
                  <div className='absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent'></div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                className='absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-2xl border border-gray-200 dark:border-gray-700'
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center'>
                    <span className='text-white text-xl font-bold'>✓</span>
                  </div>
                  <div>
                    <p className='text-xs text-gray-500 dark:text-gray-400 font-inter'>{t('available_for', 'Available for')}</p>
                    <p className='text-sm font-bold text-gray-800 dark:text-white font-montserrat-alt'>{t('new_projects', 'New Projects')}</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Dots */}
              <div className='absolute -top-4 -left-4 w-20 h-20 grid grid-cols-4 gap-2 opacity-30'>
                {[...Array(16)].map((_, i) => (
                  <div key={i} className='w-1.5 h-1.5 bg-pink-600 dark:bg-pink-400 rounded-full'></div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutHero;