import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsCheck } from 'react-icons/bs';
import { CgBrowser } from "react-icons/cg";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { FaMobileAlt } from "react-icons/fa";
import { TbRainbow } from "react-icons/tb";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const PricingCard = ({ icon: Icon, title, pricingType, price, description, features, buttonLabel, popular }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className={`bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl w-full md:w-[calc(33.333%-2rem)] 
                border border-gray-200 dark:border-gray-700/50 hover:shadow-xl 
                transition-all duration-300 relative ${popular ? 'ring-2 ring-pink-600 dark:ring-pink-500 font-inter' : ''}`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-600 to-light-text 
                      text-white px-4 py-1 rounded-full text-sm font-medium">
        Most Popular
      </div>
    )}

    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-light-text 
                     flex items-center justify-center text-white`}
        >
          <Icon size={24} />
        </motion.div>
        <h3 className="text-xl font-semibold text-light-text dark:text-white font-inter">{title}</h3>
      </div>
    </div>

    <div className="mb-6 font-inter">
      <div className="text-sm text-gray-500 dark:text-white/70 mb-1 font-inter">Starting from</div>
      <div className="text-3xl font-bold text-light-text dark:text-white mb-2 font-inter">{price}</div>
      <p className="text-gray-600 dark:text-white/80 font-inter">{description}</p>
    </div>

    <ul className="space-y-4 mb-8 font-inter">
      {features.map((feature, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * index }}
          className="flex items-center gap-3"
        >
          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-600/20 
                         flex items-center justify-center">
            <BsCheck className="text-pink-600 dark:text-white" />
          </div>
          <span className="text-gray-700 dark:text-white/90">{feature}</span>
        </motion.li>
      ))}
    </ul>

    <Link to="/request-booking" className="block">
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full px-6 py-3 text-white rounded-lg font-medium transition-all duration-300
                   ${popular ? 'bg-gradient-to-r from-pink-600 to-light-text' : 'bg-gray-900 dark:bg-white text-white dark:text-[#414760]'}
                   hover:shadow-lg hover:shadow-pink-600/20`}
      >
        {buttonLabel}
      </motion.button>
    </Link>
  </motion.div>
);

function Pricing() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 bg-light-body dark:bg-dark-body relative overflow-hidden"
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
        <div className="mb-12 flex flex-col items-start">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6"
          />
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r font-inter from-pink-600 to-light-text dark:from-white dark:to-white">
              {t('pricing_title')}
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-white/80 max-w-2xl font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('pricing_description')}
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-start gap-8 mb-12">
          <PricingCard
            icon={CgBrowser}
            title={t('pricing_web_dev_title')}
            price="XAF 99,000"
            description={t('pricing_web_dev_desc')}
            features={[
              t('pricing_feature_custom_design'),
              t('pricing_feature_responsive'),
              t('pricing_feature_seo'),
              t('pricing_feature_fast_load'),
            ]}
            buttonLabel={t('pricing_button_get_started')}
            popular={true}
          />
          <PricingCard
            icon={VscLightbulbSparkle}
            title={t('pricing_product_design_title')}
            price="XAF 120,000"
            description={t('pricing_product_design_desc')}
            features={[
              t('pricing_feature_ux_research'),
              t('pricing_feature_ui_design'),
              t('pricing_feature_prototype'),
              t('pricing_feature_testing'),
            ]}
            buttonLabel={t('pricing_button_get_started')}
           
          />
          <PricingCard
            icon={FaMobileAlt}
            title={t('pricing_mobile_dev_title')}
            price="XAF 199,000"
            description={t('pricing_mobile_dev_desc')}
            features={[
              t('pricing_feature_native_app'),
              t('pricing_feature_cross_platform'),
              t('pricing_feature_app_store'),
              t('pricing_feature_maintenance'),
            ]}
            buttonLabel={t('pricing_button_get_started')}
          />
        </div>

        <div className="flex items-center justify-between flex-col md:flex-row bg-white dark:bg-[#1B1B1A] px-6 py-6 rounded-lg w-full mt-6 border dark:border-gray-800 dark:border-solid font-inter" data-aos="fade-up">
          <div className='flex gap-2 items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <TbRainbow size={20} className='text-pink-600 dark:text-white' />
                <h3 className="text-lg font-semibold text-light-text dark:text-white">{t('pricing_custom_title')}</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-white/90">{t('pricing_custom_desc')}</p>
            </div>
          </div>
          <Link to="/request-booking" className='bg-pink-600  flex w-full items-center justify-center md:w-1/6 text-white dark:bg-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300 dark:text-light-text' data-aos="fade-up" data-aos-delay="200">
            {t('pricing_custom_button')}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default Pricing;