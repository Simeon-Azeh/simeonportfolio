import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FaLink, FaGithub, FaExternalLinkAlt, FaRegCalendarAlt, FaUserAlt, FaCode, FaTimes, FaReact, FaNodeJs,  } from 'react-icons/fa';
import { RiTailwindCssFill, RiJavascriptFill } from "react-icons/ri";
import { SiMailgun } from "react-icons/si";
import { FiFramer } from "react-icons/fi";
import { MdCategory, MdFilterList } from 'react-icons/md';
import { BiGridAlt } from 'react-icons/bi';
import { SiNextdotjs, SiFirebase, SiTypescript } from 'react-icons/si';
import { Drawer } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Tabs = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showMore, setShowMore] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic',
    });

    const initialShowMore = {};
    Object.keys(projects).forEach(category => {
      initialShowMore[category] = false;
    });
    setShowMore(initialShowMore);
  }, []);

  const openDrawer = (project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const toggleShowMore = (category) => {
    setShowMore(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const truncateDescription = (description, maxLength) => {
    if (!description) return '';
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  const navigateToProjectDetails = (project) => {
    if (project.detailsPage) {
      navigate(`/projects/${project.id}`);
    } else {
      openDrawer(project);
    }
  };

  const categories = Object.keys(projects);

  const tabIcons = {
    'All': BiGridAlt,
    'Webapps': FaCode,
    'Websites': FaLink,
    'Photos': MdCategory,
  };

  const techIcons = {
    'React': FaReact,
    'Next.js': SiNextdotjs,
    'Firebase': SiFirebase,
    'TypeScript': SiTypescript,
    'Node.js': FaNodeJs,
     'Tailwind-CSS': RiTailwindCssFill,
    'MongoDB': () => <span className="text-green-500 font-bold">DB</span>, // Placeholder, as react-icons doesn't have MongoDB
    'Express': () => <span className="text-gray-500 font-bold">Ex</span>, // Placeholder
    'Mailgun' : SiMailgun,
    'Framer Motion': FiFramer,
    'WordPress': () => <span className="text-blue-600 font-bold">WP</span>, // Placeholder
    'PHP': () => <span className="text-indigo-500 font-bold">PHP</span>, // Placeholder
    'JavaScript': RiJavascriptFill,
    'Vite': () => <span className="text-orange-500 font-bold">V</span>, // Placeholder
    'Stripe': () => <span className="text-purple-600 font-bold">S</span>, // Placeholder
    'PostgreSQL': () => <span className="text-blue-700 font-bold">PG</span>, // Placeholder
    'D3.js': () => <span className="text-orange-600 font-bold">D3</span>, // Placeholder
    'API Integration': () => <span className="text-gray-600 font-bold">API</span>, // Placeholder
    'Material-UI': () => <span className="text-blue-400 font-bold">MUI</span>, // Placeholder
    'HTML': () => <span className="text-orange-500 font-bold">H</span>, // Placeholder
    'CSS': () => <span className="text-blue-500 font-bold">C</span>, // Placeholder
    'Netlify': () => <span className="text-teal-500 font-bold">N</span>, // Placeholder
    'IoT': () => <span className="text-green-600 font-bold">IoT</span>, // Placeholder
    'Arduino': () => <span className="text-blue-800 font-bold">A</span>, // Placeholder
    'Mapbox': () => <span className="text-green-700 font-bold">M</span>, // Placeholder
  };

  const getTechIcon = (tech) => {
    const IconComp = techIcons[tech];
    return IconComp ? <IconComp size={16} /> : <span className="text-gray-500 text-xs">{tech}</span>;
  };

  return (
    <div className="bg-light-body dark:bg-dark-body transition-colors py-12 md:py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden font-inter">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <motion.div 
        className="absolute top-20 right-10 w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-br from-pink-200/20 to-purple-200/20 dark:from-pink-500/10 dark:to-purple-500/10 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-blue-200/20 to-cyan-200/20 dark:from-blue-500/10 dark:to-cyan-500/10 blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 px-3 md:px-4 py-2 rounded-full mb-4 md:mb-6">
            <MdFilterList className="text-pink-600 dark:text-pink-400 text-sm md:text-base" />
            <span className="text-pink-600 dark:text-pink-400 font-medium text-sm font-inter">
              {t('portfolio.filter', 'Filter Projects')}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 font-montserrat-alt">
            {t('portfolio.title', 'My Portfolio')}
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto font-inter px-4">
            {t('portfolio.subtitle', 'Explore a collection of my best work across web development, design, and creative projects.')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Tab.Group onChange={(index) => setActiveTab(index)}>
            {/* Enhanced Tab List */}
            <Tab.List className="flex space-x-1 md:space-x-2 bg-white/80 dark:bg-[#1B1B1A]/80 backdrop-blur-lg border border-gray-200 dark:border-gray-800 rounded-2xl p-2 overflow-x-auto scrollbar-hide shadow-lg mb-8 md:mb-12">
              {categories.map((category) => {
                const IconComponent = tabIcons[category] || BiGridAlt;
                return (
                  <Tab
                    key={category}
                    className={({ selected }) =>
                      `group relative py-2 md:py-3 px-4 md:px-6 text-xs md:text-sm font-semibold rounded-xl outline-none transition-all duration-300 flex items-center gap-1 md:gap-2 flex-shrink-0 font-inter
                      ${selected 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl shadow-pink-500/30 dark:shadow-pink-500/20' 
                        : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <IconComponent className={`text-sm md:text-lg transition-transform duration-300 ${selected ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span>{t(`portfolio.categories.${category.toLowerCase()}`, category)}</span>
                        {selected && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl -z-10"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                      </>
                    )}
                  </Tab>
                );
              })}
            </Tab.List>
            
            <Tab.Panels>
              <AnimatePresence mode="wait">
                {categories.map((category, idx) => {
                  const projectList = projects[category];
                  const isShowingMore = showMore[category];
                  const displayedProjects = isShowingMore ? projectList : projectList.slice(0, 8);
                  
                  return (
                    <Tab.Panel key={idx}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                      >
                        {displayedProjects.map((project, index) => (
                          <motion.div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={`${index * 50}`}
                            className="group bg-white dark:bg-[#1B1B1A] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-pink-500/10 dark:hover:shadow-pink-500/20 transition-all duration-500"
                            whileHover={{ y: -8, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="relative overflow-hidden h-48 md:h-56">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-white text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 backdrop-blur-sm shadow-lg font-medium">
                                      {project.category || t('portfolio.uncategorized', 'Uncategorized')}
                                    </span>
                                    <div className="flex gap-1 md:gap-2">
                                      {project.projectUrl && (
                                        <motion.a 
                                          href={project.projectUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                                          whileHover={{ scale: 1.1, rotate: 5 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <FaExternalLinkAlt size={12} />
                                        </motion.a>
                                      )}
                                      {project.githubUrl && (
                                        <motion.a 
                                          href={project.githubUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
                                          whileHover={{ scale: 1.1, rotate: -5 }}
                                          whileTap={{ scale: 0.9 }}
                                        >
                                          <FaGithub size={12} />
                                        </motion.a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="p-4 md:p-6">
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 font-montserrat-alt group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                                {project.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 md:mb-4 line-clamp-2 font-inter">
                                {truncateDescription(project.description, 100)}
                              </p>
                              {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                                  {project.technologies.slice(0, 4).map((tech, idx) => (
                                    <div key={idx} className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                      {getTechIcon(tech)}
                                    </div>
                                  ))}
                                  {project.technologies.length > 4 && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">+{project.technologies.length - 4}</span>
                                  )}
                                </div>
                              )}
                              <div className="flex justify-between items-center pt-2 md:pt-3 border-t border-gray-200 dark:border-gray-800">
                                <button
                                  className="flex items-center gap-1 md:gap-2 text-sm font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors group/btn"
                                  onClick={() => navigateToProjectDetails(project)}
                                >
                                  <span className="font-inter text-xs md:text-sm">{t('portfolio.view_details', 'View Details')}</span>
                                  <FaLink className="group-hover/btn:translate-x-1 transition-transform text-xs md:text-sm" size={10} />
                                </button>
                                <span className="text-xs text-gray-500 dark:text-gray-500 font-inter">
                                  {project.projectDate}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                      
                      {projectList.length > 8 && (
                        <motion.div 
                          className="mt-8 md:mt-12 text-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <motion.button
                            onClick={() => toggleShowMore(category)}
                            className="px-6 md:px-8 py-2.5 md:py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transition-all duration-300 font-inter text-sm md:text-base"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isShowingMore 
                              ? t('portfolio.show_less', 'Show Less Projects') 
                              : t('portfolio.show_more', 'Show More Projects')}
                          </motion.button>
                        </motion.div>
                      )}
                    </Tab.Panel>
                  );
                })}
              </AnimatePresence>
            </Tab.Panels>
          </Tab.Group>
        </motion.div>
      </div>

      {/* Enhanced Drawer */}
      <Drawer
        title={null}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        width={window.innerWidth < 768 ? '100%' : 700}
        className="project-drawer"
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
        closeIcon={null}
      >
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto bg-white dark:bg-[#0d0d0d]"
            >
              {/* Hero Image Section */}
              <div className="relative h-64 md:h-72 lg:h-96">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Close Button */}
                <motion.button 
                  onClick={closeDrawer}
                  className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes size={16} />
                </motion.button>
                
                {/* Title & Category */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 font-montserrat-alt">
                      {selectedProject.title}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 backdrop-blur-sm text-white text-sm font-semibold shadow-lg">
                        {selectedProject.category || t('portfolio.uncategorized', 'Uncategorized')}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4 md:p-6 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10">
                  {/* Project Overview */}
                  <div className="lg:col-span-2">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 font-montserrat-alt">
                      {t('portfolio.project_overview', 'Project Overview')}
                    </h3>
                    <div className="prose dark:prose-invert max-w-none font-inter text-sm md:text-base">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {selectedProject.description}
                      </p>
                      {selectedProject.description2 && (
                        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                          {selectedProject.description2}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Project Details Sidebar */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-4 md:p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-4 md:mb-6 font-montserrat-alt">
                      {t('portfolio.project_details', 'Project Details')}
                    </h3>
                    <ul className="space-y-3 md:space-y-4">
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <MdCategory className="mr-2 md:mr-3 text-pink-600 dark:text-pink-400 text-lg md:text-xl" />
                        <div className="font-inter text-sm md:text-base">
                          <span className="font-semibold text-sm block text-gray-500 dark:text-gray-400">
                            {t('portfolio.category', 'Category')}
                          </span>
                          <span>{selectedProject.category}</span>
                        </div>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <FaUserAlt className="mr-2 md:mr-3 text-pink-600 dark:text-pink-400 text-base md:text-lg" />
                        <div className="font-inter text-sm md:text-base">
                          <span className="font-semibold text-sm block text-gray-500 dark:text-gray-400">
                            {t('portfolio.client', 'Client')}
                          </span>
                          <span>{selectedProject.client}</span>
                        </div>
                      </li>
                      <li className="flex items-center text-gray-700 dark:text-gray-300">
                        <FaRegCalendarAlt className="mr-2 md:mr-3 text-pink-600 dark:text-pink-400 text-base md:text-lg" />
                        <div className="font-inter text-sm md:text-base">
                          <span className="font-semibold text-sm block text-gray-500 dark:text-gray-400">
                            {t('portfolio.date', 'Date')}
                          </span>
                          <span>{selectedProject.projectDate}</span>
                        </div>
                      </li>
                      {selectedProject.technologies && (
                        <li className="flex items-start text-gray-700 dark:text-gray-300">
                          <FaCode className="mr-2 md:mr-3 mt-1 text-pink-600 dark:text-pink-400 text-base md:text-lg" />
                          <div className="font-inter text-sm md:text-base">
                            <span className="font-semibold text-sm block text-gray-500 dark:text-gray-400 mb-2">
                              {t('portfolio.technologies', 'Technologies')}
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technologies?.map((tech, idx) => (
                                <span key={idx} className="px-2 md:px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600 flex items-center gap-1">
                                  {getTechIcon(tech)} {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 md:gap-4 justify-center sm:justify-start">
                  {selectedProject.projectUrl && (
                    <motion.a
                      href={selectedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-xl flex items-center gap-2 font-semibold shadow-lg shadow-pink-500/30 transition-all font-inter text-sm md:text-base"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaExternalLinkAlt size={14} /> {t('portfolio.visit_website', 'Visit Website')}
                    </motion.a>
                  )}
                  
                  {selectedProject.githubUrl && (
                    <motion.a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 md:px-6 py-2 md:py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-xl flex items-center gap-2 font-semibold shadow-lg transition-all font-inter text-sm md:text-base"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaGithub size={14} /> {t('portfolio.view_code', 'View Code')}
                    </motion.a>
                  )}
                  
                  {selectedProject.caseStudyUrl && (
                    <motion.a
                      href={selectedProject.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 md:px-6 py-2 md:py-3 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white rounded-xl flex items-center gap-2 font-semibold transition-all font-inter text-sm md:text-base"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLink size={14} /> {t('portfolio.case_study', 'Case Study')}
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Drawer>
    </div>
  );
};

// Updated Projects Data with Full Details
const projects = {
  All: [
     {
      title: 'Omachiscorner',
      image: '/images/omachiscornerImg.png',
      description: 'Omachiscorner is a restaurant in Nigeria, I am the lead developer of this project crafting a beautiful full stack restaurant management for them.',
      description2: 'I am the lead developer of this project, I worked on the frontend and backend of this project',
      category: 'Food & Beverages',
      client: 'Omachiscorner Inc.',
      projectDate: '2025 to Present',
      projectUrl: 'https://omachiscorner.com/',
      technologies: ['React', 'Next.js', 'Firebase']
    },
      {
      title: 'Fakaba Realty',
      image: '/images/fakabaimg.png',
      description: 'Fakaba Realty is a real estate company that deals with the buying and selling of lands and houses. I am the lead developer of this project',
      description2: 'I am the lead developer of this project, I worked on the frontend and backend of this project',
      category: 'Real Estate',
      client: 'Fakaba Realty Groups.',
      projectDate: '2024 to Present',
      projectUrl: 'https://fakaba.co/',
      technologies: ['React', 'Next.js', 'Firebase']
    },
    {
      title: 'Urega',
      image: '/images/work6.png',
      description: 'Founded in 2020, the Urega Foundation is a pan-African youth-led NGO founded in the Netherlands with an official branch in Cameroon. Urega was founded to support High school students in Cameroon with full scholarships',
      description2: "I have a double role at Urega where I currently work as Director of Technology and Innovation, I design and ideate their post across social media. I have also worked on the full stack of the website and designing their application process for a seamless application process for aspiring scholars.",
      category: 'Education',
      client: 'The Urega Foundation',
      projectDate: '2022 to Present',
      projectUrl: 'https://urega.org',
      technologies: ['Next.js', 'Firebase', 'JavaScript', 'Tailwind-CSS']
    },
     {
      title: 'Squaredtake',
      image: '/images/squaredtake.png',
      description: 'Squaredtake is a mail delivery company based in Nigeria, I am the lead developer of this project crafting a beautiful full stack mail delivery management for them.',
      description2: "I am the lead developer of this project, I worked on the frontend and backend of this project",
      category: 'Education',
      client: 'Squaredtake Inc.',
      projectDate: '2025 to Present',
      projectUrl: 'https://squaredtake.com',
      technologies: ['Next.js', 'Firebase', 'Mailgun', 'Tailwind-CSS', ]
    },
     {
      title: 'Bluely',
      image: '/images/bluelyimg.png',
      description: ' As a T1D patient and a tech enthusiast, I always look for ways to assist my community, that is wht i started BLUELY, a platform that will help diabetics manage their diabetes better and find a community. ',
      description2: 'I am the lead developer of this project, I worked on the frontend and backend of this project',
      category: 'HealthTech',
      client: 'Bluely Inc',
      projectDate: '2025 to Present',
      projectUrl: 'https://bluely.vercel.app/',
      technologies: ['React', 'Node.js', 'Next.js', 'Firebase', 'Tailwind-CSS']
    },
    {
      title: 'Soreva',
      image: '/images/dashboardPrev.png',
      description: 'Soreva is a platform that allows users to find questions, book tutors, and take practice exams. In summary, Soreva is a web app that allows students to practice and know how prepared they are for a National Exam. I am pleased to have worked on the front-end',
      description2: 'As the frontend developer of Soreva, I bring to life a vision that goes beyond pixels and code. Our platform is a dynamic canvas where education meets innovation. From personalized mock exams to real-time syllabus courses, every click is a step toward empowering students across Africa.',
      category: 'EdTech',
      client: 'Soreva Inc.',
      projectDate: '2025 to Present',
      projectUrl: 'https://soreva-phi.vercel.app/',
      technologies: ['React', 'Node.js', 'Next.js', 'Firebase', 'Tailwind-CSS']
    },
  
    
    {
      title: 'Multiprime',
      image: '/images/work2.png',
      description: 'Multiprime is an entertainment website that deals with promotion of music, model and arts talents.',
      description2: 'I work as Snr Frontend developer at this company, as well as their content writer',
      category: 'Entertainment',
      client: 'Multiprime',
      projectDate: '2024 to Present',
      projectUrl: 'https://multiprime-react.vercel.app/',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion']
    },
    
    {
      title: 'Soltech',
      image: '/images/soltechimg.png',
      description: 'Soltech is a tech company that deals with the advancement of technology and gaming in Cameroon, I am the lead developer of this project.',
      description2: "At Soltech, asides being the CEO, I oversee the development processes of the soltech website.",
      category: 'Education',
      client: 'Soltech Group',
      projectDate: '2024 to Present',
      projectUrl: 'https://soltechub.vercel.app/',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind-CSS', 'Firebase']
    },
    {
      title: 'Bucabus',
      image: '/images/bucabusimg.png',
      description: 'Bucabus is a bus booking app that allows users to book bus tickets, track buses, and make payments. I worked fullstack of this project',
      description2: "To see how the admin panel works, use the credentials below: email: 'ksazeh29@gmail.com', password: 'testing123$'",
      category: 'Transportation',
      client: 'Soltech Group',
      projectDate: '2024 to Present',
      projectUrl: 'https://bucabus-admin.vercel.app/',
      technologies: ['React', 'Express', 'MongoDB', 'Stripe']
    },
    {
      title: 'Intutor',
      image: '/images/intutorimg.png',
      description: 'Intutor helps schools manage data efficiently, it is a school management software that helps schools manage their data efficiently. I worked full-stack on this project',
      description2: "use the credentials below to login as an admin: email: 'ksazeh29@gmail.com', password: 'testing123$'",
      category: 'Education',
      client: 'Soltech Group',
      projectDate: '2024 to Present',
      projectUrl: 'https://intutorcm.vercel.app/',
      technologies: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      title: 'Planet Vanguard',
      image: '/images/pvanguardimg.png',
      description: 'Having researched on how tech can affect climate change, I partner with a Planet vanguard to create a platform that will help in the fight against climate change',
      description2: "I am the lead developer of this project",
      category: 'Climate Change',
      client: 'Planet Vanguard',
      projectDate: '2024 to Present',
      projectUrl: 'https://planetvanguardrw.vercel.app/home',
      technologies: ['React', 'D3.js', 'API Integration']
    },
    {
      title: 'Simeon Azeh Portfolio',
      image: '/images/simeonazehimg.png',
      description: 'This is my portfolio website, I built it to showcase my projects and skills',
      description2: "I am the lead developer of this project",
      category: 'Personal',
      client: 'Simeon Azeh',
      projectDate: '2023 to Present',
      projectUrl: 'https://simeonazeh.vercel.app/',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Afiacare',
      image: '/images/work.png',
      description: 'Afiacare is dedicated to transforming the healthcare system in Cameroon. Our comprehensive digital platform addresses key challenges such as data mismanagement, donor matching, and information sharing between hospitals. We leverage cutting-edge technology to enhance the accuracy, efficiency, and accessibility of healthcare services.',
      description2: "I worked on the frontend of this platform!",
      category: 'Healthcare',
      client: 'The Afiacare team',
      projectDate: '2024 to Present',
      projectUrl: 'https://afiacare.netlify.app',
      technologies: ['React', 'Firebase', 'Material-UI']
    },
    {
      title: 'CodeXtreme',
      image: '/images/work1.png',
      description: 'CodeXtreme is a seasonal 4 days Hackathon that brings together like-minded individuals from all walks of tech to solve problems, network with local and international tech experts and companies, win prizes, and change lives with their tech solutions.',
      category: 'Events and Student development',
      client: 'Codextreme | Nigma',
      projectDate: '2024 to Present',
      projectUrl: 'https://codextremeex.netlify.app/',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Netlify']
    },
    {
      title: 'Smartpro',
      image: '/images/work3.png',
      description: 'This is a smart waste management software, it was just for a school project, but I am looking forward to realizing it.',
      category: 'Web Development',
      client: 'School Project',
      projectDate: '2024 to Present',
      projectUrl: 'https://example.com/project5',
      technologies: ['React', 'IoT', 'Arduino']
    },
    {
      title: 'Viscame',
      image: '/images/work4.png',
      description: "Viscame is a tourism website, it's one of my passion projects aimed at promoting tourism in Cameroon",
      category: 'Tourism',
      client: 'Client A',
      projectDate: '2023 to Present',
      projectUrl: 'https://viscam.netlify.app/',
      technologies: ['React', 'Tailwind CSS', 'Mapbox']
    }
  ],
  Webapps: [
    {
      title: 'Sidec',
      image: '/images/work5.png',
      description: 'Sidec is a platform that allows users to find questions, book tutors, and take practice exams.',
      category: 'EdTech',
      client: 'Sidec Inc.',
      projectDate: '2023 to Present',
      projectUrl: 'https://sidpreview.vercel.app/',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Fakaba Realty',
      image: '/images/fakabaimg.png',
      description: 'Fakaba Realty is a real estate company that deals with the buying and selling of lands and houses.',
      category: 'Real Estate',
      client: 'Fakaba Realty Groups.',
      projectDate: '2023 to Present',
      projectUrl: 'https://fakaba.vercel.app/',
      technologies: ['React', 'Next.js', 'Firebase']
    },
    {
      title: 'Bucabus',
      image: '/images/bucabusimg.png',
      description: 'Bucabus is a bus booking app that allows users to book bus tickets, track buses, and make payments.',
      category: 'Transportation',
      client: 'Soltech Group',
      projectDate: '2024 to Present',
      projectUrl: 'https://bucabus-admin.vercel.app/',
      technologies: ['React', 'Express', 'MongoDB']
    },
    {
      title: 'Intutor',
      image: '/images/intutorimg.png',
      description: 'Intutor helps schools manage data efficiently.',
      category: 'Education',
      client: 'Soltech Group',
      projectDate: '2024 to Present',
      projectUrl: 'https://intutorcm.vercel.app/',
      technologies: ['React', 'Node.js', 'PostgreSQL']
    },
    {
      title: 'Afiacare',
      image: '/images/work.png',
      description: 'Afiacare is dedicated to transforming the healthcare system in Cameroon.',
      category: 'Healthcare',
      client: 'The Afiacare team',
      projectDate: '2024 to Present',
      projectUrl: 'https://afiacare.netlify.app',
      technologies: ['React', 'Firebase', 'Material-UI']
    },
    {
      title: 'Smartpro',
      image: '/images/work3.png',
      description: 'This is a smart waste management software.',
      category: 'Web Development',
      client: 'School Project',
      projectDate: '2024 to Present',
      projectUrl: 'https://example.com/project5',
      technologies: ['React', 'IoT', 'Arduino']
    }
  ],
  Websites: [
    {
      title: 'Multiprime',
      image: '/images/work2.png',
      description: 'Multiprime is an entertainment website that deals with promotion of music, model and arts talents.',
      category: 'Entertainment',
      client: 'Multiprime',
      projectDate: '2024 to Present',
      projectUrl: 'https://multiprime-react.vercel.app/',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion']
    },
    {
      title: 'Urega',
      image: '/images/work6.png',
      description: 'Founded in 2020, the Urega Foundation is a pan-African youth-led NGO.',
      category: 'Education',
      client: 'The Urega Foundation',
      projectDate: '2022 to Present',
      projectUrl: 'https://urega.org',
      technologies: ['WordPress', 'PHP', 'JavaScript']
    },
    {
      title: 'Soltech',
      image: '/images/soltechimg.png',
      description: 'Soltech is a tech company that deals with the advancement of technology and gaming in Cameroon.',
      category: 'Education',
      client: 'Soltech Group',
      projectDate: '2024 to Present',
      projectUrl: 'https://soltechub.vercel.app/',
      technologies: ['React', 'Vite', 'Tailwind CSS']
    },
    {
      title: 'Planet Vanguard',
      image: '/images/pvanguardimg.png',
      description: 'A platform that will help in the fight against climate change.',
      category: 'Climate Change',
      client: 'Planet Vanguard',
      projectDate: '2024 to Present',
      projectUrl: 'https://planetvanguardrw.vercel.app/home',
      technologies: ['React', 'D3.js', 'API Integration']
    },
    {
      title: 'CodeXtreme',
      image: '/images/work1.png',
      description: 'CodeXtreme is a seasonal 4 days Hackathon.',
      category: 'Events and Student development',
      client: 'Codextreme | Nigma',
      projectDate: '2024 to Present',
      projectUrl: 'https://codextremeex.netlify.app/',
      technologies: ['HTML', 'CSS', 'JavaScript']
    },
    {
      title: 'Viscame',
      image: '/images/work4.png',
      description: "Viscame is a tourism website aimed at promoting tourism in Cameroon.",
      category: 'Tourism',
      client: 'Client A',
      projectDate: '2023 to Present',
      projectUrl: 'https://viscam.netlify.app/',
      technologies: ['React', 'Tailwind CSS', 'Mapbox']
    }
  ],
  Photos: [
    {
      title: 'Photo 1',
      image: '/images/about1.jpg',
      description: 'Cover art taken at ALU Rwanda to show the beauty of the campus',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-01-01'
    },
    {
      title: 'Photo 2',
      image: '/images/about2.jpg',
      description: 'ALU, Rwanda',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-02-01'
    },
    {
      title: 'Photo 3',
      image: '/images/about3.jpg',
      description: 'ALU Rwanda',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-03-01'
    },
    {
      title: 'Photo 4',
      image: '/images/about4.jpg',
      description: 'My return to Cameroon after 2 years of studying in Rwanda',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-04-01'
    },
    {
      title: 'Photo 5',
      image: '/images/about7.jpg',
      description: 'Photo with a friend',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-05-01'
    },
    {
      title: 'Photo 6',
      image: '/images/about8.jpg',
      description: 'My first visit to Musanzi, Rwanda',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-06-01'
    },
    {
      title: 'Photo 7',
      image: '/images/about9.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-07-01'
    },
    {
      title: 'Photo 8',
      image: '/images/about10.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-08-01'
    },
    {
      title: 'Photo 9',
      image: '/images/about11.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-09-01'
    },
    {
      title: 'Photo 10',
      image: '/images/about12.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-10-01'
    },
    {
      title: 'Photo 11',
      image: '/images/about13.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-11-01'
    },
    {
      title: 'Photo 12',
      image: '/images/about15.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Personal',
      projectDate: '2023-12-01'
    }
  ]
};

export default Tabs;