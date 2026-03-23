'use client';

<<<<<<< HEAD
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutSection from '@/components/sections/AboutSection';
import BlogSection from '@/components/sections/BlogSection';
import CausesSection from '@/components/sections/CausesSection';
import CtaSection from '@/components/sections/CtaSection';
import FaqSection from '@/components/sections/FaqSection';
import HelpSection from '@/components/sections/HelpSection';
import HeroFramer from '@/components/sections/HeroFramer';
import ImpactSection from '@/components/sections/ImpactSection';
import ProgramsSection from '@/components/sections/ProgramsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <Navigation />

      <HeroFramer />
      <AboutSection />
      <ImpactSection />
      <CausesSection />
      <ProgramsSection />
      <HelpSection />
      <BlogSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
=======
import HeroSection from '@/components/HeroSection';
import Ticker from '@/components/Ticker';
import AboutSection from '@/components/AboutSection';
import StatsCounter from '@/components/StatsCounter';
import CampaignsSection from '@/components/CampaignsSection';
import FeaturesSection from '@/components/FeaturesSection';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Ticker */}
      <Ticker />
      
      {/* About Section */}
      <AboutSection />

      {/* Stats Counter (Impact) */}
      <StatsCounter />
      
      {/* Campaigns Section (Causes) */}
      <CampaignsSection />
      
      {/* Features Section (Programs) */}
      <FeaturesSection />
    </>
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
  );
}
