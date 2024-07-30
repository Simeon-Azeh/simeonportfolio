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
    <div className='w-full md:w-4/5 mx-auto py-6 px-6 font-inter text-white bg-[#171716]'>
      <div className='w-36 h-36 flex m-auto'>
        <img src={HeroImg} alt="HeroImg" className='w-full' />
      </div>
      <div className='text-center mt-4'>
        <p className='flex items-center justify-center gap-2 text-gray-400 font-medium mb-2'>
          Hi, I'm Simeon 
          <span
            className='inline-block wave-icon text-2xl'
          >
            <MdWavingHand />
          </span>
        </p>
        <h2 className='relative overflow-hidden inline-block text-4xl md:text-5xl font-normal'>
          Building digital products, <span className='text-[#fff19e]'>brands </span>and <span className='text-[#fff19e]'>experiences. </span>
        </h2>
    
       
        <div className='mt-4 text-lg'>
          I am a{' '}
          <span
            className={`inline-block font-medium text-3xl transition-all duration-500 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            {currentRole}
          </span>
        </div>
        <div className='mt-6'>
          <Link to="/explore">
            <button className='bg-[#1B1B1A] px-6 py-2  rounded mx-auto font-normal text-lg transition-transform duration-300 hover:translate-y-[-3px] flex items-center gap-2'>
              Explore <IoMdArrowForward />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
