import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import { useTranslation } from 'react-i18next';

const socialLinks = [
  {
    icon: FaFacebook,
    url: "https://www.facebook.com/kongnyuy.simeon.3",
    label: "Facebook"
  },
  {
    icon: FaWhatsapp,
    url: "https://wa.me/250798654693",
    label: "WhatsApp"
  },
  {
    icon: FaInstagram,
    url: "https://www.instagram.com/heis_kay_c",
    label: "Instagram"
  },
  {
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/simeonazeh",
    label: "LinkedIn"
  }
];

const navLinks = ["resume", "contact", "services", "portfolio"];

function Footer() {
  const { t } = useTranslation();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 font-inter transition-colors duration-500 ease-smooth dark:from-dark-body dark:via-dark-body dark:to-dark-body"
    >
      {/* Subtle glow for dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="absolute -top-20 -left-20 w-[400px] h-[300px] bg-violet-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[200px] bg-violet-500/5 rounded-full blur-[80px]" />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Gradient overlay at top */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent dark:via-violet-500/50" />

      <div className="relative z-10 border-t border-white/10 dark:border-zinc-800/50">
        <div className="mx-auto w-full md:w-4/5">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-8 px-6 py-16 md:grid-cols-2 md:px-0 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="space-y-4">
              <motion.h2
                className="font-montserrat-alt text-2xl font-bold text-white dark:bg-gradient-to-r dark:from-violet-400 dark:to-purple-400 dark:bg-clip-text dark:text-transparent"
              >
                {t('name')} <span>{t('surname')}</span>
              </motion.h2>
              <p className="max-w-sm text-violet-100 dark:text-slate-400">
                {t('footer_description')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                {t('quick_links')}
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <motion.li
                    key={link}
                    className="group"
                  >
                    <Link
                      to={`/${link}`}
                      className="flex items-center gap-1 text-violet-100 transition-colors duration-300 hover:text-white dark:text-slate-400 dark:hover:text-violet-400"
                    >
                      <span className="text-white dark:text-violet-400">
                        <FiChevronRight className="opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5" />
                      </span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        {t(link)}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                {t('follow_me')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -3 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-violet-600 hover:shadow-lg dark:bg-zinc-800 dark:text-slate-400 dark:hover:bg-gradient-to-r dark:hover:from-violet-500 dark:hover:to-purple-500 dark:hover:text-white"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white dark:text-white">
                {t('contact_info')}
              </h3>
              <ul className="space-y-2 text-violet-100 dark:text-slate-400">
                <li className="cursor-pointer transition-colors hover:text-white dark:hover:text-violet-400">contact@simeonazeh.com</li>
                <li className="cursor-pointer transition-colors hover:text-white dark:hover:text-violet-400">+250 798 654 693</li>
                <li>Kigali, Rwanda</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 px-6 py-6 dark:border-zinc-800/50 md:px-0">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-violet-100 dark:text-slate-400 md:text-left">
                © {new Date().getFullYear()} {t('name')} {t('surname')}. {t('all_rights_reserved')}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link to="/terms" className="text-violet-100 transition-colors duration-300 hover:text-white dark:text-slate-400 dark:hover:text-violet-400">
                  {t('terms_conditions')}
                </Link>
                <Link to="/cookies" className="text-violet-100 transition-colors duration-300 hover:text-white dark:text-slate-400 dark:hover:text-violet-400">
                  {t('cookies')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

export default Footer;