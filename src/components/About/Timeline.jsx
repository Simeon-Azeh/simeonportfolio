import React from 'react';
import { motion } from 'framer-motion';
import { LiaUniversitySolid } from 'react-icons/lia';
import { GoOrganization } from 'react-icons/go';
import { useTranslation } from 'react-i18next';

const TimelineItem = ({ date, title, subtitle, description, icon: Icon, items, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="mb-12 relative pl-10"
  >
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: delay + 0.2 }}
      className="absolute left-0 top-0 w-4 h-4 rounded-full bg-white dark:bg-dark-body 
                 border-2 border-pink-600 dark:border-pink-500"
    />
    <div className="absolute left-2 top-4 w-px h-full bg-gradient-to-b from-pink-600 to-light-text 
                    dark:from-pink-500 dark:to-light-text opacity-50" />
    <div className="pl-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
        className="inline-block px-3 py-1 rounded-full text-sm font-medium font-inter
                   bg-gradient-to-r from-pink-600 to-light-text dark:from-pink-500 dark:to-light-text 
                   text-white shadow-lg transform hover:-translate-y-1 transition-transform duration-300"
      >
        {date}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="mt-4"
      >
        <h3 className="text-lg font-bold text-light-text dark:text-white font-inter">{title}</h3>
        {subtitle && (
          <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-1 font-inter">
            {Icon && <Icon className="text-pink-600 dark:text-pink-500" size={18} />}
            {subtitle}
          </p>
        )}
        {description && (
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-inter">{description}</p>
        )}
        {items && (
          <ul className="mt-4 space-y-2">
            {items.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: delay + 0.3 + (index * 0.1) }}
                className="flex items-start gap-2 text-gray-600 dark:text-gray-400 font-inter"
              >
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-pink-600 dark:bg-pink-500" />
                {item}
              </motion.li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  </motion.div>
);

function Timeline() {
  const { t } = useTranslation();

  const timelineData = [
    {
      date: t('timeline_data_2024_september_date'),
      title: t('timeline_data_2024_september_title'),
      company: t('timeline_data_2024_september_company'),
      roles: [
        t('timeline_data_2024_september_role_1'),
        t('timeline_data_2024_september_role_2'),
        t('timeline_data_2024_september_role_3')
      ]
    },
    {
      date: t('timeline_data_2024_present_date'),
      title: t('timeline_data_2024_present_title'),
      company: t('timeline_data_2024_present_company'),
      roles: [
        t('timeline_data_2024_present_role_1'),
        t('timeline_data_2024_present_role_2'),
        t('timeline_data_2024_present_role_3')
      ]
    },
    {
      date: t('timeline_data_2024_present_date_2'),
      title: t('timeline_data_2024_present_title_2'),
      company: t('timeline_data_2024_present_company_2'),
      roles: [
        t('timeline_data_2024_present_role_4'),
        t('timeline_data_2024_present_role_5'),
        t('timeline_data_2024_present_role_6')
      ]
    },
    {
      date: t('timeline_data_2024_present_date_3'),
      title: t('timeline_data_2024_present_title_3'),
      company: t('timeline_data_2024_present_company_3'),
      roles: [
        t('timeline_data_2024_present_role_7'),
        t('timeline_data_2024_present_role_8'),
        t('timeline_data_2024_present_role_9')
      ]
    },
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
    }
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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark-body py-16 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5 dark:opacity-10"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </motion.div>

      <div className="relative z-10 w-full md:w-4/5 mx-auto px-6 md:px-0">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            {/* Summary Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent font-inter 
                           bg-gradient-to-r from-pink-600 to-light-text dark:from-pink-500 dark:to-light-text">
                {t('summary_title')}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-inter">
                {t('summary_description')}
              </p>
            </motion.div>

            {/* Education Section */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white font-inter">
                {t('education_title')}
              </h2>
              {educationData.map((item, index) => (
                <TimelineItem
                  key={index}
                  date={item.date}
                  title={item.degree}
                  subtitle={item.institution}
                  description={item.description}
                  icon={LiaUniversitySolid}
                  delay={index * 0.2}
                />
              ))}
            </div>

            {/* Anticipated Skills Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white font-inter">
                {t('anticipated_skills_title')}
              </h2>
              {anticipatedSkillsData.map((item, index) => (
                <TimelineItem
                  key={index}
                  date={item.date}
                  title={item.skill}
                  description={item.description}
                  delay={index * 0.2}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Professional Experience */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white font-inter">
              {t('professional_experience_title')}
            </h2>
            {timelineData.map((item, index) => (
              <TimelineItem
                key={index}
                date={item.date}
                title={item.title}
                subtitle={item.company}
                icon={GoOrganization}
                items={item.roles}
                delay={index * 0.2}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Timeline;