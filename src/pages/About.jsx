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
import Facts from '../components/About/Facts'
import Timeline from '../components/About/Timeline'
import Skills from '../components/About/Skills'

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
            <Facts/>
        </div>
        <div>
            <Timeline/>
        </div>
        <div>
          <Skills />
        </div>
        <div className=''>
          <WhyMe />
        </div>
        <div>
          <Footer />
        </div>
    </div>
  )
}

export default About
