import React, { useEffect, useState } from 'react';
import HeroImg from '../../public/images/hero.png';
import { MdWavingHand } from "react-icons/md";
import { Link } from 'react-router-dom';
import { CloudDownload, Sparkles, Zap, Code2, Layers } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCode, FiMonitor, FiSmartphone, FiCpu, FiGrid } from 'react-icons/fi';
import { FaArrowRight } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

// Skills are now referenced by translation keys
const skillKeys = [
  'skill_web_developer',
  'skill_mobile_developer',
  'skill_ui_ux_designer',
  'skill_brand_manager',
  'skill_graphic_designer',
  'skill_tech_tutor'
];

// Info boxes data with enhanced styling - using cohesive color palette
const infoBoxes = [
  {
    id: 'frontend',
    icon: <FiCode size={20} />,
    label: 'info_frontend_label',
    value: 'info_frontend_value',
    position: 'top-4 -right-4 md:top-0 md:-right-16 lg:-right-20',
    delay: 0.8,
    gradient: 'from-violet-600 via-purple-500 to-violet-600',
    bgGlow: 'bg-violet-500/20'
  },
  {
    id: 'ui-design',
    icon: <FiMonitor size={20} />,
    label: 'info_ui_design_label',
    value: 'info_ui_design_value',
    position: 'top-1/3 -left-4 md:-left-16 lg:-left-20',
    delay: 1.0,
    gradient: 'from-rose-500 via-pink-500 to-rose-500',
    bgGlow: 'bg-rose-500/20'
  },
  {
    id: 'mobile',
    icon: <FiSmartphone size={20} />,
    label: 'info_mobile_label',
    value: 'info_mobile_value',
    position: 'bottom-8 -right-4 md:bottom-10 md:-right-12 lg:-right-16',
    delay: 1.2,
    gradient: 'from-indigo-500 via-blue-500 to-indigo-500',
    bgGlow: 'bg-indigo-500/20'
  }
];

// Floating tech icons for background
const floatingIcons = [
  { icon: <Code2 size={24} />, position: 'top-[15%] left-[10%]', delay: 0 },
  { icon: <Layers size={20} />, position: 'top-[25%] right-[15%]', delay: 0.5 },
  { icon: <FiCpu size={22} />, position: 'bottom-[30%] left-[5%]', delay: 1 },
  { icon: <FiGrid size={18} />, position: 'bottom-[20%] right-[10%]', delay: 1.5 },
  { icon: <Zap size={20} />, position: 'top-[60%] left-[15%]', delay: 2 },
];

// Grid cell component for futuristic effect
const GridCell = ({ delay, className }) => (
  <motion.div
    className={`absolute w-8 h-8 md:w-12 md:h-12 border border-violet-500/10 dark:border-violet-400/20 ${className}`}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-rose-500/5"
      animate={{ opacity: [0, 0.5, 0] }}
      transition={{ duration: 3, repeat: Infinity, delay }}
    />
  </motion.div>
);

