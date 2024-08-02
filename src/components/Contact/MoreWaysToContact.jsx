import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { IoIosArrowForward } from "react-icons/io";
import { GoCopy } from "react-icons/go";
import { RiMapPin4Line } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const MoreWaysToContact = () => {
  return (
    <div className="bg-white dark:bg-dark-body font-inter">
        <div className='font-inter px-4 py-4 dark:border dark:border-gray-700 dark:border-solid rounded'>
        <ul className="space-y-4">
        <li className="flex items-center justify-between dark:border dark:border-gray-700 dark:border-solid p-2 rounded">
            <div className='flex items-center'>
            <FaPhone className="text-primary mr-3" />
            <span className="text-gray-700 dark:text-slate-300">+250 798 654 693</span>
            </div>
         <p className='dark:border dark:border-gray-700 dark:border-solid rounded py-1 px-2 cursor-pointer flex items-center gap-1'>
          Copy  <GoCopy />
         </p>
        </li>
        <li className="flex items-center justify-between dark:border dark:border-gray-700 dark:border-solid p-2 rounded">
            <div className='flex items-center'>
            <FaEnvelope className="text-primary mr-3" />
            <span className="text-gray-700 dark:text-slate-300">hello@simeonazeh.com</span>
            </div>
         <p className='dark:border dark:border-gray-700 dark:border-solid rounded py-1 px-2 cursor-pointer flex items-center gap-1'>
          Copy  <GoCopy />
         </p>
        </li>
        <li className="flex items-center justify-between dark:border dark:border-gray-700 dark:border-solid p-2 rounded">
            <div className='flex items-center'>
            <FaPhone className="text-primary mr-3" />
            <span className="text-gray-700 dark:text-slate-300">Bumbogo, Kigali, Rwanda</span>
            </div>
         <p className='dark:border dark:border-gray-700 dark:border-solid rounded py-1 px-2 cursor-pointer flex items-center gap-1'>
          Maps <RiMapPin4Line />
         </p>
        </li>
      
      </ul>
      <div className='flex items-center gap-2 py-6 text-xl'>
      <a href="http://" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
      <a href="http://" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      <a href="http://" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
      </div>
        </div>
     
    </div>
  );
};

export default MoreWaysToContact;
