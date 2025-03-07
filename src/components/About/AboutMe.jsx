import React, { useEffect } from 'react';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const images = [
  '/images/about1.jpg',
  '/images/about2.jpg',
  '/images/about3.jpg',
  '/images/about4.jpg',
  '/images/about5.jpg',
  '/images/about6.jpg'
];

function AboutMe() {
  const { t } = useTranslation();
  const duplicatedImages = [...images, ...images]; // Duplicate images for seamless scrolling

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      AOS.refresh(); // Refresh AOS on scroll
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-white  dark:bg-dark-body transition-colors py-10 px-4 md:px-0 overflow-hidden">
      <div className="w-full md:w-4/5 mx-auto flex flex-col md:flex-row items-center">
        <div className="relative w-full md:w-1/2 flex flex-col items-center h-96 overflow-hidden" data-aos="fade-right">
          <div className="marquee-container">
            <div className="marquee">
              {/* Create two rows of images */}
              {Array.from({ length: 2 }).map((_, rowIndex) => (
                <div key={rowIndex} className="marquee-row">
                  {duplicatedImages.map((image, index) => (
                    <div key={index} className="marquee-item">
                      <img
                        src={image}
                        alt={`Scrolling ${index}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 mt-6 md:mt-0 md:ml-8 font-inter px-1 md:px-0" data-aos="fade-left">
          <h2 className="text-2xl md:text-4xl font-medium mb-2 text-light-text dark:text-gray-200">{t('about_me')}</h2>
          <p className="mt-4 text-light-text dark:text-slate-300 text-justify">
            {t('about_me_description')}
          </p>
          <div className="mt-6 flex space-x-4" data-aos="fade-up">
            <a href="https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.linkedin.com/in/simeonazeh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com/Simeon-Azeh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
      <p className='text-[15px] dark:text-slate-300 text-light-text mt-4 font-inter w-full md:w-4/5 mx-auto text-justify md:px-0' data-aos="fade-up">
        {t('about_me_note')}
      </p>
    </div>
  );
}

export default AboutMe;