function Hero() {
  const { t } = useTranslation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth);
      mouseY.set(clientY / innerHeight);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Text reveal animation variants
  const textRevealVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1]
      }
    })
  };

  // Stagger container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-[92vh] flex items-center bg-gradient-to-b from-slate-50 via-white to-slate-50/80 dark:from-[#09090b] dark:via-[#0c0c0f] dark:to-[#09090b] transition-all duration-700 ease-in-out relative overflow-hidden"
    >
      {/* Futuristic Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Animated grid overlay */}
        <motion.div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '120px 120px']
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear'
          }}
        />

        {/* Radial gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)]" />
      </div>

      {/* Floating Grid Cells */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <GridCell delay={0.2} className="top-[10%] left-[5%] rotate-12" />
        <GridCell delay={0.4} className="top-[20%] right-[8%] -rotate-6" />
        <GridCell delay={0.6} className="bottom-[25%] left-[12%] rotate-45" />
        <GridCell delay={0.8} className="bottom-[15%] right-[15%] -rotate-12" />
        <GridCell delay={1.0} className="top-[50%] left-[3%] rotate-6" />
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position} text-violet-500/20 dark:text-violet-400/25`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 4,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-20 -left-32 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)',
          x: moveX,
          y: moveY
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.1) 50%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Scanline Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.03]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
        }}
        animate={{ backgroundPosition: ['0px 0px', '0px 100px'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-inter relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* Left Side - Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 text-left space-y-5 md:space-y-6 lg:pr-4 max-w-2xl"
          >
            {/* Status Badge with Glow */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
                className="relative px-4 sm:px-5 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl 
                          border border-violet-200 dark:border-zinc-700/80 rounded-full text-violet-600 dark:text-violet-300 
                          font-medium inline-flex items-center shadow-lg shadow-violet-500/10 dark:shadow-violet-500/5"
              >
                {/* Animated border glow */}
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.3), transparent)',
                    backgroundSize: '200% 100%'
                  }}
                  animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative z-10 flex items-center font-inter">
                  {t('hello')}
                  <motion.span
                    animate={{ rotate: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 1 }}
                    className="text-xl sm:text-2xl ml-2"
                  >
                    <MdWavingHand />
                  </motion.span>
                </span>
              </motion.span>

              {/* New Badge with Pulse Effect */}
              <Link to="/referrals">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 1.2 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative px-4 py-1.5 bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 
                            text-white rounded-full text-xs font-medium flex items-center gap-1.5 
                            shadow-lg shadow-violet-500/30 dark:shadow-violet-500/20 overflow-hidden"
                  style={{ backgroundSize: '200% 100%' }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <HiOutlineSparkles className="relative z-10" />
                  <span className="relative z-10 font-inter">{t('new', 'NEW')}: {t('referral_program', 'Referral Program')}</span>
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                    className="relative z-10"
                  >
                    <FaArrowRight size={10} />
                  </motion.span>
                </motion.div>
              </Link>
            </div>

            {/* Main Heading with Futuristic Typography */}
            <motion.div
              custom={1}
              variants={textRevealVariants}
              className="space-y-2"
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-white leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="block"
                >
                  {t('building_products')}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="block"
                >
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 dark:from-pink-400 dark:via-purple-400 dark:to-pink-400"
                      style={{ backgroundSize: '200% 100%' }}>
                      {t('brands')}
                    </span>
                    {/* Underline decoration */}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.2, duration: 0.8 }}
                    />
                  </span>
                  {' '}{t('and')}{' '}
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400">
                      {t('experiences')}
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                    />
                  </span>
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Skills Tags with Futuristic Styling */}
            <motion.div
              className="flex flex-wrap gap-2 py-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {skillKeys.map((skillKey, index) => (
                <motion.span
                  key={skillKey}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.08), type: "spring", stiffness: 200 }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 10px 30px -10px rgba(236, 72, 153, 0.3)"
                  }}
                  className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/90 dark:bg-zinc-900/80 
                            backdrop-blur-sm text-slate-700 dark:text-zinc-300 
                            border border-slate-200/80 dark:border-zinc-700/60 
                            text-xs sm:text-sm font-medium shadow-sm hover:shadow-md cursor-default
                            transition-all duration-500 font-inter overflow-hidden group"
                >
                  {/* Hover gradient effect */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Corner accents */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-violet-500/40 dark:border-violet-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-violet-500/40 dark:border-violet-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">{t(skillKey)}</span>
                </motion.span>
              ))}
            </motion.div>

            {/* CTA Buttons with Futuristic Design */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
            >
              <motion.button
                onClick={() => window.open('/simeonazehPortfolioUpdated.pdf', '_blank')}
                className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 
                          text-white rounded-xl font-semibold 
                          flex items-center justify-center gap-2 w-full sm:w-auto
                          shadow-xl shadow-violet-600/25 dark:shadow-violet-500/20 overflow-hidden
                          transition-all duration-500 font-inter text-sm sm:text-base"
                style={{ backgroundSize: '200% 100%' }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  backgroundPosition: '100% 0',
                  boxShadow: "0 25px 50px -12px rgba(139, 92, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated shine effect */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                {/* Button content */}
                <span className="relative z-10 flex items-center gap-2">
                  {t('download_cv')}
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 15, y: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CloudDownload size={18} />
                  </motion.span>
                </span>
                {/* Corner decorations */}
                <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-white/30 rounded-tl" />
                <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-white/30 rounded-br" />
              </motion.button>

              <Link to="/contact" className="w-full sm:w-auto">
                <motion.button
                  className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-white/90 dark:bg-zinc-900/80 
                            backdrop-blur-xl border-2 border-violet-300/50 dark:border-zinc-700 
                            text-violet-600 dark:text-violet-300 
                            rounded-xl font-semibold transition-all duration-500 w-full
                            hover:border-violet-500 dark:hover:border-violet-500/50 
                            shadow-lg shadow-violet-500/10 hover:shadow-xl hover:shadow-violet-500/20
                            font-inter overflow-hidden text-sm sm:text-base"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated border gradient */}
                  <motion.span
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.1), transparent)',
                      backgroundSize: '200% 100%'
                    }}
                    animate={{ backgroundPosition: ['200% 0', '-200% 0'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                  <span className="relative z-10">{t('contact')}</span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Futuristic Stats/Decorative Line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="hidden md:flex items-center gap-4 pt-4"
            >
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-violet-500/50 to-transparent" />
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-zinc-400 font-mono">
                <Sparkles size={12} className="text-violet-500 dark:text-violet-400" />
                <span>Available for projects</span>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-rose-500/50 to-transparent" />
            </motion.div>
          </motion.div>

          {/* Right side - Futuristic Image Section */}
          <motion.div
            className="flex-1 relative w-full max-w-md lg:max-w-lg"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative mx-auto w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">

              {/* Rotating Grid Frame */}
              <motion.div
                className="absolute inset-[-20px] md:inset-[-30px]"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="frameGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
                      <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
                      <stop offset="100%" stopColor="rgba(236, 72, 153, 0.3)" />
                    </linearGradient>
                  </defs>
                  <rect x="5" y="5" width="90" height="90" fill="none" stroke="url(#frameGradient)" strokeWidth="0.3" strokeDasharray="2,4" rx="8" />
                </svg>
              </motion.div>

              {/* Counter-rotating inner frame */}
              <motion.div
                className="absolute inset-[-10px] md:inset-[-15px]"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              >
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <rect x="10" y="10" width="80" height="80" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="0.2" strokeDasharray="1,3" rx="6" />
                </svg>
              </motion.div>

              {/* Corner Accents */}
              {[
                { pos: 'top-0 left-0', rotate: 0 },
                { pos: 'top-0 right-0', rotate: 90 },
                { pos: 'bottom-0 right-0', rotate: 180 },
                { pos: 'bottom-0 left-0', rotate: 270 }
              ].map((corner, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${corner.pos} w-6 h-6 md:w-8 md:h-8`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  style={{ rotate: corner.rotate }}
                >
                  <div className="w-full h-full border-t-2 border-l-2 border-violet-500/50 dark:border-violet-400/50" />
                </motion.div>
              ))}

              {/* Glowing backdrop */}
              <motion.div
                className="absolute inset-4 rounded-2xl bg-gradient-to-br from-violet-500/20 via-purple-500/15 to-rose-500/20 blur-2xl"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Main Image Container with Glass Effect */}
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden 
                          border border-white/30 dark:border-zinc-700/50 
                          shadow-2xl shadow-violet-500/20 dark:shadow-violet-500/10
                          backdrop-blur-sm z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl p-[2px] z-0"
                  style={{
                    background: 'linear-gradient(90deg, rgba(236,72,153,0.5), rgba(139,92,246,0.5), rgba(59,130,246,0.5), rgba(236,72,153,0.5))',
                    backgroundSize: '300% 100%'
                  }}
                  animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="w-full h-full bg-white dark:bg-[#0d0d0d] rounded-2xl" />
                </motion.div>

                {/* Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden z-10">
                  <img
                    src={HeroImg}
                    alt="Profile"
                    className="w-full h-full object-cover dark:grayscale dark:hover:grayscale-0 transition-all duration-500"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Scanline effect on image */}
                  <motion.div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
                    }}
                  />

                  {/* Status indicator */}
                  <motion.div
                    className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 
                              bg-black/40 backdrop-blur-md rounded-full"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >

                  </motion.div>
                </div>
              </motion.div>

              {/* Futuristic Info Boxes */}
              {infoBoxes.map((box) => (
                <motion.div
                  key={box.id}
                  className={`absolute z-20 ${box.position}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: box.delay, type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="relative bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl
                              rounded-xl p-3 sm:p-4 shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-slate-200/80 dark:border-zinc-700/60
                              cursor-default overflow-hidden"
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Animated top border */}
                    <motion.div
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${box.gradient}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: box.delay + 0.3, duration: 0.5 }}
                    />

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute -inset-1 ${box.bgGlow} rounded-xl blur-xl opacity-0`}
                      whileHover={{ opacity: 0.5 }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <motion.div
                        className={`p-2 rounded-lg bg-gradient-to-br ${box.gradient} text-white`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        {box.icon}
                      </motion.div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-inter uppercase tracking-wider">
                          {t(box.label)}
                        </p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono">
                          {t(box.value)}
                        </p>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gray-300 dark:border-gray-600 opacity-50" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Animated Data Points */}
              <div className="absolute -right-2 md:-right-6 top-1/4 flex flex-col gap-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + i * 0.1 }}
                  >
                    <motion.div
                      className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-gradient-to-r from-violet-500 to-purple-500"
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div
                      className={`h-0.5 bg-gradient-to-r from-violet-500/50 to-transparent rounded-full`}
                      style={{ width: `${20 + i * 8}px` }}
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Floating Particles */}
              <div className="absolute -left-4 md:-left-8 bottom-1/3">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="relative mb-3"
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="w-3 h-3 md:w-4 md:h-4 rotate-45 border border-violet-500/40 dark:border-violet-400/50" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Grid Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#09090b] to-transparent pointer-events-none transition-colors duration-700" />
    </motion.div>
  );
}

export default Hero;