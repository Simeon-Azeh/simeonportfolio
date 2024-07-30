import React, { useState } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';


function Header() {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="flex justify-between items-center py-8 px-6 md:px-0 text-white font-montserrat">
      <div className="text-lg font-semibold">
        <h1 className='font-montserrat-alt'>Simeon <span className='text-gray-300'>Azeh</span></h1>
      </div>
      <div className="hidden md:flex space-x-6">
        <a href="#home" className=" hover:border-b-2 border-gray-400 ">Home</a>
        <a href="#about" className=" hover:border-b-2 border-gray-400">About</a>
       
        <a href="#portfolio" className=" hover:border-b-2 border-gray-400">Portfolio</a>
        <a href="#contact" className=" hover:border-b-2 border-gray-400">Contact</a>
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center hover:text-gray-400">
            More
            {dropdownOpen ? <IoIosArrowUp className="ml-1" /> : <IoIosArrowDown className="ml-1" />}
          </button>
          {dropdownOpen && (
            <div className="absolute bg-[#2c2b2b]  text-white py-2 mt-2 space-y-2 rounded border border-gray-500">
              <a href="#skills" className="block py-2 px-4 ">Skills</a>
              <a href="#services" className="block py-2 px-4 ">Services</a>
            </div>
          )}
        </div>
      </div>
      <div className="hidden md:flex space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FaFacebook size={20}/>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FaLinkedin size={20} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
          <FaGithub size={20}/>
        </a>
      </div>
      <button
        className="md:hidden text-white"
        onClick={showDrawer}
      >
        <MenuOutlined size={30}/>
      </button>
      <Drawer title="Menu" placement="right" onClose={onClose} visible={visible} className='bg-[#f7f7f7] font-montserrat font-medium'>
        <a href="#home" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Home</a>
        <a href="#about" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">About</a>
        <a href="#skills" className="block py-2 px-4 text-[#2c2b2b] hover:text-[#2c2b2b]">Skills</a>
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
