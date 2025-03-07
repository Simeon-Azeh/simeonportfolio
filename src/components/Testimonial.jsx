import React from 'react';
import { motion } from 'framer-motion';
import { Carousel } from 'antd';
import { FaQuoteLeft } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

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
  }
];

function TestimonialCard({ name, position, image, text }) {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full md:w-4/5 mx-auto py-16 px-6 md:px-0"
    >
      <div className="text-center mb-12">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6 mx-auto"
        />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:to-gray-300">
            {t('testimonial_title')}
          </span>
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t('testimonial_intro')}
        </motion.p>
      </div>

      <motion.div 
        className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 shadow-xl dark:shadow-none relative
                   border border-gray-200 dark:border-gray-800 font-inter"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute -top-4 left-8">
          <FaQuoteLeft className="text-4xl text-pink-600 dark:text-white opacity-20" />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <motion.div 
            className="w-16 h-16 rounded-full overflow-hidden border-2 border-pink-600 dark:border-white p-1"
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full rounded-full object-cover filter dark:grayscale" 
            />
          </motion.div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
          </div>
        </div>

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          "{text}"
        </p>
      </motion.div>
    </motion.div>
  );
}

function Testimonial() {
  return (
    <div className="bg-light-body dark:bg-dark-body relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <Carousel
        autoplay
        dots={true}
        effect="fade"
        className="testimonial-carousel"
      >
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </Carousel>
    </div>
  );
}

export default Testimonial;