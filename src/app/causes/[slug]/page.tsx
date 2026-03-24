<<<<<<< HEAD
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
=======
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Heart, Sun, BookOpen, Leaf } from 'lucide-react';

const causeData: Record<string, { title: string, category: string, image: string, description: string, icon: any, raised: number, goal: number }> = {
  'senior-care-and-welfare': {
    title: 'Senior Care & Welfare',
    category: 'A. OLD AGE CARE & WELFARE',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80',
    description: 'Providing nursing care, physiotherapy, medical help, and emotional support to elderly persons who are living alone or are neglected. We provide care, shelter, food, medical assistance and emotional support.',
    icon: Heart,
    raised: 40000,
    goal: 65200,
  },
  'religious-and-cultural-objects': {
    title: 'Religious & Cultural Objects',
    category: 'B. RELIGIOUS OBJECTS',
    image: 'https://images.unsplash.com/photo-1532186716942-e1925b683bbd?auto=format&fit=crop&q=80',
    description: 'Promoting moral values through spiritual programs, discourses, and the development of Temples, Dharamshalas and Prayer Halls.',
    icon: Sun,
    raised: 52000,
    goal: 75200,
  },
  'educational-and-social-awareness': {
    title: 'Educational & Social Awareness',
    category: 'C. EDUCATIONAL & SOCIAL AWARENESS',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80',
    description: 'Conducting awareness programs on health and hygiene, and running educational and skill development institutions and programs.',
    icon: BookOpen,
    raised: 80000,
    goal: 85000,
  },
  'environment-protection': {
    title: 'Environment Protection',
    category: 'D. ENVIRONMENT PROTECTION',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80',
    description: 'Promoting tree plantation drives, water conservation, pond development and sustainable living to protect our natural resources.',
    icon: Leaf,
    raised: 15000,
    goal: 50000,
  }
};

export default async function CauseDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cause = causeData[slug] || {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Mission',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80',
    description: 'Connecting communities with essential medical, food, and housing relief. We believe in providing the tools and resources necessary for long-term growth and resilience.',
    icon: Heart,
    raised: 0,
    goal: 10000,
  };

  const progress = Math.min((cause.raised / cause.goal) * 100, 100);

  return (
    <div className="pt-24 bg-[#050505] min-h-screen text-white pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
