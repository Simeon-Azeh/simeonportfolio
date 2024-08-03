import React, { useEffect } from 'react';
import { CgBrowser } from 'react-icons/cg';
import { VscLightbulbSparkle, VscSparkleFilled } from 'react-icons/vsc';
import { AiOutlineVideoCameraAdd } from 'react-icons/ai';
import { HiPaintBrush } from 'react-icons/hi2';
import { MdOutlineBrandingWatermark } from 'react-icons/md';
import ServiceCard from './ServiceCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const services = [
  { icon: CgBrowser, title: 'website_design' },
  { icon: HiPaintBrush, title: 'graphic_design' },
  { icon: VscSparkleFilled, title: 'product_design' },
  { icon: VscLightbulbSparkle, title: 'illustration_design' },
  { icon: AiOutlineVideoCameraAdd, title: 'video_photography' },
  { icon: MdOutlineBrandingWatermark, title: 'branding' },
  // Add more services as needed
];

const Services = () => {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white dot-pattern dark:bg-dark-body transition-colors py-10 font-inter">
      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0">
        <h2 className="text-2xl md:text-4xl mb-2 dark:text-slate-50 text-light-text" data-aos="zoom-in">
          {t('services_title')}
        </h2>
        <p className='text-[15px] dark:text-slate-300 text-light-text my-4' data-aos="zoom-in" data-aos-delay="200">
          {t('services_intro')}
        </p>
        <p className='text-[15px] dark:text-slate-300 text-light-text mb-8' data-aos="zoom-in" data-aos-delay="400">
          {t('services_description')}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={t(`services_${service.title}`)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
