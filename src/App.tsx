import { useState, useCallback } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import Process from './components/Process';
import CTABanner from './components/CTABanner';
import ServiceMap from './components/ServiceMap';
import Resources from './components/Resources';
import AgricultureTrends from './components/AgricultureTrends';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import LoadingScreen from './components/LoadingScreen';
import SectionDivider from './components/SectionDivider';

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleLoadingDone = useCallback(() => setLoading(false), []);

  return (
    <LanguageProvider>
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      <div className="font-body antialiased">
        <Navbar />
        <Hero />
        <TrustBar />
        <Services />
        <SectionDivider from="#ffffff" to="#f7f5f0" />
        <About />
        <SectionDivider from="#f7f5f0" to="#ffffff" />
        <WhyChooseUs />
        <Testimonials />
        <Process />
        <SectionDivider from="#1c3d1c" to="#f7f5f0" flip />
        <CTABanner />
        <SectionDivider from="#f7f5f0" to="#f7f5f0" />
        <ServiceMap />
        <SectionDivider from="#f7f5f0" to="#ffffff" />
        <Resources />
        <SectionDivider from="#ffffff" to="#f7f5f0" />
        <AgricultureTrends />
        <SectionDivider from="#f7f5f0" to="#ffffff" />
        <FAQ />
        <SectionDivider from="#ffffff" to="#f7f5f0" />
        <Contact />
        <Footer />
        <MobileCTA />
      </div>
    </LanguageProvider>
  );
}
