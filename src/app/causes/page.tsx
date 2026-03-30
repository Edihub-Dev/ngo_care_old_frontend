import CampaignsSection from '@/components/CampaignsSection';

export default function CausesPage() {
  return (
    <div className="bg-[#050505]">
      <div className="h-[100dvh] w-full px-6 flex flex-col items-center justify-center text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/causes_hero_bg.png')] bg-cover bg-center opacity-50 filter grayscale-0 blur-[0px]" />
        <div className="absolute inset-0" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-tight">Our Causes</h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Advancing religious, social welfare, and humanitarian purposes for the benefit of the public at large without discrimination.
          </p>
        </div>
      </div>
      <CampaignsSection />
    </div>
  );
}
