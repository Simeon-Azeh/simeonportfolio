import React from 'react';
import { Carousel } from 'antd';


const testimonials = [
  {
    name: 'James Kakisingi',
    position: 'CEO, Urega Foundation Netherlands.',
    image: 'https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png',
    text: 'Simeon has been truly dedicated, he puts in all the effort to building our brand!'
  },
  {
    name: 'Cedric M.',
    position: 'CEO, CodeXtreme.',
    image: 'https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png',
    text: 'Impressive!. One thing is for sure, he can get the work done!'
  },
  {
    name: 'Z. Prime',
    position: 'CEO, Multiprime.',
    image: 'https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png',
    text: 'Impressive!. One thing is for sure, he can get the work done!'
  },
  // Add more testimonials as needed
];

function TestimonialCard({ name, position, image, text }) {
  return (
    <div className=' w-full md:w-4/5 mx-auto my-10 font-inter px-6 md:px-0'>
      <h2 className='text-2xl md:text-4xl mb-2 dark:text-slate-50 text-light-text'>Happy Clients</h2>
      <p className='text-[15px] dark:text-slate-300 text-light-text my-4 '>My individual backgrounds encompass years of industry expertise. We've partnered with clients across different sectors, and here are their thoughts on our services.</p>
         <div className="  font-inter">
      <div className="flex items-center mb-4">
        <div className='w-10 mr-4'>
        <img src={image} alt={name} className="w-full h-auto rounded-full object-contain filter dark:grayscale mr-4" />
        </div>
        <div>
          <h3 className="text-lg font-semibold dark:text-gray-200 text-light-text">{name}</h3>
          <p className="text-sm text-light-text dark:text-gray-400">{position}</p>
        </div>
      </div>
      <hr className="my-4 dark:border-gray-700 dark:border-solid" />
      <h4 className="text-lg font-semibold mb-2 text-light-text dark:text-gray-200">Testimonial</h4>
      <p className="text-gray-700 dark:text-gray-300">{text}</p>
    </div>
    </div>
   
  );
}

function Testimonial() {
  return (
    <div className="bg-light-body dark:bg-dark-body">
      <Carousel autoplay>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </Carousel>
    </div>
  );
}

export default Testimonial;
