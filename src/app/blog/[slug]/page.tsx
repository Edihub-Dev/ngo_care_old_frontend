<<<<<<< HEAD
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const POSTS: Record<string, { title: string; date: string; image: string }> = {
  'bringing-hope-through-food-shelter-and-support': {
    title: 'Bringing hope through food, shelter, and support',
    date: 'Apr 9, 2025',
    image: '/assets/Blog-1.jpg',
  },
  'building-bonds-through-community-agriculture': {
    title: 'Building Food Security Through Community Farming',
    date: 'Sep 19, 2025',
    image: '/assets/Blog-1.jpg',
  },
  'restoring-hope-in-times-of-urgency-in-human': {
    title: 'Restoring Hope in Times of Urgency in Human',
    date: 'Apr 7, 2025',
    image: '/assets/Blog-1.jpg',
  },
  'water-for-life-restoring-health-and-dignity': {
    title: 'Water for Life: Restoring Health and Dignity',
    date: 'Sep 11, 2025',
    image: '/assets/Blog-1.jpg',
  },
  'education-for-every-child-hope-beyond-hunger': {
    title: 'Education for every child: Hope Beyond Hunger',
    date: 'Apr 8, 2025',
    image: '/assets/Blog-1.jpg',
  },
  'learning-for-life-creating-pathways-to-success': {
    title: 'Learning for Life: Creating Pathways to Success',
    date: 'Aug 11, 2025',
    image: '/assets/Blog-1.jpg',
  },
};

export default function BlogDetailPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = POSTS[params.slug];
  const related = Object.entries(POSTS)
    .filter(([slug]) => slug !== params.slug)
    .slice(0, 4)
    .map(([slug, v]) => ({ slug, ...v }));

  return (
    <div className="min-h-screen bg-zinc-100 text-black">
      <Navigation />
      <main className="pt-28 pb-20 fr-container">
        <div className="text-sm text-zinc-500">
          <Link href="/blog" className="hover:text-zinc-800">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span>{params.slug}</span>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">{post?.title ?? 'Blog'}</h1>
            {post?.date && <div className="mt-3 text-sm text-zinc-500">{post.date}</div>}

            <div className="mt-8 rounded-3xl border border-zinc-200 bg-white p-8 text-zinc-700 leading-relaxed">
              This content area matches the Framer route structure. Add your CMS/blog data and I’ll wire it to render real content.
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-zinc-200 bg-white p-2">
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                <Image src={post?.image ?? '/assets/Blog-1.jpg'} alt={post?.title ?? 'Blog'} fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">News, Voices &amp; Impact</h2>
          <p className="mt-3 text-zinc-600 max-w-2xl">
            Explore updates, field notes, and stories that showcase our mission and impact.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p) => (
              <article key={p.slug} className="rounded-3xl border border-zinc-200 bg-white overflow-hidden">
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="relative aspect-[16/10]">
                    <Image src={p.image} alt={p.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="text-xs text-zinc-500">{p.date}</div>
                    <div className="mt-2 font-semibold leading-snug">{p.title}</div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
=======
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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
