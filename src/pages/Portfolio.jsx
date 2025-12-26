import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustedBy from '../components/Trustedby'
import SubHero from '../components/SubHero'
import MyWork from '../components/MyWork'
import WhyMe from '../components/WhyMe'
import Services from '../components/Services'
import Testimonial from '../components/Testimonial'
import Pricing from '../components/Pricing'
import Footer from '../components/Footer'
import Tabs from '../components/Portfolio/Tabs'
import AppHero from '../components/AppHero'
function Portfolio() {
  return (
    <>
      <Header />
      <div className="bg-slate-50 dark:bg-dark-body transition-colors duration-500 ease-smooth">
        <div>
          <AppHero />
        </div>

        <div className=''>
          <SubHero />
        </div>
        <div>
          <Tabs />
        </div>

        <div>
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
  )
}

export default Portfolio
