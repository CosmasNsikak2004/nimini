import { useEffect, useState } from 'react';
import { About } from './components/About';
import { Banner } from './components/Banner';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Products } from './components/Products';
import { Services } from './components/Services';
import { SupplyModal } from './components/SupplyModal';
import { Testimonials } from './components/Testimonials';
import { TopBar } from './components/TopBar';
import { ChatWidget } from './components/ChatWidget';
import { useAOS } from './hooks/useAOS';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Initialize AOS animations
  useAOS();

  // Initial loader (1.5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Window scroll listener for sticky/scrolled navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      {/* 12. Page loader shown for ~1.5s on initial load */}
      <Loader isLoading={isLoading} />

      {/* Modal for supply requests */}
      <SupplyModal isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Website Container */}
      <div
        className="Website-container"
        id="myDiv"
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        {/* Sections 1, 2, 3: Home Section (TopBar, Navbar, Hero) */}
        <section className={`home ${isScrolled ? 'active' : ''}`} id="home">
          {/* 1. Top bar */}
          <TopBar />

          {/* 2. Navbar */}
          <Navbar />

          {/* 3. Hero */}
          <Hero onOpenModal={handleOpenModal} />
        </section>

        {/* 4. Services */}
        <Services />

        {/* 5. About */}
        <About />

        {/* 6. Testimonials */}
        <Testimonials />

        {/* 7. Banner */}
        <Banner />

        {/* 8. Products */}
        <Products onOpenModal={handleOpenModal} />

        {/* 9. Contact */}
        <Contact />

        {/* 10. Footer */}
        <Footer onOpenModal={handleOpenModal} />
      </div>

      {/* 11. Floating AI Chat Widget */}
      {!isLoading && <ChatWidget onOpenSupplyModal={handleOpenModal} />}
    </>
  );
}
