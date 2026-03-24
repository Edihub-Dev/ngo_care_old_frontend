import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const campaigns = [
  {
    id: 'senior-care-and-welfare',
    title: 'Senior Care & Welfare',
    raised: 40000,
    goal: 65200,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80',
  },
  {
    id: 'religious-and-cultural-objects',
    title: 'Religious & Cultural',
    raised: 52000,
    goal: 75200,
    image: 'https://images.unsplash.com/photo-1532186716942-e1925b683bbd?auto=format&fit=crop&q=80',
  },
  {
    id: 'educational-and-social-awareness',
    title: 'Educational & Social Awareness',
    raised: 80000,
    goal: 85000,
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80',
  },
  {
    id: 'environment-protection',
    title: 'Environment Protection',
    raised: 15000,
    goal: 50000,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80',
  }
];

export default function CampaignsSection() {
  return (
    <section className="bg-[#050505] py-24 relative overflow-hidden" id="causes">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00b749]" />
                <span className="text-white/80 font-medium">Causes</span>
             </div>
             <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Missions That Deliver Hope
             </h2>
          </div>
          <p className="text-white/70 text-lg max-w-sm">
            Aligning our efforts with the objects of the trust, every donation contributes directly to impactful change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {campaigns.map((camp) => {
            return (
              <div key={camp.id} className="group bg-[#111111] rounded-[2rem] overflow-hidden border border-white/10 hover:border-[#00b749]/50 transition-all duration-300 p-4">
                <div className="h-48 md:h-56 overflow-hidden rounded-[1.5rem] relative mb-6">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                    style={{ backgroundImage: `url(${camp.image})` }} 
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                </div>
                
                <div className="px-2 pb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-8 min-h-[3rem] tracking-tight">{camp.title}</h3>
                  
                  <div className="flex justify-between text-sm font-semibold mb-2">
                     <div className="flex flex-col">
                        <span className="text-white/40 font-normal text-xs mb-1">Raised Amount</span>
                        <span className="text-white text-lg">${camp.raised.toLocaleString()}</span>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-white/40 font-normal text-xs mb-1">Goal Amount</span>
                        <span className="text-white text-lg">${camp.goal.toLocaleString()}</span>
                     </div>
                  </div>

                  <Link 
                    href={`/causes/${camp.id}`}
                    className="group/button outline-none mt-6 flex flex-row items-center justify-center w-full py-3.5 px-6 rounded-full bg-[#00b749] text-white font-bold hover:bg-[#00a040] transition-all duration-300 gap-2 shadow-sm"
                  >
                    View Mission
                    <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
