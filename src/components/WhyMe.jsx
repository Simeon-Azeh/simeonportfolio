import React, { useEffect } from 'react';
import { BsStars } from "react-icons/bs";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

function WhyMe() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='bg-light-body dark:bg-dark-body transition-colors font-inter overflow-hidden'>
      <div className='w-full md:w-4/5 mx-auto pt-6 px-6 md:px-0 pb-4'>
        <h2 className='text-2xl md:text-4xl mb-2 dark:text-slate-50 text-light-text' data-aos="fade-left">
          {t('why_me_title')}
        </h2>
        <p className='text-[15px] dark:text-slate-300 text-light-text text-justify' data-aos="fade-left">
          {t('why_me_intro')}
        </p>
        <div>
          <ul className='text-[15px] dark:text-slate-50 mt-4 text-[#6b7280] space-y-4 mb-4'>
            <li className='flex items-center gap-2' data-aos="fade-left" data-aos-delay="200">
              <span className='text-pink-600 dark:bg-[#1B1B1A] p-2 rounded border dark:border-gray-700 dark:border-solid dark:text-white'>
                <BsStars size={20} />
              </span>
              {t('why_me_point_1')}
            </li>
            <li className='flex items-center gap-2' data-aos="fade-left" data-aos-delay="400">
              <span className='text-pink-600 dark:bg-[#1B1B1A] p-2 rounded border dark:border-gray-700 dark:border-solid dark:text-white'>
                <BsStars />
              </span>
              {t('why_me_point_2')}
            </li>
            <li className='flex items-center gap-2' data-aos="fade-left" data-aos-delay="600">
              <span className='text-pink-600 dark:bg-[#1B1B1A] p-2 rounded border dark:border-gray-700 dark:border-solid dark:text-white'>
                <BsStars />
              </span>
              {t('why_me_point_3')}
            </li>
          </ul>
        </div>
        <p className='text-[15px] dark:text-slate-300 text-light-text pb-4' data-aos="fade-left" data-aos-delay="800">
          {t('why_me_conclusion')}
        </p>
      </div>
    </div>
  );
}

export default WhyMe;
