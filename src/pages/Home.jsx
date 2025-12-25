import React from 'react';
import { Helmet } from 'react-helmet-async'; // Added import for Helmet
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
  return (
    <>
      <Helmet>
        <title>Simeon Azeh - Web Developer & Designer | Portfolio</title>
        <meta name="description" content="Explore Simeon Azeh's portfolio: expert web development, mobile apps, and design services. Let's build something amazing together." />
        <meta name="keywords" content="web development, mobile apps, design, portfolio, Simeon Azeh" />
        <meta property="og:title" content="Simeon Azeh - Web Developer & Designer | Portfolio" />
        <meta property="og:description" content="Explore Simeon Azeh's portfolio: expert web development, mobile apps, and design services. Let's build something amazing together." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Simeon Azeh - Web Developer & Designer | Portfolio" />
        <meta name="twitter:description" content="Explore Simeon Azeh's portfolio: expert web development, mobile apps, and design services. Let's build something amazing together." />
        <meta name="twitter:image" content="/og-image.jpg" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="">
        <div className='sticky top-0 bg-[#F9FEFF] dark:bg-[#09090b] z-50 '>
          <Header />
        </div>
        <div>
          <Hero />
        </div>

        <div>
          <SubHero />
        </div>
        <div>
          <TrustedBy />
        </div>
        <div>
          <MyWork />
        </div>
        <div>
          <WhyMe />
        </div>
        <div>
          <Services />
        </div>
        <div className='bg-light-body dark:bg-[#09090b]'>
          <Testimonial />
        </div>
        <div>
          <Pricing />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;