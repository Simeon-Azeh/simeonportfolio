import React, { useState, useEffect } from 'react';


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
  
  return (
    <div className='bg-[#F9FEFF] dark:bg-dark-body transition-colors '>
        <div className='text-2xl md:text-4xl font-medium dark:text-slate-50 text-[#414760]  flex gap-2 md:gap-4 items-center w-full md:w-4/5 mx-auto font-inter px-4 md:px-0 '>
            I am a{' '}
            <span className={`inline-block text-2xl md:text-4xl transition-all duration-500 dark:text-slate-300 text-orange-500 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {currentRole}
            </span>
          </div>
    </div>
  )
}

export default AboutHero
