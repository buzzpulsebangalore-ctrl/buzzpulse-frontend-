import { Routes, Route } from 'react-router-dom';
import Ticker from './components/Ticker';
import Nav from './components/Nav';
import Hero from './components/Hero';
import LogoStrip from './components/LogoStrip';
import TierWall from './components/TierWall';
import Creators from './components/Creators';
import AIVideos from './components/AIVideos';
import Services from './components/Services';
import BrandsHiring from './components/BrandsHiring';
import Process from './components/Process';
import PlatformFeatures from './components/PlatformFeatures';
import AIServices from './components/AIServices';
import StatsBand from './components/StatsBand';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import FinalCta from './components/FinalCta';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginPage from './components/AdminLoginPage';
import CreatorDashboard from './components/CreatorDashboard';
import JoinPage from './components/JoinPage';
import CreatorApplyPage from './components/CreatorApplyPage';
import BrandApplyPage from './components/BrandApplyPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CaseStudiesPage from './components/CaseStudiesPage';
import CareersPage from './components/CareersPage';
import BlogPage from './components/BlogPage';
import GuidesPage from './components/GuidesPage';
import ToastHost from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import { useHashScroll } from './hooks/useHashScroll';

function HomePage() {
  useHashScroll();
  return (
    <>
      <Ticker />
      <Nav />
      <Hero />
      <LogoStrip />
      <TierWall />
      <Creators />
      <AIVideos />
      <Services />
      <BrandsHiring />
      <Process />
      <PlatformFeatures />
      <AIServices />
      <StatsBand />
      <Testimonials />
      <Faq />
      <FinalCta />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <ToastHost />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/join/creator" element={<CreatorApplyPage />} />
        <Route path="/join/brand" element={<BrandApplyPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/creator" element={<CreatorDashboard />} />
      </Routes>
    </>
  );
}
