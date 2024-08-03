import React, { useEffect } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function SubHero() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='bg-light-body dark:bg-dark-body transition-colors font-inter'>
      <div className='w-full md:w-4/5 mx-auto pt-6 px-6 md:px-0'>
        <h2 className='text-2xl md:text-4xl mb-2 dark:text-slate-50 text-light-text' data-aos="fade-up">
          Your vision deserves a world-class execution
        </h2>
        <h2 className='text-xl md:text-3xl dark:text-slate-300 text-pink-600' data-aos="fade-up" data-aos-delay="200">
          I am a go-to design partner for startups, agencies and creatives.
        </h2>
        <p className='text-[15px] dark:text-slate-300 text-light-text mt-2' data-aos="fade-up" data-aos-delay="400">
          Looking to transform your vision into a real-world product? I thrive at crafting intuitive and attractive interfaces that tackle complex challenges.
        </p>
        <div className='flex gap-4 py-4' data-aos="fade-up" data-aos-delay="600">
          <button className='dark:bg-white bg-pink-600 text-white dark:text-[#414760] px-6 py-2 rounded mt-2 hover:translate-y-[-3px] duration-300'>
            Schedule Call
          </button>
          <Link to="/portfolio" className='dark:bg-[#1B1B1A] bg-transparent text-[#414760] border dark:text-white px-6 py-2 rounded mt-2 dark:border dark:border-gray-700 dark:border-solid hover:translate-y-[-3px] duration-300'>
            View Work
          </Link>
        </div>
        <p className='text-[14px] dark:text-slate-300 text-[#6b7280] mt-2 flex items-center gap-4' data-aos="fade-up" data-aos-delay="800">
          Or drop me an email <FaArrowRightLong /> <span className='dark:text-white text-pink-600'>hello@simeonazeh.com</span>
        </p>
      </div>
    </div>
  );
}

export default SubHero;
