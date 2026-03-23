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
    </div>
  );
}
