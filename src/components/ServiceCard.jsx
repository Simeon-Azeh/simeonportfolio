// ServiceCard.jsx
import React from 'react';

const ServiceCard = ({ icon: Icon, title }) => {
  return (
    <div className="bg-white dark:bg-[#1B1B1A] border dark:border-gray-800 dark:border-solid rounded-lg p-6 transition-transform duration-300 hover:translate-y-[-3px]">
      <div className="dark:text-white text-orange-500 mb-4">
        <Icon size={20} />
      </div>
      <h3 className="md:text-xl font-normal text-gray-700 dark:text-slate-50">{title}</h3>
    </div>
  );
};

export default ServiceCard;
