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
    </div>
  );
}
