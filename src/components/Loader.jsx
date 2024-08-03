// src/components/Loader.jsx
import React from 'react';

const Loader = ({ darkMode }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-[#171716]' : 'bg-white'}`}>
      <div className={`loader ${darkMode ? 'border-top-dark' : 'border-top-light'}`}></div>
    </div>
  );
};

export default Loader;
