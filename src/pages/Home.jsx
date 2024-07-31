import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustedBy from '../components/Trustedby'
import SubHero from '../components/SubHero'

function Home() {
  return (
    <div className="">
        <div className='sticky top-0 bg-[#F9FEFF] dark:bg-[#171716] z-50 py-6'>
        <Header />
        </div>
        <div>
            <Hero />
        </div>
        <div>
            <TrustedBy />
        </div>
        <div>
          <SubHero />
        </div>
    </div>
  )
}

export default Home
