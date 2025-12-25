import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, Modal, Form, Input, Button, Rate, message, Skeleton, Empty, Select, Progress, Tooltip } from 'antd';
import { FaQuoteLeft, FaLinkedin, FaTwitter, FaStar, FaRegStar } from 'react-icons/fa';
import { MdRateReview, MdOutlineVerified, MdChevronRight } from 'react-icons/md';
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
import CountryFlag from 'react-country-flag';

const COUNTRY_CODE_MAP = {
  'United States': 'US',
  'United Kingdom': 'GB',
  'Canada': 'CA',
  'Nigeria': 'NG',
  'India': 'IN',
  'Germany': 'DE',
  'France': 'FR',
  'Australia': 'AU',
  'South Africa': 'ZA',
  'Brazil': 'BR',
  'Netherlands': 'NL',
  'Italy': 'IT',
  'Spain': 'ES',
  'Ghana': 'GH',
  'Kenya': 'KE',
  'Singapore': 'SG',
  'UAE': 'AE',
  'China': 'CN',
  'Japan': 'JP',
  'Rwanda': 'RW',
  'Israel': 'IL',
  'Cameroon': 'CM',
  'Other': ''
};

const { TextArea } = Input;
const { Option } = Select;

const DEFAULT_AVATAR = 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg';

const COUNTRY_LIST = [
  'United States', 'United Kingdom', 'Canada', 'Nigeria', 'India', 'Germany',
  'France', 'Australia', 'South Africa', 'Brazil', 'Netherlands', 'Italy',
  'Spain', 'Ghana', 'Kenya', 'Singapore', 'UAE', 'China', 'Japan', 'Rwanda',
  'Israel', 'Cameroon', 'Other'
];

