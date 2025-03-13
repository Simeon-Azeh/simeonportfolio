import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BsCalendar, BsClock, BsPerson, BsEnvelope } from 'react-icons/bs';
import { FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const RequestBooking = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web-development',
    date: '',
    time: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const services = [
    { id: 'web-development', name: t('pricing_web_dev_title') },
    { id: 'product-design', name: t('pricing_product_design_title') },
    { id: 'mobile-development', name: t('pricing_mobile_dev_title') },
    { id: 'custom-solution', name: t('pricing_custom_title') }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when field is modified
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string | null } = {};
    if (!formData.name.trim()) newErrors.name = t('error_name_required');
    if (!formData.email.trim()) {
      newErrors.email = t('error_email_required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('error_email_invalid');
    }
    if (!formData.date) newErrors.date = t('error_date_required');
    if (!formData.time) newErrors.time = t('error_time_required');
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        service: 'web-development',
        date: '',
        time: '',
        message: '',
      });
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16 bg-light-body dark:bg-dark-body transition-colors font-inter"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>
      
      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        <div className="mb-12 flex flex-col items-start">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "80px" }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6"
          />
          
          <motion.h1 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-light-text dark:from-white dark:to-white bg-clip-text text-transparent"
          >
            {t('booking_title') || 'Request a Booking'}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-white/80 max-w-2xl"
          >
            {t('booking_description') || 'Fill out the form below to schedule a consultation for your project. I\'ll get back to you within 24 hours to confirm your booking.'}
          </motion.p>
        </div>

        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-12 text-center max-w-2xl mx-auto border border-gray-100 dark:border-gray-800 shadow-lg"
          >
            <FaCheckCircle className="text-pink-600 dark:text-white mx-auto text-5xl mb-6" />
            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-white">
              {t('booking_success_title') || 'Booking Request Received!'}
            </h2>
            <p className="text-gray-600 dark:text-white/80 mb-8">
              {t('booking_success_message') || 'Thank you for your booking request. I\'ll review your project details and get back to you shortly to confirm your appointment.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-light-text text-white rounded-lg font-medium shadow-lg shadow-pink-600/20 hover:shadow-xl transition-all"
            >
              {t('booking_new_request') || 'Make Another Request'}
            </motion.button>
          </motion.div>
        ) : (
          <motion.form 
            variants={containerVariants}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="name" className="block text-gray-700 dark:text-white font-medium">
                  {t('form_name') || 'Your Name'} <span className="text-pink-600">*</span>
                </label>
                <div className="relative">
                  <BsPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border ${
                      errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white`}
                    placeholder={t('form_name_placeholder') || 'Enter your full name'}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="email" className="block text-gray-700 dark:text-white font-medium">
                  {t('form_email') || 'Email Address'} <span className="text-pink-600">*</span>
                </label>
                <div className="relative">
                  <BsEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border ${
                      errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white`}
                    placeholder={t('form_email_placeholder') || 'Enter your email address'}
                  />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="service" className="block text-gray-700 dark:text-white font-medium">
                  {t('form_service') || 'Service Required'}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg text-gray-800/40 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white appearance-none"
                >
                  {services.map(service => (
                    <option key={service.id} value={service.id}>{service.name}</option>
                  ))}
                </select>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="date" className="block text-gray-700 dark:text-white font-medium">
                  {t('form_date') || 'Preferred Date'} <span className="text-pink-600">*</span>
                </label>
                <div className="relative">
                  <BsCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border ${
                      errors.date ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label htmlFor="time" className="block text-gray-700 dark:text-white font-medium">
                  {t('form_time') || 'Preferred Time'} <span className="text-pink-600">*</span>
                </label>
                <div className="relative">
                  <BsClock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border ${
                      errors.time ? 'border-red-500 dark:border-red-400' : 'border-gray-200 dark:border-gray-700'
                    } focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white`}
                  />
                </div>
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="block text-gray-700 dark:text-white font-medium">
                  {t('form_message') || 'Project Details'}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:text-white"
                  placeholder={t('form_message_placeholder') || 'Tell me about your project and specific requirements...'}
                ></textarea>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-600 to-light-text text-white rounded-lg font-medium 
                          shadow-lg shadow-pink-600/20 hover:shadow-xl transition-all
                          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{t('form_submitting') || 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <span>{t('form_submit') || 'Request Booking'}</span>
                    <FaArrowRight />
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
};

export default RequestBooking;