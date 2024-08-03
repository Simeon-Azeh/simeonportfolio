import React, { useEffect } from 'react';
import logo1 from '../../public/images/sidec.png'; // Replace with your logo paths
import logo2 from '../../public/images/afiacare.svg'; // Replace with your logo paths
import logo3 from '../../public/images/alu.png'; // Replace with your logo paths
import logo4 from '../../public/images/urega.png'; // Replace with your logo paths
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
const TrustedBy = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const { t } = useTranslation();

  return (
    <div className="bg-light-body dark:bg-dark-body transition-colors font-inter">
      <div className="w-full md:w-4/5 mx-auto py-10 pb-0 px-6 md:px-0">
        <h2 className="text-[16px] font-normal text-slate-500 dark:text-gray-300" data-aos="fade-up">
        {t('TrustedBy')}
        </h2>
        <div className="flex items-center justify-start space-x-6">
          <div data-aos="fade-up" data-aos-delay="200">
            <div className='w-10'>
              <img src={logo1} alt="Logo 1" className="w-full h-auto filter dark:grayscale" />
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="400">
            <div className='w-24'>
              <img src={logo2} alt="Logo 2" className="w-full h-auto filter dark:grayscale" />
            </div>
          </div>
          <div data-aos="fade-up" data-aos-delay="600">
            <div className='w-20'>
              <img src={logo3} alt="Logo 3" className="w-full h-auto filter dark:grayscale" />
            </div>
          </div>
          <div className='hidden' data-aos="fade-up" data-aos-delay="800">
            <div className='w-24'>
              <img src={logo4} alt="Logo 4" className="w-full h-auto filter grayscale" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
