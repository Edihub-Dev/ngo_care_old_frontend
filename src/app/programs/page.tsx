import FeaturesSection from '@/components/FeaturesSection';

export default function ProgramsPage() {
  return (
    <div className="pt-20 bg-[#f0f2f5]">
      {/* Hero Section for Programs */}
      <div className="py-24 px-6 mt-12 text-center border-b border-black/5 relative overflow-hidden bg-white">
        <div className="relative z-10">
          <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
            Our Initiatives
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-black">Programs</h1>
          <p className="text-xl md:text-2xl text-black/60 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of initiatives from specialized elder care to environmental conservation and spiritual growth.
          </p>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00b749]/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00b749]/5 rounded-full blur-3xl -ml-32 -mb-32" />
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
