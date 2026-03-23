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
    </div>
  );
}
