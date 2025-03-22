import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiMessageSquare, FiArrowLeft } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Graphic */}
            <div className="relative mb-8">
              <div className="text-[180px] md:text-[240px] font-bold text-pink-500/10 dark:text-pink-600/10 leading-none">
                404
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">
                  Page Not Found
                </h1>
              </div>
            </div>
            
            {/* Error message */}
            <div className="mb-12">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Let's get you back on track.
              </p>
            </div>
            
            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white rounded-lg shadow-lg hover:bg-pink-700 transition-colors"
              >
                <FiHome className="mr-2" />
                Back to Home
              </Link>
              
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowLeft className="mr-2" />
                View Portfolio
              </Link>
              
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiMessageSquare className="mr-2" />
                Contact Me
              </Link>
            </div>
          </motion.div>
          
          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-16 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
          >
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              You might be looking for:
            </h2>
            
            <div className="grid gap-2">
              <Link 
                to="/portfolio" 
                className="p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-pink-600 dark:text-pink-400"
              >
                → My portfolio projects
              </Link>
              <Link 
                to="/services" 
                className="p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-pink-600 dark:text-pink-400"
              >
                → Services I offer
              </Link>
              <Link 
                to="/resume" 
                className="p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-pink-600 dark:text-pink-400"
              >
                → My resume and experience
              </Link>
              <Link 
                to="/contact" 
                className="p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors text-pink-600 dark:text-pink-400"
              >
                → Contact information
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;