'use client';

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
  );
}
