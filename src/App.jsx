import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import i18n from './routes/i18n';
import Home from './pages/Home';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import ServicesPage from './pages/Services';
import Contact from './pages/Contact';
import RequestBooking from './pages/RequestBooking';
import ProjectCase from './pages/ProjectCase';
import NotFound from './pages/notfound';
import Login from './admin/login';
import Dashboard from './admin/dashboard';
import { ChatProvider } from './contexts/ChatContext';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import ChatWidget from './components/ChatWidget';
import Reviews from './pages/Reviews';

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
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/resume" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/request-booking" element={<RequestBooking />} />
            <Route path="/projects/:projectId" element={<ProjectCase />} />
            <Route path='/review' element={<Reviews />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Fallback Route - 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Only show chat widget on non-admin pages */}
          <Routes>
            <Route path="/admin/*" element={null} />
            <Route path="*" element={<ChatWidget />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;