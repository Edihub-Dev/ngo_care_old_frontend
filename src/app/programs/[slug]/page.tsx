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
    </div>
  );
}
