import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-24 bg-white min-h-screen text-black pb-24">
      <div className="max-w-3xl mx-auto px-6 pt-12">
        <Link href="/blog" className="inline-flex items-center text-black/50 hover:text-black transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Journal
        </Link>
        <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
          Article
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
          {title}
        </h1>
        
        <div className="flex items-center gap-4 text-sm text-black/50 mb-12 border-b border-black/5 pb-8">
           <span>By Careon Team</span>
           <span>•</span>
           <span>March 2025</span>
        </div>
      </div>
        
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-[2rem] overflow-hidden relative shadow-sm">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80")' }} />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 text-lg text-black/80 leading-relaxed space-y-8">
        <p className="text-2xl text-black font-semibold tracking-tight leading-snug">
          Communities facing adversity often show incredible resilience, and our role is simply to provide the foundational tools to unlock that potential.
        </p>
        <p>
          A recent assessment revealed that rapid intervention in critical zones dramatically accelerates recovery times, ensuring fewer setbacks and long-term vitality. This blog aims to unravel the strategies behind our recent successes and honor the stories of those we support.
        </p>
        <h3 className="text-3xl font-bold text-black mt-12 mb-6">Restoring Dignity through Basic Needs</h3>
        <p>
          Whether it is distributing dry rations or reinforcing shelters, physical provisions are merely the first layer. The psychological uplift that follows the fulfillment of basic needs creates a ripple effect, encouraging education, local commerce, and community cohesion.
        </p>
        <blockquote className="border-l-4 border-[#00b749] pl-6 my-12 italic text-2xl font-medium text-black">
          "When you lift a family out of immediate survival mode, they immediately begin planning for their future."
        </blockquote>
        <p>
          We thank our ongoing supporters who make these journeys possible. It is your belief in shared humanity that fuels our continued expansion into regions that need it the most.
        </p>
      </div>
    </div>
  );
}
