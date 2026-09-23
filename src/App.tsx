import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import MassTimings from './pages/MassTimings';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Offerings from './pages/Offerings';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import { initLenis, destroyLenis, scrollToTop } from './lib/lenis';

/** Buttery smooth scrolling (Lenis) for the whole site. */
function SmoothScroll() {
  useEffect(() => {
    const lenis = initLenis();
    if (!lenis) return;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      destroyLenis();
    };
  }, []);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter basename="/lourde-matha-website">
      <SmoothScroll />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mass-timings" element={<MassTimings />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/offerings" element={<Offerings />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
