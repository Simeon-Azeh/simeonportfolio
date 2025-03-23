import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, Modal, Form, Input, Button, Rate, message, Skeleton, Empty } from 'antd';
import { FaQuoteLeft, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { MdRateReview, MdOutlineVerified } from 'react-icons/md';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where,
  getDocs 
} from 'firebase/firestore';
import { db } from '../firebase';
import confetti from 'canvas-confetti';

const { TextArea } = Input;

// Default testimonials as fallback
const defaultTestimonials = [
  {
    id: 'default-1',
    name: 'James Kakisingi',
    position: 'CEO, Urega Foundation Netherlands',
    image: 'https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png',
    text: 'Simeon has been truly dedicated, he puts in all the effort to building our brand!',
    company: 'Urega Foundation',
    rating: 5
  },
  {
    id: 'default-2',
    name: 'Cedric M.',
    position: 'CEO, CodeXtreme',
    image: 'https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png',
    text: 'Impressive! One thing is for sure, he can get the work done!',
    company: 'CodeXtreme',
    rating: 4.5
  },
  {
    id: 'default-3',
    name: 'Z. Prime',
    position: 'CEO, Multiprime',
    image: 'https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png',
    text: 'Working with Simeon has been a great experience. His attention to detail and creative solutions exceeded our expectations!',
    company: 'Multiprime',
    rating: 5
  }
];

