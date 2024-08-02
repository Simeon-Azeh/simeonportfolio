// Services.jsx
import React from 'react';
import { FaLaptopCode, FaPaintBrush, FaPencilRuler } from 'react-icons/fa';
import ServiceCard from './ServiceCard';
import { VscLightbulbSparkle } from "react-icons/vsc";
import { CgBrowser } from "react-icons/cg";
import { VscSparkleFilled } from "react-icons/vsc";
import { AiOutlineVideoCameraAdd } from "react-icons/ai";
import { HiPaintBrush } from "react-icons/hi2";
import { MdOutlineBrandingWatermark } from "react-icons/md";

const services = [
  { icon: CgBrowser, title: 'Website Design' },
  { icon: HiPaintBrush, title: 'Graphic Design' },
  { icon: VscSparkleFilled, title: 'Product Design' },
  { icon: VscLightbulbSparkle, title: 'Illustration Design' },
  { icon: AiOutlineVideoCameraAdd, title: 'Video & Photography' },
  { icon: MdOutlineBrandingWatermark, title: 'Branding' },
  // Add more services as needed
];

const Services = () => {
  return (
    <div className="bg-white dot-pattern dark:bg-dark-body transition-colors py-10 font-inter">
      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0">
        <h2 className="text-2xl md:text-4xl mb-2 dark:text-slate-50 text-light-text">My Services</h2>
        <p className='text-[15px] dark:text-slate-300 text-light-text my-4'>Sometimes, you come across a design that feels right — you can't quite explain why, but you know it when you see it!</p>
        <p className='text-[15px] dark:text-slate-300 text-light-text mb-8'>I am dedicated to crafting solutions that evoke this feeling while offering everything design-related, from A to Z.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} icon={service.icon} title={service.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
