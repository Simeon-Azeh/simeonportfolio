import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Carousel, Modal, Form, Input, Button, Rate, message } from 'antd';
import { FaQuoteLeft } from 'react-icons/fa';
import { MdRateReview } from 'react-icons/md';
import { useTranslation } from 'react-i18next';


const { TextArea } = Input;

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
            {t('testimonial_title')}
          </span>
        </motion.h2>
        <motion.p 
          className="text-gray-600 dark:text-gray-400 max-w-2xl text-left font-inter"
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

        <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed text-left">
          "{text}"
        </p>
      </motion.div>
    </motion.div>
  );
}

function ReviewForm({ isOpen, onClose }) {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    // Here you would typically send the data to your backend
    // For now we'll just simulate a delay and show a success message
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success(t('review_submitted'));
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(t('review_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title={<div className="text-xl font-bold text-light-text dark:text-light-text font-inter ">{t('leave_review')}</div>}
      footer={null}
      width={600}
      className="review-modal bg-white dark:bg-[#1a1a1a] dark:text-white"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-4"
      >
        <Form.Item 
          name="name" 
          label={<span className="text-light-text dark:text-light font-inter">{t('your_name')}</span>}
          rules={[{ required: true, message: t('required_field') }]}
        >
          <Input 
            placeholder={t('name_placeholder')} 
            className="rounded-lg py-2" 
          />
        </Form.Item>
        
        <Form.Item 
          name="position" 
          label={<span className="text-light-text dark:text-light font-inter">{t('your_position')}</span>}
          rules={[{ required: true, message: t('required_field') }]}
        >
          <Input 
            placeholder={t('position_placeholder')} 
            className="rounded-lg py-2" 
          />
        </Form.Item>
        
        <Form.Item 
          name="email" 
          label={<span className="text-light-text dark:text-light font-inter">{t('your_email')}</span>}
          rules={[
            { required: true, message: t('required_field') },
            { type: 'email', message: t('valid_email') }
          ]}
        >
          <Input 
            placeholder={t('email_placeholder')} 
            className="rounded-lg py-2" 
          />
        </Form.Item>
        
        <Form.Item 
          name="rating" 
          label={<span className="text-light-text dark:text-light font-inter">{t('your_rating')}</span>}
          rules={[{ required: true, message: t('required_field') }]}
        >
          <Rate allowHalf />
        </Form.Item>
        
        <Form.Item 
          name="review" 
          label={<span className="text-light-text dark:text-light font-inter">{t('your_review')}</span>}
          rules={[{ required: true, message: t('required_field') }]}
        >
          <TextArea 
            placeholder={t('review_placeholder')} 
            rows={4} 
            className="rounded-lg" 
          />
        </Form.Item>
        
        <Form.Item className="mb-0 flex justify-end">
          <Button 
            onClick={onClose} 
            className="mr-2 rounded-lg"
          >
            {t('cancel')}
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isSubmitting}
            className="bg-pink-600 hover:bg-pink-700 border-none rounded-lg"
          >
            {t('submit_review')}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

function Testimonial() {
  const { t } = useTranslation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const openReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  return (
    <div className="bg-light-body dark:bg-dark-body relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="w-full md:w-4/5 mx-auto">
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
      
      {/* Leave Review Button - Moved outside the carousel container */}
      <div className="w-full md:w-4/5 mx-auto flex justify-center pb-12 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openReviewModal}
          className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-light-text dark:from-white dark:bg-white
                    text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-medium z-10 relative dark:text-light-text"
        >
          <MdRateReview size={20} />
          {t('leave_review')}
        </motion.button>
      </div>
      
      {/* Review Form Modal */}
      <ReviewForm isOpen={isReviewModalOpen} onClose={closeReviewModal} />
    </div>
  );
}

export default Testimonial;