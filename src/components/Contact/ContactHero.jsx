import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { PiChatsFill, PiPaperPlaneTiltFill } from "react-icons/pi";
import { RiCustomerService2Fill, RiCalendarScheduleLine, RiTimerFlashFill } from "react-icons/ri";
import { IoSparklesOutline } from "react-icons/io5";
import { FiArrowDown } from "react-icons/fi";
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

function ContactHero() {
  const { t } = useTranslation();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const features = [
    {
      icon: <RiCustomerService2Fill className="text-xl" />,
      text: t('support_247', '24/7 Support'),
      color: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
      delay: 300
    },
    {
      icon: <IoSparklesOutline className="text-xl" />,
      text: t('quick_changes', 'Quick Change Resolutions'),
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      delay: 400
    },
    {
      icon: <RiCalendarScheduleLine className="text-xl" />,
      text: t('flexible_schedules', 'Flexible Schedules'),
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
      delay: 500
    },
    {
      icon: <RiTimerFlashFill className="text-xl" />,
      text: t('fast_response', 'Fast Response Time'),
      color: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      delay: 600
    }
  ];

  return (
    <div className="bg-light-body dark:bg-dark-body font-inter relative overflow-hidden pt-16 pb-24">
      {/* Background decorations */}
      <div className="absolute inset-0 dark:opacity-20 opacity-5">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-pink-200 dark:bg-pink-900 blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl opacity-20"></div>
      </div>
      
      <div className="absolute inset-0 dark:opacity-10 opacity-5">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-pink-100 dark:bg-white/20 text-pink-600 dark:text-white mx-auto mb-2">
              <PiChatsFill className="text-3xl" />
            </div>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-pink-50 dark:bg-white/20 text-pink-600 dark:text-white rounded-full">
              {t('lets_connect')}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-light-text dark:text-white mb-4 leading-tight"
          >
            {t('contact_title')}
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl"
          >
            {t('contact_description')}
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full max-w-3xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={feature.delay}
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-800 rounded-xl group hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`w-10 h-10 rounded-full ${feature.color} flex items-center justify-center mr-4 shrink-0`}>
                    {feature.icon}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.a
            href="#contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-col items-center text-gray-500 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
          >
            <span className="text-sm mb-2">{t('scroll_to_form')}</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FiArrowDown className="text-xl" />
            </motion.div>
          </motion.a>
        </div>
      </div>
      
      {/* Contact CTA Banner */}
      <div className="max-w-5xl mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 shadow-xl"
        >
          <div className="absolute inset-0 opacity-20">
            <svg className="absolute right-0 top-0 h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
              <path fill="white" d="M400,985Q335,970,277.5,934.5Q220,899,197.5,841.5Q175,784,130.5,738.5Q86,693,88.5,627.5Q91,562,97,500Q103,438,125.5,382.5Q148,327,195,286.5Q242,246,274,196.5Q306,147,353,101.5Q400,56,458.5,83.5Q517,111,562,160.5Q607,210,649.5,260Q692,310,702.5,372.5Q713,435,734.5,500Q756,565,744,631Q732,697,708,759Q684,821,635.5,871Q587,921,521,961.5Q455,1002,400,985Z" />
            </svg>
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                {t('ready_to_start', 'Ready to Start Your Project?')}
              </h3>
              <p className="text-white/80 md:max-w-md">
                {t('project_pitch', "Let's discuss your ideas and bring them to life with creative solutions tailored to your needs.")}
              </p>
            </div>
            
            <motion.a
              href="#contact-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <PiPaperPlaneTiltFill /> {t('contact_me', 'Contact Me')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ContactHero;