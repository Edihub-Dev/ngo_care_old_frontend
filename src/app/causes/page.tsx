<<<<<<< HEAD
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CausesSection from '@/components/sections/CausesSection';

export default function CausesPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <div className="pt-20">
        <CausesSection />
      </div>
      <Footer />
=======
import CampaignsSection from '@/components/CampaignsSection';

export default function CausesPage() {
  return (
    <div className="pt-20 bg-[#050505]">
      <div className="py-20 px-6 mt-12 text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 filter grayscale blur-sm" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">Causes</h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
            Fund the missions that matter. Every cause reflects our shared goal to empower lives around the globe.
          </p>
        </div>
      </div>
      <CampaignsSection />
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
