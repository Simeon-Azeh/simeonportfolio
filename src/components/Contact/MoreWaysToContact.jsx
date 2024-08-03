import React, { useState, useEffect } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { GoCopy } from 'react-icons/go';
import { RiMapPin4Line } from 'react-icons/ri';
import AOS from 'aos';
import 'aos/dist/aos.css';

const MoreWaysToContact = () => {
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

  return (
    <div className="bg-white dark:bg-dark-body font-inter">
      <div className='font-inter px-4 py-4 border dark:border-gray-700 dark:border-solid rounded' data-aos="fade-up" data-aos-offset="100">
        <ul className="space-y-4">
          <li className="flex items-center justify-between border dark:border-gray-700 dark:border-solid p-2 rounded" data-aos="fade-up" data-aos-delay="100">
            <div className='flex items-center'>
              <FaPhone className="text-primary text-light-text dark:text-slate-50 mr-3" />
              <span className="text-gray-700 dark:text-slate-300">+250 798 654 693</span>
            </div>
            <button
              onClick={() => handleCopy('+250 798 654 693')}
              className='border dark:border-gray-700 dark:border-solid rounded py-1 px-2 cursor-pointer flex items-center gap-1 text-light-text dark:text-slate-50'>
              {copiedText === '+250 798 654 693' ? 'Copied' : 'Copy'} <GoCopy />
            </button>
          </li>
          <li className="flex items-center justify-between border dark:border-gray-700 dark:border-solid p-2 rounded" data-aos="fade-up" data-aos-delay="200">
            <div className='flex items-center'>
              <FaEnvelope className="text-primary text-light-text dark:text-slate-50 mr-3" />
              <span className="text-gray-700 dark:text-slate-300">hello@simeonazeh.com</span>
            </div>
            <button
              onClick={() => handleCopy('hello@simeonazeh.com')}
              className='border dark:border-gray-700 dark:border-solid rounded py-1 px-2 cursor-pointer flex items-center gap-1 text-light-text dark:text-slate-50'>
              {copiedText === 'hello@simeonazeh.com' ? 'Copied' : 'Copy'} <GoCopy />
            </button>
          </li>
          <li className="flex items-center justify-between border dark:border-gray-700 dark:border-solid p-2 rounded" data-aos="fade-up" data-aos-delay="300">
            <div className='flex items-center'>
              <FaMapMarkerAlt className="text-primary text-light-text dark:text-slate-50 mr-3" />
              <span className="text-gray-700 dark:text-slate-300">Bumbogo, Kigali, Rwanda</span>
            </div>
            <button
              onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Bumbogo,Kigali,Rwanda', '_blank')}
              className='border dark:border-gray-700 dark:border-solid rounded py-1 px-2 cursor-pointer flex items-center gap-1 text-light-text dark:text-slate-50'>
              Maps <RiMapPin4Line />
            </button>
          </li>
        </ul>
        <div className='flex items-center gap-2 py-6 text-xl' data-aos="fade-up" data-aos-delay="400">
          <a href="https://github.com/Simeon-Azeh" target="_blank" rel="noopener noreferrer" className='text-light-text dark:text-slate-300'><FaGithub /></a>
          <a href="https://www.linkedin.com/in/simeonazeh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className='text-light-text dark:text-slate-300'><FaLinkedin /></a>
          <a href="https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className='text-light-text dark:text-slate-300'><FaFacebook /></a>
        </div>
      </div>
    </div>
  );
};

export default MoreWaysToContact;
