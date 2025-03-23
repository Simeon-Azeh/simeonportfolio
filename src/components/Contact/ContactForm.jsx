import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiSend, FiUser, FiMail, FiMessageSquare, FiCheckCircle, FiAlertCircle, 
  FiCornerDownRight, FiBriefcase, FiCode, FiHelpCircle, FiCoffee 
} from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase'; // Make sure the path to firebase.js is correct

const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);
  const subjectInputRef = useRef(null);
  
  const subjectSuggestions = [
    { icon: <FiBriefcase />, text: t('subject_project', 'Project Inquiry'), value: 'Project Inquiry' },
    { icon: <FiCode />, text: t('subject_collaboration', 'Collaboration Opportunity'), value: 'Collaboration Opportunity' },
    { icon: <FiHelpCircle />, text: t('subject_question', 'Question About Services'), value: 'Question About Services' },
    { icon: <FiCoffee />, text: t('subject_chat', "Let's Chat"), value: "Let's Chat" }
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    // Close subject suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (subjectInputRef.current && !subjectInputRef.current.contains(event.target)) {
        setShowSubjectSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('name_required', 'Name is required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('email_required', 'Email is required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('email_invalid', 'Email is invalid');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('message_required', 'Message is required');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('message_too_short', 'Message is too short (minimum 10 characters)');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubjectFocus = () => {
    setShowSubjectSuggestions(true);
  };

  const selectSubjectSuggestion = (suggestion) => {
    setFormData({ ...formData, subject: suggestion });
    setShowSubjectSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Save form data to Firestore
      const formSubmissionsRef = collection(db, 'contactFormSubmissions');
      
      // Add timestamp and status
      const submissionData = {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'new',
        source: 'contact-form',
        userAgent: navigator.userAgent,
        language: navigator.language || 'unknown'
      };
      
      // Submit to Firestore
      await addDoc(formSubmissionsRef, submissionData);
      
      console.log('Form data submitted to Firestore:', submissionData);
      
      // Success!
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form to Firestore:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-form" className="bg-white dark:bg-dark-body font-inter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-[#1B1B1A] rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden border border-gray-100 dark:border-gray-800"
        >
          <div className="bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-700 dark:to-pink-800 py-6 px-8 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute left-16 bottom-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2"></div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {t('get_in_touch', 'Get in Touch')}
            </h2>
            <p className="text-white/80 mt-2 relative z-10">
              {t('form_description', "I'm excited to hear about your project. Fill out the form below and I'll get back to you as soon as possible.")}
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="p-8"
          >
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 dark:text-white mb-1">
                  <FiUser className="mr-2 text-gray-500 dark:text-gray-400" /> {t('your_name', 'Your Name')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 border ${
                      errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-800'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors`}
                    placeholder={t('name_placeholder', 'Enter your full name')}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 dark:text-white mb-1">
                  <FiMail className="mr-2 text-gray-500 dark:text-gray-400" /> {t('your_email', 'Your Email')}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 border ${
                      errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-800'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors`}
                    placeholder={t('email_placeholder', 'your@email.com')}
                  />
                  {errors.email && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="flex items-center text-sm font-medium text-gray-700 dark:text-white mb-1">
                  <FiMessageSquare className="mr-2 text-gray-500 dark:text-gray-400" /> {t('subject', 'Subject')} <span className="text-gray-400 ml-1">{t('optional', '(Optional)')}</span>
                </label>
                <div className="relative" ref={subjectInputRef}>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={handleSubjectFocus}
                    className="block w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 border border-gray-300 dark:border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors"
                    placeholder={t('subject_placeholder', 'What is this regarding?')}
                  />
                  
                  <AnimatePresence>
                    {showSubjectSuggestions && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                      >
                        <div className="p-2 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700">
                          <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <FiCornerDownRight className="mr-1" /> {t('subject_suggestions', 'Popular subject lines')}
                          </p>
                        </div>
                        <div className="py-1">
                          {subjectSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => selectSubjectSuggestion(suggestion.value)}
                              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                            >
                              <span className="mr-2 text-gray-500 dark:text-gray-400">{suggestion.icon}</span>
                              {suggestion.text}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-700 dark:text-white mb-1">
                  <FiMessageSquare className="mr-2 text-gray-500 dark:text-gray-400" /> {t('your_message', 'Your Message')}
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`block w-full px-4 py-3 text-gray-900 dark:text-white bg-white dark:bg-gray-800/50 border ${
                      errors.message ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-800'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors`}
                    rows="5"
                    placeholder={t('message_placeholder', 'Describe your project, ask a question, or just say hello!')}
                  />
                  {errors.message && (
                    <div className="text-red-500 text-sm mt-1 flex items-center">
                      <FiAlertCircle className="mr-1" />
                      {errors.message}
                    </div>
                  )}
                </div>
              </div>
              
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start"
                >
                  <FiCheckCircle className="text-green-500 text-lg mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-800 dark:text-green-400 font-medium">
                      {t('message_sent', 'Message sent successfully!')}
                    </h4>
                    <p className="text-green-700 dark:text-green-500 text-sm mt-1">
                      {t('thank_you_message', "Thank you for reaching out. I'll get back to you as soon as possible.")}
                    </p>
                  </div>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                >
                  <div className="flex">
                    <FiAlertCircle className="text-red-500 text-lg mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="text-red-800 dark:text-red-400 font-medium">
                        {t('message_error', 'Something went wrong!')}
                      </h4>
                      <p className="text-red-700 dark:text-red-500 text-sm mt-1">
                        {t('error_message', "There was an error sending your message. Please try again or contact me directly via email.")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 text-white font-medium rounded-lg shadow-lg ${
                    isSubmitting 
                      ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed' 
                      : 'bg-pink-600 hover:bg-pink-700 dark:bg-pink-700 dark:hover:bg-pink-800 shadow-pink-500/20'
                  } transition-all duration-300`}
                  whileHover={!isSubmitting ? { y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {t('sending', 'Sending...')}
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" /> {t('send_message', 'Send Message')}
                    </>
                  )}
                </motion.button>
              </div>
            </div>
          </form>
        </motion.div>
        
        {/* Alternative contact info */}
        <div className="mt-10 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {t('prefer_email', 'Prefer to email me directly?')} 
            <a href="mailto:hello@simeonazeh.com" className="text-pink-600 dark:text-pink-400 font-medium ml-1 hover:underline">
              hello@simeonazeh.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;