function TestimonialCard({ name, position, image, text, rating, company, socialLinks, gridView = false }) {
  const { t } = useTranslation();
  
  const starRating = rating ? (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {rating % 1 !== 0 && (
        <span className="text-xs ml-1 text-yellow-500">{rating.toFixed(1)}</span>
      )}
    </div>
  ) : null;

  // If in grid view, return a simpler card design
  if (gridView) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6  dark:shadow-none
                   border border-gray-200 dark:border-gray-800 font-inter h-full flex flex-col"
      >
        <div className="absolute -top-3 left-6">
          <FaQuoteLeft className="text-3xl text-pink-600 dark:text-white opacity-20" />
        </div>
        
        <div className="flex items-start mb-4 relative z-10 pt-3">
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-pink-600 dark:border-pink-500">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full rounded-full object-cover" 
              />
            </div>
          </div>
          <div className="ml-3">
            <div className="flex items-center gap-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">{name}</h3>
              {rating && rating >= 4.5 && (
                <span className="inline-flex items-center text-green-600 dark:text-green-400">
                  <MdOutlineVerified size={14} />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{position}</p>
            {starRating}
          </div>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-4">
            "{text}"
          </p>
        </div>
        
        {company && (
          <div className="pt-3 mt-auto border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {company}
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  // Original carousel card design
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full md:w-4/5 mx-auto py-16 px-6 md:px-0"
    >
      <div className="text-left mb-12">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "120px" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6 mx-0"
        />
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:to-gray-300">
            {t('testimonial_title', 'Client Testimonials')}
          </span>
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 max-w-2xl text-left font-inter"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {t('testimonial_intro', 'Discover what clients say about working with me. Their experiences reflect my commitment to delivering exceptional results.')}
        </motion.p>
      </div>

      <motion.div 
        className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 md:p-10 shadow-xl dark:shadow-none relative
                   border border-gray-200 dark:border-gray-800 font-inter overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-100 dark:bg-pink-900/20 rounded-full opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 dark:bg-blue-900/20 rounded-full opacity-50"></div>
        
        <div className="absolute -top-4 left-8">
          <FaQuoteLeft className="text-4xl text-pink-600 dark:text-white opacity-20" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6 relative z-10">
          <motion.div 
            className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-600 dark:border-white p-1"
            whileHover={{ scale: 1.1 }}
          >
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full rounded-full object-cover filter dark:grayscale" 
            />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
              {rating && rating >= 4.5 && (
                <span className="inline-flex items-center text-green-600 dark:text-green-400">
                  <MdOutlineVerified size={18} />
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
            {starRating}
            
            {/* Social links */}
            {socialLinks && (
              <div className="flex mt-2 gap-2">
                {socialLinks.linkedin && (
                  <a 
                    href={socialLinks.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <FaLinkedin size={16} />
                  </a>
                )}
                {socialLinks.twitter && (
                  <a 
                    href={socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    <FaTwitter size={16} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-left mb-4">
            "{text}"
          </p>
          
          {company && (
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {company}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// The rest of your ReviewForm component stays the same
// Just focusing on the ReviewForm component that's missing implementation details:

function ReviewForm({ isOpen, onClose, onReviewSubmitted }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const confettiRef = useRef(null);

  const handleNext = async () => {
    try {
      // Validate current step
      await form.validateFields(['name', 'position', 'email']);
      
      // Store the data
      const values = form.getFieldsValue(['name', 'position', 'email']);
      setFormData(prev => ({ ...prev, ...values }));
      
      // Move to next step
      setCurrentStep(2);
    } catch (error) {
      // Validation failed
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const triggerConfetti = () => {
    if (confettiRef.current) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    try {
      // Combine data from both steps and ensure all required fields are defined
      const completeFormData = { 
        ...formData, 
        ...values,
        // Ensure optional fields have default values
        company: values.company || '',  // Fix for undefined company field
        rating: values.rating || 5
      };
      
      // Add testimonial to Firestore
      const testimonialsRef = collection(db, 'testimonials');
      
      // Create review data with status awaiting approval
      const reviewData = {
        name: completeFormData.name,
        email: completeFormData.email,
        position: completeFormData.position,
        text: completeFormData.text,
        company: completeFormData.company,
        rating: completeFormData.rating,
        timestamp: serverTimestamp(),
        status: 'pending',
        image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
      };
      
      await addDoc(testimonialsRef, reviewData);
      
      // Show success message and confetti effect
      triggerConfetti();
      message.success({
        content: t('review_submitted', 'Thank you! Your review has been submitted and will be published after approval.'),
        duration: 5
      });
      
      // Reset and close
      form.resetFields();
      setCurrentStep(1);
      onClose();
      onReviewSubmitted(); // Trigger refetch of testimonials
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error(t('review_error', 'Failed to submit your review. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setCurrentStep(1);
        form.resetFields();
        onClose();
      }}
      title={
        <div className="text-xl font-bold text-light-text dark:text-light-text font-inter">
          {currentStep === 1 
            ? t('leave_review', 'Share Your Experience') 
            : t('rate_and_review', 'Rate Your Experience')}
        </div>
      }
      footer={null}
      width={600}
      className="review-modal bg-white dark:bg-[#1a1a1a] dark:text-white"
    >
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex">
          <div className={`flex-1 ${currentStep >= 1 ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1 ? 'bg-pink-600 dark:bg-pink-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                1
              </div>
              <div className="ml-2 text-sm font-medium">
                {t('your_info', 'Your Information')}
              </div>
            </div>
          </div>
          <div className="w-12 flex items-center justify-center">
            <div className={`h-1 w-full ${currentStep >= 2 ? 'bg-pink-600 dark:bg-pink-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          </div>
          <div className={`flex-1 ${currentStep >= 2 ? 'text-pink-600 dark:text-pink-400' : 'text-gray-400'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2 ? 'bg-pink-600 dark:bg-pink-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}>
                2
              </div>
              <div className="ml-2 text-sm font-medium">
                {t('your_review', 'Your Review')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div ref={confettiRef}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="mt-4"
        >
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Item 
                  name="name" 
                  label={<span className="text-light-text dark:text-light font-inter">{t('your_name', 'Your Name')}</span>}
                  rules={[{ required: true, message: t('required_field', 'This field is required') }]}
                >
                  <Input 
                    placeholder={t('name_placeholder', 'Enter your full name')} 
                    className="rounded-lg py-2" 
                  />
                </Form.Item>
                
                <Form.Item 
                  name="position" 
                  label={<span className="text-light-text dark:text-light font-inter">{t('your_position', 'Your Position')}</span>}
                  rules={[{ required: true, message: t('required_field', 'This field is required') }]}
                >
                  <Input 
                    placeholder={t('position_placeholder', 'e.g. Marketing Director at Company XYZ')} 
                    className="rounded-lg py-2" 
                  />
                </Form.Item>
                
                <Form.Item 
                  name="email" 
                  label={<span className="text-light-text dark:text-light font-inter">{t('your_email', 'Your Email')}</span>}
                  rules={[
                    { required: true, message: t('required_field', 'This field is required') },
                    { type: 'email', message: t('valid_email', 'Please enter a valid email address') }
                  ]}
                  extra={<span className="text-xs text-gray-500 dark:text-gray-400">{t('email_privacy', 'Your email will not be published')}</span>}
                >
                  <Input 
                    placeholder={t('email_placeholder', 'your@email.com')} 
                    className="rounded-lg py-2" 
                  />
                </Form.Item>
                
                <Form.Item className="mb-0 flex justify-end">
                  <Button 
                    onClick={onClose} 
                    className="mr-2 rounded-lg"
                  >
                    {t('cancel', 'Cancel')}
                  </Button>
                  <Button 
                    type="primary" 
                    onClick={handleNext}
                    className="bg-pink-600 hover:bg-pink-700 border-none rounded-lg"
                  >
                    {t('next', 'Next')}
                  </Button>
                </Form.Item>
              </motion.div>
            )}
            
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Form.Item 
                  name="rating" 
                  label={<span className="text-light-text dark:text-light font-inter">{t('your_rating', 'Your Rating')}</span>}
                  rules={[{ required: true, message: t('required_field', 'Please rate your experience') }]}
                >
                  <Rate 
                    allowHalf 
                    className="text-2xl" 
                  />
                </Form.Item>
                
                <Form.Item 
                  name="text" 
                  label={<span className="text-light-text dark:text-light font-inter">{t('your_testimonial', 'Your Testimonial')}</span>}
                  rules={[
                    { required: true, message: t('required_field', 'This field is required') },
                    { min: 20, message: t('testimonial_min_length', 'Please provide at least 20 characters') }
                  ]}
                >
                  <TextArea 
                    placeholder={t('review_placeholder', 'Share your experience working with me...')} 
                    rows={4} 
                    className="rounded-lg" 
                    showCount
                    maxLength={500}
                  />
                </Form.Item>
                
                <Form.Item 
                  name="company" 
                  label={<span className="text-light-text dark:text-light font-inter">{t('company', 'Company (Optional)')}</span>}
                >
                  <Input 
                    placeholder={t('company_placeholder', 'Company name')} 
                    className="rounded-lg py-2" 
                  />
                </Form.Item>
                
                <Form.Item className="mb-0 flex justify-between">
                  <Button 
                    onClick={handleBack}
                    className="rounded-lg"
                  >
                    <span className="flex items-center">
                      <HiChevronLeft className="mr-1" /> {t('back', 'Back')}
                    </span>
                  </Button>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isSubmitting}
                    className="bg-pink-600 hover:bg-pink-700 border-none rounded-lg"
                  >
                    {t('submit_review', 'Submit Review')}
                  </Button>
                </Form.Item>
              </motion.div>
            )}
          </AnimatePresence>
        </Form>
      </div>
    </Modal>
  );
}

function Testimonial() {
  const { t } = useTranslation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const [displayCount, setDisplayCount] = useState(6); // Initially show 6 (2 rows of 3)
  const carouselRef = useRef(null);

  // Simplified fetchTestimonials function
  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
      // Simplified query without orderBy to avoid the index requirement
      const testimonialsQuery = query(
        collection(db, 'testimonials'),
        where('status', '==', 'approved')
      );
      
      const snapshot = await getDocs(testimonialsQuery);
      
      if (!snapshot.empty) {
        const fetchedTestimonials = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Anonymous',
            position: data.position || '',
            text: data.text || '',
            company: data.company || '',
            image: data.image || 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg',
            rating: data.rating || 5
          };
        });
        
        // If we have real testimonials, use those, otherwise fall back to defaults
        setTestimonials(fetchedTestimonials.length > 0 ? fetchedTestimonials : defaultTestimonials);
      } else {
        // If no approved testimonials, use defaults - can be empty array if we want to show "be the first"
        setTestimonials([]); // Empty array to show "be the first" message
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      // Fallback to empty array to show "be the first" message on error
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handleChange = (current) => {
    setActiveIndex(current);
  };

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  // Show more testimonials
  const showMoreTestimonials = () => {
    setDisplayCount(prevCount => prevCount + 6); // Load 6 more (2 more rows)
  };

  // Header section remains the same for both view modes
  const headerSection = (
    <div className="text-left mb-12">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "120px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6 mx-0"
      />
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4 text-left"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:to-gray-300">
          {t('testimonial_title', 'Client Testimonials')}
        </span>
      </motion.h2>
      <motion.p 
        className="text-gray-600 dark:text-gray-400 max-w-2xl text-left font-inter"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {t('testimonial_intro', 'Discover what clients say about working with me. Their experiences reflect my commitment to delivering exceptional results.')}
      </motion.p>
    </div>
  );

  // Show More Card
  const ShowMoreCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={showMoreTestimonials}
      className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6  dark:shadow-none
                border border-gray-200 dark:border-gray-800 font-inter h-full flex flex-col 
                items-center justify-center cursor-pointer border-dashed"
    >
      <div className="p-6 rounded-full bg-pink-50 dark:bg-pink-900/20 mb-4">
        <svg className="w-10 h-10 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
        {t('show_more', 'Show More')}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        {t('show_more_testimonials', 'View more testimonials from clients')}
      </p>
    </motion.div>
  );

  return (
    <div className="bg-light-body dark:bg-dark-body relative overflow-hidden py-8 md:py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="w-full md:w-4/5 mx-auto relative px-4 md:px-0">
        {headerSection}
        
        {/* View Mode Toggle */}
        {testimonials.length > 0 && (
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  viewMode === 'grid'
                    ? 'bg-pink-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  viewMode === 'carousel'
                    ? 'bg-pink-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 11h16v2H4z"/>
                </svg>
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <Skeleton.Avatar active size={56} />
                    <div>
                      <Skeleton.Input active size="small" style={{ width: 150, marginBottom: 8 }} />
                      <Skeleton.Input active size="small" style={{ width: 100 }} />
                    </div>
                  </div>
                  <Skeleton active paragraph={{ rows: 3 }} />
                </div>
              ))}
            </div>
          </div>
        ) : testimonials.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 md:p-10 shadow-lg dark:shadow-none
                      border border-gray-200 dark:border-gray-800 text-center py-16"
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="text-gray-700 dark:text-gray-300">
                  <p className="text-lg font-medium mb-4">
                    {t('no_testimonials', 'No testimonials yet')}
                  </p>
                  <p className="text-base mb-6">
                    {t('be_first', 'Be the first to share your experience working with me!')}
                  </p>
                  <Button 
                    type="primary"
                    onClick={openReviewModal}
                    className="bg-pink-600 hover:bg-pink-700 border-none px-6 py-2 h-auto"
                    size="large"
                  >
                    <span className="flex items-center gap-2">
                      <MdRateReview size={18} />
                      {t('leave_first_review', 'Leave the First Review')}
                    </span>
                  </Button>
                </div>
              }
            />
          </motion.div>
        ) : viewMode === 'grid' ? (
          // Grid View - 3 cards per row on larger screens
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Display only a subset of testimonials with the "Show More" card if needed */}
            {testimonials.slice(0, displayCount).map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id || index} 
                {...testimonial} 
                gridView={true}
              />
            ))}
            
            {/* Show the "Show More" card if there are more testimonials to display */}
            {testimonials.length > displayCount && (
              <ShowMoreCard />
            )}
          </div>
        ) : (
          // Carousel View
          <div className="relative">
            <Carousel
              ref={carouselRef}
              autoplay
              dots={false}
              effect="fade"
              className="testimonial-carousel"
              afterChange={handleChange}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id || index} {...testimonial} />
              ))}
            </Carousel>
            
            {/* Navigation controls */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none z-10 px-2 md:px-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-white pointer-events-auto"
                aria-label="Previous testimonial"
              >
                <HiChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-white pointer-events-auto"
                aria-label="Next testimonial"
              >
                <HiChevronRight size={20} />
              </motion.button>
            </div>
            
            {/* Custom Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselRef.current?.goTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index
                      ? 'bg-pink-600 dark:bg-pink-500 w-6'
                      : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Leave Review Button - only shown if there are testimonials */}
      {testimonials.length > 0 && (
        <div className="w-full md:w-4/5 mx-auto flex justify-center pb-12 mt-12">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
            onClick={openReviewModal}
            className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 dark:from-pink-700 dark:to-pink-500
                      text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium z-10 relative"
          >
            <MdRateReview size={22} />
            {t('leave_review', 'Share Your Experience')}
          </motion.button>
        </div>
      )}
      
      {/* Review Form Modal */}
      <ReviewForm 
        isOpen={isReviewModalOpen} 
        onClose={closeReviewModal} 
        onReviewSubmitted={fetchTestimonials}
      />
    </div>
  );
}
export default Testimonial;