import type { ComponentType } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Heart, Sun, BookOpen, Leaf } from 'lucide-react';

const programData: Record<string, { title: string, category: string, image: string, description: string, icon: ComponentType<{ className?: string }> }> = {
  'old-age-homes': {
    title: 'Old Age Homes',
    category: 'Residential Care',
    image: '/assets/hero_happy.png',
    description: 'Providing long-term residential care with dignity and safety. We establish and maintain old age homes and rehabilitation centers.',
    icon: Heart,
  },
  'day-care-centers': {
    title: 'Day Care Centers',
    category: 'Daily Care',
    image: '/assets/feature_day_care.png',
    description: 'A place for seniors to engage, socialize, and receive care during the day. We organize activities and monitor wellbeing.',
    icon: Sun,
  },
  'healthcare-services': {
    title: 'Healthcare Services',
    category: 'Medical Support',
    image: '/assets/health_camp.png',
    description: 'Medical support including check-ups, physiotherapy, and nursing. We regularly arrange free health camps and supply ongoing medical aid.',
    icon: Heart,
  },
  'food-shelter-support': {
    title: 'Food & Shelter Support',
    category: 'Spiritual & Aid',
    image: '/assets/program_food.png',
    description: 'Helping elderly individuals with basic necessities, proper nutrition, spiritual discourses and continuous care.',
    icon: Heart,
  }
};

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = programData[slug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Initiative',
    image: '/assets/hero_happy.png',
    description: 'Providing structured, lasting interventions to uplift communities and forge pathways of self-sufficiency.',
    icon: Heart,
  };

  return (
    <div className="bg-white min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-48">
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
