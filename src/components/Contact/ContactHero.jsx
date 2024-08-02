import React from 'react'
import { PiChatsFill } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoSparklesOutline } from "react-icons/io5";
import { RiCalendarScheduleLine } from "react-icons/ri";

function ContactHero() {
  return (
    <div className='bg-white dark:bg-dark-body font-inter'>
      <div className='w-full py-6 md:w-4/5 mx-auto font-inter px-6 md:px-0'>
      <div className='flex md:justify-center flex-col md:items-center'>
      <h1 className='text-4xl text-pink-600  p-2 rounded  border dark:border-gray-700 dark:border-solid dark:text-slate-300 hover:translate-y-[-3px] duration-300 cursor-pointer justify-center flex'><PiChatsFill /></h1>
      <h1 className='text-3xl md:text-4xl text-light-text  md:p-2 rounded  dark:text-slate-50 mt-5'>I would love to hear from you.</h1>
      <p>Get in touch with me.</p>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 '>
        <p className='flex items-center gap-2 text-light-text dark:text-slate-50 border dark:border-gray-700 dark:border-solid  rounded py-1 px-2 justify-center'><RiCustomerService2Fill className='text-pink-600 dark:text-slate-50' />24/7 Support</p>
        <p className='flex items-center gap-2 text-light-text dark:text-slate-50  border dark:border-gray-700 dark:border-solid  rounded py-1 px-2 justify-center'> <IoSparklesOutline className='text-pink-600 dark:text-slate-50' />Quick Change Resolutions</p>
        <p className='flex items-center gap-2 text-light-text dark:text-slate-50  border dark:border-gray-700 dark:border-solid  rounded py-1 px-2 justify-center'><RiCalendarScheduleLine  className='text-pink-600 dark:text-slate-50'/>Flexible Schedules</p>
      </div>
      </div>
       

      </div>
    </div>
  )
}

export default ContactHero
