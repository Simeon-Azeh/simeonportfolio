import React from 'react';
import Header from '../components/Header';
import ContactHero from '../components/Contact/ContactHero';
import Pricing from '../components/Pricing';
import Testimonial from '../components/Testimonial';
import Footer from '../components/Footer';
import ContactForm from '../components/Contact/ContactForm';
import MoreWaysToContact from '../components/Contact/MoreWaysToContact';

function Contact() {
  return (
    <div className="">
      <div className='sticky top-0 bg-[#F9FEFF] dark:bg-[#171716] z-50 '>
        <Header />
      </div>
      <div>
        <ContactHero />
      </div>
      <div className="py-10 px-4 md:px-0 font-inter bg-[#F9FEFF] dark:bg-[#171716]">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-4/5 mx-auto">
        <div className='px-2 md:px-0'>
        <MoreWaysToContact />
        </div>
       <div className='px-2 md:px-0 w-[100%]'>
       <ContactForm />
       </div>
        
        </div>
      </div>
     
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
