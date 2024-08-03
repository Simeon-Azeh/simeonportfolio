import React, { useEffect } from 'react';
import { LiaUniversitySolid } from 'react-icons/lia';
import { GoOrganization } from 'react-icons/go';
import AOS from 'aos';
import 'aos/dist/aos.css';

const summaryData = {
  title: 'Summary',
  description: 'Co-Founder of Sidec and Afiacare. Frontend Engineer at both Sidec and Afiacare. Associate Director for digital strategy & design at Urega Foundation. Experienced in leading and contributing to tech startups and NGOs.'
};

const timelineData = [
  {
    date: '2023 to Present',
    title: 'Co-Founder & Developer', 
    company: 'Sidec Edu Ltd, Rwanda.',
    roles: ['Co-founded Sidec, an EdTech aimed at providing quality education via tech solutions.', 'Worked on the entire frontend of this project', 'Collaborating with teams to implement new features and improvements']
  },
  {
    date: '2023 to Present',
    title: 'Frontend Developer',
    company: 'Multiprime Ltd, Cameroon.',
    roles: ['Worked on the entire frontend of this project', 'Collaborated with design teams', 'Implemented responsive designs']
  },
  {
    date: '2021 to Present',
    title: 'Associate Director for digital strategy & design',
    company: 'Urega Foundation, Netherlands.',
    roles: ['Work on branding and design', 'Manage SEO and social media', 'Customer care for clients', 'Collaborate with design teams', 'Implement new features and improvements']
  },
  {
    date: '2024 to Present',
    title: 'Frontend Intern',
    company: 'CodeXtreme, Rwanda.',
    roles: ['Working with teams to improve my frontend', 'Collaborating with design teams', 'Implement new features and improvements']
  },
  {
    date: '2024 to Present',
    title: 'Frontend Intern',
    company: 'Nigma, Rwanda.',
    roles: ['Working with teams to improve my frontend', 'Collaborating with design teams', 'Implement new features and improvements']
  },
];

const educationData = [
  {
    date: '2023 - 2026',
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'African Leadership University, Rwanda',
    description: 'Focused on advanced software engineering concepts and web development.'
  },
];

const anticipatedSkillsData = [
  {
    date: '2024 - 2025',
    skill: 'Advanced React Techniques',
    description: 'Mastering React hooks, context API, and performance optimization.'
  },
  {
    date: '2025 - 2026',
    skill: 'Full Stack Development',
    description: 'Expanding knowledge to backend development with Node.js and Express.'
  },
];

const Timeline = () => {
  
    useEffect(() => {
      AOS.init({ duration: 1000 });
  
      const handleScroll = () => {
        AOS.refresh(); // Refresh AOS on scroll
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  

  return (
    <div className="bg-white dot-pattern dark:bg-dark-body py-10 px-6 md:px-0">
      <div className="w-full md:w-4/5 mx-auto flex flex-col md:flex-row justify-between font-inter">
        {/* Left Column: Summary, Education, Anticipated Skills */}
        <div className="w-full md:w-1/2 relative">
          {/* Summary */}
          <div className="mb-12 w-full relative" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text">Summary</h2>
            <p className="text-light-text dark:text-gray-400 text-justify">{summaryData.description}</p>
          </div>

          {/* Education */}
          <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text" data-aos="fade-up">Education</h2>
          <div className="relative">
            {educationData.map((item, index) => (
              <div key={index} className="mb-12 relative pl-10" data-aos="fade-up">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full border dark:border dark:border-white dark:border-solid"></div>
                <div className="absolute left-2 top-4 w-px h-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="pl-4">
                  <p className="text-pink-600 bg-light-body dark:text-gray-300 text-sm dark:bg-[#1B1B1A] w-[120px] flex justify-center px-2 py-1 mb-2 rounded border dark:border-gray-700 dark:border-solid">{item.date}</p>
                  <h3 className="text-lg text-light-text dark:text-white font-medium uppercase">{item.degree}</h3>
                  <p className="text-light-text dark:text-gray-400 flex items-center gap-2 italic text-[14px] my-2"><LiaUniversitySolid size={20} />{item.institution}</p>
                  <p className="text-light-text dark:text-gray-300 text-[14px]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Anticipated Skills */}
          <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-[#414760]" data-aos="fade-up">Anticipated Skills</h2>
          <div className="relative">
            {anticipatedSkillsData.map((item, index) => (
              <div key={index} className="mb-12 relative pl-10" data-aos="fade-up">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full border dark:border dark:border-white dark:border-solid"></div>
                <div className="absolute left-2 top-4 w-px h-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="pl-4">
                  <p className="text-pink-600 bg-light-body dark:text-gray-300 text-sm dark:bg-[#1B1B1A] w-[120px] flex justify-center px-2 py-1 mb-2 rounded border dark:border-gray-700 dark:border-solid">{item.date}</p>
                  <h3 className="text-lg text-light-text dark:text-white font-medium uppercase mt-4 mb-2">{item.skill}</h3>
                  <p className="text-light-text dark:text-gray-300 text-[14px]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Professional Experience */}
        <div className="w-full md:w-1/3 relative">
          <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text" data-aos="fade-up">Professional Experience</h2>
          <div className="relative">
            {timelineData.map((item, index) => (
              <div key={index} className="mb-12 relative pl-10" data-aos="fade-up">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full border dark:border dark:border-white dark:border-solid"></div>
                <div className="absolute left-2 top-4 w-px h-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="pl-4">
                  <p className="text-pink-600 bg-light-body dark:text-gray-300 text-sm dark:bg-[#1B1B1A] w-[140px] flex justify-center px-2 py-1 mb-2 rounded border dark:border-gray-700 dark:border-solid">{item.date}</p>
                  <h3 className="text-lg text-light-text dark:text-white font-medium uppercase mt-4 mb-2">{item.title}</h3>
                  <p className="text-light-text dark:text-gray-400 flex items-center gap-2 italic text-[14px] my-2"><GoOrganization /> {item.company}</p>
                  <ul className="list-disc list-inside pl-4 space-y-4 text-light-text dark:text-gray-300 text-[12px]">
                    {item.roles.map((role, roleIndex) => (
                      <li key={roleIndex}>{role}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
