'use client';

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
  );
}
