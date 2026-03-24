import Link from 'next/link';
import { ArrowLeft, Clock, User, Facebook, Twitter, Linkedin } from 'lucide-react';

export default async function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const title = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-24 bg-white min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link href="/blog" className="inline-flex items-center text-black/50 hover:text-black transition-colors mb-12 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Journal
        </Link>
        <span className="bg-[#e5f7ed] text-[#00b749] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 inline-block">
          Impact Report
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
          {title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-8 text-sm text-black/40 mb-12 border-b border-black/5 pb-10">
           <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>By Golden Years Team</span>
           </div>
           <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 Min Read</span>
           </div>
           <span>•</span>
           <span>March 2025</span>
        </div>
      </div>
        
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80")' }} />
          <div className="absolute inset-0 bg-black/10" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 text-lg text-black/70 leading-relaxed space-y-10">
        <p className="text-2xl text-black font-semibold tracking-tight leading-snug">
          At Golden Years Care Foundation, we believe that the objects of our trust are not just words but a foundational blueprint for building a more compassionate, spiritual, and sustainable world.
        </p>
        <p>
          Our latest initiative has directly impacted over 500 seniors across the region, providing specialized nursing care, medical kits, and most importantly, a sense of belonging. Through regular health camps and spiritual discourses, we aim to address the holistic needs of every individual under our care.
        </p>
        <h3 className="text-4xl font-bold text-black mt-16 mb-8 tracking-tight italic">Nurturing Dignity and Future</h3>
        <p>
          Whether it is distributing nutritional meals or organizing community tree plantation drives, our mission is multifold. The psychological uplift that follows the fulfillment of basic needs creates a ripple effect, encouraging social responsibility and community cohesion. We strive to provide a safe haven for those who have been neglected.
        </p>
        <blockquote className="border-l-8 border-[#00b749] pl-10 my-16 italic text-3xl font-medium text-black bg-[#f9fafb] py-12 rounded-r-[2.5rem]">
          "The true measure of any society is found in how it treats its elders, protects its environment, and fosters moral values."
        </blockquote>
        <p>
          We thank our ongoing supporters—individuals, CSR partners, and volunteers—who make these journeys possible. It is your belief in shared humanity that fuels our continued expansion into new projects that provide care, connection, and accessibility.
        </p>

        {/* Share Section */}
        <div className="pt-16 mt-16 border-t border-black/5 flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-widest text-black/40">Share this article</span>
            <div className="flex gap-4">
                <button className="w-12 h-12 bg-gray-100 hover:bg-[#00b749] hover:text-white rounded-full flex items-center justify-center transition-all">
                    <Facebook className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-gray-100 hover:bg-[#00b749] hover:text-white rounded-full flex items-center justify-center transition-all">
                    <Twitter className="w-5 h-5" />
                </button>
                <button className="w-12 h-12 bg-gray-100 hover:bg-[#00b749] hover:text-white rounded-full flex items-center justify-center transition-all">
                    <Linkedin className="w-5 h-5" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
