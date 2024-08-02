import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { RiWhatsappFill } from "react-icons/ri";
import { TiSocialLinkedinCircular } from "react-icons/ti";

function Footer() {
  return (
    <div className='bg-[#f9feff] dark:bg-dark-body transition-colors font-inter '>
      <div className='w-[100%] md:w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between py-10 px-8 md:px-0 border-b dark:border-b-gray-700 border-t border-t-gray-700 border-solid'>
        <div className='flex flex-col gap-4'>
          <div className='w-[120px] flex m-auto md:m-0'>
            <h1 className='font-montserrat-alt text-[#414760] dark:text-slate-50'>Simeon <span className='dark:text-gray-300 text-orange-500'>Azeh</span></h1>
          </div>
          <div className='flex gap-4 md:gap-8  items-center'>
            <Link to="/resume" className='text-[#414760] dark:text-slate-50'>Resume</Link>
            <Link to="/contact" className='text-[#414760] dark:text-slate-50'>Contact</Link>
            <Link to="/services" className='text-[#414760] dark:text-slate-50'>Services</Link>
            <Link to="/portfolio" className='text-[#414760] dark:text-slate-50'>Portfolio</Link>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-[#414760] dark:text-slate-50 font-medium text-center mt-5 md:text-left md:mt-0'>Follow Me</h1>
          <div className='flex gap-8 items-center'>
            <a href="https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className='text-[#414760] dark:text-slate-50'><FaFacebook size={20} /></a>
            <a href="https://wa.me/250798654693" target="_blank" rel="noopener noreferrer" className='text-[#414760] dark:text-slate-50'><RiWhatsappFill size={20} /></a>
            <a href="https://www.instagram.com/heis_kay_c?igsh=MXF2NDA2YzJtODhxOQ==" target="_blank" rel="noopener noreferrer" className='text-[#414760] dark:text-slate-50'><RiInstagramFill size={20} /></a>
            <a href="https://www.linkedin.com/in/simeonazeh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className='text-[#414760] dark:text-slate-50'><TiSocialLinkedinCircular size={30} /></a>
          </div>
        </div>
      </div>
      <div className='w-[100%] md:w-4/5 mx-auto flex flex-col md:flex-row items-center justify-between py-10 px-8 md:px-0'>
        <div>
          <p className='dark:text-slate-300 mb-4 md:mb-0'>© Simeon Azeh 2024. All Rights Reserved</p>
        </div>
        <div className='flex gap-4 items-center font-poppins text-[#404660] text-[14px]'>
          <Link to="/contact" className='text-[#414760] dark:text-slate-50'>Contact</Link>
          <Link to="/terms" className='text-[#414760] dark:text-slate-50'>Terms & Conditions</Link>
          <Link to="/cookies" className='text-[#414760] dark:text-slate-50'>Cookies</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer;
