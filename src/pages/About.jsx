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
import AboutHero from '../components/About/AboutHero'
import AboutMe from '../components/About/AboutMe'
function About() {
  return (
    <div className="">
        <div className='sticky top-0 bg-[#F9FEFF] dark:bg-[#171716] z-50 '>
        <Header />
        </div>
        <div>
           <AboutHero />
        </div>
       
        <div>
          <AboutMe />
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
  )
}

export default About
