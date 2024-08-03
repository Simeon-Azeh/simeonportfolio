import React from 'react';


function HeroSkeleton() {
  return (
    <div className='bg-[#F9FEFF] dark:bg-dark-body transition-colors h-[90vh] flex items-center justify-center dot-pattern'>
      <div className='w-full md:w-4/5 mx-auto px-4 font-inter text-center'>
        <div className='skeleton skeleton-image'></div>
        <div className='mt-4'>
          <div className='skeleton skeleton-text' style={{ width: '10rem', margin: 'auto' }}></div>
          <div className='skeleton skeleton-text' style={{ width: '20rem', margin: 'auto' }}></div>
          <div className='skeleton skeleton-text' style={{ width: '15rem', margin: 'auto' }}></div>
          <div className='mt-6'>
            <div className='skeleton skeleton-button'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSkeleton;
