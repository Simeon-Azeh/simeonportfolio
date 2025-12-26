import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustedBy from '../components/Trustedby';
import SubHero from '../components/SubHero';
import MyWork from '../components/MyWork';
import WhyMe from '../components/WhyMe';
import Services from '../components/Services';
import Testimonial from '../components/Testimonial';
import Pricing from '../components/Pricing';
import Footer from '../components/Footer';

function Home() {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <>
      <Helmet>
        <title>Simeon Azeh - Web Developer & Designer | Portfolio</title>
        <meta name="description" content="Explore Simeon Azeh's portfolio: expert web development, mobile apps, and design services. Let's build something amazing together." />
        <meta name="keywords" content="web development, mobile apps, design, portfolio, Simeon Azeh" />
        <meta property="og:title" content="Simeon Azeh - Web Developer & Designer | Portfolio" />
        <meta property="og:description" content="Explore Simeon Azeh's portfolio: expert web development, mobile apps, and design services. Let's build something amazing together." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simeon Azeh - Web Developer & Designer | Portfolio" />
        <meta name="twitter:description" content="Explore Simeon Azeh's portfolio: expert web development, mobile apps, and design services. Let's build something amazing together." />
        <meta name="twitter:image" content="/og-image.jpg" />
        
        {currentUrl && (
          <>
            <meta property="og:url" content={currentUrl} />
            <link rel="canonical" href={currentUrl} />
          </>
        )}
      </Helmet>

      {/* Simple wrapper to ensure header works properly */}
      <div className="min-h-screen">
        <Header />
        <main className="pt-16"> {/* Add padding-top equal to header height */}
          <div className="gpu-accelerated">
            <Hero />
            <SubHero />
            <TrustedBy />
            <MyWork />
            <WhyMe />
            <Services />
            <div className='bg-light-body dark:bg-dark-body transition-colors duration-500 ease-smooth'>
              <Testimonial />
            </div>
            <Pricing />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;