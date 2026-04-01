'use client';

import React, { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BlogService } from '@/lib/api';
import { ArrowLeft, Clock, User, Facebook, Twitter, Linkedin } from 'lucide-react';

interface Blog {
  _id: string;
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
}

export default function BlogPostDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await BlogService.getById(slug);
        if (response.success && response.data) {
          setBlog(response.data as Blog);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00b749]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-24 min-h-screen text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link href="/blog" className="text-[#00b749] font-bold hover:underline">Return to Journal</Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen text-black overflow-x-hidden">
      <Navigation />
      <div className="pt-24 pb-24">
        <div className="max-w-4xl mx-auto px-6 pt-12">
          <Link href="/blog" className="inline-flex items-center text-black/50 hover:text-black transition-colors mb-12 font-medium">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Link>
          <span className="bg-[#e5f7ed] text-[#00b749] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8 inline-block">
            {blog.category}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-8 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 text-sm text-black/40 mb-12 border-b border-black/5 pb-10">
             <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>By Golden Years Team</span>
             </div>
             <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{Math.ceil(blog.content.length / 500)} Min Read</span>
             </div>
             <span>•</span>
             <span>{new Date(blog.date).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
          </div>
        </div>
          
        <div className="max-w-6xl mx-auto px-6 mb-16">
          <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-gray-100 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${blog.image})` }} />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 text-lg text-black/70 leading-relaxed space-y-10 whitespace-pre-wrap">
          <p className="text-2xl text-black font-semibold tracking-tight leading-snug">
            {blog.excerpt}
          </p>
          
          <div className="prose prose-lg max-w-none text-black/70">
            {blog.content}
          </div>

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
      </div>
      <Footer />
    </div>
  );
}
