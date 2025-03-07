import React from 'react';
import { motion } from 'framer-motion';
import logo1 from '../../public/images/sidec.png';
import logo2 from '../../public/images/afiacare.svg';
import logo3 from '../../public/images/alu.png';
import logo4 from '../../public/images/urega.png';
import logo5 from '../../public/images/logo3.png'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const TrustedBy = () => {
  const { t } = useTranslation();

  const logos = [
    { src: logo1, alt: "SIDEC Logo", width: "32" },
    { src: logo2, alt: "Afiacare Logo", width: "40" },
    { src: logo3, alt: "ALU Logo", width: "36" },
    { src: logo4, alt: "Urega Logo", width: "40" },
    { src: logo5, alt: "Bucabus", width: "60"}
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
        {/* Section Title with Accent Bar */}
        <div className="mb-16 flex flex-col items-center">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6"
          />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-light-text dark:text-white mb-4 text-center"
          >
            {t('TrustedBy')}
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl text-center"
          >
            {t('trustedBySubtitle')}
          </motion.p>
        </div>

        {/* Logo Showcase */}
        <div className="relative">
          {/* Gradient Overlays */}

          
          {/* Logos Container */}
          <motion.div 
            className="py-12 flex flex-wrap justify-center gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {logos.map((logo, index) => (
              <LogoCard key={logo.alt} logo={logo} index={index} />
            ))}
          </motion.div>
        </div>
        
        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-light-text dark:text-white mb-6">
            {t('joinCompanies')}
          </h3>
          <Link to="/contact">
            <motion.button 
              className="group px-8 py-3 bg-pink-600 dark:bg-white text-white dark:text-[#414760] rounded-lg font-medium 
                       shadow-lg shadow-pink-600/20 dark:shadow-white/10
                       hover:transform hover:translate-y-[-2px] transition-all duration-300
                       hover:shadow-xl hover:shadow-pink-600/30 dark:hover:shadow-white/20"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('getInTouch')}
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
        relative group p-6 md:p-8
        rounded-2xl bg-white dark:bg-[#1a1a1a] dark:border-gray-800 dark:border-2
        shadow-lg shadow-gray-100/50 dark:shadow-none
        border border-gray-100 dark:border-gray-700/50
        hover:border-pink-600/30 dark:hover:border-white/30
        transition-all duration-300
      `}
    >
      <div className="relative w-28 md:w-32 h-16 md:h-20 flex items-center justify-center">
        <img 
          src={logo.src} 
          alt={logo.alt} 
          className="w-full h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
        />
        
        {/* Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-pink-600/5 to-blue-600/5 dark:from-white/5 dark:to-white/10 blur-xl transition-opacity"
        />
      </div>
    </motion.div>
  );
};

export default TrustedBy;