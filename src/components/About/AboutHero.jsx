import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const roles = ["Frontend Engineer", "Brand Manager", "Graphic Designer", "Web Developer", "UI/UX Designer"];
function AboutHero() {

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
    useEffect(() => {
        AOS.init({ duration: 1000 });
      }, []);
    
  return (
    <div className='bg-light-body dark:bg-dark-body transition-colors pb-4'>
        <div className='text-2xl md:text-4xl font-medium dark:text-slate-50 text-light-text  flex gap-2 md:gap-4 items-center w-full md:w-4/5 mx-auto font-inter px-6 md:px-0 '  data-aos="fade-up">
            I am a{' '}
            <span className={`inline-block text-2xl md:text-4xl transition-all duration-500 dark:text-slate-300 text-pink-600 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {currentRole}
            </span>
          </div>
    </div>
  )
}

export default AboutHero
