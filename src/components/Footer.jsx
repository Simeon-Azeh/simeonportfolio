import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";
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
      className="bg-white dark:bg-dark-body transition-colors font-inter relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 border-t border-gray-200 dark:border-gray-800">
        <div className="w-full md:w-4/5 mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16 px-6 md:px-0">
            {/* Brand Section */}
            <div className="space-y-4">
              <motion.h2 
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 dark:from-white dark:to-gray-300"
              >
                {t('name')} <span>{t('surname')}</span>
              </motion.h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                {t('footer_description')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('quick_links')}
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <motion.li 
                    key={link}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      to={`/${link}`}
                      className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-white transition-colors"
                    >
                      {t(link)}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('follow_me')}
              </h3>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, url, label }) => (
                  <motion.a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center
                             text-gray-600 dark:text-gray-400 hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600
                             transition-colors"
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('contact_info')}
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>contact@simeonazeh.com</li>
                <li>+250 798 654 693</li>
                <li>Kigali, Rwanda</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-200 dark:border-gray-800 py-6 px-6 md:px-0">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} {t('name')} {t('surname')}. {t('all_rights_reserved')}
              </p>
              <div className="flex gap-6 text-sm">
                <Link to="/terms" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-white transition-colors">
                  {t('terms_conditions')}
                </Link>
                <Link to="/cookies" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-white transition-colors">
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