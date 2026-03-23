import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function CauseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-24 bg-[#050505] min-h-screen text-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/causes" className="inline-flex items-center text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Causes
        </Link>
        <span className="bg-[#00b749]/20 text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
          Active Cause
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
          {title}
        </h1>
        
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#111] rounded-3xl overflow-hidden mb-12 border border-white/10 relative">
          <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80")' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 text-lg text-white/70 leading-relaxed space-y-6">
            <p>
              This initiative focuses on bringing immediate and sustainable relief to affected communities. We believe in providing the tools and resources necessary for long-term growth and resilience.
            </p>
            <p>
              Your generous contribution directly fuels our on-the-ground efforts. From sourcing materials to providing expert assistance, every dollar plays a crucial role in shaping a better tomorrow.
            </p>
            <h3 className="text-2xl text-white font-semibold mt-12 mb-4">The Challenge</h3>
            <p>
              Many communities remain underserved, lacking basic access to necessities that many of us take for granted. Without intervention, these systemic issues continue to compound, affecting future generations.
            </p>
          </div>
          
          <div className="bg-[#111] p-8 rounded-3xl border border-white/10 h-fit">
            <h3 className="text-2xl font-bold mb-6">Fundraising Goal</h3>
            <div className="space-y-4 mb-8">
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-[#00b749] h-1.5 rounded-full"
                  style={{ width: '60%' }}
                ></div>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span className="text-white">Raised: $45,000</span>
                <span className="text-white/50">Goal: $75,000</span>
              </div>
            </div>
            
            <Link 
              href="/donate"
              className="w-full flex justify-center py-4 bg-[#00b749] hover:bg-[#00a040] text-white rounded-full font-bold transition-colors"
            >
              Support This Cause
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
