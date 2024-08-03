import React, { useEffect } from 'react';
import { FaLaptopCode, FaPaintBrush } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs';
import { CgBrowser } from "react-icons/cg";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { TbRainbow } from "react-icons/tb";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const PricingCard = ({ icon: Icon, title, pricingType, price, description, features, buttonLabel }) => (
  <div className="bg-light-body dark:bg-[#1B1B1A] p-6 rounded-lg w-full md:w-2/5 mx-4 mb-6 border dark:border-gray-700 dark:border-solid font-inter" data-aos="fade-up">
    <div className="flex items-center mb-4">
      <div className='flex justify-between items-center gap-20'>
        <div className='flex items-center justify-between'>
          <Icon className="text-2xl text-pink-600 dark:text-gray-200 mr-4" />
          <h3 className="text-lg dark:text-slate-50 font-semibold text-light-text">{title}</h3>
        </div>
        <p className="text-[12px] w-[80px] text-pink-600 bg-white dark:text-slate-50 flex dark:bg-[#30302f] p-1 rounded">{pricingType}</p>
      </div>
    </div>
    <div className="text-2xl text-light-text mb-2 dark:text-gray-200">{price}</div>
    <p className="mb-4 text-light-text dark:text-gray-300">{description}</p>
    <hr className='dark:border-gray-700 dark:border-solid mb-4' />
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2 text-light-text dark:text-gray-200">
          <BsCheck className="text-pink-600 dark:text-gray-200 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <hr className='dark:border-gray-700 dark:border-solid mb-4' />
    <Link to="/contact" className="flex items-center justify-center w-full bg-pink-600 dark:bg-dark-body dark:border dark:border-gray-700 dark:border-solid text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300">
      {buttonLabel}
    </Link>
  </div>
);

function Pricing() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white dot-pattern dark:bg-dark-body transition-colors py-10 px-4">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="flex flex-wrap justify-center">
          <PricingCard
            icon={CgBrowser}
            title={t('pricing_web_dev_title')}
            pricingType={t('pricing_flat_rate')}
            price={t('pricing_web_dev_price')}
            description={t('pricing_web_dev_desc')}
            features={[
              t('pricing_feature_custom_design'),
              t('pricing_feature_responsive'),
              t('pricing_feature_seo'),
              t('pricing_feature_fast_load'),
            ]}
            buttonLabel={t('pricing_button_share_vision')}
          />
          <PricingCard
            icon={VscLightbulbSparkle}
            title={t('pricing_product_design_title')}
            pricingType={t('pricing_subscription')}
            price={t('pricing_product_design_price')}
            description={t('pricing_product_design_desc')}
            features={[
              t('pricing_feature_ux_ui'),
              t('pricing_feature_prototype'),
              t('pricing_feature_user_testing'),
              t('pricing_feature_iteration'),
            ]}
            buttonLabel={t('pricing_button_work_together')}
          />
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row bg-light-body dark:bg-[#1B1B1A] px-6 py-6 rounded-lg w-full mt-6 border dark:border-gray-800 dark:border-solid font-inter" data-aos="fade-up">
          <div className='flex gap-2 items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <TbRainbow size={20} className='text-pink-600 dark:text-white' />
                <h3 className="text-lg font-semibold text-light-text dark:text-gray-200">{t('pricing_custom_title')}</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">{t('pricing_custom_desc')}</p>
            </div>
          </div>
          <Link to="/contact" className='bg-pink-600 dark:border flex w-full items-center justify-center md:w-1/6 dark:border-gray-700 dark:border-solid dark:bg-dark-body text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300' data-aos="fade-up" data-aos-delay="200">
            {t('pricing_custom_button')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
