import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiFirebase,
  SiSass,
  SiNodedotjs,
  SiFigma,
  SiAdobephotoshop,
  SiAdobepremierepro,
  SiFlutter,
  SiBootstrap,
  SiGithub
} from 'react-icons/si';

const skillsData = [
  {
    skill: 'reactjs',
    level: 85,
    color: 'from-violet-600 to-purple-600',
    icon: SiReact,
    iconColor: 'text-[#61DAFB]'
  },
  {
    skill: 'nextjs',
    level: 85,
    color: 'from-violet-600 to-purple-600',
    icon: SiNextdotjs,
    iconColor: 'text-black dark:text-white'
  },
  {
    skill: 'javascript',
    level: 65,
    color: 'from-violet-600 to-purple-600',
    icon: SiJavascript,
    iconColor: 'text-[#F7DF1E]'
  },
  {
    skill: 'html_css',
    level: 99,
    color: 'from-violet-600 to-purple-600',
    icon: SiHtml5,
    iconColor: 'text-[#E34F26]'
  },
  {
    skill: 'tailwind_css',
    level: 95,
    color: 'from-violet-600 to-purple-600',
    icon: SiTailwindcss,
    iconColor: 'text-[#38B2AC]'
  },
  {
    skill: 'firebase',
    level: 75,
    color: 'from-violet-600 to-purple-600',
    icon: SiFirebase,
    iconColor: 'text-[#FFCA28]'
  },
  {
    skill: 'sass',
    level: 80,
    color: 'from-violet-600 to-purple-600',
    icon: SiSass,
    iconColor: 'text-[#CC6699]'
  },
  {
    skill: 'node_js',
    level: 65,
    color: 'from-violet-600 to-purple-600',
    icon: SiNodedotjs,
    iconColor: 'text-[#339933]'
  },
  {
    skill: 'design',
    level: 90,
    color: 'from-violet-600 to-purple-600',
    icon: SiFigma,
    iconColor: 'text-[#F24E1E]'
  },
  {
    skill: 'photography',
    level: 95,
    color: 'from-violet-600 to-purple-600',
    icon: SiAdobephotoshop,
    iconColor: 'text-[#31A8FF]'
  },
  {
    skill: 'videography',
    level: 90,
    color: 'from-violet-600 to-purple-600',
    icon: SiAdobepremierepro,
    iconColor: 'text-[#9999FF]'
  },
  {
    skill: 'react_native',
    level: 80,
    color: 'from-violet-600 to-purple-600',
    icon: SiReact,
    iconColor: 'text-[#61DAFB]'
  },
  {
    skill: 'flutter',
    level: 40,
    color: 'from-violet-600 to-purple-600',
    icon: SiFlutter,
    iconColor: 'text-[#02569B]'
  },
  {
    skill: 'bootstrap',
    level: 60,
    color: 'from-violet-600 to-purple-600',
    icon: SiBootstrap,
    iconColor: 'text-[#02569B]'
  },
  {
    skill: 'Github',
    level: 90,
    color: 'from-violet-600 to-purple-600',
    icon: SiGithub,
    iconColor: 'text-[#02569B]'
  },
];

const Skills = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-dark-body py-16 relative overflow-hidden font-inter transition-colors duration-500 ease-smooth"
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
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-12 text-center"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400">
            {t('skills_title')}
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((item, index) => (
            <SkillBar
              key={index}
              skill={t(`skills_${item.skill}`)}
              level={item.level}
              color={item.color}
              icon={item.icon}
              iconColor={item.iconColor}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const SkillBar = ({ skill, level, color, icon: Icon, iconColor, delay }) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-6"
    >
      <div className="flex justify-between mb-2 items-center">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: delay + 0.2 }}
            className={`text-xl ${iconColor}`}
          >
            <Icon />
          </motion.div>
          <motion.span
            className="text-slate-800 dark:text-slate-200 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
          >
            {skill}
          </motion.span>
        </div>
        <motion.span
          className="text-slate-700 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-2.5 bg-slate-200 dark:bg-zinc-700 rounded-full overflow-hidden">
        <motion.div
          ref={ref}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${level}%` : 0 }}
          transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
        >
          <div className="w-full h-full opacity-30 bg-[url('/sparkles.png')] animate-shimmer"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;