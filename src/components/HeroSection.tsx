
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center pt-20">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-start justify-center">
        <p className="text-[#00b749] font-medium text-lg md:text-xl mb-4 tracking-wide">
          Give Love. Give Care. Give Dignity.
        </p>

        <h1 className="text-white font-bold text-6xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-8 max-w-5xl">
          Empowering the<br />
          Elderly Generation
        </h1>

        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          At Golden Years Care Foundation, we believe every senior deserves a life of respect, 
          comfort, and compassion. We provide care, shelter, and emotional support to elderly 
          individuals who need it the most.
          <br /><br />
          Be a part of their journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/donate"
            className="group bg-[#00b749] hover:bg-[#00a040] text-white px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Donate Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/contact"
            className="group bg-white hover:bg-white/90 text-black px-8 py-4 rounded-full text-base font-semibold transition-all flex items-center gap-2 w-full sm:w-auto justify-center border border-black/5"
          >
            Become a Volunteer
          </Link>
        </div>
      </div>
    </section>
  );
}
