import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { FaLink } from 'react-icons/fa';
import { Drawer } from 'antd';

const projects = {
  All: [
    {
      title: 'Sidec',
      image: '/images/work5.png',
      description: 'Sidec is an Edtech compan...',
      description2: 'Sidec',
      category: 'Web Development',
      client: 'Client A',
      projectDate: '2023-01-01',
      projectUrl: 'https://example.com/project1',
    },
    {
      title: 'Project 2',
      image: '/images/work2.png',
      description: 'Description 2',
      category: 'Web Development',
      client: 'Client A',
      projectDate: '2023-01-01',
      projectUrl: 'https://example.com/project2',
    },
    {
      title: 'Project 3',
      image: '/images/work6.png',
      description: 'Description 3',
      category: 'Web Development',
      client: 'Client A',
      projectDate: '2023-01-01',
      projectUrl: 'https://example.com/project3',
    },
    {
      title: 'Project 4',
      image: '/images/work1.png',
      description: 'Description 4',
      category: 'Web Development',
      client: 'Client A',
      projectDate: '2023-01-01',
      projectUrl: 'https://example.com/project4',
    },
    {
      title: 'Project 5',
      image: '/images/work3.png',
      description: 'Description 5',
      category: 'Web Development',
      client: 'Client A',
      projectDate: '2023-01-01',
      projectUrl: 'https://example.com/project5',
    },
    {
      title: 'Project 6',
      image: '/images/work4.png',
      description: 'Description 6',
      category: 'Web Development',
      client: 'Client A',
      projectDate: '2023-01-01',
      projectUrl: 'https://example.com/project6',
    },
    {
      title: 'Project 7',
      image: '/images/work7.png',
      description: 'Description 7',
      category: 'Web Development',
      client: 'Client A',
      projectDate: '2023-01-01',
      projectUrl: 'https://example.com/project7',
    },
    // Add more projects here
  ],
  Webapps: [
    {
      title: 'Webapp 1',
      image: '/images/work5.png',
      description: 'Description 1',
      category: 'Web App',
      client: 'Client B',
      projectDate: '2023-02-01',
      projectUrl: 'https://example.com/webapp1',
    },
    {
      title: 'Webapp 2',
      image: '/images/work4.png',
      description: 'Description 2',
      category: 'Web App',
      client: 'Client B',
      projectDate: '2023-02-01',
      projectUrl: 'https://example.com/webapp2',
    },
    {
      title: 'Webapp 3',
      image: '/images/work3.png',
      description: 'Description 3',
      category: 'Web App',
      client: 'Client B',
      projectDate: '2023-02-01',
      projectUrl: 'https://example.com/webapp3',
    },
    // Add more projects here
  ],
  Websites: [
    {
      title: 'Website 1',
      image: '/images/work2.png',
      description: 'Description 1',
      category: 'Website',
      client: 'Client C',
      projectDate: '2023-03-01',
      projectUrl: 'https://example.com/website1',
    },
    // Add more projects here
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
    <div className="bg-[#f9feff] dark:bg-dark-body transition-colors py-10 px-4 md:px-0 font-inter">
      <div className="w-full md:w-4/5 mx-auto">
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-[#f9feff] dark:bg-[#1B1B1A] p-1">
            {Object.keys(projects).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  `w-full py-2 text-sm leading-5 font-medium text-slate-100 rounded-lg outline-none duration-300
                  ${selected ? 'border border-gray-700 shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
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
                      className="bg-[#f9feff] dark:bg-[#1B1B1A] dark:border dark:border-gray-700 dark:border-solid shadow-lg rounded-lg overflow-hidden hover:translate-y-[-5px] duration-300"
                    >
                        <div className='w-[90%] py-4  mx-auto'>
                        <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-md cursor-pointer hover:scale-105 duration-300"
                      />
                        </div>
                    
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{project.title}</h3>
                        <p className="text-gray-700 dark:text-gray-400 text-sm">{project.description}</p>
                        <button
                          className="flex font-medium text-[13px] items-center mt-4 text-blue-600 dark:text-gray-200"
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
                    className="mt-4 px-4 py-2 text-blue-600 dark:text-gray-200 border border-gray-700 border-solid dark:border-gray-700 rounded-md"
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
        width={600}
        className='font-inter'
      >
        {selectedProject && (
          <div>
            <img
              src={selectedProject.image}
              alt={selectedProject.title}
              className="w-full h-80 object-cover"
            />
            <p className="mt-4">{selectedProject.description2}</p>

            <ul className="mt-4">
              <li>
                <strong>Category:</strong> {selectedProject.category}
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
        )}
      </Drawer>
    </div>
  );
};

export default Tabs;
