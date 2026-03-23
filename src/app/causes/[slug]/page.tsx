'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const CAUSES: Record<string, { title: string; raised: string; goal: string; image: string }> = {
  'fundraising-for-education-equality-and-access': {
    title: 'Fundraising for Education Equality and Access',
    raised: '$40,000',
    goal: '$65,200',
    image: '/assets/causes_image.avif',
  },
  'building-stronger-futures-through-healthcare-access': {
    title: 'Building Stronger Futures Through Healthcare Access',
    raised: '$52,000',
    goal: '$75,200',
    image: '/assets/help_4.avif',
  },
  'empowering-women-and-girls-through-education': {
    title: 'Empowering Women and Girls Through Education',
    raised: '$80,000',
    goal: '$85,000',
    image: '/assets/help_%.avif',
  },
  'every-child-deserves-a-chance-for-education': {
    title: 'Every Child Deserves the Opportunity for Education.',
    raised: '$48,360',
    goal: '$75,500',
    image: '/assets/help_2.avif',
  },
  'providing-care-in-derserved-communities': {
    title: 'Delivering Care to Communities that Deserve.',
    raised: '$62,000',
    goal: '$65,200',
    image: '/assets/help_3.avif',
  },
  'inspiring-minds-through-the-power-of-art': {
    title: 'Inspiring Young Minds Through Power of Art',
    raised: '$52,000',
    goal: '$55,200',
    image: '/assets/help_1.avif',
  },
};

export default function CauseDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const data = CAUSES[params.slug];
  const related = Object.entries(CAUSES)
    .filter(([slug]) => slug !== params.slug)
    .slice(0, 3)
    .map(([slug, v]) => ({ slug, ...v }));

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="pt-28 pb-20 fr-container">
        <div className="text-sm text-white/60">
          <Link href="/causes" className="hover:text-white">
            Causes
          </Link>
          <span className="mx-2">/</span>
          <span>{params.slug}</span>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{data?.title ?? 'Cause'}</h1>
            <p className="mt-4 text-white/70 max-w-xl">
              From education to relief, every cause carries our mission to uplift and empower.
            </p>

            {data && (
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-white/60">Raised Amount</div>
                    <div className="mt-1 text-xl font-semibold">{data.raised}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-white/60">Goal Amount</div>
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
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-2">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <Image src={data?.image ?? '/assets/causes_image.avif'} alt={data?.title ?? 'Cause'} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Building Lifes Together</h2>
          <p className="mt-3 text-white/70 max-w-2xl">
            From education to relief, every cause carries our mission to uplift and empower.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((c) => (
              <div key={c.slug} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                  <Image src={c.image} alt={c.title} fill className="object-cover" />
                </div>
                <div className="pt-4">
                  <div className="text-base font-semibold leading-snug min-h-[48px]">{c.title}</div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-white/70">
                    <div>
                      <div className="text-xs">Raised Amount</div>
                      <div className="text-white font-semibold">{c.raised}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs">Goal Amount</div>
                      <div className="text-white font-semibold">{c.goal}</div>
                    </div>
                  </div>
                  <Link
                    href={`/causes/${c.slug}`}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-zinc-100 transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
