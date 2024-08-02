import React from 'react';
import { useInView } from 'react-intersection-observer';

const skillsData = [
  { skill: 'Reactjs', level: 85 },
  { skill: 'Nextjs', level: 85 },
  { skill: 'JavaScript', level: 65 },
  { skill: 'HTML/CSS', level: 99 },
  { skill: 'Tailwind CSS', level: 95 },
  { skill: 'Node.js', level: 65 },
  { skill: 'Design', level: 90 },
  { skill: 'Photography', level: 95 },
  { skill: 'Videography', level: 90 },
  // Add more skills as needed
];

const Skills = () => {
  return (
    <div className="bg-[#f9feff] dark:bg-dark-body py-10 px-6 md:px-0 font-inter">
      <div className="w-full md:w-4/5 mx-auto">
        <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text ">Skills</h2>
        {skillsData.map((item, index) => (
          <SkillBar key={index} skill={item.skill} level={item.level} />
        ))}
      </div>
    </div>
  );
};

const SkillBar = ({ skill, level }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // Adjust this value as needed
  });

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-light-text dark:text-gray-400">{skill}</span>
        <span className="text-light-text dark:text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-[#4B4B4B] rounded-sm h-2">
        <div
          ref={ref}
          className="bg-pink-600 dark:bg-slate-300 h-2 rounded-sm  transition-all duration-700 ease-in-out"
          style={{ width: inView ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default Skills;
