import React, { useState, useEffect } from 'react';
import HeroImg from '../../public/images/HeroImg.png';
import { MdWavingHand } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";

const roles = ["Frontend Engineer", "Brand Manager", "Graphic Designer", "Web Developer"];

function Hero() {
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFade(false); // Trigger the fade-out animation
      setTimeout(() => {
        setCurrentRole((prevRole) => {
          const currentIndex = roles.indexOf(prevRole);
          return roles[(currentIndex + 1) % roles.length];
        });
        setFade(true); // Trigger the fade-in animation
      }, 500); // Wait for the fade-out animation to complete before changing the text
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='bg-[#F9FEFF] dark:bg-dark-body transition-colors'>
          <div className='w-full md:w-4/5 mx-auto my-auto px-4 font-inter text-white pb-6  '>
      <div className='w-36 h-36 flex m-auto'>
        <img src={HeroImg} alt="HeroImg" className='w-full' />
      </div>
      <div className='text-center mt-4'>
        <p className='flex items-center justify-center gap-2 dark:text-[#fff19e] text-orange-500 font-medium mb-2'>
          Hi, I'm Simeon 
          <span
            className='inline-block wave-icon text-2xl'
          >
            <MdWavingHand />
          </span>
        </p>
        <h2 className='relative  overflow-hidden inline-block text-4xl md:text-5xl font-medium dark:text-slate-50 text-[#414760]'>
          Building digital products, <span className='dark:text-[#fff19e] text-orange-500'>brands </span>and <span className='dark:text-[#fff19e] text-orange-500'>experiences. </span>
        </h2>
    
       
        <div className='mt-4 text-xl font-medium dark:text-slate-50 text-[#414760] hidden'>
          I am a{' '}
          <span
            className={`inline-block  text-xl transition-all duration-500 dark:text-[#fff19e] text-orange-500 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {currentRole}
          </span>
        </div>
        <div className='mt-6'>
          <Link to="/explore">
            <button className='dark:bg-[#1B1B1A] bg-orange-500 px-6 py-3  md:border-none  dark:border-solid  rounded mx-auto font-normal text-lg transition-transform duration-300 hover:translate-y-[-3px] flex items-center gap-2'>
              Explore <IoMdArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  
  );
}

export default Hero;
