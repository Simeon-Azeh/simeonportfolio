import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const skillsData = [
  { skill: 'reactjs', level: 85 },
  { skill: 'nextjs', level: 85 },
  { skill: 'javascript', level: 65 },
  { skill: 'html_css', level: 99 },
  { skill: 'tailwind_css', level: 95 },
  { skill: 'node_js', level: 65 },
  { skill: 'design', level: 90 },
  { skill: 'photography', level: 95 },
  { skill: 'videography', level: 90 },
  // Add more skills as needed
];

const Skills = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f9feff] dark:bg-dark-body py-10 px-6 md:px-0 font-inter">
      <div className="w-full md:w-4/5 mx-auto">
        <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text">
          {t('skills_title')}
        </h2>
        {skillsData.map((item, index) => (
          <SkillBar key={index} skill={t(`skills_${item.skill}`)} level={item.level} />
        ))}
      </div>
    </div>
  );
};

const SkillBar = ({ skill, level }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1, // Adjust this value as needed
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
          className="bg-pink-600 dark:bg-slate-300 h-2 rounded-sm transition-all duration-700 ease-in-out"
          style={{ width: inView ? `${level}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
};

export default Skills;
