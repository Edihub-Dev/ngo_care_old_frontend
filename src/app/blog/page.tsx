'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { blogApi } from '@/lib/api';

interface BlogPost {
  _id: string;
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getAll();
        if (response.success && response.data) {
          setBlogs(response.data as BlogPost[]);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <Navigation />
      <div className="pt-24 max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-16">
           <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
             Our Journal
           </span>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
             Blog & News
           </h1>
           <p className="text-xl text-black/60 max-w-2xl mx-auto">
             Stories of resilience, impact reports, and updates directly from the field.
           </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b749]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24">
            {blogs.map((post) => (
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
                     {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                   </span>
                   <h2 className="text-2xl font-bold tracking-tight group-hover:text-[#00b749] transition-colors line-clamp-2 pr-4 leading-tight mb-4 text-black">
                     {post.title}
                   </h2>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

