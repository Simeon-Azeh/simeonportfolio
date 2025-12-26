import React from 'react';
import HeroImg from '../../public/images/hero.png';
import { MdWavingHand } from "react-icons/md";
import { Link } from 'react-router-dom';
import { CloudDownload, Sparkles } from 'lucide-react';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FaArrowRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { FiCode, FiMonitor, FiSmartphone } from 'react-icons/fi';

// Skills are now referenced by translation keys
const skillKeys = [
  'skill_web_developer',
  'skill_mobile_developer',
  'skill_ui_ux_designer',
  'skill_brand_manager',
  'skill_graphic_designer',
  'skill_tech_tutor'
];

// Info boxes data with enhanced styling - using consistent violet palette
const infoBoxes = [
  {
    id: 'frontend',
    icon: <FiCode size={20} />,
    label: 'info_frontend_label',
    value: 'info_frontend_value',
    position: 'top-4 -right-4 md:top-0 md:-right-16 lg:-right-20',
    delay: 0.8,
    gradient: 'from-violet-600 to-purple-600',
    bgGlow: 'bg-violet-500/20'
  },
  {
    id: 'ui-design',
    icon: <FiMonitor size={20} />,
    label: 'info_ui_design_label',
    value: 'info_ui_design_value',
    position: 'top-1/3 -left-4 md:-left-16 lg:-left-20',
    delay: 1.0,
    gradient: 'from-violet-600 to-purple-600',
    bgGlow: 'bg-violet-500/20'
  },
  {
    id: 'mobile',
    icon: <FiSmartphone size={20} />,
    label: 'info_mobile_label',
    value: 'info_mobile_value',
    position: 'bottom-8 -right-4 md:bottom-10 md:-right-12 lg:-right-16',
    delay: 1.2,
    gradient: 'from-violet-600 to-purple-600',
    bgGlow: 'bg-violet-500/20'
  }
];

