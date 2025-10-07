import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import i18n from './routes/i18n';
import { ChatProvider } from './contexts/ChatContext';
import { AuthProvider, ProtectedRoute } from './contexts/AuthContext';
import ChatWidget from './components/ChatWidget';

// Lazy load all page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ServicesPage = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const RequestBooking = lazy(() => import('./pages/RequestBooking'));
const ProjectCase = lazy(() => import('./pages/ProjectCase'));
const NotFound = lazy(() => import('./pages/notfound'));
const Login = lazy(() => import('./admin/login'));
const Dashboard = lazy(() => import('./admin/dashboard'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Referrals = lazy(() => import('./pages/referrals'));

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

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-light-body dark:bg-dark-body">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
          
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