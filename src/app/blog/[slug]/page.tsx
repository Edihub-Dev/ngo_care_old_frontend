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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
