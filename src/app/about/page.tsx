<<<<<<< HEAD
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
=======
import AboutSection from '@/components/AboutSection';
import StatsCounter from '@/components/StatsCounter';

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-[#f2f4f5] py-20 px-6 mt-12 text-center border-b border-black/10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">Our Mission</h1>
        <p className="text-xl md:text-2xl text-black/70 max-w-2xl mx-auto">
          We are dedicated to creating a world where every individual has access to fundamental necessities.
        </p>
      </div>
      <AboutSection />
      <StatsCounter />
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
