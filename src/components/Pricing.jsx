import React from 'react';
import { FaLaptopCode, FaPaintBrush } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs';
import { CgBrowser } from "react-icons/cg";
import { VscLightbulbSparkle } from "react-icons/vsc";

const PricingCard = ({ icon: Icon, title, pricingType, price, description, features, buttonLabel }) => (
  <div className="bg-white dark:bg-[#1B1B1A] p-6 rounded-lg  w-full md:w-2/5  mx-4 mb-6 dark:border dark:border-gray-800 dark:border-solid font-inter">
    <div className="flex items-center mb-4">
     
      <div className='flex justify-between items-center gap-20'>
        <div className='flex items-center justify-between'>
        <Icon className="text-2xl text-orange-500 dark:text-gray-200 mr-4" />
        <h3 className="text-lg dark:text-slate-50 font-semibold ">{title}</h3>
        </div>
        <p className="text-[12px] text-gray-500 dark:text-slate-50 flex bg-[#30302f] p-1 rounded ">{pricingType}</p>
      </div>
    </div>
    <div className="text-2xl  mb-2 dark:text-gray-200">{price}</div>
    <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
    <hr className='dark:border-gray-700 dark:border-solid mb-4' />
    <ul className="mb-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-2 dark:text-gray-200">
          <BsCheck className="text-orange-500 dark:text-gray-200 mr-2" />
          {feature}
        </li>
      ))}
    </ul>
    <hr className='dark:border-gray-700 dark:border-solid mb-4' />
    <button className="flex items-center justify-center w-full bg-orange-500 dark:bg-dark-body dark:border dark:border-gray-700 dark:border-solid text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300">
      {buttonLabel}
    </button>
  </div>
);

function Pricing() {
  return (
    <div className="bg-[#f9feff] dark:bg-dark-body transition-colors py-10 px-4">
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
            description="Professional product design services."
            features={['UX/UI Design', 'Prototype', 'User Testing', 'Iteration']}
            buttonLabel="Let's Work Together"
          />
        </div>
        <div className="bg-white dark:bg-[#1B1B1A] p-6 rounded-lg  w-full mt-6 dark:border dark:border-gray-800 dark:border-solid">
          <h3 className="text-xl font-semibold mb-2 dark:text-gray-200">Custom</h3>
          <p className="mb-4 text-gray-700 dark:text-gray-300">Have unique requirements? Let's discuss a custom solution tailored to your needs.</p>
          <button className="bg-orange-500 dark:bg-dark-body text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
