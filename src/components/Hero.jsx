import React, { useState, useEffect } from 'react';
import HeroImg from '../../public/images/HeroImg.png';
import { MdWavingHand } from "react-icons/md";
import { Link } from 'react-router-dom';
import { IoMdArrowForward } from "react-icons/io";
import { GiArchiveRegister } from "react-icons/gi";
import AOS from 'aos';
import 'aos/dist/aos.css';

const roles = ["Frontend Engineer", "Brand Manager", "Graphic Designer", "Web Developer"];

function Hero() {
  const [currentRole, setCurrentRole] = useState(roles[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

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
    <div className='bg-[#F9FEFF] dark:bg-dark-body transition-colors h-[90vh] flex items-center justify-center dot-pattern'>
      <div className='w-full md:w-4/5 mx-auto px-4 font-inter text-center'>
        <div className='w-36 h-36 flex mx-auto' data-aos="fade-up">
          <img src={HeroImg} alt="HeroImg" className='w-full' />
        </div>
        <div className='mt-4'>
          <p className='flex items-center justify-center gap-2 dark:text-slate-300 text-pink-600 font-medium mb-2' data-aos="fade-up" data-aos-delay="200">
            Hello, I'm Simeon 
            <span className='inline-block wave-icon text-2xl'>
              <MdWavingHand />
            </span>
          </p>
          <h2 className='relative overflow-hidden inline-block text-4xl md:text-5xl font-medium dark:text-slate-50 text-[#545e85]' data-aos="fade-up" data-aos-delay="400">
            Building digital products, <span className='dark:text-slate-300 text-pink-600'>brands </span>and <span className='dark:text-slate-300 text-pink-600'>experiences. </span>
          </h2>
         
          <div className='mt-6' data-aos="fade-up" data-aos-delay="600">
            <Link to="/services">
              <button className='dark:bg-[#1B1B1A] dark:border dark:border-gray-700 dark:border-solid bg-pink-600 px-6 py-3 border-none rounded mx-auto font-normal text-lg transition-transform duration-300 hover:translate-y-[-3px] flex items-center gap-2'>
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
