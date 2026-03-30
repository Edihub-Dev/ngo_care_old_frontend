import type { ComponentType } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Heart, Sun, BookOpen, Leaf } from 'lucide-react';

const causeData: Record<string, { title: string, category: string, image: string, description: string, icon: ComponentType<{ className?: string }>, raised: number, goal: number }> = {
  'elderly-care-and-shelter': {
    title: 'Elderly Care & Shelter',
    category: 'A. OLD AGE CARE & WELFARE',
    image: '/assets/Program_1.avif',
    description: 'Providing safe homes, food, and daily care for seniors in need. We provide care, shelter, medical assistance and emotional support.',
    icon: Heart,
    raised: 40000,
    goal: 65200,
  },
  'healthcare-and-medical-aid': {
    title: 'Healthcare & Medical Aid',
    category: 'B. HEALTHCARE',
    image: '/assets/program_2.avif',
    description: 'Regular check-ups, nursing care, physiotherapy, and health camps. Providing essential specialized geriatric medical care.',
    icon: Heart,
    raised: 52000,
    goal: 75200,
  },
  'emotional-and-spiritual-support': {
    title: 'Emotional & Spiritual Support',
    category: 'C. EMOTIONAL & SPIRITUAL',
    image: '/assets/cause_spiritual.png',
    description: 'Creating a sense of belonging through counseling, community, and spiritual programs.',
    icon: Sun,
    raised: 80000,
    goal: 85000,
  },
  'education-and-awareness': {
    title: 'Education & Awareness',
    category: 'D. EDUCATIONAL & SOCIAL AWARENESS',
    image: '/assets/cause_education.png',
    description: 'Workshops and programs on health, hygiene, and social responsibility.',
    icon: BookOpen,
    raised: 15000,
    goal: 50000,
  },
  'environment-protection': {
    title: 'Environment Protection',
    category: 'E. ENVIRONMENT PROTECTION',
    image: '/assets/Together_images.avif',
    description: 'Tree plantation, water conservation, and sustainability initiatives to protect our natural resources.',
    icon: Leaf,
    raised: 12000,
    goal: 40000,
  }
};

export default async function CauseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cause = causeData[slug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Mission',
    image: '/assets/Program_1.avif',
    description: 'Connecting communities with essential medical, food, and housing relief. We believe in providing the tools and resources necessary for long-term growth and resilience.',
    icon: Heart,
    raised: 0,
    goal: 10000,
  };

  const progress = Math.min((cause.raised / cause.goal) * 100, 100);

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-48">
        <Link href="/causes" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Missions
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-[#00b749]/10 text-[#00b749] rounded-xl flex items-center justify-center shrink-0 border border-[#00b749]/20">
              <cause.icon className="w-6 h-6" />
           </div>
           <div>
              <span className="text-[#00b749] text-xs font-bold uppercase tracking-wider mb-2 block">
                {cause.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                {cause.title}
              </h1>
           </div>
        </div>
        
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#111] rounded-[3rem] overflow-hidden mb-12 border border-white/10 relative shadow-[0_0_50px_rgba(0,183,73,0.1)]">
          <div className="absolute inset-0 bg-cover bg-center opacity-80" style={{ backgroundImage: `url(${cause.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 text-lg text-white/70 leading-relaxed space-y-6">
            <p className="text-2xl text-white font-semibold leading-snug tracking-tight mb-8">
              {cause.description}
            </p>
            <p>
              Your generous contribution directly fuels our on-the-ground efforts. From providing essential nursing care to organizing spiritual programs or environment drives, every dollar plays a crucial role in bringing the objects of the trust to life.
            </p>
            <h3 className="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">The Vision</h3>
            <p>
              We believe and uphold the moral values through dedicated services. Our foundation aims to restore dignity through compassionate care and comprehensive social support.
            </p>
          </div>
          
          <div className="bg-[#111] p-8 md:p-10 rounded-[2.5rem] border border-white/10 h-fit sticky top-28 shadow-xl">
            <h3 className="text-2xl font-bold mb-8 tracking-tight">Mission Funds</h3>
            <div className="space-y-6 mb-10">
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#00b749] h-2 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,183,73,0.5)]"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl">
                <div>
                   <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Raised</p>
                   <p className="text-white text-xl font-bold tracking-tight">${cause.raised.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Goal</p>
                   <p className="text-white text-xl font-bold tracking-tight">${cause.goal.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <Link 
              href="/donate"
              className="group w-full flex items-center justify-center p-5 bg-[#00b749] hover:bg-[#00a040] text-white rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-[#00b749]/20"
            >
              Support This Mission
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
