import React, { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { FaLink, FaGithub, FaExternalLinkAlt, FaRegCalendarAlt, FaUserAlt, FaCode } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';
import { Drawer, Button } from 'antd';
import { motion } from 'framer-motion';
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
      duration: 1000,
      once: true,
    });

    // Initialize showMore state for each category
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
      navigate(`/project/${project.id}`);
    } else {
      openDrawer(project);
    }
  };

  const categories = Object.keys(projects);

  return (
    <div className="bg-white dark:bg-dark-body transition-colors py-10 px-4 md:px-0 font-inter relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 dot-pattern opacity-5 dark:opacity-10"></div>
      <motion.div 
        className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-pink-200/20 dark:bg-pink-900/10 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-blue-200/20 dark:bg-blue-900/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
      
      <div className="w-full md:w-4/5 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tab.Group onChange={(index) => setActiveTab(index)}>
            <Tab.List className="flex space-x-1 bg-white border dark:border-gray-800 rounded-lg dark:bg-[#1B1B1A] p-1 overflow-x-auto scrollbar-hide">
              {categories.map((category, index) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `py-2 px-4 text-sm leading-5 font-medium rounded-lg outline-none duration-300 flex-shrink-0
                    ${selected 
                      ? 'bg-pink-50 dark:bg-gray-800 text-pink-600 dark:text-white border border-pink-200 dark:border-gray-700 shadow-sm' 
                      : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100/80 dark:hover:bg-white/[0.08] hover:text-gray-900 dark:hover:text-white'}`
                  }
                >
                  {t(`project_tab_${category.toLowerCase()}`, category)}
                </Tab>
              ))}
            </Tab.List>
            
            <div className="mt-8">
              {activeTab === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-10"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {t('portfolio_showcase', 'Portfolio Showcase')}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    {t('portfolio_description', 'Explore my featured projects and creative work across different categories.')}
                  </p>
                </motion.div>
              )}
              
              <Tab.Panels>
                {categories.map((category, idx) => {
                  const projectList = projects[category];
                  const isShowingMore = showMore[category];
                  const displayedProjects = isShowingMore ? projectList : projectList.slice(0, 8);
                  
                  return (
                    <Tab.Panel key={idx}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {displayedProjects.map((project, index) => (
                          <motion.div
                            key={index}
                            data-aos="fade-up"
                            data-aos-offset="200"
                            data-aos-delay={`${index * 50}`}
                            className="bg-white dark:bg-[#1B1B1A] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300"
                            whileHover={{ y: -5 }}
                          >
                            <div className="relative overflow-hidden">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 w-full">
                                  <div className="flex justify-between items-center">
                                    <span className="text-white text-xs px-2 py-1 rounded-full bg-pink-600/80 backdrop-blur-sm">
                                      {project.category || t('uncategorized', 'Uncategorized')}
                                    </span>
                                    <div className="flex gap-2">
                                      {project.projectUrl && (
                                        <a 
                                          href={project.projectUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                        >
                                          <FaExternalLinkAlt size={14} />
                                        </a>
                                      )}
                                      {project.githubUrl && (
                                        <a 
                                          href={project.githubUrl} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                                        >
                                          <FaGithub size={14} />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="p-5">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                {truncateDescription(project.description, 100)}
                              </p>
                              <div className="flex justify-between items-center">
                                <button
                                  className="flex font-medium text-sm items-center text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors"
                                  onClick={() => navigateToProjectDetails(project)}
                                >
                                  <FaLink className="mr-2" />
                                  <span>{t('view_details', 'View Details')}</span>
                                </button>
                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                  {project.projectDate}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {projectList.length > 8 && (
                        <div className="mt-10 text-center">
                          <motion.button
                            onClick={() => toggleShowMore(category)}
                            className="px-6 py-2.5 bg-white dark:bg-gray-800 text-pink-600 dark:text-white border border-pink-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {isShowingMore ? t('show_less', 'Show Less') : t('show_more', 'Show More Projects')}
                          </motion.button>
                        </div>
                      )}
                    </Tab.Panel>
                  );
                })}
              </Tab.Panels>
            </div>
          </Tab.Group>
        </motion.div>
      </div>

      <Drawer
        title={null}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        width={700}
        className="project-drawer"
        headerStyle={{ display: 'none' }}
        bodyStyle={{ padding: 0 }}
      >
        {selectedProject && (
          <div className="h-full overflow-y-auto">
            <div className="relative h-64 sm:h-80">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute top-4 right-4">
                <button 
                  onClick={closeDrawer}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <div className="flex items-center text-white/80 text-sm">
                  <span className="px-3 py-1 rounded-full bg-pink-600/80 backdrop-blur-sm">
                    {selectedProject.category || t('uncategorized', 'Uncategorized')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 mb-4">
                    {t('project_overview', 'Project Overview')}
                  </h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>{selectedProject.description}</p>
                    {selectedProject.description2 && (
                      <p className="mt-4">{selectedProject.description2}</p>
                    )}
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    {t('project_details', 'Project Details')}
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <MdCategory className="mr-3 text-gray-500" />
                      <span className="font-medium mr-2">{t('category', 'Category')}:</span> 
                      {selectedProject.category}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaUserAlt className="mr-3 text-gray-500" />
                      <span className="font-medium mr-2">{t('client', 'Client')}:</span> 
                      {selectedProject.client}
                    </li>
                    <li className="flex items-center text-gray-700 dark:text-gray-300">
                      <FaRegCalendarAlt className="mr-3 text-gray-500" />
                      <span className="font-medium mr-2">{t('date', 'Date')}:</span> 
                      {selectedProject.projectDate}
                    </li>
                    {selectedProject.technologies && (
                      <li className="flex items-start text-gray-700 dark:text-gray-300">
                        <FaCode className="mr-3 mt-1 text-gray-500" />
                        <div>
                          <span className="font-medium mr-2">{t('tech', 'Technologies')}:</span>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {selectedProject.technologies?.map((tech, idx) => (
                              <span key={idx} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-md text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-8 justify-center sm:justify-start">
                {selectedProject.projectUrl && (
                  <a
                    href={selectedProject.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaExternalLinkAlt /> {t('visit_website', 'Visit Website')}
                  </a>
                )}
                
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaGithub /> {t('view_code', 'View Code')}
                  </a>
                )}
                
                {selectedProject.caseStudyUrl && (
                  <a
                    href={selectedProject.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <FaLink /> {t('case_study', 'Case Study')}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

// Update projects with improved structure and more details
const projects = {
  All: [
    {
      title: 'Sidec',
      image: '/images/work5.png',
      description: 'Sidec is a platform that allows users to find questions, book tutors, and take practice exams. In summary, Sidec is a web app that allows students to practice and know how prepared they are for a National Exam. I am pleased to have worked on the front-end',
      description2: 'As the frontend developer of Sidec, I bring to life a vision that goes beyond pixels and code. Our platform is a dynamic canvas where education meets innovation. From personalized mock exams to real-time syllabus courses, every click is a step toward empowering students across Africa.',
      category: 'EdTech',
      client: 'Sidec Inc.',
      projectDate: '2023 to Present',
      projectUrl: 'https://sidpreview.vercel.app/',
    },
    {
      title: 'Fakaba Realty',
      image: '/images/fakabaimg.png',
      description: 'Fakaba Realty is a real estate company that deals with the buying and selling of lands and houses. I am the lead developer of this project',
      description2: 'I am the lead developer of this project, I worked on the frontend and backend of this project',
      category: 'Real Estate',
      client: 'Fakaba Realty Groups.',
      projectDate: '2023 to Present',
      projectUrl: 'https://fakaba.vercel.app/',
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
    },
    {
      title: 'Urega',
      image: '/images/work6.png',
      description: 'Founded in 2020, the Urega Foundation is a pan-African youth-led NGO founded in the Netherlands with an official branch in Cameroon. Urega was founded to support High school students in Cameroon with full scholarships',
      description2: "I have a double role at Urega where I currently work as Urega's brand manager, I design and ideate their post across social media. I have also worked on the front-end of the website and designing their application process for a seamless application process for aspiring scholars.",
      category: 'Education',
      client: 'The Urega Foundation',
      projectDate: '2022 to Present',
      projectUrl: 'https://urega.org',
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
      },
    {
      title: 'CodeXtreme',
      image: '/images/work1.png',
      description: 'CodeXtreme is a seasonal 4 days Hackathon that brings together like-minded individuals from all walks of tech to solve problems, network with local and international tech experts and companies, win prizes, and change lives with their tech solutions.',
      category: 'Events and Student development',
      client: 'Codextreme | Nigma',
      projectDate: '2024 to Present',
      projectUrl: 'https://codextremeex.netlify.app/',
    },
    {
      title: 'Smartpro',
      image: '/images/work3.png',
      description: 'This is a smart waste management software, it was just for a school project, but I am looking forward to realizing it.',
      category: 'Web Development',
      client: 'School Project',
      projectDate: '2024 to Present',
      projectUrl: 'https://example.com/project5',
    },
    {
      title: 'Viscame',
      image: '/images/work4.png',
      description: "Viscame is a tourism website, it's one of my passion projects aimed at promoting tourism in Cameroon",
      category: 'Tourism',
      client: 'Client A',
      projectDate: '2023 to Present',
      projectUrl: 'https://viscam.netlify.app/',
    },
   
    // Add more projects here
  ],
  Webapps: [
    {
        title: 'Sidec',
        image: '/images/work5.png',
        description: 'Sidec is a platform that allows users to find questions, book tutors, and take practice exams. In summary, Sidec is a web app that allows students to practice and know how prepared they are for a National Exam. I am pleased to have worked on the front-end',
        description2: 'As the frontend developer of Sidec, I bring to life a vision that goes beyond pixels and code. Our platform is a dynamic canvas where education meets innovation. From personalized mock exams to real-time syllabus courses, every click is a step toward empowering students across Africa.',
        category: 'EdTech',
        client: 'Sidec Inc.',
        projectDate: '2023 to Present',
        projectUrl: 'https://sidpreview.vercel.app/',
      },
      {
        title: 'Fakaba Realty',
        image: '/images/fakabaimg.png',
        description: 'Fakaba Realty is a real estate company that deals with the buying and selling of lands and houses. I am the lead developer of this project',
        description2: 'I am the lead developer of this project, I worked on the frontend and backend of this project',
        category: 'Real Estate',
        client: 'Fakaba Realty Groups.',
        projectDate: '2023 to Present',
        projectUrl: 'https://fakaba.vercel.app/',
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
      },
      {
        title: 'Smartpro',
        image: '/images/work3.png',
        description: 'This is a smart waste management software, it was just for a school project, but I am looking forward to realizing it.',
        category: 'Web Development',
        client: 'School Project',
        projectDate: '2024 to Present',
        projectUrl: 'https://example.com/project5',
      },
  
    // Add more projects here
  ],
  Websites: [
    {
        title: 'Multiprime',
        image: '/images/work2.png',
        description: 'Multiprime is an entertainment website that deals with promotion of music, model and arts talents.',
        description2: 'I work as Snr Frontend developer at this company, as well as their content writer',
        category: 'Entertainment',
        client: 'Client A',
        projectDate: '2024 to Present',
        projectUrl: 'https://multiprime-react.vercel.app/',
      },
      {
        title: 'Urega',
        image: '/images/work6.png',
        description: 'Founded in 2020, the Urega Foundation is a pan-African youth-led NGO founded in the Netherlands with an official branch in Cameroon. Urega was founded to support High school students in Cameroon with full scholarships',
        description2: "I have a double role at Urega where I currently work as Urega's brand manager, I design and ideate their post across social media. I have also worked on the front-end of the website and designing their application process for a seamless application process for aspiring scholars.",
        category: 'Education',
        client: 'The Urega Foundation',
        projectDate: '2022 to Present',
        projectUrl: 'https://urega.org',
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
      },
      {
        title: 'CodeXtreme',
        image: '/images/work1.png',
        description: 'CodeXtreme is a seasonal 4 days Hackathon that brings together like-minded individuals from all walks of tech to solve problems, network with local and international tech experts and companies, win prizes, and change lives with their tech solutions.',
        category: 'Events and Student development',
        client: 'Codextreme | Nigma',
        projectDate: '2024 to Present',
        projectUrl: 'https://codextremeex.netlify.app/',
      },
  ],
  Photos: [
    {
      title: 'Photo 1',
      image: '/images/about1.jpg',
      description: 'Cover art taken at ALU Rwanda to show the beauty of the campus',
    },
    {
      title: 'Photo 2',
      image: '/images/about2.jpg',
      description: 'ALU, Rwanda',
    },
    {
      title: 'Photo 3',
      image: '/images/about3.jpg',
      description: 'ALU Rwanda',
    },
    {
      title: 'Photo 4',
      image: '/images/about4.jpg',
      description: 'My return to Cameroon after 2 years of studying in Rwanda',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
   
    },
    {
      title: 'Photo 5',
      image: '/images/about7.jpg',
      description: 'Photo with a friend',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
     
    },
    {
      title: 'Photo 6',
      image: '/images/about8.jpg',
      description: 'My first visit to Musanzi, Rwanda',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
     
    },
    {
      title: 'Photo 7',
      image: '/images/about9.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    {
      title: 'Photo 8',
      image: '/images/about10.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    {
      title: 'Photo 9',
      image: '/images/about11.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    {
      title: 'Photo 10',
      image: '/images/about12.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    {
      title: 'Photo 11',
      image: '/images/about13.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    {
      title: 'Photo 12',
      image: '/images/about15.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    // Add more projects here
  ],
};

export default Tabs;