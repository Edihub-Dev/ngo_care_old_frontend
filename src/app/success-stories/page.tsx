import React from 'react';
import { Heart, Quote, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SuccessStoriesPage() {
  const stories = [
    {
      title: 'A New Lease on Life for Mrs. Sharma',
      category: 'Healthcare & Shelter',
      image: '/assets/Hero_image_2.avif',
      excerpt: 'How Mrs. Sharma found a supportive community and specialized medical care at our facility after years of isolation.',
      color: '#e5f7ed',
      textColor: '#00b749'
    },
    {
      title: 'Restoring Dignity Through Daily Nutrition',
      category: 'Food & Support',
      image: '/assets/Blog-1.jpg',
      excerpt: 'Thousands of elderly individuals now have access to nutritious, hot meals every day, thanks to our community kitchens.',
      color: '#fff7ed',
      textColor: '#c2410c'
    },
    {
      title: 'The Power of Spiritual Connection',
      category: 'Emotional Wellbeing',
      image: '/assets/cause_spiritual.png',
      excerpt: 'Our weekend spiritual retreats have brought peace and purpose back to the lives of our foundation members.',
      color: '#edf2ff',
      textColor: '#4338ca'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-24">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/programs_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
            Impact Stories
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-tight">
            Success Stories
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Witness the real-world difference your support makes. These are the stories of hope, resilience, and transformation.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* Featured Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {stories.map((story, i) => (
            <div key={i} className="group flex flex-col bg-[#f9fafb] rounded-[3.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="relative h-72 overflow-hidden">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md bg-black/10">
                  {story.category}
                </div>
              </div>
              <div className="p-10 flex flex-col flex-1">
                 <h3 className="text-2xl font-bold tracking-tight mb-4 leading-snug group-hover:text-[#00b749] transition-colors">
                   {story.title}
                 </h3>
                 <p className="text-gray-600 leading-relaxed mb-8 line-clamp-3">
                   {story.excerpt}
                 </p>
                 <Link href="#" className="mt-auto inline-flex items-center gap-2 font-bold text-sm text-gray-900 group-hover:text-[#00b749] transition-colors">
                   Read Full Story
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Quote */}
        <div className="bg-[#050505] text-white rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
           <Quote className="w-16 h-16 text-[#00b749]/30 mx-auto mb-8" />
           <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 italic leading-tight max-w-4xl mx-auto">
             "Golden Years Care Foundation didn't just give me a place to stay—they gave me a family when I thought I had lost everything."
           </h2>
           <p className="text-[#00b749] font-bold text-xl">— A Foundation Resident</p>
           <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#00b749]/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
