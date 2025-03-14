import React from 'react';
import { motion } from 'framer-motion';
import { CgBrowser } from 'react-icons/cg';
import { VscLightbulbSparkle, VscSparkleFilled } from 'react-icons/vsc';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { HiPaintBrush } from 'react-icons/hi2';
import { MdOutlineBrandingWatermark } from 'react-icons/md';
import { FaMobileAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const services = [
  { 
    icon: CgBrowser, 
    title: 'website_design',
    gradient: 'from-pink-600 to-light-text'
  },
  { 
    icon: FaMobileAlt,
    title: 'mobile_development',
     gradient: 'from-pink-600 to-light-text'
  },
  { 
    icon: HiPaintBrush, 
    title: 'graphic_design',
     gradient: 'from-pink-600 to-light-text'
  },
  { 
    icon: VscSparkleFilled, 
    title: 'product_design',
     gradient: 'from-pink-600 to-light-text'
  },
  { 
    icon: VscLightbulbSparkle, 
    title: 'illustration_design',
     gradient: 'from-pink-600 to-light-text'
  },
  { 
    icon: AiOutlineVideoCameraAdd, 
    title: 'video_photography',
     gradient: 'from-pink-600 to-light-text'
  },
  { 
    icon: MdOutlineBrandingWatermark, 
    title: 'branding',
     gradient: 'from-pink-600 to-light-text'
  }
];

const Services = () => {
  const { t } = useTranslation();

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

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        {/* Remove the mx-auto from the div to allow it to align with the grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16 text-left"
        >
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6 mx-0"
          />

          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:to-gray-300">
              {t('services_title')}
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-base text-gray-600 dark:text-gray-400 mb-4 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('services_intro')}
          </motion.p>

          <motion.p 
            className="text-base text-gray-600 dark:text-gray-400 text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t('services_description')}
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} t={t} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

const ServiceCard = ({ service, index, t }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 + 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div className={`
        absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 
        group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-300
      `} />
      
      <div className={`
        relative p-6 md:p-8 rounded-2xl bg-white dark:bg-[#1a1a1a]
        border border-gray-200 dark:border-gray-700/50
        group-hover:border-transparent dark:group-hover:border-transparent
        transition-all duration-300 backdrop-blur-sm
        hover:shadow-xl hover:shadow-pink-600/10 dark:hover:shadow-white/5
      `}>
        <div className="mb-4">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`
              w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} 
              flex items-center justify-center text-white
            `}
          >
            <service.icon size={24} />
          </motion.div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-left">
          {t(`services_${service.title}`)}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-left">
          {t(`services_${service.title}_description`)}
        </p>

        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r ${service.gradient}`}
        />
      </div>
    </motion.div>
  );
};

export default Services;