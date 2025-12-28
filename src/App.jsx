import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async'; // Added import for HelmetProvider
import i18n from './routes/i18n';
import { ChatProvider } from './contexts/ChatContext';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import ChatWidget from './components/ChatWidget';
import { Analytics } from '@vercel/analytics/react';

// Import all page components directly
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
import Reviews from './pages/Reviews';
import Referrals from './pages/referrals';
import SEOServices from './pages/SEOServices';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

function ConditionalChatWidget() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;
  return <ChatWidget />;
}

function App() {
  return (
    <HelmetProvider> {/* Wrapped the entire app with HelmetProvider */}
      <AuthProvider>
        <ChatProvider>
          <Analytics />
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
              <Route path='/referrals' element={<Referrals />} />
              <Route path='/seo' element={<SEOServices />} />


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

            <ConditionalChatWidget />

          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;