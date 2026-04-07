'use client';
import React, { useState } from 'react';
import { Heart, Quote, ArrowRight, X } from 'lucide-react';
import Link from 'next/link';

export default function SuccessStoriesPage() {
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const stories = [
    {
      title: 'A New Lease on Life for Mrs. Sharma',
      category: 'Healthcare & Shelter',
      image: '/assets/Hero_image_2.avif',
      excerpt: 'How Mrs. Sharma found a supportive community and specialized medical care at our facility after years of isolation.',
      fullContent: 'Before arriving at Golden Years Care Foundation, Mrs. Sharma spent 5 years living mostly alone after losing her husband. With deteriorating health and no nearby family, she felt increasingly isolated and anxious. Today, she is one of our most active community members. The medical staff successfully managed her arthritis, and she now leads the morning yoga sessions. "I did not just find medical help," she often says, "I found a family." Her transformation from a quiet, withdrawn elder into a vibrant community leader inspires us every single day.',
      color: '#e5f7ed',
      textColor: '#00b749'
    },
    {
      title: 'Restoring Dignity Through Daily Nutrition',
      category: 'Food & Support',
      image: '/assets/food_shelter.png',
      excerpt: 'Thousands of elderly individuals now have access to nutritious, hot meals every day, thanks to our community kitchens.',
      fullContent: 'Malnutrition among the elderly is an often ignored crisis. When Mr. Verma was first brought to our attention, he was severely underweight and hadn\'t eaten a proper hot meal in days due to his limited mobility. Our "Meals with Dignity" program changed that completely. Not only do our volunteers deliver nutritionally tailored hot meals to him every day, but the daily visits perform a vital wellness check and provide a moment of social connection. Mr. Verma is now at a healthy weight and always greets our volunteers with his signature booming laugh.',
      color: '#fff7ed',
      textColor: '#c2410c'
    },
    {
      title: 'The Power of Spiritual Connection',
      category: 'Emotional Wellbeing',
      image: '/assets/cause_spiritual.png',
      excerpt: 'Our weekend spiritual retreats have brought peace and purpose back to the lives of our foundation members.',
      fullContent: 'Many elders struggle with finding purpose after retirement and losing loved ones. Recognizing this, the Golden Years Care Foundation launched monthly spiritual retreats. We provide a peaceful environment where elders can participate in guided meditation, listen to spiritual discourses, and interact with counselors. For members like Mr. Gupta, these retreats became a turning point. "I felt lost and invisible for a long time," he shared. "These sessions helped me reconnect with my inner self and realize that my golden years can still be a time of profound growth and peace."',
      color: '#edf2ff',
      textColor: '#4338ca'
    }
  ];

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-24 relative">
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
                 <button onClick={(e) => { e.preventDefault(); setSelectedStory(story); }} className="mt-auto inline-flex items-center gap-2 font-bold text-sm text-gray-900 group-hover:text-[#00b749] transition-colors text-left bg-transparent border-0 cursor-pointer">
                   Read Full Story
                   <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                 </button>
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

      {/* Full Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex justify-center items-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
            <button 
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-64 md:h-80 relative shrink-0">
              <img src={selectedStory.image} alt={selectedStory.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 md:left-10 text-white pr-6">
                <span className="text-[#00b749] font-bold text-sm tracking-wider uppercase mb-2 block">{selectedStory.category}</span>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">{selectedStory.title}</h3>
              </div>
            </div>
            <div className="p-6 md:p-10 overflow-y-auto">
              <p className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium mb-6">
                "{selectedStory.excerpt}"
              </p>
              <div className="w-16 h-1 bg-[#00b749] mb-6 rounded-full"></div>
              <div className="prose prose-lg max-w-none text-gray-600">
                <p className="leading-loose">
                  {selectedStory.fullContent}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
