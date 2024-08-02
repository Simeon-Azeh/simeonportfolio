import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import ReactFlagsSelect from 'react-flags-select';


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
    <div className=" bg-[#F9FEFF] dark:bg-dark-body transition-colors">
        <div className=' flex justify-between w-full md:w-4/5 mx-auto items-center py-4 px-6 md:px-0 font-inter sticky top-0 z-50'>
        <div className="text-lg font-semibold">
        <h1 className='font-montserrat-alt text-[#414760] dark:text-slate-50'>Simeon <span className='dark:text-gray-300 text-orange-500'>Azeh</span></h1>
      </div>
      <div className="hidden md:flex space-x-6 text-[#414760] dark:text-slate-50 ">

        <a href="#home" className="hover:border-b-2 border-gray-400 ">Home</a>
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center hover:text-gray-400">
            About
            {dropdownOpen ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-[#1a1818] text-white py-2 mt-2 space-y-2 rounded border border-gray-600">
            <a href="#skills" className="block py-2 px-4">Resume</a>
              <a href="#services" className="block py-2 px-4">Portfolio</a>
            </div>
          )}
        </div>
        <a href="#portfolio" className="hover:border-b-2 border-gray-400">Services</a>
        <a href="#contact" className="hover:border-b-2 border-gray-400">Contact</a>
        
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
          className="custom-flag-select text-[#414760] dark:text-slate-50"
        />
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 dark:text-slate-50 text-[#414760]">
          <FaFacebook size={20} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 dark:text-slate-50 text-[#414760]">
          <FaLinkedin size={20} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 dark:text-slate-50 text-[#414760]">
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
        <button onClick={showDrawer} className="dark:text-slate-50 text-[#414760]">
          <MenuOutlined size={30} />
        </button>
      </div>
        </div>
     
      <Drawer title="Menu" placement="right" onClose={onClose} visible={visible} className='bg-[#f7f7f7] font-inter font-medium'>
        <a href="#home" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Home</a>
        <a href="#about" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Resume</a>
        <a href="#services" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Services</a>
        <a href="#portfolio" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Portfolio</a>
        <a href="#contact" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Contact</a>
        <div className="flex space-x-4 mt-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaFacebook size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaLinkedin size={20} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaGithub size={20} />
          </a>
        </div>
      </Drawer>
    </div>
  );
}

export default Header;
