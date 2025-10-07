import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsCheck, BsX } from 'react-icons/bs';
import { CgBrowser } from "react-icons/cg";
import { VscLightbulbSparkle } from "react-icons/vsc";
import { FaMobileAlt } from "react-icons/fa";
import { TbRainbow } from "react-icons/tb";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTranslation } from 'react-i18next';

const PricingCard = ({ icon: Icon, title, price, description, features, buttonLabel, popular, category, startingFrom, mostPopular }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className={`bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl w-full md:w-[calc(33.333%-2rem)] 
                  border border-gray-200 dark:border-gray-700/50 hover:shadow-xl 
                  transition-all duration-300 relative ${popular ? 'ring-2 ring-pink-600 dark:ring-pink-500' : ''}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-600 to-light-text 
                        text-white px-4 py-1 rounded-full text-sm font-medium">
          {t('most_popular', 'Most Popular')}
        </div>
      )}

      <div className="mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-light-text 
                     flex items-center justify-center text-white mb-4"
        >
          <Icon size={24} />
        </motion.div>
        <h3 className="text-xl font-semibold text-light-text dark:text-white font-inter mb-2">{title}</h3>
        <div className="text-sm text-gray-500 dark:text-white/70 mb-1 font-inter">{t('starting_from', 'Starting from')}</div>
        <div className="text-3xl font-bold text-light-text dark:text-white mb-2 font-inter">{price}</div>
        <p className="text-gray-600 dark:text-white/80 font-inter text-sm">{description}</p>
      </div>

      <ul className="space-y-3 mb-8 font-inter min-h-[200px]">
        {features.map((feature, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index }}
            className="flex items-center gap-3"
          >
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-600/20 
                           flex items-center justify-center">
              <BsCheck className="text-pink-600 dark:text-white" />
            </div>
            <span className="text-gray-700 dark:text-white/90 text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <Link to="/request-booking" className="block">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full px-6 py-3 text-white rounded-lg font-medium transition-all duration-300
                     ${popular ? 'bg-gradient-to-r from-pink-600 to-light-text' : 'bg-gray-900 dark:bg-white text-white dark:text-[#414760]'}
                     hover:shadow-lg hover:shadow-pink-600/20`}
        >
          {buttonLabel}
        </motion.button>
      </Link>
    </motion.div>
  );
};

