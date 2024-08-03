import React, { useEffect } from 'react';
import { FaLaptopCode, FaPaintBrush } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs';
import { CgBrowser } from "react-icons/cg";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { TbRainbow } from "react-icons/tb";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PricingCard = ({ icon: Icon, title, pricingType, price, description, features, buttonLabel }) => (
  <div className="bg-light-body dark:bg-[#1B1B1A] p-6 rounded-lg w-full md:w-2/5 mx-4 mb-6 border dark:border-gray-700 dark:border-solid font-inter" data-aos="fade-up">
    <div className="flex items-center mb-4">
      <div className='flex justify-between items-center gap-20'>
        <div className='flex items-center justify-between'>
          <Icon className="text-2xl text-pink-600 dark:text-gray-200 mr-4" />
          <h3 className="text-lg dark:text-slate-50 font-semibold text-light-text">{title}</h3>
        </div>
        <p className="text-[12px] text-pink-600 bg-white dark:text-slate-50 flex dark:bg-[#30302f] p-1 rounded">{pricingType}</p>
      </div>
    </div>
    <div className="text-2xl text-light-text mb-2 dark:text-gray-200">{price}</div>
    <p className="mb-4 text-light-text dark:text-gray-300">{description}</p>
    <hr className='dark:border-gray-700 dark:border-solid mb-4' />
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2 text-light-text dark:text-gray-200">
          <BsCheck className="text-pink-600 dark:text-gray-200 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <hr className='dark:border-gray-700 dark:border-solid mb-4' />
    <Link to="/contact" className="flex items-center justify-center w-full bg-pink-600 dark:bg-dark-body dark:border dark:border-gray-700 dark:border-solid text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300">
      {buttonLabel}
    </Link>
  </div>
);

function Pricing() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-white dot-pattern dark:bg-dark-body transition-colors py-10 px-4">
      <div className="w-full md:w-4/5 mx-auto">
        <div className="flex flex-wrap justify-center">
          <PricingCard
            icon={CgBrowser}
            title="Web Development"
            pricingType="Flat Rate"
            price="$299/mo"
            description="A perfect fit for those who seek landing pages or a complex website design." 
            features={['Custom Design', 'Responsive', 'SEO Optimized', 'Fast Load Times']}
            buttonLabel="Share Your Vision"
          />
          <PricingCard
            icon={VscLightbulbSparkle}
            title="Product Design"
            pricingType="Subscription"
            price="$499/mo"
            description="Professional product design services. Best buy for orgs looking to create custom products."
            features={['UX/UI Design', 'Prototype', 'User Testing', 'Iteration']}
            buttonLabel="Let's Work Together"
          />
        </div>
        <div className="flex items-center justify-between flex-col md:flex-row bg-light-body dark:bg-[#1B1B1A] px-6 py-6 rounded-lg w-full mt-6 border dark:border-gray-800 dark:border-solid font-inter" data-aos="fade-up">
          <div className='flex gap-2 items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <TbRainbow size={20} className='text-pink-600 dark:text-white' />
                <h3 className="text-lg font-semibold text-light-text dark:text-gray-200">Custom</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-gray-300">Have unique requirements? Let's discuss a custom solution tailored to your needs.</p>
            </div>
          </div>
          <Link to="/contact" className='bg-pink-600 dark:border flex w-full items-center justify-center md:w-1/6 dark:border-gray-700 dark:border-solid dark:bg-dark-body text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300' data-aos="fade-up" data-aos-delay="200">
            Let's talk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
