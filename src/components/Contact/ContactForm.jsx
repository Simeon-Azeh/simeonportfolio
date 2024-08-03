import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="bg-white dark:bg-dark-body font-inter">
      <div
        onSubmit={handleSubmit}
        className='font-inter px-6 py-6 border dark:border-gray-700 dark:border-solid rounded'
        data-aos="fade-up"
      >
        <h2
          className="text-2xl md:text-4xl font-medium mb-2 text-light-text dark:text-gray-200"
          data-aos="fade-up"
        >
          Contact Me
        </h2>
        <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
          <label htmlFor="name" className="block text-sm font-medium text-light-text dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-light-text dark:text-slate-50 bg-white dark:bg-[#1B1B1A] border border-gray-300 border-solid dark:border-gray-700 dark:border-solid rounded-md dark:shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
          />
        </div>
        <div className="mb-4" data-aos="fade-up" data-aos-delay="200">
          <label htmlFor="email" className="block text-sm font-medium text-light-text dark:text-slate-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-light-text dark:text-slate-50 bg-white dark:bg-[#1B1B1A] border border-gray-300 border-solid dark:border-gray-700 dark:border-solid rounded-md dark:shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            required
          />
        </div>
        <div className="mb-4" data-aos="fade-up" data-aos-delay="300">
          <label htmlFor="message" className="block text-sm font-medium text-light-text dark:text-gray-300">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 text-light-text dark:text-slate-50 bg-white dark:bg-[#1B1B1A] border border-gray-300 border-solid dark:border-gray-700 dark:border-solid rounded-md dark:shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-pink-600 dark:bg-[#1B1B1A] dark:border dark:border-gray-700 dark:border-solid text-white rounded-md hover:translate-y-[-3px] duration-300"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactForm;
