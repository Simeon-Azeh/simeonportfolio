import React, { useEffect } from 'react';
import { LiaUniversitySolid } from 'react-icons/lia';
import { GoOrganization } from 'react-icons/go';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Timeline = () => {
  const { t } = useTranslation();

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

  const summaryData = {
    title: t('summary_title'),
    description: t('summary_description')
  };

  const timelineData = [
    {
      date: t('timeline_data_2023_to_present_date'),
      title: t('timeline_data_2023_to_present_title'),
      company: t('timeline_data_2023_to_present_company'),
      roles: [
        t('timeline_data_2023_to_present_role_1'),
        t('timeline_data_2023_to_present_role_2'),
        t('timeline_data_2023_to_present_role_3')
      ]
    },
    {
      date: t('timeline_data_2023_to_present_date'),
      title: t('timeline_data_2023_to_present_title_2'),
      company: t('timeline_data_2023_to_present_company_2'),
      roles: [
        t('timeline_data_2023_to_present_role_4'),
        t('timeline_data_2023_to_present_role_5'),
        t('timeline_data_2023_to_present_role_6')
      ]
    },
    {
      date: t('timeline_data_2021_to_present_date'),
      title: t('timeline_data_2021_to_present_title'),
      company: t('timeline_data_2021_to_present_company'),
      roles: [
        t('timeline_data_2021_to_present_role_1'),
        t('timeline_data_2021_to_present_role_2'),
        t('timeline_data_2021_to_present_role_3'),
        t('timeline_data_2021_to_present_role_4'),
        t('timeline_data_2021_to_present_role_5')
      ]
    },
    {
      date: t('timeline_data_2024_to_present_date_1'),
      title: t('timeline_data_2024_to_present_title_3'),
      company: t('timeline_data_2024_to_present_company_3'),
      roles: [
        t('timeline_data_2024_to_present_role_7'),
        t('timeline_data_2024_to_present_role_8'),
        t('timeline_data_2024_to_present_role_9')
      ]
    },
    {
      date: t('timeline_data_2024_to_present_date_2'),
      title: t('timeline_data_2024_to_present_title_4'),
      company: t('timeline_data_2024_to_present_company_4'),
      roles: [
        t('timeline_data_2024_to_present_role_10'),
        t('timeline_data_2024_to_present_role_11'),
        t('timeline_data_2024_to_present_role_12')
      ]
    },
  ];

  const educationData = [
    {
      date: t('education_data_date'),
      degree: t('education_data_degree'),
      institution: t('education_data_institution'),
      description: t('education_data_description')
    }
  ];

  const anticipatedSkillsData = [
    {
      date: t('anticipated_skills_data_2024_to_2025_date'),
      skill: t('anticipated_skills_data_2024_to_2025_skill'),
      description: t('anticipated_skills_data_2024_to_2025_description')
    },
    {
      date: t('anticipated_skills_data_2025_to_2026_date'),
      skill: t('anticipated_skills_data_2025_to_2026_skill'),
      description: t('anticipated_skills_data_2025_to_2026_description')
    }
  ];

  return (
    <div className="bg-white dot-pattern dark:bg-dark-body py-10 px-6 md:px-0">
      <div className="w-full md:w-4/5 mx-auto flex flex-col md:flex-row justify-between font-inter">
        {/* Left Column: Summary, Education, Anticipated Skills */}
        <div className="w-full md:w-1/2 relative">
          {/* Summary */}
          <div className="mb-12 w-full relative" data-aos="fade-up">
            <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text">{summaryData.title}</h2>
            <p className="text-light-text dark:text-gray-400 text-justify">{summaryData.description}</p>
          </div>

          {/* Education */}
          <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text" data-aos="fade-up">{t('education_title')}</h2>
          <div className="relative">
            {educationData.map((item, index) => (
              <div key={index} className="mb-12 relative pl-10" data-aos="fade-up">
                <div className="absolute left-0 top-0 w-4 h-4 rounded-full border dark:border dark:border-white dark:border-solid"></div>
                <div className="absolute left-2 top-4 w-px h-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="pl-4">
                  <p className="text-pink-600 bg-light-body dark:text-gray-300 text-sm dark:bg-[#1B1B1A] w-[120px] flex justify-center px-2 py-1 mb-2 rounded border dark:border-gray-700 dark:border-solid">{item.date}</p>
                  <h3 className="text-lg text-light-text dark:text-white font-medium uppercase">{item.degree}</h3>
                  <p className="text-light-text dark:text-gray-400 flex items-center gap-2 italic text-[14px]"><LiaUniversitySolid size={20} />{item.institution}</p>
                  <p className="text-light-text dark:text-gray-300 text-[14px]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Anticipated Skills */}
          <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-[#414760]" data-aos="fade-up">{t('anticipated_skills_title')}</h2>
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
          <h2 className="text-2xl md:text-3xl mb-6 dark:text-slate-50 text-light-text" data-aos="fade-up">{t('professional_experience_title')}</h2>
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
