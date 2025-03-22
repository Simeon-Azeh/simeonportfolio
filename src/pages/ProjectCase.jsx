import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiExternalLink, FiGithub, FiDownload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaGooglePlay, FaAppStore, FaQuoteLeft } from 'react-icons/fa';
import { SiFirebase, SiReact, SiExpo, SiNodedotjs, SiMongodb, SiRedux, SiStripe } from 'react-icons/si';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { mockupImages } from '../data/appData';

// Tech icons mapping
const TECH_ICONS = {
  'React Native': <SiReact className="text-[#61DAFB]" />,
  'Firebase': <SiFirebase className="text-[#FFCA28]" />,
  'Expo': <SiExpo className="text-[#000020]" />,
  'Node.js': <SiNodedotjs className="text-[#339933]" />,
  'Express': <SiNodedotjs className="text-[#000000]" />,
  'MongoDB': <SiMongodb className="text-[#47A248]" />,
  'Redux': <SiRedux className="text-[#764ABC]" />,
  'Stripe': <SiStripe className="text-[#008CDD]" />
};

// Helper function to get theme-based screenshots
const getThemeBasedScreenshots = (mockup, isDarkMode) => {
  return isDarkMode ? mockup.screenshots_dark : mockup.screenshots_light;
};

const ProjectCase = () => {
  const { projectId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentScreenshot, setCurrentScreenshot] = useState(0);

  // Check for dark mode and observe theme changes
  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Find project data based on projectId
  const project = mockupImages.find(p => p.caseStudyLink.includes(projectId));
  
  // Auto-rotate screenshots
  useEffect(() => {
    const interval = setInterval(() => {
      if (project) {
        const screenshots = getThemeBasedScreenshots(project, isDarkMode);
        setCurrentScreenshot(prev => (prev === screenshots.length - 1 ? 0 : prev + 1));
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [project, isDarkMode]);

  // Handle next/prev screenshot
  const nextScreenshot = () => {
    if (project) {
      const screenshots = getThemeBasedScreenshots(project, isDarkMode);
      setCurrentScreenshot(prev => (prev === screenshots.length - 1 ? 0 : prev + 1));
    }
  };

  const prevScreenshot = () => {
    if (project) {
      const screenshots = getThemeBasedScreenshots(project, isDarkMode);
      setCurrentScreenshot(prev => (prev === 0 ? screenshots.length - 1 : prev - 1));
    }
  };

  if (!project) {
    return (
      <>
      <div className='sticky top-0 bg-[#F9FEFF] dark:bg-[#171716] z-50 '>
        <Header />
        </div>
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-b from-light-body to-[#F9FEFF] dark:from-dark-body dark:to-[#1a1818]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md px-4"
          >
            <div className="mb-6 w-24 h-24 mx-auto bg-red-100/50 dark:bg-red-900/20 rounded-full flex items-center justify-center">
              <span className="text-4xl text-red-500">404</span>
            </div>
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Project Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The project you're looking for doesn't exist or may have been moved.</p>
            <motion.button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-lg mx-auto hover:bg-pink-700 transition-colors"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FiArrowLeft /> Return to Home
            </motion.button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  const screenshots = getThemeBasedScreenshots(project, isDarkMode);

  return (
    <>
      <div className='sticky top-0 bg-[#F9FEFF] dark:bg-[#171716] z-50 '>
        <Header />
        </div>
        <div>
        <div className="bg-gradient-to-b from-light-body to-[#F9FEFF] dark:from-dark-body dark:to-[#1a1818] ">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-40 right-10 w-60 h-60 rounded-full bg-pink-200/20 dark:bg-pink-900/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-blue-200/20 dark:bg-blue-900/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
        <div className='w-full md:w-4/5 mx-auto'>
           {/* Back navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-6 relative z-10">
          <motion.button
            onClick={() => navigate('/')} 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-pink-600 dark:hover:text-white transition-colors group"
            whileHover={{ x: -3 }}
          >
            <FiArrowLeft className="group-hover:transform group-hover:-translate-x-1 transition-transform" /> 
            {t('back_to_projects', 'Back to Projects')}
          </motion.button>
        </div>

        {/* Hero Section with Mockup */}
        <section className="relative pb-16 pt-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-flex items-center bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-200 px-3 py-1 text-sm rounded-full mb-6">
                  {t(project.badge)} • {project.year}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {project.title}
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  {t(project.longDescription)}
                </p>
                
                {/* Store badges */}
                <div className="flex flex-wrap gap-4 mb-6">
                  {project.playStoreLink && (
                    <motion.a
                      href={project.playStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#121212] text-white px-5 py-2.5 rounded-xl hover:bg-black"
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <FaGooglePlay size={24} className="text-white" />
                      <div className="text-left">
                        <div className="text-xs opacity-80">GET IT ON</div>
                        <div className="text-sm font-semibold">Google Play</div>
                      </div>
                    </motion.a>
                  )}

                  {project.appStoreLink && (
                    <motion.a
                      href={project.appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-[#121212] text-white px-5 py-2.5 rounded-xl hover:bg-black"
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <FaAppStore size={24} className="text-white" />
                      <div className="text-left">
                        <div className="text-xs opacity-80">Download on the</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </motion.a>
                  )}
                  
                  {project.githubLink && (
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-5 py-2.5 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                      whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    >
                      <FiGithub size={20} />
                      <span className="font-medium">{t('view_code', 'View Code')}</span>
                    </motion.a>
                  )}
                </div>
                
                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.technologies.map((tech, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-full shadow-sm text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + (idx * 0.05) }}
                    >
                      {TECH_ICONS[tech] || null} {tech}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Right: Screenshot Showcase */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-[9/16] max-w-[320px] mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-blue-500/10 dark:from-pink-500/5 dark:to-blue-500/5 rounded-[32px] -z-10 blur-lg" />
                  
                  <div className="w-full h-full rounded-[32px] overflow-hidden bg-gray-900 border-8 border-gray-800 relative shadow-2xl">
                    {/* Phone frame */}
                    <div className="absolute top-0 inset-x-0 h-6 bg-gray-800 flex justify-center items-center z-10">
                      <div className="w-20 h-4 bg-gray-900 rounded-b-xl" />
                    </div>
                    
                    {/* Screenshots */}
                    <div className="relative w-full h-full overflow-hidden">
                      {screenshots.map((screenshot, idx) => (
                        <motion.div
                          key={idx}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: idx === currentScreenshot ? 1 : 0,
                            scale: idx === currentScreenshot ? 1 : 1.05
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          <img
                            src={screenshot}
                            alt={`${project.title} screenshot ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      ))}
                      
                      {/* Navigation dots */}
                      <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2 z-20">
                        {screenshots.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentScreenshot(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === currentScreenshot 
                                ? "bg-white scale-125" 
                                : "bg-white/40 hover:bg-white/60"
                            }`}
                            aria-label={`View screenshot ${idx + 1}`}
                          />
                        ))}
                      </div>
                      
                      {/* Arrow controls */}
                      <button 
                        onClick={prevScreenshot}
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white z-20 hover:bg-black/50 transition-colors"
                        aria-label="Previous screenshot"
                      >
                        <FiChevronLeft />
                      </button>
                      <button 
                        onClick={nextScreenshot}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white z-20 hover:bg-black/50 transition-colors"
                        aria-label="Next screenshot"
                      >
                        <FiChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main content */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-900/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            {/* Project Quote */}
            <div className="mb-16 max-w-3xl mx-auto">
              <blockquote className="relative">
                <div className="absolute -top-6 -left-6 text-pink-300 dark:text-pink-600 opacity-30">
                  <FaQuoteLeft size={40} />
                </div>
                <p className="text-xl md:text-2xl italic text-gray-700 dark:text-gray-300 text-center px-8 leading-relaxed">
                  {t(`${projectId}_quote`, "Building this application was an exciting journey that pushed the boundaries of what's possible in mobile development.")}
                </p>
                <div className="mt-4 text-right text-gray-600 dark:text-gray-400">
                  — Simeon Azeh
                </div>
              </blockquote>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left column: Project details */}
              <div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="prose dark:prose-invert prose-lg max-w-none"
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t('project_overview', 'Project Overview')}
                  </h2>
                  <p>{t(`${projectId}_overview`, 'A comprehensive mobile application designed to enhance user experience and solve specific problems in its domain.')}</p>

                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                    {t('challenge', 'The Challenge')}
                  </h2>
                  <p>{t(`${projectId}_challenge`, 'Creating an intuitive interface while maintaining performance and handling complex business requirements.')}</p>

                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                    {t('solution', 'The Solution')}
                  </h2>
                  <p>{t(`${projectId}_solution`, 'We developed a robust application with a user-centered design approach, leveraging modern technologies to deliver a seamless experience.')}</p>

                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-12">
                    {t('results', 'Results & Impact')}
                  </h2>
                  <p>{t(`${projectId}_results`, 'The application has received positive feedback from users and stakeholders, achieving the intended goals of improving efficiency and user satisfaction.')}</p>
                </motion.div>
              </div>

              {/* Right column: Features & Tech */}
              <div className="space-y-12">
                {/* Key features card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                  style={{
                    borderTop: `3px solid ${project.color}`
                  }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    {t('key_features', 'Key Features')}
                  </h2>
                  <ul className="space-y-4">
                    {project.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + (idx * 0.1) }}
                      >
                        <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-pink-600 dark:bg-pink-400" />
                        </div>
                        <span className="text-base">{t(feature)}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                
                {/* Development Process */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    {t('development_process', 'Development Process')}
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-pink-600 dark:bg-pink-400"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('planning', 'Planning & Research')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t(`${projectId}_planning`, 'User research, competitive analysis, and defining core functionality requirements.')}</p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-600 dark:bg-purple-400"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('design', 'UI/UX Design')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t(`${projectId}_design`, 'Creating wireframes, high-fidelity mockups, and interactive prototypes.')}</p>
                    </div>
                    
                    <div className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-700">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('development', 'Development')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t(`${projectId}_development`, 'Building the application with React Native, integrating APIs, and implementing key features.')}</p>
                    </div>
                    
                    <div className="relative pl-8">
                      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-600 dark:bg-green-400"></div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{t('testing', 'Testing & Launch')}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{t(`${projectId}_testing`, 'Rigorous testing, optimization, and deployment to app stores.')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {t('interested', 'Interested in working together?')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              {t('contact_cta', "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.a
                href="/contact"
                className="px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-medium rounded-lg shadow-lg shadow-pink-600/20 flex items-center gap-2"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('get_in_touch', 'Get in Touch')} <FiExternalLink />
              </motion.a>
              
              <motion.a
                href="/"
                className="px-8 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-lg flex items-center gap-2"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('view_more_projects', 'View More Projects')}
              </motion.a>
            </div>
          </div>
        </section>
        </div>
       
      </div>
        </div>
     
      <Footer />
    </>
  );
};

export default ProjectCase;