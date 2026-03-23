'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutSection from '@/components/sections/AboutSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Navigation />
      <div className="pt-20">
        <AboutSection />
      </div>
      <Footer />
    </div>
  );
}
