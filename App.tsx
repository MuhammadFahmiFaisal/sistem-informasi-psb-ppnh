import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import NewsFeature from './components/NewsFeature';
import Programs from './components/Programs';
const Gallery = React.lazy(() => import('./components/Gallery'));
const VideoGallery = React.lazy(() => import('./components/VideoGallery'));
const StudentWorks = React.lazy(() => import('./components/StudentWorks'));
const AdmissionsInfo = React.lazy(() => import('./components/AdmissionsInfo'));
const Facilities = React.lazy(() => import('./components/Facilities'));
const Contact = React.lazy(() => import('./components/Contact'));
import Footer from './components/Footer';
const RegistrationForm = React.lazy(() => import('./components/RegistrationForm'));
const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));

const LandingPage: React.FC = () => {
  const [showRegistration, setShowRegistration] = React.useState(false);

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero onRegisterClick={() => setShowRegistration(true)} />
        <About />
        <WhyChooseUs />
        <NewsFeature />
        <Programs />
        <React.Suspense fallback={<div className="h-40 flex items-center justify-center text-slate-400">Memuat konten...</div>}>
          <StudentWorks />
          <Gallery />
          <VideoGallery />
          <AdmissionsInfo />
          <Facilities />
          <Contact onRegisterClick={() => setShowRegistration(true)} />
        </React.Suspense>
      </main>
      <Footer />

      {/* Registration Modal Overlay */}
      {showRegistration && (
        <React.Suspense fallback={<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center text-white">Loading...</div>}>
          <RegistrationForm onClose={() => setShowRegistration(false)} />
        </React.Suspense>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/admin"
        element={
          <React.Suspense fallback={<div className="min-h-screen bg-navy-darker flex items-center justify-center text-white">Loading Admin...</div>}>
            <AdminDashboard />
          </React.Suspense>
        }
      />
    </Routes>
  );
};

export default App;