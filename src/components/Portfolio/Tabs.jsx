import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaLink } from 'react-icons/fa';
import { Drawer } from 'antd';

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
      projectUrl: 'https://sidecedu.com',
    },
    {
      title: 'Multiprime',
      image: '/images/work2.png',
      description: 'Multiprime is an entertainment website that deals with promotion of music, model and arts talents.',
      description2: 'I work as Snr Frontend developer at this company, as well as their content writer',
      category: 'Entertainment',
      client: 'Client A',
      projectDate: '2024 to Present',
      projectUrl: 'https://multiprime.org',
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
        projectUrl: 'https://sidecedu.com',
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
        projectUrl: 'https://multiprime.org',
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
      description: 'Description 1',
    },
    {
      title: 'Photo 2',
      image: '/images/about2.jpg',
      description: 'Description 1',
    },
    {
      title: 'Photo 3',
      image: '/images/about3.jpg',
      description: 'Description 1',
    },
    {
      title: 'Photo 4',
      image: '/images/about4.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    {
      title: 'Photo 5',
      image: '/images/about7.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
    },
    {
      title: 'Photo 6',
      image: '/images/about8.jpg',
      description: 'Description 1',
      category: 'Photography',
      client: 'Client D',
      projectDate: '2023-04-01',
      projectUrl: 'https://example.com/photo1',
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

const Tabs = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const openDrawer = (project) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };


  return (
    <div className="bg-white dot-pattern  dark:bg-dark-body transition-colors py-10 px-4 md:px-0 font-inter">
      <div className="w-full md:w-4/5 mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-white border dark:border-none rounded-lg dark:bg-[#1B1B1A] p-1">
            {Object.keys(projects).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full py-2 text-sm leading-5 font-medium text-pink-600 dark:text-slate-100 rounded-lg outline-none duration-300
                  ${selected ? 'border border-pink-600 dark:border-gray-700 dark:border-solid shadow' : 'text-blue-100 hover:bg-slate-300/[0.12] dark:hover:bg-white/[0.12] dark:hover:text-white'}`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-8">
            {Object.values(projects).map((projectList, idx) => (
              <Tab.Panel
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {projectList
                  .slice(0, showMore ? projectList.length : 4)
                  .map((project, index) => (
                    <div
                      key={index}
                      className="bg-white border dark:bg-[#1B1B1A] dark:border dark:border-gray-700 dark:border-solid shadow-lg rounded-lg overflow-hidden hover:translate-y-[-5px] duration-300"
                    >
                        <div className='w-[90%] py-4  mx-auto'>
                        <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-md cursor-pointer hover:scale-105 duration-300"
                      />
                        </div>
                    
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-light-text dark:text-white">{project.title}</h3>
                        <p className="text-light-text dark:text-gray-400 text-sm hidden md:block">   {truncateDescription(project.description, 28)}</p>
                        <p className="text-light-text dark:text-gray-400 text-sm block md:hidden">   {truncateDescription(project.description, 80)}</p>
                        <button
                          className="flex font-medium text-[13px] items-center mt-4 text-pink-600 dark:text-gray-200"
                          onClick={() => openDrawer(project)}
                        >
                          <FaLink className="mr-2" />
                          <span>Read More</span>
                        </button>
                      </div>
                    </div>
                  ))}
                {projectList.length > 4 && (
                  <button
                    onClick={toggleShowMore}
                    className="mt-4 px-4 py-2 text-pink-600 dark:text-gray-200 border dark:border-gray-700) dark:border-solid dark:dar rounded-md"
                  >
                    {showMore ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      <Drawer
        title={selectedProject?.title}
        placement="left"
        onClose={closeDrawer}
        open={isDrawerOpen}
        width={700}
        className='font-inter'
      >
        {selectedProject && (
          <div>
            <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='w-full md:w-[70%] '>
                <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-48 object-cover"
            />
                </div>
                <div className='w-full md:w-[30%]'>
                <ul className="mt-4 text-[#6b7280]">
              <li>
                <strong >Category:</strong> {selectedProject.category}
              </li>
              <li>
                <strong>Client:</strong> {selectedProject.client}
              </li>
              <li>
                <strong>Project Date:</strong> {selectedProject.projectDate}
              </li>
              <li>
                <strong>Project URL:</strong>{' '}
                <a
                  href={selectedProject.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  {selectedProject.projectUrl}
                </a>
              </li>
            </ul>
                </div>
           
            </div>
            <div>
                 <h2 className='text-lg font-semibold mt-5 mb-2 text-[#414760]'>Project Overview</h2>
              <p className="text-justify text-base">{selectedProject.description}</p>
            <p className="mt-4 text-justify text-base">{selectedProject.description2}</p>
            </div>
           

          
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Tabs;
