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
import ToastHost from './components/Toast';

export default function App() {
  const path = window.location.pathname;

  if (path === '/join') {
    return (
      <>
        <ToastHost />
        <JoinPage />
      </>
    );
  }

  if (path === '/join/creator') {
    return (
      <>
        <ToastHost />
        <CreatorApplyPage />
      </>
    );
  }

  if (path === '/join/brand') {
    return (
      <>
        <ToastHost />
        <BrandApplyPage />
      </>
    );
  }

  if (path === '/admin-login') {
    return (
      <>
        <ToastHost />
        <AdminLoginPage />
      </>
    );
  }

  if (path === '/admin') {
    return (
      <>
        <ToastHost />
        <AdminDashboard />
      </>
    );
  }

  if (path === '/creator') {
    return (
      <>
        <ToastHost />
        <CreatorDashboard />
      </>
    );
  }

  return (
    <>
      <ToastHost />
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
