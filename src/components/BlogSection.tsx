'use client';

import { useEffect, useState } from 'react';
import { blogApi } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface BlogPost {
  _id: string;
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export default function BlogSection() {
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await blogApi.getAll({ limit: 3 });
        if (response.success && response.data) {
          setLatestBlogs(response.data as BlogPost[]);
        }
      } catch (error) {
        console.error('Failed to fetch latest blogs:', error);
      }
    };

    fetchLatest();
  }, []);

  if (latestBlogs.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
              Latest from Journal
            </span>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black">
              Stories of Impact<br />& Resilience.
            </h2>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 text-black font-bold hover:text-[#00b749] transition-colors mb-2"
          >
            View All Posts
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestBlogs.map((post) => (
            <Link key={post._id} href={`/blog/${post.id || post._id}`} className="group flex flex-col gap-4">
              <div className="w-full aspect-video bg-gray-100 rounded-[2.5rem] overflow-hidden relative shadow-sm border border-black/5">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                  style={{ backgroundImage: `url(${post.image})` }} 
                />
                <div className="absolute top-6 left-6 bg-[#00b749] text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm transition-transform group-hover:-translate-y-1">
                  {post.category}
                </div>
              </div>
              <div className="flex flex-col flex-1 mt-4 px-2">
                 <span className="text-black/40 text-sm font-bold uppercase tracking-widest mb-3">
                   {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                 </span>
                 <h2 className="text-2xl font-bold tracking-tight group-hover:text-[#00b749] transition-colors line-clamp-2 pr-4 leading-tight mb-4 text-black">
                   {post.title}
                 </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
