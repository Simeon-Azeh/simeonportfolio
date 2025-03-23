import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Form, Input, Button, Rate, message, Steps, Card, Alert } from 'antd';
import { MdRateReview, MdOutlineVerified, MdOutlineMarkEmailRead } from 'react-icons/md';
import { FaQuoteLeft, FaRegThumbsUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import confetti from 'canvas-confetti';
import SEO from '../components/SEO';

const { TextArea } = Input;
const { Step } = Steps;

const Reviews = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const confettiRef = useRef(null);
  const [previewData, setPreviewData] = useState(null);

  // Check if the form was already submitted (store in localStorage)
  useEffect(() => {
    const hasSubmitted = localStorage.getItem('testimonial_submitted');
    if (hasSubmitted) {
      setIsSubmitted(true);
    }
  }, []);

  const triggerConfetti = () => {
    if (confettiRef.current) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6']
      });
    }
  };

  const steps = [
    {
      title: t('your_info', 'Your Information'),
      content: (
        <div className="space-y-6">
          <Form.Item 
            name="name" 
            label={<span className="text-light-text dark:text-light font-inter">{t('your_name', 'Your Name')}</span>}
            rules={[{ required: true, message: t('required_field', 'This field is required') }]}
          >
            <Input 
              placeholder={t('name_placeholder', 'Enter your full name')} 
              className="rounded-lg py-2" 
              size="large"
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
              size="large"
            />
          </Form.Item>
          
          <Form.Item 
            name="email" 
            label={<span className="text-light-text dark:text-light font-inter">{t('your_email', 'Your Email')}</span>}
            rules={[
              { required: true, message: t('required_field', 'This field is required') },
              { type: 'email', message: t('valid_email', 'Please enter a valid email address') }
            ]}
            extra={<span className="text-xs text-gray-500 dark:text-gray-400">{t('email_privacy', 'Your email will not be published and is only used for verification.')}</span>}
          >
            <Input 
              placeholder={t('email_placeholder', 'your@email.com')} 
              className="rounded-lg py-2" 
              size="large"
            />
          </Form.Item>

          <Form.Item 
            name="company" 
            label={<span className="text-light-text dark:text-light font-inter">{t('company', 'Company (Optional)')}</span>}
          >
            <Input 
              placeholder={t('company_placeholder', 'Company name')} 
              className="rounded-lg py-2" 
              size="large"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: t('your_testimonial', 'Your Testimonial'),
      content: (
        <div className="space-y-6">
          <Form.Item 
            name="rating" 
            label={<span className="text-light-text dark:text-light font-inter text-lg">{t('your_rating', 'Your Rating')}</span>}
            rules={[{ required: true, message: t('required_field', 'Please rate your experience') }]}
          >
            <Rate 
              allowHalf 
              className="text-3xl" 
              character={<FaRegThumbsUp />}
            />
          </Form.Item>
          
          <Form.Item 
            name="text" 
            label={<span className="text-light-text dark:text-light font-inter text-lg">{t('your_testimonial', 'Your Testimonial')}</span>}
            rules={[
              { required: true, message: t('required_field', 'This field is required') },
              { min: 20, message: t('testimonial_min_length', 'Please provide at least 20 characters') }
            ]}
          >
            <TextArea 
              placeholder={t('review_placeholder', 'Share your experience working with me. What was the project? What did you like? What was the outcome?')} 
              rows={6} 
              className="rounded-lg"
              showCount
              maxLength={500}
              size="large"
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: t('preview', 'Preview & Submit'),
      content: (
        <div className="space-y-6">
          {previewData ? (
            <div className="mt-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                {t('preview_message', 'Please review your testimonial before submitting.')}
              </p>
              
              <Card className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <div className="absolute top-0 left-4 opacity-10">
                    <FaQuoteLeft className="text-5xl text-pink-600 dark:text-white" />
                  </div>
                  
                  <div className="flex items-start gap-4 mb-4 relative z-10">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
                      {previewData.name.slice(0, 1).toUpperCase()}
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {previewData.name}
                        {previewData.rating >= 4.5 && (
                          <span className="inline-flex items-center text-green-600 dark:text-green-400">
                            <MdOutlineVerified size={18} />
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">{previewData.position}</p>
                      
                      <div className="flex items-center mt-1">
                        <Rate disabled defaultValue={previewData.rating} />
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-gray-800 dark:text-gray-200 text-lg leading-relaxed pl-6 border-l-2 border-pink-200 dark:border-pink-800 italic">
                    "{previewData.text}"
                  </div>
                  
                  {previewData.company && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 text-right">
                      <span className="text-gray-500 dark:text-gray-400 text-sm">
                        {previewData.company}
                      </span>
                    </div>
                  )}
                </div>
              </Card>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <div className="mr-3 text-blue-500 dark:text-blue-400 mt-0.5">
                    <MdOutlineMarkEmailRead size={20} />
                  </div>
                  <div>
                    <p className="text-blue-800 dark:text-blue-300 text-sm">
                      {t('approval_notice', 'Your testimonial will be reviewed before appearing on the site. This usually takes 1-2 business days.')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-40">
              <p className="text-gray-500 dark:text-gray-400">
                {t('loading_preview', 'Loading preview...')}
              </p>
            </div>
          )}
        </div>
      ),
    },
  ];

  const handleNext = async () => {
    try {
      let values;
      
      if (currentStep === 0) {
        // Validate first step
        values = await form.validateFields(['name', 'position', 'email', 'company']);
        setFormData({ ...formData, ...values });
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 1) {
        // Validate second step
        values = await form.validateFields(['rating', 'text']);
        const newFormData = { ...formData, ...values };
        setFormData(newFormData);
        setPreviewData(newFormData);
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      // Form validation failed
      console.log('Validation failed:', error);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Create review data with status awaiting approval
      const reviewData = {
        name: formData.name,
        email: formData.email,
        position: formData.position,
        text: formData.text,
        company: formData.company || '',
        rating: formData.rating,
        timestamp: serverTimestamp(),
        status: 'pending',
        image: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
      };
      
      // Add testimonial to Firestore
      const testimonialsRef = collection(db, 'testimonials');
      await addDoc(testimonialsRef, reviewData);
      
      // Show success message and confetti effect
      triggerConfetti();
      message.success({
        content: t('review_submitted', 'Thank you! Your review has been submitted and will be published after approval.'),
        duration: 5
      });
      
      // Set as submitted in localStorage to prevent multiple submissions
      localStorage.setItem('testimonial_submitted', 'true');
      setIsSubmitted(true);
      
      // Reset the form
      form.resetFields();
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error(t('review_error', 'Failed to submit your review. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-light-body dark:bg-dark-body py-16 px-4 sm:px-6 lg:px-8"
      ref={confettiRef}
    >
      <SEO 
        title="Leave a Review - Simeon's Portfolio"
        description="Share your experience working with Simeon. Your feedback helps others make informed decisions."
      />
      
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:to-gray-300">
              {t('leave_review_page_title', 'Share Your Experience')}
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('leave_review_page_description', 'Thank you for considering to share your feedback. Your testimonial helps others understand the quality and value of my work.')}
          </p>
        </div>
        
        {isSubmitted ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg text-center"
          >
            <div className="mb-6 text-green-500 flex justify-center">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {t('already_submitted_title', 'Thank You for Your Testimonial!')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('already_submitted_message', 'You have already submitted a testimonial. Thank you for your feedback and support!')}
            </p>
            <Button 
              type="primary" 
              size="large"
              onClick={() => {
                localStorage.removeItem('testimonial_submitted');
                setIsSubmitted(false);
                setCurrentStep(0);
                form.resetFields();
              }}
              className="bg-pink-600 hover:bg-pink-700 border-none"
            >
              {t('submit_another', 'Submit Another Review')}
            </Button>
          </motion.div>
        ) : (
          <Card className="shadow-lg rounded-xl">
            <Steps current={currentStep} className="mb-8">
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            
            <Form
              form={form}
              layout="vertical"
              className="mb-6"
              initialValues={{
                rating: 5 // Default rating
              }}
            >
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {steps[currentStep].content}
              </motion.div>
            </Form>
            
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button 
                  onClick={handlePrev} 
                  className="rounded-lg border border-gray-300 dark:border-gray-600"
                  size="large"
                >
                  {t('previous', 'Previous')}
                </Button>
              )}
              
              <div className="ml-auto">
                {currentStep < steps.length - 1 && (
                  <Button 
                    type="primary" 
                    onClick={handleNext}
                    className="bg-pink-600 hover:bg-pink-700 border-none rounded-lg"
                    size="large"
                  >
                    {t('next', 'Next')}
                  </Button>
                )}
                
                {currentStep === steps.length - 1 && (
                  <Button 
                    type="primary" 
                    onClick={handleSubmit}
                    loading={isSubmitting}
                    className="bg-pink-600 hover:bg-pink-700 border-none rounded-lg"
                    size="large"
                    icon={<MdRateReview className="mr-1" />}
                  >
                    {t('submit_testimonial', 'Submit Testimonial')}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </motion.div>
  );
};

export default Reviews;