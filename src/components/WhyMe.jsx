import React from 'react'
import { BsStars } from "react-icons/bs";

function WhyMe() {
  return (
    <div className='bg-light-body dark:bg-dark-body transition-colors font-inter'>
      <div className='w-full md:w-4/5 mx-auto pt-6 px-6 md:px-0 pb-4'>
        <h2 className='text-2xl md:text-4xl mb-2 dark:text-slate-50 text-light-text'>Why Me</h2>
        <p className='text-[15px] dark:text-slate-300 text-light-text text-justify'>Complicated problems don't call for complex interfaces ⏤ I craft user-friendly and straightforward interfaces that simplify even the most sophisticated issues.</p>
        <div>
            <ul className='text-[15px] dark:text-slate-50 mt-4 text-[#6b7280] space-y-4 mb-4'>
                <li className='flex items-center gap-2'> <span className='text-pink-600  dark:bg-[#1B1B1A] p-2 rounded border dark:border-gray-700 dark:border-solid dark:text-white'><BsStars size={20} /></span>Tailored design solutions that meet your specific needs and goals.</li>
                <li className='flex items-center gap-2'> <span  className='text-pink-600  dark:bg-[#1B1B1A] p-2 rounded border dark:border-gray-700 dark:border-solid dark:text-white'><BsStars /></span>Rigorous quality checks and revisions to ensure the final deliverables meet high standards.</li>
                <li className='flex items-center gap-2'> <span  className='text-pink-600  dark:bg-[#1B1B1A] p-2 rounded border dark:border-gray-700 dark:border-solid dark:text-white'><BsStars /></span>
                Regular updates, clear communication, and transparency throughout the project lifecycle.</li>
            </ul>
        </div>
        <p className='text-[15px] dark:text-slate-300 text-light-text pb-4'>Your product is treated as mine with a primary goal of your uncompromised satisfaction ⏤ your success equals our success.</p>
      </div>
    </div>
  )
}

export default WhyMe
