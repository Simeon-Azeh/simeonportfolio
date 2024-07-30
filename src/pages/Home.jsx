import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'

function Home() {
  return (
    <div className="w-full md:w-4/5 mx-auto">
        <div>
        <Header />
        </div>
        <div>
            <Hero />
        </div>
    </div>
  )
}

export default Home
