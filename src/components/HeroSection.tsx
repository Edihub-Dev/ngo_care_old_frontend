
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[calc(100dvh-72px)] min-h-[600px] flex items-center justify-center pt-32 pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/assets/hero_happy.png")' }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-center">
          <p className="text-[#00b749] font-black text-xs sm:text-sm md:text-lg mb-3 tracking-widest uppercase bg-green-500/10 px-4 py-1.5 rounded-full backdrop-blur-sm self-start">
          Give Love. Give Care. Give Dignity.
        </p>

        <h1 className="text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-8xl leading-[1.05] tracking-tight mb-8 max-w-5xl">
          Empowering the<br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/80 to-white/50">Elderly Generation</span>
        </h1>

        <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mb-10 leading-relaxed font-medium">
          At Golden Years Care Foundation, we believe every senior deserves a life of respect, 
          comfort, and compassion. We provide care, shelter, and emotional support to elderly 
          individuals who need it the most.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/donate"
            className="group bg-[#00b749] hover:bg-[#00a040] text-white px-8 py-4 rounded-full text-sm md:text-base font-bold transition-all flex items-center gap-3 w-full sm:w-auto justify-center shadow-xl shadow-green-600/30 active:scale-95"
          >
            Donate Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full text-sm md:text-base font-bold transition-all flex items-center gap-3 w-full sm:w-auto justify-center active:scale-95"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
