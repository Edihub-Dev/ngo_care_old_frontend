import type { ComponentType } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Heart, Sun, BookOpen, Leaf } from 'lucide-react';

const programData: Record<string, { title: string, category: string, image: string, description: string, icon: ComponentType<{ className?: string }> }> = {
  'old-age-care-and-welfare': {
    title: 'Senior Care & Welfare',
    category: 'A. OLD AGE CARE & WELFARE',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80',
    description: 'Providing nursing care, physiotherapy, medical help, and emotional support to elderly persons who are living alone or are neglected. We establish and maintain old age homes, day care centers, and rehabilitation centers.',
    icon: Heart,
  },
  'religious-and-cultural-objects': {
    title: 'Religious & Cultural Objects',
    category: 'B. RELIGIOUS OBJECTS',
    image: 'https://images.unsplash.com/photo-1532186716942-e1925b683bbd?auto=format&fit=crop&q=80',
    description: 'Promoting moral values through spiritual programs, discourses, and the development of Temples, Dharamshalas and Prayer Halls. We celebrate religious festivals for public welfare and unity.',
    icon: Sun,
  },
  'educational-and-social-awareness': {
    title: 'Educational & Social Awareness',
    category: 'C. EDUCATIONAL & SOCIAL AWARENESS',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80',
    description: 'Conducting awareness programs on health and hygiene, and running educational and skill development institutions and programs. We organize seminars, workshops, and specialized training programs.',
    icon: BookOpen,
  },
  'environment-protection-and-awareness': {
    title: 'Environment Protection',
    category: 'D. ENVIRONMENT PROTECTION',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80',
    description: 'Promoting tree plantation drives, water conservation, pond development and sustainable living to protect our natural resources. We focus on preservation and improvement of the natural environment.',
    icon: Leaf,
  }
};

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programData[slug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Initiative',
    image: 'https://images.unsplash.com/photo-1593113589914-075568e0ea00?auto=format&fit=crop&q=80',
    description: 'Providing structured, lasting interventions to uplift communities and forge pathways of self-sufficiency.',
    icon: Heart,
  };

  return (
    <div className="pt-24 bg-white min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/programs" className="inline-flex items-center text-black/50 hover:text-black transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Programs
        </Link>
        
        <div className="flex items-center gap-4 mb-8">
           <div className="w-12 h-12 bg-[#e5f7ed] text-[#00b749] rounded-xl flex items-center justify-center shrink-0">
              <program.icon className="w-6 h-6" />
           </div>
           <div>
              <span className="text-[#00b749] text-xs font-bold uppercase tracking-wider mb-2 block">
                {program.category}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                {program.title}
              </h1>
           </div>
        </div>
        
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-[3rem] overflow-hidden mb-12 relative shadow-lg">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${program.image})` }} />
        </div>

        <div className="max-w-3xl text-lg text-black/70 leading-relaxed space-y-6">
          <p className="text-2xl text-black font-semibold tracking-tight mb-8">
            {program.description}
          </p>
          
          <div className="bg-[#f0f2f5] rounded-[3rem] p-10 my-10 relative overflow-hidden border border-black/5">
            <h3 className="text-2xl text-black font-bold tracking-tight mb-4">Support This Initiative</h3>
            <p className="mb-8 max-w-xl text-black/60">
              Every initiative depends heavily on generous donations and unwavering community support. Stand with us, advocate for these programs, and see your contributions transformed into tangible acts of progress. 
            </p>
            <Link 
              href="/donate" 
              className="group inline-flex items-center gap-3 bg-[#00b749] hover:bg-[#00a040] text-white px-8 py-4 rounded-full text-base font-bold transition-all shadow-md"
            >
              Donate Now
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            {/* Background decorative element */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#00b749]/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
