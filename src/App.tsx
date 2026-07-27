import Ticker from './components/Ticker';
import Nav from './components/Nav';
import Hero from './components/Hero';
import LogoStrip from './components/LogoStrip';
import Creators from './components/Creators';
import Services from './components/Services';
import Process from './components/Process';
import Signup from './components/Signup';
import CtaBand from './components/CtaBand';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Ticker />
      <Nav />
      <Hero />
      <LogoStrip />
      <Creators />
      <Services />
      <Process />
      <Signup />
      <CtaBand />
      <Footer />
    </>
  );
}
