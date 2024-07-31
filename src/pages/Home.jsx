import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustedBy from '../components/Trustedby'
import SubHero from '../components/SubHero'
import MyWork from '../components/MyWork'

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
    </div>
  )
}

export default Home