const ComparisonTable = ({ category, plans }) => {
  const { t } = useTranslation();
  
  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h3 className="text-2xl font-bold text-light-text dark:text-white mb-2">
          {t('detailed_comparison', 'Detailed Feature Comparison')}
        </h3>
        <p className="text-gray-600 dark:text-white/70">
          {t('compare_plans', 'Compare all features across different plans')}
        </p>
      </motion.div>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-[#0d0d0d] dark:to-[#1a1a1a]">
                <tr>
                  <th scope="col" className="sticky left-0 z-10 px-6 py-5 text-left text-sm font-bold text-gray-900 dark:text-white bg-gray-50 dark:bg-[#0d0d0d]">
                    {t('pricing_features', 'Features')}
                  </th>
                  {plans.map((plan, index) => (
                    <th key={index} scope="col" className="px-6 py-5 text-center text-sm font-bold text-gray-900 dark:text-white min-w-[180px]">
                      <div className="flex flex-col items-center">
                        <span className="text-base mb-1">{plan.name}</span>
                        <span className="text-xs font-normal text-pink-600 dark:text-pink-400">{plan.price}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-[#1a1a1a] divide-y divide-gray-200 dark:divide-gray-700">
                {plans[0].detailedFeatures.map((featureGroup, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <tr className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10">
                      <td colSpan={plans.length + 1} className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="h-1 w-8 bg-gradient-to-r from-pink-600 to-light-text rounded-full"></div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                            {featureGroup.category}
                          </span>
                        </div>
                      </td>
                    </tr>
                    {featureGroup.items.map((item, itemIndex) => (
                      <motion.tr 
                        key={itemIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: itemIndex * 0.05 }}
                        className="hover:bg-gray-50 dark:hover:bg-[#0d0d0d]/50 transition-colors"
                      >
                        <td className="sticky left-0 z-10 px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#0d0d0d]/50">
                          {item.name}
                        </td>
                        {plans.map((plan, planIndex) => {
                          const feature = plan.detailedFeatures[groupIndex].items[itemIndex];
                          return (
                            <td key={planIndex} className="px-6 py-4 text-center">
                              {feature.available ? (
                                typeof feature.value === 'string' ? (
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                                    {feature.value}
                                  </span>
                                ) : (
                                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30">
                                    <BsCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                                  </div>
                                )
                              ) : (
                                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                                  <BsX className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </motion.tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Table Legend */}
      <div className="mt-6 flex justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <BsCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-gray-600 dark:text-gray-400">{t('included', 'Included')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <BsX className="w-4 h-4 text-gray-400 dark:text-gray-600" />
          </div>
          <span className="text-gray-600 dark:text-gray-400">{t('not_included', 'Not Included')}</span>
        </div>
      </div>
    </div>
  );
};

function Pricing() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('web');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const webPlans = [
    {
      name: t('pricing_web_basic_title', 'Basic'),
      price: 'XAF 150,000',
      detailedFeatures: [
        {
          category: t('pricing_table_design', 'Design & Development'),
          items: [
            { name: t('pricing_table_pages', 'Number of Pages'), available: true, value: t('pricing_table_5_pages', '5 pages') },
            { name: t('pricing_table_responsive', 'Responsive Design'), available: true },
            { name: t('pricing_table_custom_design', 'Custom Design'), available: true },
            { name: t('pricing_table_animations', 'Advanced Animations'), available: false },
          ]
        },
        {
          category: t('pricing_table_features', 'Features'),
          items: [
            { name: t('pricing_table_contact_form', 'Contact Form'), available: true },
            { name: t('pricing_table_blog', 'Blog System'), available: false },
            { name: t('pricing_table_ecommerce', 'E-commerce'), available: false },
            { name: t('pricing_table_cms', 'CMS Integration'), available: false },
          ]
        },
        {
          category: t('pricing_table_optimization', 'Optimization'),
          items: [
            { name: t('pricing_table_seo', 'SEO Optimization'), available: true, value: t('pricing_table_basic', 'Basic') },
            { name: t('pricing_table_performance', 'Performance Optimization'), available: true },
            { name: t('pricing_table_analytics', 'Analytics Setup'), available: false },
          ]
        },
        {
          category: t('pricing_table_support', 'Support & Maintenance'),
          items: [
            { name: t('pricing_table_support_period', 'Support Period'), available: true, value: t('pricing_table_1_month', '1 month') },
            { name: t('pricing_table_training', 'Training'), available: false },
            { name: t('pricing_table_documentation', 'Documentation'), available: true },
          ]
        },
      ]
    },
    {
      name: t('pricing_web_standard_title', 'Standard'),
      price: 'XAF 300,000',
      detailedFeatures: [
        {
          category: t('pricing_table_design', 'Design & Development'),
          items: [
            { name: t('pricing_table_pages', 'Number of Pages'), available: true, value: t('pricing_table_15_pages', '15 pages') },
            { name: t('pricing_table_responsive', 'Responsive Design'), available: true },
            { name: t('pricing_table_custom_design', 'Custom Design'), available: true },
            { name: t('pricing_table_animations', 'Advanced Animations'), available: true },
          ]
        },
        {
          category: t('pricing_table_features', 'Features'),
          items: [
            { name: t('pricing_table_contact_form', 'Contact Form'), available: true },
            { name: t('pricing_table_blog', 'Blog System'), available: true },
            { name: t('pricing_table_ecommerce', 'E-commerce'), available: true },
            { name: t('pricing_table_cms', 'CMS Integration'), available: false },
          ]
        },
        {
          category: t('pricing_table_optimization', 'Optimization'),
          items: [
            { name: t('pricing_table_seo', 'SEO Optimization'), available: true, value: t('pricing_table_advanced', 'Advanced') },
            { name: t('pricing_table_performance', 'Performance Optimization'), available: true },
            { name: t('pricing_table_analytics', 'Analytics Setup'), available: true },
          ]
        },
        {
          category: t('pricing_table_support', 'Support & Maintenance'),
          items: [
            { name: t('pricing_table_support_period', 'Support Period'), available: true, value: t('pricing_table_3_months', '3 months') },
            { name: t('pricing_table_training', 'Training'), available: true },
            { name: t('pricing_table_documentation', 'Documentation'), available: true },
          ]
        },
      ]
    },
    {
      name: t('pricing_web_premium_title', 'Premium'),
      price: 'XAF 500,000',
      detailedFeatures: [
        {
          category: t('pricing_table_design', 'Design & Development'),
          items: [
            { name: t('pricing_table_pages', 'Number of Pages'), available: true, value: t('pricing_table_unlimited', 'Unlimited') },
            { name: t('pricing_table_responsive', 'Responsive Design'), available: true },
            { name: t('pricing_table_custom_design', 'Custom Design'), available: true },
            { name: t('pricing_table_animations', 'Advanced Animations'), available: true },
          ]
        },
        {
          category: t('pricing_table_features', 'Features'),
          items: [
            { name: t('pricing_table_contact_form', 'Contact Form'), available: true },
            { name: t('pricing_table_blog', 'Blog System'), available: true },
            { name: t('pricing_table_ecommerce', 'E-commerce'), available: true },
            { name: t('pricing_table_cms', 'CMS Integration'), available: true },
          ]
        },
        {
          category: t('pricing_table_optimization', 'Optimization'),
          items: [
            { name: t('pricing_table_seo', 'SEO Optimization'), available: true, value: t('pricing_table_full', 'Full') },
            { name: t('pricing_table_performance', 'Performance Optimization'), available: true },
            { name: t('pricing_table_analytics', 'Analytics Setup'), available: true },
          ]
        },
        {
          category: t('pricing_table_support', 'Support & Maintenance'),
          items: [
            { name: t('pricing_table_support_period', 'Support Period'), available: true, value: t('pricing_table_6_months', '6 months') },
            { name: t('pricing_table_training', 'Training'), available: true },
            { name: t('pricing_table_documentation', 'Documentation'), available: true },
          ]
        },
      ]
    },
  ];

  const designPlans = [
    {
      name: t('pricing_design_basic_title', 'Basic'),
      price: 'XAF 200,000',
      detailedFeatures: [
        {
          category: t('pricing_table_research', 'Research & Strategy'),
          items: [
            { name: t('pricing_table_user_research', 'User Research'), available: true, value: t('pricing_table_basic', 'Basic') },
            { name: t('pricing_table_competitor_analysis', 'Competitor Analysis'), available: true },
            { name: t('pricing_table_user_personas', 'User Personas'), available: false },
            { name: t('pricing_table_user_journey', 'User Journey Mapping'), available: false },
          ]
        },
        {
          category: t('pricing_table_design_work', 'Design Work'),
          items: [
            { name: t('pricing_table_wireframes', 'Wireframes'), available: true },
            { name: t('pricing_table_mockups', 'High-Fidelity Mockups'), available: true },
            { name: t('pricing_table_screens', 'Number of Screens'), available: true, value: t('pricing_table_5_10_screens', '5-10 screens') },
            { name: t('pricing_table_prototype', 'Interactive Prototype'), available: true, value: t('pricing_table_basic', 'Basic') },
            { name: t('pricing_table_design_system', 'Design System'), available: true, value: t('pricing_table_basic', 'Basic') },
          ]
        },
        {
          category: t('pricing_table_testing', 'Testing & Refinement'),
          items: [
            { name: t('pricing_table_usability_testing', 'Usability Testing'), available: false },
            { name: t('pricing_table_ab_testing', 'A/B Testing'), available: false },
            { name: t('pricing_table_accessibility', 'Accessibility Audit'), available: false },
            { name: t('pricing_table_revisions', 'Revision Rounds'), available: true, value: '1' },
          ]
        },
      ]
    },
    {
      name: t('pricing_design_standard_title', 'Standard'),
      price: 'XAF 400,000',
      detailedFeatures: [
        {
          category: t('pricing_table_research', 'Research & Strategy'),
          items: [
            { name: t('pricing_table_user_research', 'User Research'), available: true, value: t('pricing_table_detailed', 'Detailed') },
            { name: t('pricing_table_competitor_analysis', 'Competitor Analysis'), available: true },
            { name: t('pricing_table_user_personas', 'User Personas'), available: true },
            { name: t('pricing_table_user_journey', 'User Journey Mapping'), available: true },
          ]
        },
        {
          category: t('pricing_table_design_work', 'Design Work'),
          items: [
            { name: t('pricing_table_wireframes', 'Wireframes'), available: true },
            { name: t('pricing_table_mockups', 'High-Fidelity Mockups'), available: true },
            { name: t('pricing_table_screens', 'Number of Screens'), available: true, value: t('pricing_table_15_25_screens', '15-25 screens') },
            { name: t('pricing_table_prototype', 'Interactive Prototype'), available: true, value: t('pricing_table_advanced', 'Advanced') },
            { name: t('pricing_table_design_system', 'Design System'), available: true, value: t('pricing_table_complete', 'Complete') },
          ]
        },
        {
          category: t('pricing_table_testing', 'Testing & Refinement'),
          items: [
            { name: t('pricing_table_usability_testing', 'Usability Testing'), available: true },
            { name: t('pricing_table_ab_testing', 'A/B Testing'), available: false },
            { name: t('pricing_table_accessibility', 'Accessibility Audit'), available: false },
            { name: t('pricing_table_revisions', 'Revision Rounds'), available: true, value: '3' },
          ]
        },
      ]
    },
    {
      name: t('pricing_design_premium_title', 'Premium'),
      price: 'XAF 700,000',
      detailedFeatures: [
        {
          category: t('pricing_table_research', 'Research & Strategy'),
          items: [
            { name: t('pricing_table_user_research', 'User Research'), available: true, value: t('pricing_table_comprehensive', 'Comprehensive') },
            { name: t('pricing_table_competitor_analysis', 'Competitor Analysis'), available: true },
            { name: t('pricing_table_user_personas', 'User Personas'), available: true },
            { name: t('pricing_table_user_journey', 'User Journey Mapping'), available: true },
          ]
        },
        {
          category: t('pricing_table_design_work', 'Design Work'),
          items: [
            { name: t('pricing_table_wireframes', 'Wireframes'), available: true },
            { name: t('pricing_table_mockups', 'High-Fidelity Mockups'), available: true },
            { name: t('pricing_table_screens', 'Number of Screens'), available: true, value: t('pricing_table_unlimited', 'Unlimited') },
            { name: t('pricing_table_prototype', 'Interactive Prototype'), available: true, value: t('pricing_table_advanced_animations', 'Advanced + Animations') },
            { name: t('pricing_table_design_system', 'Design System'), available: true, value: t('pricing_table_scalable', 'Scalable') },
          ]
        },
        {
          category: t('pricing_table_testing', 'Testing & Refinement'),
          items: [
            { name: t('pricing_table_usability_testing', 'Usability Testing'), available: true },
            { name: t('pricing_table_ab_testing', 'A/B Testing'), available: true },
            { name: t('pricing_table_accessibility', 'Accessibility Audit'), available: true },
            { name: t('pricing_table_revisions', 'Revision Rounds'), available: true, value: t('pricing_table_unlimited', 'Unlimited') },
          ]
        },
      ]
    },
  ];

  const mobilePlans = [
    {
      name: t('pricing_mobile_basic_title', 'Basic'),
      price: 'XAF 350,000',
      detailedFeatures: [
        {
          category: t('pricing_table_platform', 'Platform & Development'),
          items: [
            { name: t('pricing_table_platforms', 'Platforms'), available: true, value: t('pricing_table_ios_android', 'iOS & Android') },
            { name: t('pricing_table_screens_mobile', 'Number of Screens'), available: true, value: t('pricing_table_up_to_5', 'Up to 5') },
            { name: t('pricing_table_native', 'Native Development'), available: true },
            { name: t('pricing_table_custom_ui', 'Custom UI Components'), available: false },
          ]
        },
        {
          category: t('pricing_table_features_mobile', 'Features & Integration'),
          items: [
            { name: t('pricing_table_api_integration', 'API Integration'), available: true, value: t('pricing_table_basic', 'Basic') },
            { name: t('pricing_table_push', 'Push Notifications'), available: true },
            { name: t('pricing_table_in_app', 'In-App Purchases'), available: false },
            { name: t('pricing_table_offline', 'Offline Mode'), available: false },
            { name: t('pricing_table_real_time', 'Real-time Features'), available: false },
          ]
        },
        {
          category: t('pricing_table_deployment', 'Deployment & Support'),
          items: [
            { name: t('pricing_table_app_store', 'App Store Submission'), available: true },
            { name: t('pricing_table_analytics_mobile', 'Analytics Integration'), available: false },
            { name: t('pricing_table_support_mobile', 'Support Period'), available: true, value: t('pricing_table_1_month', '1 month') },
          ]
        },
      ]
    },
    {
      name: t('pricing_mobile_standard_title', 'Standard'),
      price: 'XAF 650,000',
      detailedFeatures: [
        {
          category: t('pricing_table_platform', 'Platform & Development'),
          items: [
            { name: t('pricing_table_platforms', 'Platforms'), available: true, value: t('pricing_table_ios_android', 'iOS & Android') },
            { name: t('pricing_table_screens_mobile', 'Number of Screens'), available: true, value: t('pricing_table_up_to_15', 'Up to 15') },
            { name: t('pricing_table_native', 'Native Development'), available: true },
            { name: t('pricing_table_custom_ui', 'Custom UI Components'), available: true },
          ]
        },
        {
          category: t('pricing_table_features_mobile', 'Features & Integration'),
          items: [
            { name: t('pricing_table_api_integration', 'API Integration'), available: true, value: t('pricing_table_advanced', 'Advanced') },
            { name: t('pricing_table_push', 'Push Notifications'), available: true },
            { name: t('pricing_table_in_app', 'In-App Purchases'), available: true },
            { name: t('pricing_table_offline', 'Offline Mode'), available: false },
            { name: t('pricing_table_real_time', 'Real-time Features'), available: false },
          ]
        },
        {
          category: t('pricing_table_deployment', 'Deployment & Support'),
          items: [
            { name: t('pricing_table_app_store', 'App Store Submission'), available: true },
            { name: t('pricing_table_analytics_mobile', 'Analytics Integration'), available: true },
            { name: t('pricing_table_support_mobile', 'Support Period'), available: true, value: t('pricing_table_3_months', '3 months') },
          ]
        },
      ]
    },
    {
      name: t('pricing_mobile_premium_title', 'Premium'),
      price: 'XAF 1,000,000',
      detailedFeatures: [
        {
          category: t('pricing_table_platform', 'Platform & Development'),
          items: [
            { name: t('pricing_table_platforms', 'Platforms'), available: true, value: t('pricing_table_ios_android', 'iOS & Android') },
            { name: t('pricing_table_screens_mobile', 'Number of Screens'), available: true, value: t('pricing_table_unlimited', 'Unlimited') },
            { name: t('pricing_table_native', 'Native Development'), available: true },
            { name: t('pricing_table_custom_ui', 'Custom UI Components'), available: true },
          ]
        },
        {
          category: t('pricing_table_features_mobile', 'Features & Integration'),
          items: [
            { name: t('pricing_table_api_integration', 'API Integration'), available: true, value: t('pricing_table_custom', 'Custom API') },
            { name: t('pricing_table_push', 'Push Notifications'), available: true },
            { name: t('pricing_table_in_app', 'In-App Purchases'), available: true },
            { name: t('pricing_table_offline', 'Offline Mode'), available: true },
            { name: t('pricing_table_real_time', 'Real-time Features'), available: true },
          ]
        },
        {
          category: t('pricing_table_deployment', 'Deployment & Support'),
          items: [
            { name: t('pricing_table_app_store', 'App Store Submission'), available: true },
            { name: t('pricing_table_analytics_mobile', 'Analytics Integration'), available: true },
            { name: t('pricing_table_support_mobile', 'Support Period'), available: true, value: t('pricing_table_6_months', '6 months') },
          ]
        },
      ]
    },
  ];

  const categories = {
    web: {
      title: t('web_dev_tiers', 'Web Development Packages'),
      plans: webPlans,
      cards: [
        {
          icon: CgBrowser,
          title: t('pricing_web_basic_title', 'Basic Website'),
          price: 'XAF 150,000',
          description: t('pricing_web_basic_desc', 'Perfect for small businesses'),
          features: [
            t('pricing_card_5_pages', 'Up to 5 pages'),
            t('pricing_card_responsive', 'Responsive design'),
            t('pricing_card_basic_seo', 'Basic SEO'),
            t('pricing_card_contact', 'Contact form'),
          ],
          popular: false,
        },
        {
          icon: CgBrowser,
          title: t('pricing_web_standard_title', 'Standard Website'),
          price: 'XAF 300,000',
          description: t('pricing_web_standard_desc', 'Ideal for growing businesses'),
          features: [
            t('pricing_card_15_pages', 'Up to 15 pages'),
            t('pricing_card_advanced_seo', 'Advanced SEO'),
            t('pricing_card_ecommerce', 'E-commerce ready'),
            t('pricing_card_blog', 'Blog system'),
          ],
          popular: true,
        },
        {
          icon: CgBrowser,
          title: t('pricing_web_premium_title', 'Premium Website'),
          price: 'XAF 500,000',
          description: t('pricing_web_premium_desc', 'Enterprise solution'),
          features: [
            t('pricing_card_unlimited', 'Unlimited pages'),
            t('pricing_card_full_seo', 'Full SEO'),
            t('pricing_card_custom_ecommerce', 'Custom e-commerce'),
            t('pricing_card_cms', 'CMS integration'),
          ],
          popular: false,
        },
      ]
    },
    design: {
      title: t('product_design_tiers', 'Product Design Packages'),
      plans: designPlans,
      cards: [
        {
          icon: VscLightbulbSparkle,
          title: t('pricing_design_basic_title', 'Basic Design'),
          price: 'XAF 200,000',
          description: t('pricing_design_basic_desc', 'Essential design services'),
          features: [
            t('pricing_card_research', 'Basic research'),
            t('pricing_card_wireframes', 'Wireframes'),
            t('pricing_card_5_10_screens', '5-10 screens'),
            t('pricing_card_prototype', 'Basic prototype'),
          ],
          popular: false,
        },
        {
          icon: VscLightbulbSparkle,
          title: t('pricing_design_standard_title', 'Standard Design'),
          price: 'XAF 400,000',
          description: t('pricing_design_standard_desc', 'Comprehensive design'),
          features: [
            t('pricing_card_detailed_research', 'Detailed research'),
            t('pricing_card_15_25_screens', '15-25 screens'),
            t('pricing_card_design_system', 'Design system'),
            t('pricing_card_testing', 'Usability testing'),
          ],
          popular: true,
        },
        {
          icon: VscLightbulbSparkle,
          title: t('pricing_design_premium_title', 'Premium Design'),
          price: 'XAF 700,000',
          description: t('pricing_design_premium_desc', 'Full-service design'),
          features: [
            t('pricing_card_comprehensive', 'Comprehensive research'),
            t('pricing_card_unlimited_screens', 'Unlimited screens'),
            t('pricing_card_scalable_system', 'Scalable design system'),
            t('pricing_card_ab_testing', 'A/B testing'),
          ],
          popular: false,
        },
      ]
    },
    mobile: {
      title: t('mobile_dev_tiers', 'Mobile Development Packages'),
      plans: mobilePlans,
      cards: [
        {
          icon: FaMobileAlt,
          title: t('pricing_mobile_basic_title', 'Basic App'),
          price: 'XAF 350,000',
          description: t('pricing_mobile_basic_desc', 'Simple mobile app'),
          features: [
            t('pricing_card_ios_android', 'iOS & Android'),
            t('pricing_card_5_screens', 'Up to 5 screens'),
            t('pricing_card_api', 'API integration'),
            t('pricing_card_notifications', 'Push notifications'),
          ],
          popular: false,
        },
        {
          icon: FaMobileAlt,
          title: t('pricing_mobile_standard_title', 'Standard App'),
          price: 'XAF 650,000',
          description: t('pricing_mobile_standard_desc', 'Feature-rich app'),
          features: [
            t('pricing_card_15_screens', 'Up to 15 screens'),
            t('pricing_card_advanced_api', 'Advanced API'),
            t('pricing_card_purchases', 'In-app purchases'),
            t('pricing_card_analytics', 'Analytics'),
          ],
          popular: true,
        },
        {
          icon: FaMobileAlt,
          title: t('pricing_mobile_premium_title', 'Premium App'),
          price: 'XAF 1,000,000',
          description: t('pricing_mobile_premium_desc', 'Enterprise-level app'),
          features: [
            t('pricing_card_unlimited_screens', 'Unlimited screens'),
            t('pricing_card_custom_api', 'Custom API'),
            t('pricing_card_real_time', 'Real-time features'),
            t('pricing_card_offline', 'Offline mode'),
          ],
          popular: false,
        },
      ]
    },
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-16 bg-light-body dark:bg-dark-body relative overflow-hidden"
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

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        <div className="mb-12 flex flex-col items-start">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-pink-600 dark:bg-white rounded-full mb-6"
          />
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r font-inter from-pink-600 to-light-text dark:from-white dark:to-white">
              {t('pricing_title')}
            </span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-white/80 max-w-2xl font-inter"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t('pricing_description')}
          </motion.p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700 p-1 bg-white dark:bg-[#1a1a1a]">
            {Object.entries(categories).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-gradient-to-r from-pink-600 to-light-text text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-start gap-8">
            {categories[activeCategory].cards.map((card, index) => (
              <PricingCard
                key={index}
                {...card}
                buttonLabel={t('pricing_button_get_started', 'Get Started')}
                category={activeCategory}
              />
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <ComparisonTable 
          category={activeCategory}
          plans={categories[activeCategory].plans}
        />

        {/* Custom Solution CTA */}
        <div className="flex items-center justify-between flex-col md:flex-row bg-white dark:bg-[#1B1B1A] px-6 py-6 rounded-lg w-full mt-12 border dark:border-gray-800 dark:border-solid font-inter" data-aos="fade-up">
          <div className='flex gap-2 items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <TbRainbow size={20} className='text-pink-600 dark:text-white' />
                <h3 className="text-lg font-semibold text-light-text dark:text-white">{t('pricing_custom_title')}</h3>
              </div>
              <p className="mb-4 text-gray-700 dark:text-white/90">{t('pricing_custom_desc')}</p>
            </div>
          </div>
          <Link to="/request-booking" className='bg-pink-600 flex w-full items-center justify-center md:w-1/6 text-white dark:bg-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300 dark:text-light-text' data-aos="fade-up" data-aos-delay="200">
            {t('pricing_custom_button')}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default Pricing;