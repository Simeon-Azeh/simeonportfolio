import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import ReactFlagsSelect from 'react-flags-select';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
  const { t, i18n } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLanguageChange = (countryCode) => {
    i18n.changeLanguage(countryCode === 'US' ? 'en' : 'fr');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-light-body dark:bg-dark-body transition-colors">
      <div className='flex justify-between w-full md:w-4/5 mx-auto items-center py-4 px-6 md:px-0 font-inter sticky top-0 z-50'>
        <div className="text-lg font-semibold">
          <Link to="/">
            <h1 className='font-montserrat-alt text-[#] dark:text-slate-50 text-light-text'>
              Simeon <span className='dark:text-gray-300 text-pink-600'>Azeh</span>
            </h1>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 text-[#414760] dark:text-slate-50">
          <Link to="/">
            <a className="hover:border-b-2 border-pink-600 dark:border-gray-400 dark:border-solid">{t('home')}</a>
          </Link>
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center hover:text-pink-600 dark:hover:text-gray-400">
              {t('about')}
              {dropdownOpen ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />}
            </button>
            {dropdownOpen && (
              <div className="absolute dark:bg-[#1a1818] dark:text-white py-2 mt-2 space-y-2 rounded border bg-white text-[#414760] dark:border-gray-600 dark:border-solid">
                <Link to="/resume">
                  <p className="block py-2 px-4 hover:text-pink-600 dark:hover:text-slate-300">{t('resume')}</p>
                </Link>
                <Link to="/portfolio">
                  <p className="block py-2 px-4 hover:text-pink-600 dark:hover:text-slate-300">{t('portfolio')}</p>
                </Link>
              </div>
            )}
          </div>
          <Link to="/services">
            <a className="hover:border-b-2 border-pink-600 dark:border-gray-400 dark:border-solid">{t('services')}</a>
          </Link>
          <Link to="/contact">
            <a className="hover:border-b-2 border-pink-600 dark:border-gray-400 dark:border-solid">{t('contact')}</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="hover:text-gray-400 dark:text-slate-50 text-[#414760]">
            {darkMode ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
          </button>
          <ReactFlagsSelect
            countries={["US", "FR"]}
            customLabels={{ US: "EN", FR: "FR" }}
            selected={i18n.language === 'en' ? 'US' : 'FR'}
            onSelect={handleLanguageChange}
            className="custom-flag-select text-[#414760] dark:text-slate-50 pr-8"
          />
          <a href="https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className=" dark:hover:text-gray-400 dark:text-slate-50 text-light-text hover:text-pink-600">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.linkedin.com/in/simeonazeh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="dark:hover:text-gray-400 dark:text-slate-50 text-light-text hover:text-pink-600">
            <FaLinkedin size={20} />
          </a>
          <a href="https://github.com/Simeon-Azeh" target="_blank" rel="noopener noreferrer" className="dark:hover:text-gray-400 dark:text-slate-50 text-light-text hover:text-pink-600">
            <FaGithub size={20} />
          </a>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="hover:text-gray-400 dark:text-slate-50 text-[#414760]">
            {darkMode ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
          </button>
          <ReactFlagsSelect
            countries={["US", "FR"]}
            customLabels={{ US: "EN", FR: "FR" }}
            selected={i18n.language === 'en' ? 'US' : 'FR'}
            onSelect={handleLanguageChange}
            className="custom-flag-select"
          />
          <button onClick={showDrawer} className="dark:text-slate-50 text-light-text">
            <MenuOutlined size={30} />
          </button>
        </div>
      </div>

      <Drawer title={t('menu')} placement="right" onClose={onClose} visible={visible} className='bg-[#f7f7f7] font-inter font-medium'>
        <Link to="/">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">{t('home')}</a>
        </Link>
        <Link to="/resume">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">{t('resume')}</a>
        </Link>
        <Link to="/services">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">{t('services')}</a>
        </Link>
        <Link to="/portfolio">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">{t('portfolio')}</a>
        </Link>
        <Link to="/contact">
          <a className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">{t('contact')}</a>
        </Link>
        <div className="flex space-x-4 mt-4">
          <a href="https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaFacebook size={20} />
          </a>
          <a href="https://www.linkedin.com/in/simeonazeh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={20} />
          </a>
          <a href="https://github.com/Simeon-Azeh" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub size={20} />
          </a>
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