// Star Rating Component with hover effect
const StarRating = ({ rating, size = 'default' }) => {
  const sizeMap = {
    small: 'w-3 h-3',
    default: 'w-4 h-4',
    large: 'w-5 h-5'
  };

  const classes = sizeMap[size] || sizeMap.default;

  return rating ? (
    <div className="flex items-center mt-2">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          whileHover={{ scale: 1.2 }}
          className={`${classes} ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
      {rating % 1 !== 0 && (
        <span className="text-xs ml-1 text-yellow-500 font-semibold">{rating.toFixed(1)}</span>
      )}
    </div>
  ) : null;
};

// Letter Avatar Component
const LetterAvatar = ({ name, size = "default", className = "" }) => {
  // Size classes for different avatar dimensions
  const sizeClasses = {
    small: "w-10 h-10 text-base",
    default: "w-14 h-14 text-lg",
    large: "w-20 h-20 text-2xl"
  };

  // Generate a deterministic color based on the name
  const getColorFromName = (name) => {
    const colors = [
      "bg-pink-500 dark:bg-pink-600",
      "bg-blue-500 dark:bg-blue-600",
      "bg-purple-500 dark:bg-purple-600",
      "bg-green-500 dark:bg-green-600",
      "bg-indigo-500 dark:bg-indigo-600",
      "bg-red-500 dark:bg-red-600",
      "bg-amber-500 dark:bg-amber-600",
      "bg-teal-500 dark:bg-teal-600",
      "bg-cyan-500 dark:bg-cyan-600",
      "bg-rose-500 dark:bg-rose-600"
    ];

    // Create a simple hash from the name to select a color
    let hashCode = 0;
    if (name.length === 0) return colors[0];

    for (let i = 0; i < name.length; i++) {
      hashCode = name.charCodeAt(i) + ((hashCode << 5) - hashCode);
    }

    return colors[Math.abs(hashCode) % colors.length];
  };

  // Get the first letter from the name (safely)
  const getFirstLetter = (name) => {
    if (!name || typeof name !== 'string' || name.length === 0) return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  // Determine color and letter
  const firstLetter = getFirstLetter(name);
  const bgColorClass = getColorFromName(name);

  return (
    <div className={`${sizeClasses[size] || sizeClasses.default} ${bgColorClass} rounded-full flex items-center justify-center font-bold text-white ${className}`}>
      {firstLetter}
    </div>
  );
};

// Modern Card Component
function TestimonialCard({ name, position, image, text, rating, company, country, socialLinks, gridView = false, isPreview = false }) {
  const { t } = useTranslation();

  const [isExpanded, setIsExpanded] = useState(false);
  const useLetterAvatar = !image || image === DEFAULT_AVATAR;
  // Grid view card (smaller, simpler design)
  if (gridView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ y: -8, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-zinc-900/80 rounded-xl p-6 dark:shadow-none
                   border border-slate-200 dark:border-zinc-800 font-inter h-full flex flex-col
                   ${isPreview ? 'opacity-70 blur-[1px]' : ''}`}
      >
        <div className="absolute -top-3 left-6">
          <FaQuoteLeft className="text-3xl text-violet-600 dark:text-violet-400 opacity-20" />
        </div>

        <div className="flex items-start mb-4 relative z-10 pt-3">
          <div className="flex-shrink-0">
            {useLetterAvatar ? (
              <LetterAvatar name={name} className="border-2 border-white dark:border-gray-800" />
            ) : (
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-violet-600 dark:border-violet-400">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            )}
          </div>
          <div className="ml-3">
            <div className="flex items-center gap-1">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {(name || '').split(' ').slice(0, 2).join(' ')}
              </h3>
              {rating && rating >= 4.5 && (
                <span className="inline-flex items-center text-green-600 dark:text-green-400">
                  <MdOutlineVerified size={14} />
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">{position}</p>
            <StarRating rating={rating} />
          </div>
        </div>

        <div className="flex-grow overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={isExpanded ? 'expanded' : 'collapsed'}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <p className={`text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-2 ${isExpanded ? '' : 'line-clamp-4'}`}>
                "{text}"
              </p>
              {text.length > 170 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="text-violet-600 dark:text-violet-400 text-xs font-medium hover:underline focus:outline-none transition-colors mt-[4px]"
                >
                  {isExpanded ? t('see_less', 'See less') : t('see_more', 'See more')}
                </button>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {(company || country) && (
          <div className="pt-3 mt-auto border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              {company}
              {company && country && ' · '}
              {country && (
                <>
                  <CountryFlag
                    countryCode={COUNTRY_CODE_MAP[country] || ''}
                    svg
                    style={{ width: '1em', height: '1em', marginRight: '0.2em', verticalAlign: 'middle' }}
                    title={country}
                  />
                  <span className="italic font-bold">{country}</span>
                </>
              )}
            </p>
          </div>
        )}
      </motion.div>
    );
  }
  // Carousel card design (larger, more detailed)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full md:w-4/5 mx-auto py-8 px-6 md:px-0"
    >
      <motion.div
        className="bg-white dark:bg-zinc-900/80 rounded-2xl p-8 md:p-10 shadow-xl dark:shadow-none relative
                   border border-slate-200 border-solid dark:border-zinc-800 font-inter overflow-hidden
                   backdrop-blur-sm"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decoration */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-violet-100 dark:bg-violet-900/20 rounded-full opacity-50"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full opacity-50"></div>

        <div className="absolute -top-4 left-8">
          <FaQuoteLeft className="text-4xl text-violet-600 dark:text-violet-400 opacity-20" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6 relative z-10">
          {useLetterAvatar ? (
            <motion.div whileHover={{ scale: 1.1 }}>
              <LetterAvatar
                name={name}
                size="large"
                className="border-2 border-violet-600 border-solid dark:border-violet-400 p-1"
              />
            </motion.div>
          ) : (
            <motion.div
              className="w-20 h-20 rounded-full overflow-hidden border-2 border-violet-600 border-solid dark:border-violet-400 p-1"
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full rounded-full object-cover filter dark:grayscale"
              />
            </motion.div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{name}</h3>
              {rating && rating >= 4.5 && (
                <Tooltip title="Verified Review">
                  <span className="inline-flex items-center text-green-600 dark:text-green-400">
                    <MdOutlineVerified size={18} />
                  </span>
                </Tooltip>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{position}</p>
            <StarRating rating={rating} size="large" />

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

          {(company || country) && (
            <div className="mt-6 pt-4 border-t border-gray-100 border-solid dark:border-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                {company}
                {company && country && ' · '}
                {country && (
                  <>
                    <CountryFlag
                      countryCode={COUNTRY_CODE_MAP[country] || ''}
                      svg
                      style={{ width: '1.2em', height: '1.2em', marginRight: '0.3em', verticalAlign: 'middle' }}
                      title={country}
                    />
                    <span className="italic">{country}</span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
// Review form component
function ReviewForm({ isOpen, onClose, onReviewSubmitted }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const confettiRef = useRef(null);

  const handleNext = async () => {
    try {
      await form.validateFields(['name', 'position', 'email', 'country']);
      const values = form.getFieldsValue(['name', 'position', 'email', 'country']);
      setFormData(prev => ({ ...prev, ...values }));
      setCurrentStep(2);
    } catch (error) { }
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
      const completeFormData = {
        ...formData,
        ...values,
        company: values.company || '',
        rating: values.rating || 5,
        country: formData.country || values.country || ''
      };

      const testimonialsRef = collection(db, 'testimonials');
      const reviewData = {
        name: completeFormData.name,
        email: completeFormData.email,
        position: completeFormData.position,
        text: completeFormData.text,
        company: completeFormData.company,
        rating: completeFormData.rating,
        country: completeFormData.country,
        timestamp: serverTimestamp(),
        status: 'pending',
        image: DEFAULT_AVATAR
      };

      await addDoc(testimonialsRef, reviewData);

      triggerConfetti();
      message.success({
        content: t('review_submitted', 'Thank you! Your review has been submitted and will be published after approval.'),
        duration: 5
      });

      form.resetFields();
      setCurrentStep(1);
      onClose();
      onReviewSubmitted();
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
      <div className="mb-4 border-b border-gray-200 border-solid dark:border-gray-700 pb-4">
        <div className="flex">
          <div className={`flex-1 ${currentStep >= 1 ? 'text-violet-600 dark:text-violet-400' : 'text-gray-400'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-violet-600 dark:bg-violet-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                1
              </div>
              <div className="ml-2 text-sm font-medium">
                {t('your_info', 'Your Information')}
              </div>
            </div>
          </div>
          <div className="w-12 flex items-center justify-center">
            <div className={`h-1 w-full ${currentStep >= 2 ? 'bg-violet-600 dark:bg-violet-500' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
          </div>
          <div className={`flex-1 ${currentStep >= 2 ? 'text-violet-600 dark:text-violet-400' : 'text-gray-400'}`}>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-violet-600 dark:bg-violet-700 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
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

                <Form.Item
                  name="country"
                  label={<span className="text-light-text dark:text-light font-inter">{t('your_country', 'Your Country')}</span>}
                  rules={[{ required: true, message: t('required_field', 'This field is required') }]}
                >
                  <Select
                    showSearch
                    placeholder={t('country_placeholder', 'Select your country')}
                    className="rounded-lg"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {COUNTRY_LIST.map(country => (
                      <Option key={country} value={country}>{country}</Option>
                    ))}
                  </Select>
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
                    className="bg-violet-600 hover:bg-violet-700 border-none rounded-lg"
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
                    className="bg-violet-600 hover:bg-violet-700 border-none rounded-lg"
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

// ...existing code...

// Review Statistics Summary Component
function ReviewSummary({ testimonials }) {
  const { t } = useTranslation();

  const stats = useMemo(() => {
    if (!testimonials.length) return null;

    // Calculate average rating
    const totalRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / testimonials.length;

    // Count ratings by star
    const ratingCounts = {
      5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    };

    testimonials.forEach(t => {
      const roundedRating = Math.floor(t.rating);
      ratingCounts[roundedRating] = (ratingCounts[roundedRating] || 0) + 1;
    });

    // Get all countries with their counts
    const countries = {};
    testimonials.forEach(t => {
      if (t.country) {
        countries[t.country] = (countries[t.country] || 0) + 1;
      }
    });

    // Sort countries by count (highest first)
    const sortedCountries = Object.entries(countries)
      .sort((a, b) => b[1] - a[1])
      .map(([country, count]) => ({ country, count }));

    return {
      averageRating,
      total: testimonials.length,
      ratingCounts,
      sortedCountries
    };
  }, [testimonials]);

  if (!stats) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] dark:shadow-none mb-8
                border border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-white/90 dark:bg-[#1a1a1a]/90"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Rating */}
        <div className="flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('average_rating', 'Average Rating')}
          </h3>
          <div className="flex items-center mb-2">
            <span className="text-4xl font-bold text-gray-900 dark:text-white mr-2">
              {stats.averageRating.toFixed(1)}
            </span>
            <span className="text-yellow-500">
              <FaStar size={24} />
            </span>
          </div>
          <div className="flex mt-1">
            <StarRating rating={stats.averageRating} size="large" />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {t('from_reviews', 'From {{count}} reviews', { count: stats.total })}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="p-4 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center md:text-left">
            {t('rating_distribution', 'Rating Distribution')}
          </h3>

          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.ratingCounts[rating] || 0;
            const percentage = Math.round((count / stats.total) * 100) || 0;

            return (
              <div key={rating} className="flex items-center mb-2">
                <div className="flex items-center w-10">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{rating}</span>
                  <FaStar className="ml-1 text-yellow-400 w-3 h-3" />
                </div>
                <div className="flex-1 mx-4">
                  <Progress
                    percent={percentage}
                    showInfo={false}
                    strokeColor="#8B5CF6"
                    trailColor="#E5E7EB"
                    className="custom-progress"
                  />
                </div>
                <div className="w-9 text-right">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Country Distribution */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 text-center md:text-left">
            {t('country_distribution', 'Country Distribution')}
          </h3>

          <div className="space-y-3 max-h-48 overflow-y-auto">
            {stats.sortedCountries.map(({ country, count }) => {
              const percentage = Math.round((count / stats.total) * 100) || 0;

              return (
                <motion.div
                  key={country}
                  className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: stats.sortedCountries.indexOf({ country, count }) * 0.05 }}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <CountryFlag
                      countryCode={COUNTRY_CODE_MAP[country] || ''}
                      svg
                      style={{ width: '1.2em', height: '1.2em', flexShrink: 0 }}
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                      {country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {percentage}%
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-violet-100 dark:bg-violet-900/20 
                                   text-violet-600 dark:text-violet-400 rounded-full">
                      {count}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {stats.sortedCountries.length === 0 && (
            <div className="text-center py-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {t('no_country_data', 'No country data available')}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ...existing code...
// Main Testimonial Component
function Testimonial() {
  const { t } = useTranslation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [page, setPage] = useState(0);
  const testimonialsPerPage = 3;
  const carouselRef = useRef(null);

  const fetchTestimonials = async () => {
    setIsLoading(true);
    try {
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
            country: data.country || '',
            image: data.image || DEFAULT_AVATAR,
            rating: data.rating || 5
          };
        });
        setTestimonials(fetchedTestimonials);
      } else {
        setTestimonials([]);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  const handlePrev = () => {
    if (viewMode === 'carousel' && carouselRef.current) {
      carouselRef.current.prev();
    } else {
      setPage(p => Math.max(0, p - 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'carousel' && carouselRef.current) {
      carouselRef.current.next();
    } else {
      setPage(p => Math.min(totalPages - 1, p + 1));
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

  const headerSection = (
    <div className="text-center md:text-left mb-8">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "120px" }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="h-1 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 rounded-full mb-6 mx-auto md:mx-0"
      />
      <motion.h2
        className="text-3xl md:text-4xl font-bold font-montserrat-alt mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-slate-700 dark:from-violet-400 dark:to-slate-200">
          {t('testimonial_title', 'Client Testimonials')}
        </span>
      </motion.h2>
      <motion.p
        className="text-slate-600 dark:text-slate-400 max-w-2xl font-inter mx-auto md:mx-0"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {t('testimonial_intro', 'Discover what clients say about working with me. Their experiences reflect my commitment to delivering exceptional results.')}
      </motion.p>
    </div>
  );

  const currentTestimonials = testimonials.slice(page * testimonialsPerPage, (page * testimonialsPerPage) + testimonialsPerPage);
  const hasNextTestimonial = (page * testimonialsPerPage) + testimonialsPerPage < testimonials.length;

  return (
    <div className="bg-light-body dark:bg-[#09090b] relative overflow-hidden py-12 md:py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="w-full md:w-11/12 lg:w-4/5 mx-auto relative px-4 md:px-6">
        {headerSection}

        {testimonials.length > 0 && (
          <ReviewSummary testimonials={testimonials} />
        )}

        {/* View Mode Toggle */}
        {testimonials.length > 0 && (
          <div className="flex justify-end mb-6">
            <div className="inline-flex rounded-md shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]" role="group">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${viewMode === 'grid'
                  ? 'bg-violet-600 text-white'
                  : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-700'
                  }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('carousel')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${viewMode === 'carousel'
                  ? 'bg-violet-600 text-white'
                  : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-zinc-700'
                  }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 11h16v2H4z" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-[#1a1a1a] rounded-xl p-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]">
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
            className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 md:p-10 shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] dark:shadow-none
                        border border-gray-200 border-solid dark:border-gray-800 text-center py-16"
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
                    className="bg-violet-600 hover:bg-violet-700 border-none px-6 py-2 h-auto"
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
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={testimonial.id || index}
                  {...testimonial}
                  gridView={true}
                />
              ))}

              {/* Preview card with overlay if there are more testimonials */}
              {hasNextTestimonial && testimonials.length > 3 && (
                <div className="relative col-span-1">
                  <TestimonialCard
                    {...testimonials[page * testimonialsPerPage + 3]}
                    gridView={true}
                    isPreview={true}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100/70 dark:to-gray-900/70 
                            rounded-xl flex items-center justify-center cursor-pointer transition-all group"
                    onClick={handleNext}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-violet-600 text-white px-4 py-2 rounded-lg shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] 
                               flex items-center group-hover:shadow-xl transition-all"
                    >
                      <span>{t('see_more', 'See More')}</span>
                      <MdChevronRight className="ml-1" />
                    </motion.button>
                  </div>
                </div>
              )}
            </div>


            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrev}
                    disabled={page === 0}
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                              ${page === 0
                        ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white shadow-md'}`}
                    aria-label="Previous page"
                  >
                    <HiChevronLeft size={20} />
                  </motion.button>

                  <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]">
                    <span className="text-sm font-medium text-gray-700 dark:text-white">
                      {page + 1} / {totalPages}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    disabled={page >= totalPages - 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center
                              ${page >= totalPages - 1
                        ? 'bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-white shadow-md'}`}
                    aria-label="Next page"
                  >
                    <HiChevronRight size={20} />
                  </motion.button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="relative">
            <Carousel
              ref={carouselRef}
              autoplay
              dots={false}
              effect="fade"
              pauseOnHover={true}
              autoplaySpeed={5000} // 5 seconds instead of the default 3 seconds
              className="testimonial-carousel"
              afterChange={handleChange}
            >
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={testimonial.id || index} {...testimonial} />
              ))}
            </Carousel>

            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between pointer-events-none z-10 px-2 md:px-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md 
                          flex items-center justify-center text-gray-700 dark:text-white pointer-events-auto
                          hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <HiChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md 
                          flex items-center justify-center text-gray-700 dark:text-white pointer-events-auto
                          hover:bg-white dark:hover:bg-gray-700 transition-colors"
                aria-label="Next testimonial"
              >
                <HiChevronRight size={20} />
              </motion.button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => carouselRef.current?.goTo(index)}
                  className={`w-2 h-2 rounded-full transition-all ${activeIndex === index
                    ? 'bg-violet-600 dark:bg-violet-400 w-6'
                    : 'bg-slate-300 dark:bg-zinc-700'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Leave a review button */}
      <div className="w-full md:w-4/5 mx-auto flex justify-center pb-8 mt-16">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.4)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
          onClick={openReviewModal}
          className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-500 dark:to-purple-500
                    text-white px-8 py-4 rounded-full shadow-[0_4px_12px_0_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 font-medium z-10 relative"
        >
          <MdRateReview size={22} />
          {t('leave_review', 'Share Your Experience')}
        </motion.button>
      </div>

      <ReviewForm
        isOpen={isReviewModalOpen}
        onClose={closeReviewModal}
        onReviewSubmitted={fetchTestimonials}
      />
    </div>
  );
}

export default Testimonial;