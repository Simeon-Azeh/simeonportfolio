// src/App.js

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import ServicesPage from './pages/Services';
import Contact from './pages/Contact';
import RequestBooking from './pages/RequestBooking';
import ProjectCase from './pages/ProjectCase';
import './routes/i18n'; // Import i18n configuration

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      // If AOS is used, ensure it's refreshed here
      // AOS.refresh();
    }, 100); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Home />} />
        <Route path="/resume" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request-booking" element={<RequestBooking />} />
        <Route path="/projects/:projectId" element={<ProjectCase />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
