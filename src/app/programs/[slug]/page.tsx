<<<<<<< HEAD
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

const PROGRAMS: Record<string, { title: string; raised: string; goal: string }> = {
  'healthcare-access': {
    title: 'Healthcare Access',
    raised: '$16,800',
    goal: '$40,000',
  },
  'nutritional-support': {
    title: 'Nutritional Support',
    raised: '$60,800',
    goal: '$100,800',
  },
  'access-to-clean-water': {
    title: 'Access to Clean Water',
    raised: '$20,800',
    goal: '$60,000',
  },
};

export default function ProgramDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const data = PROGRAMS[params.slug];

  return (
    <div className="min-h-screen bg-zinc-100 text-black">
      <Navigation />
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-sm text-zinc-500">
          <Link href="/programs" className="hover:text-zinc-800">
            Programs
          </Link>
          <span className="mx-2">/</span>
          <span>{params.slug}</span>
        </div>

        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
          {data?.title ?? 'Program'}
        </h1>
        <p className="mt-4 text-zinc-600">
          This is a detail page route matching Framer. You can connect it to your real backend program data later.
        </p>

        {data && (
          <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-xs text-zinc-500">Raised Amount</div>
                <div className="mt-1 text-xl font-semibold">{data.raised}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-500">Goal Amount</div>
                <div className="mt-1 text-xl font-semibold">{data.goal}</div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
=======
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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