function Hero() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[92vh] flex items-center bg-gradient-to-b from-slate-50 via-white to-slate-50/80 dark:from-dark-body dark:via-dark-body dark:to-dark-body transition-colors duration-500 ease-smooth relative overflow-hidden gpu-accelerated">
      {/* Simple Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
        {/* Radial gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(139,92,246,0.06),transparent_50%)]" />
      </div>

      {/* Static Gradient Orbs */}
      <div className="absolute top-20 -left-32 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-[100px] opacity-30 dark:opacity-20"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)' }}
      />
      <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] opacity-20 dark:opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%)' }}
      />

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 font-inter relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">

          {/* Left Side - Text Content */}
          <div className="flex-1 text-left space-y-5 md:space-y-6 lg:pr-4 max-w-2xl">
            {/* Status Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <span className="relative px-4 sm:px-5 py-2 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl 
                          border border-violet-200 dark:border-zinc-700/80 rounded-full text-violet-600 dark:text-violet-300 
                          font-medium inline-flex items-center shadow-lg shadow-violet-500/10 dark:shadow-violet-500/5">
                <span className="relative z-10 flex items-center font-inter">
                  {t('hello')}
                  <span className="text-xl sm:text-2xl ml-2">
                    <MdWavingHand />
                  </span>
                </span>
              </span>

              {/* New Badge */}
              <Link to="/referrals">
                <div className="relative px-4 py-1.5 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 
                            dark:from-white dark:via-slate-100 dark:to-white
                            text-white dark:text-zinc-800 rounded-full text-xs font-medium flex items-center gap-1.5 
                            shadow-lg shadow-violet-500/30 dark:shadow-black/10 overflow-hidden
                            hover:scale-105 transition-transform duration-300">
                  <HiOutlineSparkles className="relative z-10" />
                  <span className="relative z-10 font-inter">{t('new', 'NEW')}: {t('referral_program', 'Referral Program')}</span>
                  <FaArrowRight size={10} className="relative z-10" />
                </div>
              </Link>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-light-text dark:text-white leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Montserrat Alternates', sans-serif" }}
              >
                <span className="block">
                  {t('building_products')}
                </span>
                <span className="block">
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 dark:from-pink-400 dark:via-purple-400 dark:to-pink-400">
                      {t('brands')}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full" />
                  </span>
                  {' '}{t('and')}{' '}
                  <span className="relative inline-block">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400">
                      {t('experiences')}
                    </span>
                    <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
                  </span>
                </span>
              </h1>
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 py-2">
              {skillKeys.map((skillKey, index) => (
                <span
                  key={skillKey}
                  className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-white/90 dark:bg-zinc-800/90 
                            backdrop-blur-sm text-slate-700 dark:text-zinc-200 
                            border border-slate-200/80 dark:border-zinc-600/50 
                            text-xs sm:text-sm font-medium shadow-sm hover:shadow-md cursor-default
                            transition-all duration-300 font-inter overflow-hidden group
                            hover:scale-105 hover:-translate-y-0.5"
                >
                  {/* Hover gradient effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-violet-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  {/* Corner accents */}
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-violet-500/40 dark:border-violet-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-violet-500/40 dark:border-violet-400/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10">{t(skillKey)}</span>
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={() => window.open('/simeonazehPortfolioUpdated.pdf', '_blank')}
                className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-violet-600 via-purple-600 to-violet-600 
                          dark:from-violet-600 dark:via-purple-600 dark:to-violet-600
                          text-white rounded-xl font-semibold 
                          flex items-center justify-center gap-2 w-full sm:w-auto
                          shadow-xl shadow-violet-600/25 dark:shadow-violet-500/20 overflow-hidden
                          border border-violet-500/50 dark:border-violet-400/30
                          transition-all duration-300 font-inter text-sm sm:text-base
                          hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-2xl active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t('download_cv')}
                  <CloudDownload size={18} />
                </span>
                {/* Corner decorations */}
                <span className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-white/30 rounded-tl" />
                <span className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-white/30 rounded-br" />
              </button>

              <Link to="/contact" className="w-full sm:w-auto">
                <button
                  className="group relative px-6 sm:px-8 py-3 sm:py-3.5 bg-white/90 dark:bg-transparent 
                            backdrop-blur-xl border-2 border-violet-300/50 dark:border-zinc-500/60 
                            text-violet-600 dark:text-zinc-200 
                            rounded-xl font-semibold transition-all duration-300 w-full
                            hover:border-violet-500 dark:hover:border-violet-400/50 dark:hover:text-violet-300
                            shadow-lg shadow-violet-500/10 dark:shadow-none hover:shadow-xl hover:shadow-violet-500/20
                            font-inter overflow-hidden text-sm sm:text-base
                            hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <span className="relative z-10">{t('contact')}</span>
                </button>
              </Link>
            </div>

            {/* Decorative Line */}
            <div className="hidden md:flex items-center gap-4 pt-4">
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-violet-500/50 to-transparent dark:from-zinc-500/30" />
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300 font-mono">
                <Sparkles size={12} className="text-violet-500 dark:text-slate-300" />
                <span>Available for projects</span>
              </div>
              <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-violet-500/50 to-transparent dark:from-zinc-500/30" />
            </div>
          </div>

          {/* Right side - Image Section */}
          <div className="flex-1 relative w-full max-w-md lg:max-w-lg">
            <div className="relative mx-auto w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px]">

              {/* Corner Accents - static */}
              {[
                { pos: 'top-0 left-0', rotate: 0 },
                { pos: 'top-0 right-0', rotate: 90 },
                { pos: 'bottom-0 right-0', rotate: 180 },
                { pos: 'bottom-0 left-0', rotate: 270 }
              ].map((corner, i) => (
                <div
                  key={i}
                  className={`absolute ${corner.pos} w-6 h-6 md:w-8 md:h-8 dark:opacity-30`}
                  style={{ transform: `rotate(${corner.rotate}deg)` }}
                >
                  <div className="w-full h-full border-t-2 border-l-2 border-violet-500/50 dark:border-zinc-500/50" />
                </div>
              ))}

              {/* Glowing backdrop - static */}
              <div
                className="absolute inset-4 rounded-2xl bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-violet-500/15 blur-2xl dark:from-violet-500/10 dark:via-purple-500/5 dark:to-violet-500/10 opacity-50"
              />

              {/* Main Image Container */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden 
                          border border-white/30 dark:border-zinc-700/50 
                          shadow-2xl shadow-violet-500/20 dark:shadow-violet-500/10
                          backdrop-blur-sm z-10 hover:scale-[1.02] transition-transform duration-300"
              >
                {/* Border gradient - light mode */}
                <div
                  className="absolute inset-0 rounded-2xl p-[2px] z-0 dark:hidden"
                  style={{
                    background: 'linear-gradient(90deg, rgba(139,92,246,0.5), rgba(124,58,237,0.5), rgba(139,92,246,0.5))'
                  }}
                >
                  <div className="w-full h-full bg-white rounded-2xl" />
                </div>

                {/* Simple border for dark mode */}
                <div className="absolute inset-0 rounded-2xl p-[1px] z-0 hidden dark:block bg-zinc-700/50">
                  <div className="w-full h-full bg-dark-body rounded-2xl" />
                </div>

                {/* Image */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden z-10">
                  <img
                    src={HeroImg}
                    alt="Profile"
                    className="w-full h-full object-cover dark:grayscale dark:hover:grayscale-0 transition-all duration-500"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
              </div>

              {/* Info Boxes */}
              {infoBoxes.map((box) => (
                <div
                  key={box.id}
                  className={`absolute z-20 ${box.position}`}
                >
                  <div
                    className="relative bg-white/95 dark:bg-zinc-800/95 backdrop-blur-xl
                              rounded-xl p-3 sm:p-4 shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-slate-200/80 dark:border-zinc-600/50
                              cursor-default overflow-hidden hover:scale-105 hover:-translate-y-1 transition-transform duration-300"
                  >
                    {/* Top border */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${box.gradient}`}
                    />

                    {/* Content */}
                    <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${box.gradient} text-white`}
                      >
                        {box.icon}
                      </div>
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-zinc-400 font-inter uppercase tracking-wider">
                          {t(box.label)}
                        </p>
                        <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white font-mono">
                          {t(box.value)}
                        </p>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-gray-300 dark:border-zinc-500 opacity-50" />
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#09090b] to-transparent pointer-events-none transition-colors duration-700" />
    </div>
  );
}

export default Hero;