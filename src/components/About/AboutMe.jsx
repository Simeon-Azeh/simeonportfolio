import React from 'react';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';

const images = [
  '/images/about1.jpg',
  '/images/about2.jpg',
  '/images/about3.jpg',
  '/images/about4.jpg',
  '/images/about5.jpg',
  '/images/about6.jpg'
];

function AboutMe() {
  const duplicatedImages = [...images, ...images]; // Duplicate images for seamless scrolling

  return (
    <div className="bg-[#f9feff] dark:bg-dark-body transition-colors py-10 px-4 md:px-0">
      <div className="w-full md:w-4/5 mx-auto flex flex-col md:flex-row items-center">
        <div className="relative w-full md:w-1/2 flex flex-col items-center h-96 overflow-hidden">
          <div className="marquee-container">
            <div className="marquee">
              {/* Create two rows of images */}
              {Array.from({ length: 2 }).map((_, rowIndex) => (
                <div key={rowIndex} className="marquee-row">
                  {duplicatedImages.map((image, index) => (
                    <div key={index} className="marquee-item">
                      <img
                        src={image}
                        alt={`Scrolling ${index}`}
                        className="w-full h-auto"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 mt-6 md:mt-0 md:ml-8 font-inter px-1 md:px-0 ">
          <h2 className="text-2xl md:text-4xl font-medium mb-2 text-[#414760] dark:text-gray-200 ">About Me </h2>
          <p className="mt-4 text-gray-700 dark:text-slate-300 text-justify">
           | Hello! I'm Simeon Azeh, a passionate Frontend Engineer, Brand Manager, and Graphic Designer with a knack for crafting engaging digital experiences. With a strong background in web development and design, I focus on creating intuitive and visually appealing interfaces that drive user engagement. I believe in blending creativity with technology to build innovative solutions that stand out. Let's collaborate and bring your ideas to life!
          </p>
          <div className="mt-6 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FaFacebook size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FaLinkedin size={24} />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <FaGithub size={24} />
            </a>
          </div>
        </div>
      </div>
        <p className='text-[15px] dark:text-slate-300 text-[#6b7280] mt-4 font-inter w-full md:w-4/5 mx-auto text-justify md:px-0'>I am always eager to learn new technologies and improve my skills. I believe in the power of programming to solve complex problems and make life easier. I am available for freelance work and look forward to contributing to your projects. |</p>
    </div>
  );
}

export default AboutMe;
