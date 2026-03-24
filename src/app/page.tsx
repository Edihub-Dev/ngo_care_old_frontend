import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/Ticker";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import CampaignsSection from "@/components/CampaignsSection";
import FeaturesSection from "@/components/FeaturesSection";

export default function Home() {
  return (
    <div className="text-black pt-0 min-h-screen overflow-x-hidden">
      <HeroSection />

      <Ticker />

      <AboutSection />

      <StatsCounter />

      <CampaignsSection />

      <section className="bg-black py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="bg-[#00b749]/20 text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
            Our Vision
          </span>
          <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-8">
            A Haven of Comfort, Spirituality & Awareness
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We extend our mission beyond senior care, fostering spiritual growth, community awareness, and environmental protection.
          </p>
        </div>
      </section>

      <FeaturesSection />

    </div>
  );
}
