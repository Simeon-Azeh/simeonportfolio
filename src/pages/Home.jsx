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
function Home() {
  return (
    <div className="">
        <div className='sticky top-0 bg-[#F9FEFF] dark:bg-[#171716] z-50 '>
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
        <div className='bg-light-body dark:bg-dark-body'>
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

export default Home
