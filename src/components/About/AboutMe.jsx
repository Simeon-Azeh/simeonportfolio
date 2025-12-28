import React, { useEffect } from 'react';
import { FaFacebook, FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';
import { BsAward, BsCode, BsPeople } from 'react-icons/bs';

const images = [
  '/images/about1.jpg',
  '/images/about2.jpg',
  '/images/about3.jpg',
  '/images/about4.jpg',
  '/images/about5.jpg',
  '/images/about6.jpg'
];

function AboutMe() {
  const { t } = useTranslation();
  const duplicatedImages = [...images, ...images];

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const handleScroll = () => {
      AOS.refresh();
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const stats = [
    {
      icon: BsAward,
      value: '5+',
      label: t('years_experience', 'Years Experience'),
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: BsCode,
      value: '50+',
      label: t('projects_completed', 'Projects Completed'),
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: BsPeople,
      value: '30+',
      label: t('happy_clients', 'Happy Clients'),
      color: 'from-blue-500 to-cyan-500'
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      url: 'https://www.facebook.com/kongnyuy.simeon.3?mibextid=ZbWKwL',
      color: 'hover:text-blue-600 dark:hover:text-blue-400',
      label: 'Facebook'
    },
    {
      icon: FaLinkedin,
      url: 'https://www.linkedin.com/in/simeonazeh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      color: 'hover:text-blue-700 dark:hover:text-blue-500',
      label: 'LinkedIn'
    },
    {
      icon: FaGithub,
      url: 'https://github.com/Simeon-Azeh',
      color: 'hover:text-gray-900 dark:hover:text-white',
      label: 'GitHub'
    },
  ];

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-slate-50 dark:from-dark-body dark:to-dark-body transition-colors py-20 px-4 md:px-0 overflow-hidden relative">
      {/* Decorative background elements */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <div className="w-full md:w-4/5 mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 px-4 py-2 rounded-full mb-4">
            <span className="w-2 h-2 bg-violet-600 dark:bg-violet-400 rounded-full animate-pulse"></span>
            <span className="text-violet-600 dark:text-violet-400 font-medium text-sm">
              {t('get_to_know', 'Get to Know Me')}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4 font-montserrat-alt">
            {t('about_me', 'About Me')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-inter">
            {t('about_subtitle', 'Passionate developer crafting digital experiences')}
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Image Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 via-transparent to-purple-900/30 z-10 pointer-events-none"></div>

              {/* Marquee container */}
              <div className="marquee-container h-full">
                <div className="marquee">
                  {Array.from({ length: 2 }).map((_, rowIndex) => (
                    <div key={rowIndex} className="marquee-row">
                      {duplicatedImages.map((image, index) => (
                        <div key={index} className="marquee-item">
                          <img
                            src={image}
                            alt={`Gallery ${index}`}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative corner accent */}
              <div className="absolute top-4 left-4 w-20 h-20 border-t-4 border-l-4 border-violet-500 dark:border-violet-400 rounded-tl-2xl z-20"></div>
              <div className="absolute bottom-4 right-4 w-20 h-20 border-b-4 border-r-4 border-purple-500 dark:border-purple-400 rounded-br-2xl z-20"></div>
            </div>
          </motion.div>

          {/* Text Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-inter">
                {t('about_me_description', 'I\'m a passionate web developer and designer with expertise in creating beautiful, functional digital experiences. My journey in tech has been driven by curiosity and a love for solving complex problems.')}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-inter">
                {t('about_me_note', 'With a focus on modern technologies and user-centered design, I bring ideas to life through clean code and intuitive interfaces. Whether it\'s a sleek website, a powerful web application, or a stunning brand identity, I\'m committed to delivering excellence.')}
              </p>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-4 uppercase tracking-wider">
                {t('connect_with_me', 'Connect With Me')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />

                    {/* Tooltip */}
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 mt-4"
              >
                <span>{t('lets_work_together', "Let's Work Together")}</span>
                <span className="text-xl">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>



      </div>

      {/* Enhanced CSS for marquee */}
      <style jsx>{`
        .marquee-container {
          position: relative;
          overflow: hidden;
        }
        
        .marquee {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .marquee-row {
          display: flex;
          animation: scroll 30s linear infinite;
        }
        
        .marquee-row:nth-child(2) {
          animation-direction: reverse;
          animation-duration: 25s;
        }
        
        .marquee-item {
          flex-shrink: 0;
          width: 250px;
          height: 200px;
          margin-right: 1rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .marquee-item:hover {
          transform: scale(1.05);
          z-index: 10;
        }
        
        .marquee-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @media (max-width: 768px) {
          .marquee-item {
            width: 200px;
            height: 160px;
          }
        }
      `}</style>
    </div>
  );
}

export default AboutMe;