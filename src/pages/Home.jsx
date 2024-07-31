import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'

function Home() {
  return (
    <div className="">
        <div className='sticky top-0'>
        <Header />
        </div>
        <div>
            <Hero />
        </div>
    </div>
  )
}

export default Home
