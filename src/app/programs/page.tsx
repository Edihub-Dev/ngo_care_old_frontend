
import FeaturesSection from '@/components/FeaturesSection';

export default function ProgramsPage() {
  return (
    <div className="bg-[#f0f2f5]">
      {/* Full-Screen Hero Section for Programs */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/programs_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="bg-[#00b749] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
            Our Initiatives
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">Our Programs</h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Discover our core initiatives dedicated to providing comprehensive old age care, fostering religious and cultural values, promoting social awareness, and protecting the environment.
          </p>
        </div>
      </div>

      <FeaturesSection />

      {/* Call to Action Section */}
      <section className="py-24 bg-black text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Want to Support Any Initiative?</h2>
          <p className="text-white/70 text-lg mb-12 max-w-2xl mx-auto">
            Your contribution, whether big or small, helps us maintain these life-changing programs and support the elderly in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/donate" className="bg-[#00b749] hover:bg-[#00a040] text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-lg">Donate Now</a>
            <a href="/contact" className="bg-white hover:bg-gray-100 text-black px-10 py-5 rounded-full font-bold text-lg transition-all">Become a Volunteer</a>
          </div>
        </div>
      </section>
    </div>
  );
}
