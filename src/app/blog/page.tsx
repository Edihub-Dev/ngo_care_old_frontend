'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const posts = [
  {
    title: 'Bringing hope through food, shelter, and support',
    date: 'Apr 9, 2025',
    href: '/blog/bringing-hope-through-food-shelter-and-support',
    image: '/assets/Blog-1.jpg',
  },
  {
    title: 'Building Food Security Through Community Farming',
    date: 'Sep 19, 2025',
    href: '/blog/building-bonds-through-community-agriculture',
    image: '/assets/Blog-1.jpg',
  },
  {
    title: 'Restoring Hope in Times of Urgency in Human',
    date: 'Apr 7, 2025',
    href: '/blog/restoring-hope-in-times-of-urgency-in-human',
    image: '/assets/Blog-1.jpg',
  },
  {
    title: 'Learning for Life: Creating Pathways to Success',
    date: 'Aug 11, 2025',
    href: '/blog/learning-for-life-creating-pathways-to-success',
    image: '/assets/Blog-1.jpg',
  },
  {
    title: 'Education for every child: Hope Beyond Hunger',
    date: 'Apr 8, 2025',
    href: '/blog/education-for-every-child-hope-beyond-hunger',
    image: '/assets/Blog-1.jpg',
  },
  {
    title: 'Water for Life: Restoring Health and Dignity',
    date: 'Sep 11, 2025',
    href: '/blog/water-for-life-restoring-health-and-dignity',
    image: '/assets/Blog-1.jpg',
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-black">
      <Navigation />
      <main className="pt-28 pb-20 fr-container">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Latest Stories That Inspire Hope</h1>
          <p className="mt-3 text-zinc-600">
            Explore meaningful updates, community highlights, and real stories from the ground.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <article key={p.href} className="rounded-3xl border border-zinc-200 bg-white overflow-hidden">
              <Link href={p.href} className="block">
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
      </main>
      <Footer />
    </div>
  );
}
