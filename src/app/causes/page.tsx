import CampaignsSection from '@/components/CampaignsSection';

export default function CausesPage() {
  return (
    <div className="pt-20 bg-[#050505]">
      <div className="py-20 px-6 mt-12 text-center border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573384660919-47c024f0927e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 filter grayscale blur-sm" />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white">Our Missions</h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto">
            Supporting the well-being of our elders. Every mission reflects our commitment to dignity and companionship.
          </p>
        </div>
      </div>
      <CampaignsSection />
    </div>
  );
}
