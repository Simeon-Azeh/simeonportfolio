import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin,
  FaFacebook, FaTwitter, FaInstagram
} from 'react-icons/fa';
import { GoCheckCircle, GoCopy } from 'react-icons/go';
import { RiMapPin4Line } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MoreWaysToContact = () => {
  const { t } = useTranslation();
  const [copiedText, setCopiedText] = useState('');

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(''), 2000); // Reset after 2 seconds
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const contactMethods = [
    {
      icon: <FaPhone />,
      label: t('phone', 'Phone'),
      value: '+250 798 654 693',
      action: 'copy',
      link: 'tel:+250798654693'
    },
    {
      icon: <FaEnvelope />,
      label: t('email', 'Email'),
      value: 'hello@simeonazeh.com',
      action: 'copy',
      link: 'mailto:hello@simeonazeh.com'
    },
    {
      icon: <FaMapMarkerAlt />,
      label: t('location', 'Location'),
      value: 'Bumbogo, Kigali, Rwanda',
      action: 'maps',
      link: 'https://www.google.com/maps/search/?api=1&query=Bumbogo,Kigali,Rwanda'
    }
  ];

  const socialLinks = [
    { icon: <FaGithub />, label: 'GitHub', url: 'https://github.com/Simeon-Azeh' },
    { icon: <FaLinkedin />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/simeonazeh' },
    { icon: <FaFacebook />, label: 'Facebook', url: 'https://www.facebook.com/kongnyuy.simeon.3' },
    { icon: <FaTwitter />, label: 'Twitter', url: 'https://twitter.com' },
    { icon: <FaInstagram />, label: 'Instagram', url: 'https://instagram.com' }
  ];

  return (
    <div className=" font-inter py-8">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-[#1B1B1A] rounded-2xl  dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              {t('other_ways', 'Other Ways to Connect')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {t('contact_options', 'Choose the most convenient way to reach me')}
            </p>
          </div>

          <div className="p-6">
            <ul className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.li
                  key={index}
                  data-aos="fade-up"
                  data-aos-delay={100 + (index * 100)}
                  whileHover={{ scale: 1.01 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-800 transition-all duration-300"
                >
                  <div className="flex items-center mb-3 sm:mb-0">
                    <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center mr-4 flex-shrink-0">
                      {method.icon}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">{method.label}</div>
                      <a
                        href={method.link}
                        className="text-gray-800 dark:text-white font-medium hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                      >
                        {method.value}
                      </a>
                    </div>
                  </div>

                  {method.action === 'copy' ? (
                    <motion.button
                      onClick={() => handleCopy(method.value)}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium ${copiedText === method.value
                          ? 'bg-green-100 dark:bg-[#1a1a1a]/30 text-green-700 dark:text-green-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:border-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                        } transition-colors`}
                    >
                      {copiedText === method.value ? (
                        <>
                          <GoCheckCircle className="mr-1.5" /> {t('copied', 'Copied!')}
                        </>
                      ) : (
                        <>
                          <GoCopy className="mr-1.5" /> {t('copy', 'Copy')}
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <motion.a
                      href={method.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center px-4 py-2 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 text-sm font-medium hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors"
                    >
                      <RiMapPin4Line className="mr-1.5" /> {t('open_maps', 'Open Maps')}
                    </motion.a>
                  )}
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                {t('social_media', 'Find me on social media')}
              </h4>
              <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="400">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gray-50 dark:bg-[#1a1a1a] dark:border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <span className="text-gray-500 dark:text-gray-400">{social.icon}</span>
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>{t('response_time', 'Average response time: 24 hours')}</p>
        </div>
      </div>
    </div>
  );
};

export default MoreWaysToContact;