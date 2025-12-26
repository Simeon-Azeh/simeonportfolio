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

function ServicesPage() {
  return (
    <>
      <Header />
      <div className="gpu-accelerated">
        <div>
          <Services />
        </div>
        <div>
          <Pricing />
        </div>
        <div>
          <Testimonial />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default ServicesPage
