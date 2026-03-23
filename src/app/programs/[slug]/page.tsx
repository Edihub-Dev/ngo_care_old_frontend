import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export default async function ProgramDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-24 bg-white min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/programs" className="inline-flex items-center text-black/50 hover:text-black transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Programs
        </Link>
        <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
          Active Program
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8">
          {title}
        </h1>
        
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-[2rem] overflow-hidden mb-12 relative shadow-sm">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1593113589914-075568e0ea00?auto=format&fit=crop&q=80")' }} />
        </div>

        <div className="max-w-3xl text-lg text-black/70 leading-relaxed space-y-6">
          <p className="text-2xl text-black font-semibold tracking-tight mb-8">
            Providing structured, lasting interventions to uplift communities and forge pathways of self-sufficiency.
          </p>
          <p>
            When disaster strikes or systemic issues cause widespread disparity, targeted programs offer the only reliable blueprint for meaningful recovery. Through close partnerships with local experts and international aid coordinators, we execute multi-phased plans that address both immediate requirements and long-term sustainability.
          </p>
          <div className="bg-[#f0f2f5] rounded-3xl p-8 my-10 relative overflow-hidden">
            <h3 className="text-2xl text-black font-bold tracking-tight mb-4">Support Our Programs</h3>
            <p className="mb-6 max-w-lg">
              Every initiative depends heavily on generous donations and unwavering community support. Stand with us, advocate for these programs, and see your contributions transformed into tangible acts of progress. 
            </p>
            <Link 
              href="/donate" 
              className="group inline-flex items-center gap-2 bg-[#00b749] hover:bg-[#00a040] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-md"
            >
              Donate Now
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#00b749] opacity-10 rounded-full blur-[40px] mix-blend-multiply" />
          </div>
        </div>
      </div>
    </div>
  );
}
