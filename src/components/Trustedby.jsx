import React from 'react';
import { motion } from 'framer-motion';
import logo1 from '../../public/images/sidec.png';
import logo2 from '../../public/images/afiacare.svg';
import logo3 from '../../public/images/alu.png';
import logo4 from '../../public/images/urega.png';
import logo5 from '../../public/images/logo3.png'
import logo6 from '../../public/images/logo4.png'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TrustedBy = () => {
  const { t } = useTranslation();

  const logos = [
    { src: logo1, alt: "SIDEC Logo", width: "22" },
    { src: logo2, alt: "Afiacare Logo", width: "60" },
    { src: logo3, alt: "ALU Logo", width: "36" },
    { src: logo4, alt: "Urega Logo", width: "20" },
    { src: logo5, alt: "Bucabus", width: "60"},
    { src: logo6, alt: "Fakaba", width: "60"}
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-16 bg-light-body dark:bg-dark-body transition-colors duration-500 font-inter relative"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        {/* Section Title with Accent Bar - Left Aligned */}
        <div className="mb-16 flex flex-col items-start">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6"
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-left bg-gradient-to-r from-pink-500 to-light-text dark:text-white/90 bg-clip-text text-transparent"
          >
            {t('TrustedBy')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-left"
          >
            {t('trustedBySubtitle')}
          </motion.p>
        </div>

        {/* Logo Showcase */}
        <div className="relative">
          {/* Logos Container */}
          <motion.div 
            className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {logos.map((logo, index) => (
              <LogoCard key={logo.alt} logo={logo} index={index} />
            ))}
          </motion.div>
        </div>
        
        {/* Call to Action - Left Aligned */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-pink-500 to-light-text dark:text-white/80 bg-clip-text text-transparent">
            {t('joinCompanies')}
          </h3>
          <Link to="/contact">
            <motion.button 
              className="group flex items-center gap-2 px-8 py-3 bg-pink-600 dark:bg-white text-white dark:text-[#414760] rounded-lg font-medium 
                       shadow-lg shadow-pink-600/20 dark:shadow-white/10
                       hover:transform hover:translate-y-[-2px] transition-all duration-300
                       hover:shadow-xl hover:shadow-pink-600/30 dark:hover:shadow-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('getInTouch')}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

const LogoCard = ({ logo, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        y: -5,
      }}
      className={`
        relative group p-5 md:p-6
        rounded-xl bg-white dark:bg-[#1a1a1a] dark:border-gray-800 dark:border
        shadow-lg shadow-gray-100/50 dark:shadow-none
        border border-gray-100 dark:border-gray-700/50
        hover:border-pink-600/30 dark:hover:border-white/30
        transition-all duration-300
      `}
    >
      <div className="relative w-full h-16 md:h-20 flex items-center justify-center">
        <img 
          src={logo.src} 
          alt={logo.alt} 
          className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
        />
        
        {/* Enhanced Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-pink-600/10 to-blue-600/5 dark:from-pink-500/10 dark:to-white/5 blur-xl transition-opacity"
        />
      </div>
    </motion.div>
  );
};

export default TrustedBy;