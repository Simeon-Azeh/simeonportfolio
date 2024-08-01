import React, { useEffect, useRef, useState } from 'react';
import { CountUp } from 'countup.js'; // Ensure this import matches the actual export
import { FaUserFriends, FaTasks, FaRegSmile, FaAward } from 'react-icons/fa';
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdPlaylistAddCheckCircle } from "react-icons/md";

const facts = [
  {  title: 'Happy Clients', count: 1200, icon: <FaRegSmile size={30} /> },
  {  title: 'Completed Projects', count: 150, icon: <MdPlaylistAddCheckCircle size={30} /> },
  {  title: 'Hours of Support', count: 3400, icon: <RiCustomerService2Fill  size={30} /> },
  {  title: 'Awards', count: 10, icon: <FaAward size={30} /> }
];

const Facts = () => {
  const [isVisible, setIsVisible] = useState(false);
  const countUpRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing after first intersection
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    const element = document.querySelector('#facts-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      countUpRefs.current.forEach((ref, index) => {
        if (ref) {
          new CountUp(ref, facts[index].count, { duration: 2 }).start();
        }
      });
    }
  }, [isVisible]);

  return (
    <div id="facts-section" className="bg-[#f9feff] dark:bg-dark-body transition-colors py-10 px-4 md:px-0 font-inter">
      <div className="w-full md:w-4/5 mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="flex flex-col  justify-center items-center border dark:border-gray-700 dark:border-solid px-4 py-3 rounded-lg gap-1"
          >
            <div className="text-4xl dark:text-slate-50 gap-2 items-center flex ">
                <p>{fact.icon}</p>
                <h2  ref={el => countUpRefs.current[index] = el}>0</h2>
            </div>
            <div className="text-5xl font-bold">
          
            </div>
            <div className="text-lg  dark:text-slate-50">{fact.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facts;
