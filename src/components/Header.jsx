import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import ReactFlagsSelect from 'react-flags-select';
import { Link } from 'react-router-dom';

function Header() {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('US');
  const [darkMode, setDarkMode] = useState(true); // Set default to true

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
    setSelectedLanguage(countryCode);
    // Here you can implement actual language change logic
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="bg-light-body dark:bg-dark-body transition-colors ">
      <div className='flex justify-between w-full md:w-4/5 mx-auto items-center py-4 px-6 md:px-0 font-inter sticky top-0 z-50'>
        <div className="text-lg font-semibold">
          <Link to="/">
            <h1 className='font-montserrat-alt text-[#] dark:text-slate-50 text-light-text'>Simeon <span className='dark:text-gray-300 text-pink-600'>Azeh</span></h1>
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 text-[#414760] dark:text-slate-50">
          <Link to="/">
            <a className="hover:border-b-2 border-pink-600 dark:border-gray-400 dark:border-solid">Home</a>
          </Link>
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center hover:text-pink-600 dark:hover:text-gray-400">
              About
              {dropdownOpen ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />}
            </button>
            {dropdownOpen && (
              <div className="absolute dark:bg-[#1a1818] dark:text-white py-2 mt-2 space-y-2 rounded border bg-white text-[#414760] dark:border-gray-600 dark:border-solid">
                <Link to="/resume">
                  <p className="block py-2 px-4 hover:text-pink-600 dark:hover:text-slate-300">Resume</p>
                </Link>
                <Link to="/portfolio">
                  <p className="block py-2 px-4 hover:text-pink-600 dark:hover:text-slate-300">Portfolio</p>
                </Link>
              </div>
            )}
          </div>
          <Link to="/services">
            <a className="hover:border-b-2 border-pink-600 dark:border-gray-400 dark:border-solid">Services</a>
          </Link>
          <Link to="/contact">
            <a className="hover:border-b-2 border-pink-600 dark:border-gray-400 dark:border-solid">Contact</a>
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleDarkMode} className="hover:text-gray-400 dark:text-slate-50 text-[#414760]">
            {darkMode ? <MdOutlineLightMode size={24} /> : <MdOutlineDarkMode size={24} />}
          </button>
          <ReactFlagsSelect
            countries={["US", "FR"]}
            customLabels={{ US: "EN", FR: "FR" }}
            selected={selectedLanguage}
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
            selected={selectedLanguage}
            onSelect={handleLanguageChange}
            className="custom-flag-select"
          />
          <button onClick={showDrawer} className="dark:text-slate-50 text-light-text">
            <MenuOutlined size={30} />
          </button>
        </div>
      </div>

      <Drawer title="Menu" placement="right" onClose={onClose} visible={visible} className='bg-[#f7f7f7] font-inter font-medium'>
        <Link to="/">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">Home</a>
        </Link>
        <Link to="/resume">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">Resume</a>
        </Link>
        <Link to="/services">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">Services</a>
        </Link>
        <Link to="/portfolio">
          <a className="block py-2 px-4 text-[#414760] hover:text-[#2c2b2b]">Portfolio</a>
        </Link>
        <Link to="/contact">
          <a className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Contact</a>
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
