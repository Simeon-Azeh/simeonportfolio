import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  '../../public/images/work1.png',
  '../../public/images/work2.png',
  '../../public/images/work3.png',
  '../../public/images/work4.png',
  '../../public/images/work5.png',
  '../../public/images/work6.png',
  '../../public/images/work7.png',
];

const MyWork = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-[#f9feff] dark:bg-dark-body transition-colors font-inter'>
              <div className=" w-full md:w-4/5 mx-auto py-10 px-6 md:px-0 font-inter">
      <h2 className=" font-medium mb-2 text-[#414760] dark:text-gray-200 ">
        My Work
      </h2>
      <div className="flex flex-col items-center">
        <div className="w-full h-96 relative overflow-hidden border rounded-lg shadow-lg">
          <img
            src={images[currentImageIndex]}
            alt="My Work"
            className="w-full h-full object-cover rounded-lg transition-opacity duration-1000"
          />
          <Link to="/portfolio" className="absolute bottom-[40%] left-1/2 transform -translate-x-1/2">
            <button className="dark:bg-dark-body bg-orange-500 text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300">
              View Work
            </button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  
  );
};

export default MyWork;
