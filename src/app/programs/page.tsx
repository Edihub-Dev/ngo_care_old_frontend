<<<<<<< HEAD
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProgramsSection from '@/components/sections/ProgramsSection';

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Navigation />
      <div className="pt-20">
        <ProgramsSection />
      </div>
      <Footer />
=======
import FeaturesSection from '@/components/FeaturesSection';

export default function ProgramsPage() {
  return (
    <div className="pt-20 bg-[#f0f2f5]">
      <div className="py-20 px-6 mt-12 text-center border-b border-black/5 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black">Programs</h1>
          <p className="text-xl md:text-2xl text-black/70 max-w-2xl mx-auto">
            Discover our comprehensive initiatives designed to spark positive change throughout communities worldwide.
          </p>
        </div>
      </div>
      <FeaturesSection />
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
