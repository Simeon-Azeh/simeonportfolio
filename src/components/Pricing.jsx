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
      className={`bg-white dark:bg-dark-body p-8 rounded-2xl w-full md:w-[calc(33.333%-2rem)] 
                  border border-slate-200 dark:border-zinc-800 hover:shadow-xl dark:hover:shadow-violet-500/5
                  transition-all duration-300 relative ${popular ? 'ring-2 ring-violet-600 dark:ring-violet-500/50' : ''}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 
                        text-white px-4 py-1 rounded-full text-sm font-medium">
          {t('most_popular', 'Most Popular')}
        </div>
      )}

      <div className="mb-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 
                     flex items-center justify-center text-white mb-4"
        >
          <Icon size={24} />
        </motion.div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white font-inter mb-2">{title}</h3>
        <div className="text-sm text-slate-500 dark:text-slate-400 mb-1 font-inter">{t('starting_from', 'Starting from')}</div>
        <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2 font-inter">{price}</div>
        <p className="text-slate-600 dark:text-slate-400 font-inter text-sm">{description}</p>
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
            <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 dark:bg-violet-600/20 
                           flex items-center justify-center">
              <BsCheck className="text-violet-600 dark:text-violet-400" />
            </div>
            <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
          </motion.li>
        ))}
      </ul>

      <Link to="/request-booking" className="block">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full px-6 py-3 text-white rounded-lg font-medium transition-all duration-300
                     ${popular ? 'bg-gradient-to-r from-violet-600 to-purple-600' : 'bg-slate-800 dark:bg-white text-white dark:text-slate-800'}
                     hover:shadow-lg hover:shadow-violet-500/20`}
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
    <div className="mt-20 font-inter">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          viewport={{ once: true }}
          className="h-1 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full mx-auto mb-4"
        />
        <h3 className="text-3xl md:text-4xl font-bold font-montserrat-alt bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-3">
          {t('detailed_comparison', 'Detailed Feature Comparison')}
        </h3>
        <p className="text-light-text dark:text-slate-400 text-lg max-w-2xl mx-auto">
          {t('compare_plans', 'Compare all features across different plans')}
        </p>
      </motion.div>

      <div className="overflow-x-auto rounded-2xl">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-xl dark:shadow-violet-500/5">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-zinc-800">
              <thead className="bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100 dark:from-dark-body dark:via-dark-body dark:to-dark-body">
                <tr>
                  <th scope="col" className="sticky left-0 z-10 px-6 py-6 text-left text-sm font-bold font-inter text-slate-900 dark:text-white bg-slate-100 dark:bg-dark-body border-r border-slate-200 dark:border-zinc-800">
                    {t('pricing_features', 'Features')}
                  </th>
                  {plans.map((plan, index) => (
                    <th key={index} scope="col" className="px-6 py-6 text-center min-w-[180px]">
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-lg font-bold font-montserrat-alt text-slate-900 dark:text-white">{plan.name}</span>
                        <span className="text-sm font-medium font-inter bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">{plan.price}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-body divide-y divide-slate-100 dark:divide-zinc-800">
                {plans[0].detailedFeatures.map((featureGroup, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <tr className="bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 dark:from-violet-900/10 dark:via-violet-900/5 dark:to-violet-900/10">
                      <td colSpan={plans.length + 1} className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-1.5 w-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full"></div>
                          <span className="text-sm font-bold font-inter text-slate-800 dark:text-white uppercase tracking-wider">
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
                        className="hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors duration-200"
                      >
                        <td className="sticky left-0 z-10 px-6 py-4 text-sm font-medium font-inter text-slate-700 dark:text-slate-300 bg-white dark:bg-dark-body hover:bg-slate-50 dark:hover:bg-zinc-800/50 border-r border-slate-100 dark:border-zinc-800 transition-colors duration-200">
                          {item.name}
                        </td>
                        {plans.map((plan, planIndex) => {
                          const feature = plan.detailedFeatures[groupIndex].items[itemIndex];
                          return (
                            <td key={planIndex} className="px-6 py-4 text-center">
                              {feature.available ? (
                                typeof feature.value === 'string' ? (
                                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium font-inter bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300">
                                    {feature.value}
                                  </span>
                                ) : (
                                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                                    <BsCheck className="w-6 h-6 text-green-600 dark:text-green-400" />
                                  </div>
                                )
                              ) : (
                                <div className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-dark-tertiary">
                                  <BsX className="w-6 h-6 text-slate-400 dark:text-slate-600" />
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
      <div className="mt-8 flex justify-center gap-8 text-sm font-inter">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 flex items-center justify-center">
            <BsCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-slate-600 dark:text-slate-400">{t('included', 'Included')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-dark-tertiary flex items-center justify-center">
            <BsX className="w-4 h-4 text-slate-400 dark:text-slate-600" />
          </div>
          <span className="text-slate-600 dark:text-slate-400">{t('not_included', 'Not Included')}</span>
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
      className="py-16 bg-light-body dark:bg-dark-body relative overflow-hidden transition-colors duration-500 ease-smooth"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="w-full md:w-4/5 mx-auto px-6 md:px-0 relative z-10">
        <div className="mb-12 flex flex-col items-start">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 rounded-full mb-6"
          />

          <motion.h2
            className="text-3xl md:text-4xl font-bold font-montserrat-alt mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r font-inter from-violet-600 to-slate-700 dark:from-violet-400 dark:to-slate-200">
              {t('pricing_title')}
            </span>
          </motion.h2>
          <motion.p
            className="text-slate-600 dark:text-slate-400 max-w-2xl font-inter"
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
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-zinc-800 p-1 bg-white dark:bg-dark-body">
            {Object.entries(categories).map(([key, { title }]) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${activeCategory === key
                  ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
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
        <div className="flex items-center justify-between flex-col md:flex-row bg-white dark:bg-dark-body px-6 py-6 rounded-lg w-full mt-12 border border-slate-200 dark:border-zinc-800 font-inter" data-aos="fade-up">
          <div className='flex gap-2 items-center'>
            <div>
              <div className='flex items-center gap-2'>
                <TbRainbow size={20} className='text-violet-600 dark:text-violet-400' />
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{t('pricing_custom_title')}</h3>
              </div>
              <p className="mb-4 text-slate-700 dark:text-slate-300">{t('pricing_custom_desc')}</p>
            </div>
          </div>
          <Link to="/request-booking" className='bg-gradient-to-r from-violet-600 to-purple-600 flex w-full items-center justify-center md:w-1/6 text-white px-4 py-2 rounded-lg hover:translate-y-[-3px] duration-300 hover:shadow-lg hover:shadow-violet-500/20' data-aos="fade-up" data-aos-delay="200">
            {t('pricing_custom_button')}
          </Link>
        </div>
      </div>
    </motion.section>
  );
}

export default Pricing;