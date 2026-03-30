import HeroSection from "@/components/HeroSection";
import Ticker from "@/components/Ticker";
import AboutSection from "@/components/AboutSection";
import StatsCounter from "@/components/StatsCounter";
import CampaignsSection from "@/components/CampaignsSection";
import FeaturesSection from "@/components/FeaturesSection";
import BlogSection from "@/components/BlogSection";
import Link from 'next/link';


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
            Get Involved
          </span>
          <h2 className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
            Your Support Can<br />Change Lives
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A small contribution can bring comfort, care, and happiness to someone’s life.
            <br /><br />
            Join us in making a difference.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/donate"
              className="group bg-[#00b749] hover:bg-[#00a040] text-white px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Donate Now
            </Link>
            <Link
              href="/contact"
              className="group bg-white hover:bg-white/90 text-black px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center gap-2 w-full sm:w-auto justify-center border border-black/5"
            >
              Volunteer Now
            </Link>
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="w-2.5 h-2.5 rounded-full bg-[#00b749]" />
             <span className="text-black/80 font-medium">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16 leading-tight">
            Voices of Gratitude
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative">
              <span className="text-[#00b749] text-6xl absolute top-4 left-6 opacity-20">"</span>
              <p className="text-gray-600 text-lg mb-6 italic relative z-10 leading-relaxed text-left">
                "Golden Years Care gave me a home when I had nowhere to go."
              </p>
              <div className="text-left font-bold text-gray-900 border-t border-gray-100 pt-4">
                – Resident
              </div>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 relative">
              <span className="text-[#00b749] text-6xl absolute top-4 left-6 opacity-20">"</span>
              <p className="text-gray-600 text-lg mb-6 italic relative z-10 leading-relaxed text-left">
                "Their work truly brings hope to the elderly."
              </p>
              <div className="text-left font-bold text-gray-900 border-t border-gray-100 pt-4">
                – Volunteer
              </div>
            </div>
          </div>
        </div>
      </section>

      <BlogSection />


    </div>
  );
}
