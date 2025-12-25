import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import AOS from 'aos';
import { Helmet } from 'react-helmet-async';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { BsCheckCircleFill, BsCurrencyDollar, BsGift, BsPeople, BsShare, BsStar, BsChevronDown } from 'react-icons/bs';
import { FaHandshake, FaMoneyBillWave, FaRocket, FaUserFriends, FaQuoteLeft } from 'react-icons/fa';
import { HiOutlineClipboardCheck, HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi';
import { Link } from 'react-router-dom';
// Use a public URL for the screenshot image
const referralScreenshot = '/images/screenshot-proof.jpg';

const Referrals = () => {
  const { t } = useTranslation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);

  interface Faq {
    q: string;
    a: string;
  }

  interface ReferralTier {
    category: string;
    commission: string;
    icon: React.ComponentType<{ size?: number }>;
    color: string;
    description: string;
    examples: string[];
  }

  interface HowItWorksStep {
    step: string;
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number }>;
  }

  interface Benefit {
    title: string;
    description: string;
    icon: React.ComponentType<{ size?: number }>;
  }

  const toggleFaq = (index: number): void => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const referralTiers = [
    {
      category: t('referral_tier_basic', 'Basic Website'),
      commission: 'XAF 10,000',
      icon: BsGift,
      color: 'from-blue-500 to-blue-600',
      description: t('referral_tier_basic_desc', 'Fixed reward for basic website referrals'),
      examples: [
        t('referral_example_basic_1', 'Portfolio websites'),
        t('referral_example_basic_2', 'Small business sites'),
        t('referral_example_basic_3', 'Landing pages'),
      ]
    },
    {
      category: t('referral_tier_standard', 'Standard Website'),
      commission: '5-10%',
      icon: BsCurrencyDollar,
      color: 'from-purple-500 to-purple-600',
      description: t('referral_tier_standard_desc', 'Percentage of project value'),
      examples: [
        t('referral_example_standard_1', 'XAF 300,000 project → XAF 15,000 - 30,000'),
        t('referral_example_standard_2', 'E-commerce sites'),
        t('referral_example_standard_3', 'Business web applications'),
      ]
    },
    {
      category: t('referral_tier_premium', 'Premium & Custom Projects'),
      commission: '10-15%',
      icon: BsStar,
      color: 'from-violet-500 to-purple-600',
      description: t('referral_tier_premium_desc', 'Higher commission for premium projects'),
      examples: [
        t('referral_example_premium_1', 'XAF 500,000 project → XAF 50,000 - 75,000'),
        t('referral_example_premium_2', 'XAF 1,000,000 project → XAF 100,000 - 150,000'),
        t('referral_example_premium_3', 'Enterprise solutions'),
      ]
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: t('referral_step_1_title', 'Refer a Client'),
      description: t('referral_step_1_desc', 'Know someone who needs a website, mobile app, or design services? Share my contact information with them.'),
      icon: BsShare,
    },
    {
      step: '02',
      title: t('referral_step_2_title', 'Client Confirms'),
      description: t('referral_step_2_desc', 'When they reach out, they\'ll mention your name. I\'ll confirm with you that you made the referral.'),
      icon: HiOutlineClipboardCheck,
    },
    {
      step: '03',
      title: t('referral_step_3_title', 'Project Completion'),
      description: t('referral_step_3_desc', 'Once the project is delivered and payment is received, your commission is calculated.'),
      icon: FaRocket,
    },
    {
      step: '04',
      title: t('referral_step_4_title', 'Get Paid'),
      description: t('referral_step_4_desc', 'Receive your referral bonus via Mobile Money or bank transfer within 3-5 business days.'),
      icon: FaMoneyBillWave,
    },
  ];

  const benefits = [
    {
      title: t('referral_benefit_1_title', 'Easy Money'),
      description: t('referral_benefit_1_desc', 'Earn without doing any work - just connect people who need services'),
      icon: HiOutlineLightBulb,
    },
    {
      title: t('referral_benefit_2_title', 'No Limits'),
      description: t('referral_benefit_2_desc', 'Refer as many clients as you want - unlimited earning potential'),
      icon: HiOutlineSparkles,
    },
    {
      title: t('referral_benefit_3_title', 'Build Network'),
      description: t('referral_benefit_3_desc', 'Help your friends and business contacts get quality services'),
      icon: FaUserFriends,
    },
    {
      title: t('referral_benefit_4_title', 'Fast Payout'),
      description: t('referral_benefit_4_desc', 'Quick and reliable payment once the project is completed'),
      icon: BsCheckCircleFill,
    },
  ];

  const faqs = [
    {
      q: t('referral_faq_1_q', 'When do I get paid?'),
      a: t('referral_faq_1_a', 'You receive your commission within 3-5 business days after the client\'s project is completed and payment is received.')
    },
    {
      q: t('referral_faq_2_q', 'Is there a limit to how many people I can refer?'),
      a: t('referral_faq_2_a', 'No limit! Refer as many clients as you want and earn for each successful referral.')
    },
    {
      q: t('referral_faq_3_q', 'What if the client doesn\'t mention my name?'),
      a: t('referral_faq_3_a', 'Make sure to inform me directly when you refer someone. I\'ll verify with both you and the client before proceeding.')
    },
    {
      q: t('referral_faq_4_q', 'How do I track my referrals?'),
      a: t('referral_faq_4_a', 'I\'ll keep you updated on the status of your referrals and notify you when payments are ready.')
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
        <title>Referral Program - Earn Money by Referring Clients | Simeon Azeh</title>
        <meta name="description" content="Join our referral program and earn up to XAF 150,000 per referral. Know someone who needs web development, design, or mobile app services? Refer them and get paid!" />
        <meta name="keywords" content="referral program, earn money, web development, mobile apps, design services, Simeon Azeh" />
        <meta property="og:title" content="Referral Program - Earn Money by Referring Clients | Simeon Azeh" />
        <meta property="og:description" content="Join our referral program and earn up to XAF 150,000 per referral. Know someone who needs web development, design, or mobile app services? Refer them and get paid!" />
        <meta property="og:image" content="/og-referrals.jpg" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Referral Program - Earn Money by Referring Clients | Simeon Azeh" />
        <meta name="twitter:description" content="Join our referral program and earn up to XAF 150,000 per referral. Know someone who needs web development, design, or mobile app services? Refer them and get paid!" />
        <meta name="twitter:image" content="/og-referrals.jpg" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="bg-light-body dark:bg-dark-body min-h-screen">
        <Header />

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
                <FaHandshake className="text-violet-600 dark:text-violet-400" />
                <span className="text-violet-600 dark:text-violet-400 font-medium text-sm">
                  {t('referral_program', 'Referral Program')}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 font-montserrat-alt">
                {t('referral_hero_title', 'Earn Money by Referring Clients')}
              </h1>
              <p className="text-xl text-gray-600 dark:text-white/80 max-w-3xl mx-auto mb-8 font-inter">
                {t('referral_hero_subtitle', 'Know someone who needs web development, design, or mobile app services? Refer them and earn up to XAF 150,000 per referral!')}
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-4 justify-center"
              >
                <Link to="/contact">
                  <button className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-lg font-medium hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:scale-105">
                    <BsPeople size={20} />
                    {t('referral_cta_start', 'Start Referring Now')}
                  </button>
                </Link>
                <a href="#how-it-works">
                  <button className="bg-white dark:bg-[#1a1a1a] text-light-text dark:text-white px-8 py-4 rounded-lg font-medium border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                    {t('referral_cta_learn', 'How It Works')}
                  </button>
                </a>
              </motion.div>
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
          <motion.div
            className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </section>

        {/* Commission Tiers */}
        <section className="py-20 px-6 bg-gray-50 dark:bg-[#0d0d0d] relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-violet-600/30 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              x: [-500, 500, -500]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />

          <div className="w-full md:w-4/5 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/20 px-4 py-2 rounded-full mb-4">
                <BsCurrencyDollar className="text-blue-600 dark:text-blue-400" />
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {t('referral_commission_label', 'Commission Rates')}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                {t('referral_commission_title', 'Commission Structure')}
              </h2>
              <p className="text-gray-600 dark:text-white/70 max-w-2xl mx-auto font-inter">
                {t('referral_commission_subtitle', 'Earn competitive commissions based on project type and value')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {referralTiers.map((tier, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 relative group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-100 dark:from-transparent dark:to-gray-800/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />

                  <div className="relative z-10">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <tier.icon size={32} />
                    </div>

                    <h3 className="text-2xl font-bold text-light-text dark:text-white mb-2 font-montserrat-alt">
                      {tier.category}
                    </h3>

                    <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 mb-4">
                      {tier.commission}
                    </div>

                    <p className="text-gray-600 dark:text-white/70 mb-6 font-inter">
                      {tier.description}
                    </p>

                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 font-inter">
                        {t('referral_examples', 'Examples:')}
                      </p>
                      {tier.examples.map((example, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-white/80">
                          <BsCheckCircleFill className="text-green-500 mt-1 flex-shrink-0" size={14} />
                          <span className="font-inter">{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 px-6">
          <div className="w-full md:w-4/5 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-full mb-4">
                <FaRocket className="text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                  {t('referral_process_label', 'Simple Process')}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                {t('referral_how_title', 'How It Works')}
              </h2>
              <p className="text-gray-600 dark:text-white/70 max-w-2xl mx-auto font-inter">
                {t('referral_how_subtitle', 'Simple 4-step process to start earning')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 lg:gap-6">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connection line */}
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-1 bg-gradient-to-r from-violet-500 to-violet-300/30 dark:from-violet-600 dark:to-transparent -translate-y-1/2 z-0" />
                  )}

                  <motion.div
                    whileHover={{ y: -5, boxShadow: "0 10px 40px -15px rgba(0, 0, 0, 0.1)" }}
                    className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 relative z-10 h-full flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step.step}
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
                        <step.icon size={24} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-light-text dark:text-white mb-3 font-montserrat-alt">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-white/70 font-inter">
                      {step.description}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial/Screenshot Section */}
        <section className="py-24 px-6 bg-gray-50 dark:bg-[#0d0d0d] relative overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          <div className="w-full md:w-4/5 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-purple-100 dark:bg-purple-900/20 px-4 py-2 rounded-full mb-4">
                <BsStar className="text-purple-600 dark:text-purple-400" />
                <span className="text-purple-600 dark:text-purple-400 font-medium text-sm">
                  {t('referral_proof_label', 'Success Stories')}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                {t('referral_proof_title', 'Real Referrals, Real Results')}
              </h2>
              <p className="text-gray-600 dark:text-white/70 max-w-2xl mx-auto font-inter">
                {t('referral_proof_subtitle', 'See what clients say about working with referred talent')}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <BsStar key={i} className="text-yellow-400 fill-current" size={22} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-white/70 font-inter">
                      {t('referral_verified', 'Verified Referral')}
                    </span>
                  </div>

                  <div className="relative mb-8">
                    <FaQuoteLeft className="text-violet-100 dark:text-violet-900/30 absolute -top-6 -left-4" size={50} />
                    <p className="text-lg text-gray-700 dark:text-white/90 italic relative z-10 font-inter">
                      "{t('referral_testimonial_text', 'Working with Simeon through a referral was one of the best decisions. The quality of work exceeded expectations and the referral bonus was paid promptly.')}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      <BsCheckCircleFill size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-light-text dark:text-white font-montserrat-alt">
                        {t('referral_testimonial_name', 'Happy Client')}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-white/70 font-inter">
                        {t('referral_testimonial_project', 'E-commerce Website Project')}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Screenshot */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl"
              >
                <h3 className="text-xl font-bold text-light-text dark:text-white mb-4 font-montserrat-alt">
                  {t('referral_screenshot_title', 'Client Confirmation Screenshot')}
                </h3>

                {/* Screenshot with fall-back if image fails to load */}
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  {referralScreenshot ? (
                    <img
                      src={referralScreenshot}
                      alt="Client Referral Confirmation"
                      className="w-full h-auto rounded-xl object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                        const fallback = document.getElementById('fallback-message');
                        if (fallback) {
                          fallback.style.display = 'block';
                        }
                      }}
                    />
                  ) : (
                    <div id="fallback-message" className="bg-gray-100 dark:bg-gray-800 rounded-xl p-10 flex items-center justify-center">
                      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                        <p className="mb-2">{t('referral_screenshot_placeholder', '[Add your screenshot here]')}</p>
                        <p className="text-sm">{t('referral_screenshot_note', 'Upload the screenshot of client confirmation to src/assets/referral-proof.png')}</p>
                      </div>
                    </div>
                  )}
                </div>

                <p className="mt-4 text-sm text-gray-600 dark:text-white/70 font-inter">
                  {t('referral_screenshot_caption', 'Real conversation with a client who was referred by a friend. Privacy details have been blurred.')}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 px-6 relative overflow-hidden">
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />

          <div className="w-full md:w-4/5 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/20 px-4 py-2 rounded-full mb-4">
                <HiOutlineLightBulb className="text-orange-600 dark:text-orange-400" />
                <span className="text-orange-600 dark:text-orange-400 font-medium text-sm">
                  {t('referral_benefits_label', 'Key Benefits')}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                {t('referral_benefits_title', 'Why Refer?')}
              </h2>
              <p className="text-gray-600 dark:text-white/70 max-w-2xl mx-auto font-inter">
                {t('referral_benefits_subtitle', 'Multiple benefits for being a referral partner')}
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-[#1a1a1a] p-8 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 dark:bg-violet-900/20 flex items-center justify-center text-violet-600 dark:text-violet-400 flex-shrink-0 shadow-sm">
                      <benefit.icon size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-light-text dark:text-white mb-3 font-montserrat-alt">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-white/70 font-inter">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
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
                {t('referral_cta_title', 'Ready to Start Earning?')}
              </h2>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto font-inter">
                {t('referral_cta_subtitle', 'Join our referral program today and turn your network into income')}
              </p>

              <div className="flex flex-wrap gap-5 justify-center">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-violet-600 px-8 py-4 rounded-lg font-medium hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
                  >
                    <BsPeople size={20} />
                    {t('referral_cta_button', 'Contact Me to Refer')}
                  </motion.button>
                </Link>
                <Link to="/pricing">
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:shadow-xl transition-all duration-300"
                  >
                    {t('referral_cta_pricing', 'View Pricing')}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section - Now with accordion functionality */}
        <section className="py-24 px-6">
          <div className="w-full md:w-4/5 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-2 bg-teal-100 dark:bg-teal-900/20 px-4 py-2 rounded-full mb-4">
                <BsCheckCircleFill className="text-teal-600 dark:text-teal-400" />
                <span className="text-teal-600 dark:text-teal-400 font-medium text-sm">
                  {t('referral_faq_label', 'Questions & Answers')}
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-light-text dark:text-white font-montserrat-alt">
                {t('referral_faq_title', 'Frequently Asked Questions')}
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
                  className="bg-white dark:bg-[#1a1a1a] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
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
                        className={`transform transition-transform ${activeFaq === index ? 'rotate-180' : ''} text-gray-600 dark:text-white/70`}
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
                          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-4"></div>
                          <p className="text-gray-600 dark:text-white/70 font-inter">
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

export default Referrals;