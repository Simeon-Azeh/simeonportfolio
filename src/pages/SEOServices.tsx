import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import { Helmet } from 'react-helmet-async';

import Header from '../components/Header';
import Footer from '../components/Footer';
import {
    BsCheckCircleFill,
    BsGraphUp,
    BsSearch,
    BsSpeedometer2,
    BsGlobe,
    BsChevronDown,
    BsBarChartFill,
    BsLightningChargeFill
} from 'react-icons/bs';
import {
    FaGoogle,
    FaRocket,
    FaChartLine,
    FaSearchPlus,
    FaQuoteLeft
} from 'react-icons/fa';
import { HiOutlineSparkles, HiOutlineTrendingUp } from 'react-icons/hi';
import { SiGoogleanalytics, SiVercel } from 'react-icons/si';
import { Link } from 'react-router-dom';

// Screenshots - add your actual screenshots to public/images/
const googleIndexingScreenshot = '/images/seo-google-indexing.png';
const vercelAnalyticsScreenshot = '/images/seo-vercel-analytics.png';

const SEOServices = () => {
    const { t } = useTranslation();
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        window.scrollTo(0, 0);
    }, []);

    const toggleFaq = (index: number): void => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const seoServices = [
        {
            title: t('seo_service_audit', 'SEO Audit & Analysis'),
            icon: BsSearch,
            description: t('seo_service_audit_desc', 'Comprehensive analysis of your website\'s current SEO status, identifying issues and opportunities for improvement.'),
            features: [
                t('seo_audit_feature_1', 'Technical SEO analysis'),
                t('seo_audit_feature_2', 'Keyword research & mapping'),
                t('seo_audit_feature_3', 'Competitor analysis'),
                t('seo_audit_feature_4', 'Content gap analysis'),
            ]
        },
        {
            title: t('seo_service_onpage', 'On-Page Optimization'),
            icon: HiOutlineSparkles,
            description: t('seo_service_onpage_desc', 'Optimize your website content and structure for better search engine visibility and user experience.'),
            features: [
                t('seo_onpage_feature_1', 'Meta tags optimization'),
                t('seo_onpage_feature_2', 'Content optimization'),
                t('seo_onpage_feature_3', 'URL structure improvement'),
                t('seo_onpage_feature_4', 'Internal linking strategy'),
            ]
        },
        {
            title: t('seo_service_technical', 'Technical SEO'),
            icon: BsSpeedometer2,
            description: t('seo_service_technical_desc', 'Ensure your website meets all technical requirements for optimal search engine crawling and indexing.'),
            features: [
                t('seo_technical_feature_1', 'Site speed optimization'),
                t('seo_technical_feature_2', 'Mobile responsiveness'),
                t('seo_technical_feature_3', 'Schema markup implementation'),
                t('seo_technical_feature_4', 'XML sitemap & robots.txt'),
            ]
        },
        {
            title: t('seo_service_indexing', 'Google Search Indexing'),
            icon: FaGoogle,
            description: t('seo_service_indexing_desc', 'Get your website properly indexed on Google Search with Search Console setup and monitoring.'),
            features: [
                t('seo_indexing_feature_1', 'Google Search Console setup'),
                t('seo_indexing_feature_2', 'Sitemap submission'),
                t('seo_indexing_feature_3', 'Index coverage monitoring'),
                t('seo_indexing_feature_4', 'Crawl error resolution'),
            ]
        },
        {
            title: t('seo_service_analytics', 'Analytics & Reporting'),
            icon: BsGraphUp,
            description: t('seo_service_analytics_desc', 'Track your website performance with comprehensive analytics setup and regular performance reports.'),
            features: [
                t('seo_analytics_feature_1', 'Google Analytics setup'),
                t('seo_analytics_feature_2', 'Vercel Analytics integration'),
                t('seo_analytics_feature_3', 'Performance dashboards'),
                t('seo_analytics_feature_4', 'Monthly reporting'),
            ]
        },
        {
            title: t('seo_service_local', 'Local SEO'),
            icon: BsGlobe,
            description: t('seo_service_local_desc', 'Boost your local search presence and help customers in your area find your business easily.'),
            features: [
                t('seo_local_feature_1', 'Google My Business optimization'),
                t('seo_local_feature_2', 'Local keyword targeting'),
                t('seo_local_feature_3', 'Citation building'),
                t('seo_local_feature_4', 'Review management'),
            ]
        },
    ];

    const pricingPlans = [
        {
            name: t('seo_plan_starter', 'Starter'),
            price: 'XAF 50,000',
            period: t('seo_one_time', 'one-time'),
            description: t('seo_plan_starter_desc', 'Perfect for new websites needing basic SEO setup'),
            features: [
                t('seo_starter_feature_1', 'Basic SEO audit'),
                t('seo_starter_feature_2', 'Google Search Console setup'),
                t('seo_starter_feature_3', 'Sitemap creation & submission'),
                t('seo_starter_feature_4', 'Basic meta tags optimization'),
                t('seo_starter_feature_5', '1 week support'),
            ],
            popular: false,
        },
        {
            name: t('seo_plan_growth', 'Growth'),
            price: 'XAF 150,000',
            period: t('seo_one_time', 'one-time'),
            description: t('seo_plan_growth_desc', 'Comprehensive SEO for growing businesses'),
            features: [
                t('seo_growth_feature_1', 'Full SEO audit & strategy'),
                t('seo_growth_feature_2', 'On-page optimization (10 pages)'),
                t('seo_growth_feature_3', 'Technical SEO fixes'),
                t('seo_growth_feature_4', 'Analytics setup (GA + Vercel)'),
                t('seo_growth_feature_5', 'Keyword research & mapping'),
                t('seo_growth_feature_6', '1 month support'),
            ],
            popular: true,
        },
        {
            name: t('seo_plan_premium', 'Premium'),
            price: 'XAF 300,000',
            period: t('seo_one_time', 'one-time'),
            description: t('seo_plan_premium_desc', 'Enterprise-level SEO for maximum visibility'),
            features: [
                t('seo_premium_feature_1', 'Everything in Growth'),
                t('seo_premium_feature_2', 'Unlimited page optimization'),
                t('seo_premium_feature_3', 'Local SEO setup'),
                t('seo_premium_feature_4', 'Schema markup implementation'),
                t('seo_premium_feature_5', 'Competitor analysis'),
                t('seo_premium_feature_6', '3 months support & monitoring'),
            ],
            popular: false,
        },
    ];

    const faqs = [
        {
            q: t('seo_faq_1_q', 'How long does it take to see SEO results?'),
            a: t('seo_faq_1_a', 'SEO is a long-term investment. While some technical improvements show results within weeks, significant ranking improvements typically take 3-6 months depending on competition and industry.')
        },
        {
            q: t('seo_faq_2_q', 'Do you guarantee first page rankings?'),
            a: t('seo_faq_2_a', 'No ethical SEO professional can guarantee specific rankings as Google\'s algorithm is constantly evolving. However, I follow best practices that consistently improve visibility and traffic.')
        },
        {
            q: t('seo_faq_3_q', 'What\'s included in the SEO audit?'),
            a: t('seo_faq_3_a', 'The audit covers technical SEO, on-page factors, content quality, backlink profile, competitor analysis, and keyword opportunities. You\'ll receive a detailed report with actionable recommendations.')
        },
        {
            q: t('seo_faq_4_q', 'Do you offer ongoing SEO maintenance?'),
            a: t('seo_faq_4_a', 'Yes! After the initial optimization, I offer monthly maintenance packages to monitor performance, fix issues, and continuously improve your rankings. Contact me for custom pricing.')
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>SEO Services - Search Engine Optimization | Simeon Azeh</title>
                <meta name="description" content="Professional SEO services to boost your website visibility. Google Search indexing, technical SEO, analytics setup, and on-page optimization. Get found online!" />
                <meta name="keywords" content="SEO services, search engine optimization, Google indexing, website optimization, Simeon Azeh, Cameroon" />
                <meta property="og:title" content="SEO Services - Search Engine Optimization | Simeon Azeh" />
                <meta property="og:description" content="Professional SEO services to boost your website visibility. Google Search indexing, technical SEO, analytics setup, and on-page optimization." />
                <meta property="og:image" content="/og-seo.jpg" />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="SEO Services - Search Engine Optimization | Simeon Azeh" />
                <meta name="twitter:description" content="Professional SEO services to boost your website visibility. Google Search indexing, technical SEO, analytics setup." />
                <meta name="twitter:image" content="/og-seo.jpg" />
                <link rel="canonical" href={window.location.href} />
            </Helmet>

            <Header />

            <div className="bg-light-body dark:bg-dark-body min-h-screen">
                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5 dark:opacity-10 bg-[url('/images/grid-pattern.svg')] bg-repeat"></div>

                    <div className="w-full md:w-4/5 mx-auto relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 px-4 py-2 rounded-full mb-6">
                                <BsSearch className="text-violet-600 dark:text-violet-400" />
                                <span className="text-violet-600 dark:text-violet-400 font-medium text-sm font-inter">
                                    {t('seo_services', 'SEO Services')}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 font-montserrat-alt">
                                {t('seo_hero_title', 'Get Found on Google')}
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 font-inter">
                                {t('seo_hero_subtitle', 'Professional SEO services to boost your website visibility, drive organic traffic, and grow your business online.')}
                            </p>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="flex flex-wrap gap-4 justify-center"
                            >
                                <Link to="/contact">
                                    <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.09)] transition-all duration-300 flex items-center gap-2 hover:scale-105 font-inter">
                                        <FaRocket size={20} />
                                        {t('seo_cta_start', 'Boost My Rankings')}
                                    </button>
                                </Link>
                                <a href="#pricing">
                                    <button className="bg-white dark:bg-zinc-900/90 text-light-text dark:text-white px-8 py-4 rounded-lg font-medium border border-slate-200 dark:border-zinc-700/50 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.09)] transition-all duration-300 hover:bg-slate-50 dark:hover:bg-zinc-800/80 font-inter">
                                        {t('seo_cta_pricing', 'View Pricing')}
                                    </button>
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
                        >
                            {[
                                { value: '100+', label: t('seo_stat_pages', 'Pages Indexed') },
                                { value: '5+', label: t('seo_stat_clients', 'Happy Clients') },
                                { value: '90%', label: t('seo_stat_improvement', 'Avg. Improvement') },
                                { value: '24/7', label: t('seo_stat_monitoring', 'Monitoring') },
                            ].map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 font-montserrat-alt">
                                        {stat.value}
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-400 text-sm font-inter mt-1">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Decorative elements */}
                    <motion.div
                        className="absolute -bottom-16 -left-16 w-32 h-32 bg-violet-500/10 dark:bg-violet-500/5 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    />
                </section>

                {/* Services Grid */}
                <section className="py-20 px-6 bg-slate-50 dark:bg-dark-body relative overflow-hidden">
                    <div className="w-full md:w-4/5 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 px-4 py-2 rounded-full mb-4">
                                <HiOutlineTrendingUp className="text-violet-600 dark:text-violet-400" />
                                <span className="text-violet-600 dark:text-violet-400 font-medium text-sm font-inter">
                                    {t('seo_what_i_offer', 'What I Offer')}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                                {t('seo_services_title', 'SEO Services')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-inter">
                                {t('seo_services_subtitle', 'Comprehensive SEO solutions tailored to your business needs')}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {seoServices.map((service, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className="bg-white dark:bg-zinc-900/90 p-8 rounded-2xl border border-slate-200 dark:border-zinc-700/50 hover:shadow-2xl transition-all duration-300 relative group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center text-white mb-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.09)] transform group-hover:scale-110 transition-transform duration-300">
                                        <service.icon size={28} />
                                    </div>

                                    <h3 className="text-xl font-bold text-light-text dark:text-white mb-3 font-montserrat-alt">
                                        {service.title}
                                    </h3>

                                    <p className="text-slate-600 dark:text-slate-400 mb-6 font-inter text-sm">
                                        {service.description}
                                    </p>

                                    <div className="space-y-2">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <BsCheckCircleFill className="text-violet-500 dark:text-violet-400 mt-0.5 flex-shrink-0" size={14} />
                                                <span className="font-inter">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Proof Section - Screenshots */}
                <section className="py-24 px-6 relative overflow-hidden">
                    <div className="w-full md:w-4/5 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 px-4 py-2 rounded-full mb-4">
                                <BsBarChartFill className="text-violet-600 dark:text-violet-400" />
                                <span className="text-violet-600 dark:text-violet-400 font-medium text-sm font-inter">
                                    {t('seo_proof_label', 'Real Results')}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                                {t('seo_proof_title', 'Proven Results for Clients')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-inter">
                                {t('seo_proof_subtitle', 'See real screenshots from client projects showing improved search visibility and analytics')}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {/* Google Search Console Screenshot */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="bg-white dark:bg-zinc-900/90 p-8 rounded-2xl border border-slate-200 dark:border-zinc-700/50 shadow-[0_4px_12px_0_rgba(0,0,0,0.09)]"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                                        <FaGoogle size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-light-text dark:text-white font-montserrat-alt">
                                            {t('seo_google_indexing', 'Google Search Indexing')}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-inter">
                                            {t('seo_google_indexing_desc', 'Search Console coverage report')}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative rounded-xl overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.09)] bg-slate-100 dark:bg-zinc-800 min-h-[250px]">
                                    <img
                                        src={googleIndexingScreenshot}
                                        alt="Google Search Console Indexing"
                                        className="w-full h-auto rounded-xl object-cover"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.style.display = 'none';
                                            const fallback = document.getElementById('google-fallback');
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <div id="google-fallback" className="absolute inset-0 bg-slate-100 dark:bg-zinc-800 rounded-xl p-10 flex items-center justify-center" style={{ display: 'none' }}>
                                        <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                                            <FaGoogle size={40} className="mx-auto mb-4 opacity-50" />
                                            <p className="mb-2 font-inter">{t('seo_screenshot_placeholder', '[Add Google Search Console screenshot]')}</p>
                                            <p className="text-sm font-inter">{t('seo_screenshot_note', 'Upload to public/images/seo-google-indexing.png')}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 font-inter">
                                    {t('seo_google_caption', 'Client website successfully indexed with all pages showing valid status in Google Search Console.')}
                                </p>
                            </motion.div>

                            {/* Vercel Analytics Screenshot */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="bg-white dark:bg-zinc-900/90 p-8 rounded-2xl border border-slate-200 dark:border-zinc-700/50 shadow-[0_4px_12px_0_rgba(0,0,0,0.09)]"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 flex items-center justify-center text-white dark:text-slate-900">
                                        <SiVercel size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-light-text dark:text-white font-montserrat-alt">
                                            {t('seo_vercel_analytics', 'Vercel Analytics')}
                                        </h3>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 font-inter">
                                            {t('seo_vercel_analytics_desc', 'Real-time traffic insights')}
                                        </p>
                                    </div>
                                </div>

                                <div className="relative rounded-xl overflow-hidden shadow-[0_4px_12px_0_rgba(0,0,0,0.09)] bg-slate-100 dark:bg-zinc-800 min-h-[250px]">
                                    <img
                                        src={vercelAnalyticsScreenshot}
                                        alt="Vercel Analytics Dashboard"
                                        className="w-full h-auto rounded-xl object-cover"
                                        onError={(e) => {
                                            const img = e.target as HTMLImageElement;
                                            img.style.display = 'none';
                                            const fallback = document.getElementById('vercel-fallback');
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <div id="vercel-fallback" className="absolute inset-0 bg-slate-100 dark:bg-zinc-800 rounded-xl p-10 flex items-center justify-center" style={{ display: 'none' }}>
                                        <div className="text-center text-slate-500 dark:text-slate-400 py-8">
                                            <SiVercel size={40} className="mx-auto mb-4 opacity-50" />
                                            <p className="mb-2 font-inter">{t('seo_screenshot_placeholder_vercel', '[Add Vercel Analytics screenshot]')}</p>
                                            <p className="text-sm font-inter">{t('seo_screenshot_note_vercel', 'Upload to public/images/seo-vercel-analytics.png')}</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 font-inter">
                                    {t('seo_vercel_caption', 'Client website traffic and performance metrics tracked through Vercel Analytics dashboard.')}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing" className="py-24 px-6 bg-slate-50 dark:bg-dark-body relative overflow-hidden">
                    <div className="w-full md:w-4/5 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 px-4 py-2 rounded-full mb-4">
                                <BsLightningChargeFill className="text-violet-600 dark:text-violet-400" />
                                <span className="text-violet-600 dark:text-violet-400 font-medium text-sm font-inter">
                                    {t('seo_pricing_label', 'Simple Pricing')}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                                {t('seo_pricing_title', 'Choose Your Plan')}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-inter">
                                {t('seo_pricing_subtitle', 'Transparent pricing with no hidden fees')}
                            </p>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        >
                            {pricingPlans.map((plan, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                    className={`bg-white dark:bg-zinc-900/90 p-8 rounded-2xl border transition-all duration-300 relative
                    ${plan.popular
                                            ? 'border-violet-500 dark:border-violet-500/50 ring-2 ring-violet-500/20 shadow-[0_4px_12px_0_rgba(0,0,0,0.09)]'
                                            : 'border-slate-200 dark:border-zinc-700/50 hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.09)]'
                                        }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium font-inter">
                                            {t('seo_most_popular', 'Most Popular')}
                                        </div>
                                    )}

                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-light-text dark:text-white mb-2 font-montserrat-alt">
                                            {plan.name}
                                        </h3>
                                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 mb-1 font-montserrat-alt">
                                            {plan.price}
                                        </div>
                                        <div className="text-sm text-slate-500 dark:text-slate-400 font-inter">
                                            {plan.period}
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 mt-4 text-sm font-inter">
                                            {plan.description}
                                        </p>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 text-sm">
                                                <BsCheckCircleFill className="text-violet-500 dark:text-violet-400 mt-0.5 flex-shrink-0" size={16} />
                                                <span className="text-slate-700 dark:text-slate-300 font-inter">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link to="/request-booking" className="block">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`w-full py-3 rounded-lg font-medium transition-all duration-300 font-inter
                        ${plan.popular
                                                    ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.09)] hover:shadow-violet-500/20'
                                                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-zinc-700'
                                                }`}
                                        >
                                            {t('seo_get_started', 'Get Started')}
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6 bg-gradient-to-r from-violet-600 to-purple-600 relative overflow-hidden">
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "url('/images/cta-pattern.svg')",
                            backgroundSize: "20px",
                            opacity: 0.1
                        }}
                    />

                    <div className="w-full md:w-4/5 mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-montserrat-alt">
                                {t('seo_cta_title', 'Ready to Rank Higher?')}
                            </h2>
                            <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto font-inter">
                                {t('seo_cta_subtitle', 'Let\'s discuss your SEO needs and create a strategy that drives real results')}
                            </p>

                            <div className="flex flex-wrap gap-5 justify-center">
                                <Link to="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-white text-violet-600 px-8 py-4 rounded-lg font-medium hover:shadow-2xl transition-all duration-300 flex items-center gap-2 font-inter"
                                    >
                                        <FaChartLine size={20} />
                                        {t('seo_cta_button', 'Get Free SEO Audit')}
                                    </motion.button>
                                </Link>
                                <Link to="/services">
                                    <motion.button
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:shadow-[0_4px_12px_0_rgba(0,0,0,0.09)] transition-all duration-300 font-inter"
                                    >
                                        {t('seo_cta_services', 'View All Services')}
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="py-24 px-6">
                    <div className="w-full md:w-4/5 mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <div className="inline-flex items-center gap-2 bg-violet-100 dark:bg-violet-900/20 px-4 py-2 rounded-full mb-4">
                                <BsCheckCircleFill className="text-violet-600 dark:text-violet-400" />
                                <span className="text-violet-600 dark:text-violet-400 font-medium text-sm font-inter">
                                    {t('seo_faq_label', 'Questions & Answers')}
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                                {t('seo_faq_title', 'Frequently Asked Questions')}
                            </h2>
                        </motion.div>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-zinc-900/90 rounded-xl border border-slate-200 dark:border-zinc-700/50 overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-6 py-4 flex justify-between items-center text-left"
                                    >
                                        <h3 className="text-lg font-bold text-light-text dark:text-white font-montserrat-alt">
                                            {faq.q}
                                        </h3>
                                        <motion.div
                                            animate={{ rotate: activeFaq === index ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <BsChevronDown
                                                className={`transform transition-transform ${activeFaq === index ? 'rotate-180' : ''} text-slate-600 dark:text-slate-400`}
                                                size={18}
                                            />
                                        </motion.div>
                                    </button>

                                    <AnimatePresence>
                                        {activeFaq === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 pb-5">
                                                    <div className="w-full h-px bg-slate-200 dark:bg-zinc-700/50 mb-4"></div>
                                                    <p className="text-slate-600 dark:text-slate-400 font-inter">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
};

export default SEOServices;
