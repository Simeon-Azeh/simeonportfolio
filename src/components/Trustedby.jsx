import React, { useRef, useLayoutEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import logo1 from '../../public/images/sidec.png';
import logo2 from '../../public/images/afiacare.svg';
import logo3 from '../../public/images/alu.png';
import logo4 from '../../public/images/urega.png';
import logo5 from '../../public/images/logo3.png';
import logo6 from '../../public/images/logo4.png';
import logo7 from '../../public/images/logo6.png';
import logo8 from '../../public/images/logo7.png';
import logo9 from '../../public/images/logo9.svg';
import logo10 from '../../public/images/logo10.png';
import logo11 from '../../public/images/logo11.svg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const TrustedBy = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const controls = useAnimation();
  const mounted = useRef(false);

  // Add more logos to create a better scrolling experience
  const logos = [
    {
      src: logo1,
      alt: "SIDEC Logo",
      width: "22",
      description: "Innovation Partner"
    },
    {
      src: logo2,
      alt: "Afiacare Logo",
      width: "60",
      description: "Healthcare Solution"
    },
    {
      src: logo3,
      alt: "ALU Logo",
      width: "20",
      description: "Education Partner"
    },
    {
      src: logo4,
      alt: "Urega Logo",
      width: "20",
      description: "Tech Collaborator"
    },
    {
      src: logo5,
      alt: "Bucabus",
      width: "60",
      description: "Transportation App"
    },
    {
      src: logo6,
      alt: "Fakaba",
      width: "60",
      description: "real estate app"
    },
    {
      src: logo7,
      alt: "omachiscorner",
      width: "60",
      description: "restaurant app"
    },
    {
      src: logo8,
      alt: "Uigl",
      width: "60",
      description: "uisis oil and gas"
    },
    {
      src: logo9,
      alt: "planetvanguard",
      width: "60",
      description: "planet wellness"
    },
    {
      src: logo10,
      alt: "Bluely",
      width: "60",
      description: "Diabetes Management"
    },
    {
      src: logo11,
      alt: "squared take",
      width: "60",
      description: "mail delivery system"
    },
    {
      component: (
        <div className="flex-shrink-0 scale-75 md:scale-90">
          <a
            href="#"
            className="relative group flex items-center space-x-2"
          >
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <div className="w-4 h-4 bg-white rounded-sm transform group-hover:rotate-12 transition-transform duration-300"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg blur-sm opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
              suno<span className="text-blue-600">box</span>
            </span>
          </a>
        </div>
      ),
      alt: "Sunobox Logo",
      description: "Tech Company"
    }
  ];

  // Triple the logos array for smoother infinite scrolling
  const extendedLogos = [...logos, ...logos, ...logos];

  useLayoutEffect(() => {
    mounted.current = true;

    const animateScroll = async () => {
      while (mounted.current) {
        await controls.start({
          x: -100 * logos.length, // Move by the width of one set of logos
          transition: {
            duration: 20, // Adjust speed here
            ease: "linear"
          }
        });
        if (!mounted.current) break;
        controls.set({ x: 0 }); // Reset position instantly
      }
    };

    animateScroll();

    return () => {
      mounted.current = false;
    };
  }, [controls, logos.length]);

  return (
    <motion.section
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-20 bg-light-body dark:bg-dark-body transition-colors duration-500 ease-smooth font-inter relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient blobs for visual appeal */}
      <motion.div
        className="absolute top-20 -left-32 w-64 h-64 bg-violet-400/20 dark:bg-violet-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          y: [0, -20, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        {/* Section Title with Accent Bar - Left Aligned */}
        <div className="mb-16 flex flex-col items-start">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 rounded-full mb-6"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold font-montserrat-alt mb-4 text-left bg-gradient-to-r from-violet-600 to-slate-700 dark:from-violet-400 dark:to-white bg-clip-text text-transparent"
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

        {/* Logo Showcase - Continuous Auto-Scroll Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            animate={controls}
            className="flex space-x-4 md:space-x-6"
          >
            {extendedLogos.map((logo, index) => (
              <LogoCard key={`${logo.alt}-${index}`} logo={logo} index={index} />
            ))}
          </motion.div>
        </div>

        {/* Featured testimonial */}
        <motion.div
          className="mt-24 mb-16 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -top-6 -left-6 text-5xl text-violet-400 dark:text-violet-500 opacity-30">"</div>
            <div className="absolute -bottom-6 -right-6 text-5xl text-violet-400 dark:text-violet-500 opacity-30">"</div>
            <p className="text-xl md:text-2xl italic text-slate-600 dark:text-slate-300 relative z-10">
              {t('featuredTestimonial', "Working with Simeon transformed our digital presence. His technical expertise and creative vision delivered results beyond our expectations.")}
            </p>
          </div>
          <div className="mt-6 flex flex-col items-center">
            <p className="font-semibold text-slate-800 dark:text-white">{t('testimonialAuthor', "James K.")}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{t('testimonialRole', "CEO, Urega Foundation")}</p>
          </div>
        </motion.div>

        {/* Call to Action - Left Aligned */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-violet-600 to-slate-700 dark:from-violet-400 dark:to-white bg-clip-text text-transparent">
            {t('joinCompanies')}
          </h3>
          <Link to="/contact">
            <motion.button
              className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-violet-600 to-purple-600 
                       dark:from-violet-500 dark:to-purple-500 text-white rounded-xl font-medium 
                       shadow-lg shadow-violet-500/25 dark:shadow-violet-500/20
                       hover:shadow-xl hover:shadow-violet-500/30 dark:hover:shadow-violet-500/25
                       transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('getInTouch')}
              <ExternalLink className="h-5 w-5 transition-transform group-hover:translate-x-1 duration-300" />
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
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{
        scale: 1.05,
        y: -3,
      }}
      className={`
        relative group p-3 md:p-4
        flex flex-col items-center
        min-w-[100px] md:min-w-[120px]
        rounded-lg
        transition-all duration-300
      `}
    >
      <div className="relative w-full h-12 md:h-16 flex items-center justify-center filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
        {logo.component ? (
          logo.component
        ) : (
          <img
            src={logo.src}
            alt={logo.alt}
            className="w-full h-full object-contain"
          />
        )}

        {/* Enhanced Hover Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-600/10 to-purple-600/5 dark:from-violet-500/10 dark:to-purple-400/5 blur-xl transition-opacity"
        />
      </div>

      {/* Description that appears on hover */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-2 text-center"
      >
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{logo.description}</span>
      </motion.div>
    </motion.div>
  );
};

export default TrustedBy;