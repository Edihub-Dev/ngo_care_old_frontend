<<<<<<< HEAD
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutSection from '@/components/sections/AboutSection';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-100">
      <Navigation />
      <div className="pt-20">
        <AboutSection />
      </div>
      <Footer />
=======
import AboutSection from '@/components/AboutSection';
import StatsCounter from '@/components/StatsCounter';
import { Heart, BookOpen, Sun, Leaf } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-20 bg-white">
      {/* Hero Section */}
      <div className="bg-[#f8f9fa] py-28 px-6 mt-12 text-center border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-[#e5f7ed] text-[#00b749] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-8 inline-block shadow-sm">
            Who We Are
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900 leading-[1.1]">
            Transforming the Lives<br />
            of our Elders
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 text-left">
            <div className="p-8 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50">
              <h2 className="text-[#00b749] text-xl font-bold mb-4 flex items-center gap-2 italic">
                <Sun className="w-6 h-6" /> Our Vision
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                A society where elders have their right to an active, healthy and dignified life. We envision a world where age is celebrated and no senior is left behind.
              </p>
            </div>
            <div className="p-8 bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-50">
              <h2 className="text-[#00b749] text-xl font-bold mb-4 flex items-center gap-2 italic">
                <Heart className="w-6 h-6" /> Our Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To improve the quality of life for disadvantaged older persons and enable them to live with dignity and self-reliance through specialized care and support.
              </p>
            </div>
          </div>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b749]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00b749]/5 rounded-full blur-[100px] -ml-48 -mb-48" />
      </div>

      <AboutSection />

      {/* Objects of the Trust Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black">Objects of the Trust</h2>
          <p className="text-black/60 text-lg">The foundational pillars that guide our every action.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Category A */}
          <div className="bg-[#f9fafb] p-10 rounded-[2.5rem] border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-6 italic text-black uppercase">A. OLD AGE CARE & WELFARE</h3>
            <ul className="space-y-4 text-black/70 leading-relaxed list-disc pl-5">
              <li>To improve life quality for older adults through supportive platforms promoting care and accessibility.</li>
              <li>Establish and maintain old age homes, day care centers, and rehabilitation centers.</li>
              <li>Arrange regular health camps and provide essential medical aid.</li>
              <li>Provide emotional, spiritual, and psychological support to seniors.</li>
              <li>Special focus on elderly persons living alone or neglected.</li>
              <li>Offer nursing care, physiotherapy, and routine medical check-ups.</li>
            </ul>
          </div>

          {/* Category B */}
          <div className="bg-[#f9fafb] p-10 rounded-[2.5rem] border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mb-6">
              <Sun className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-6 italic text-black uppercase">B. RELIGIOUS OBJECTS</h3>
            <ul className="space-y-4 text-black/70 leading-relaxed list-disc pl-5">
              <li>Promote spiritual and moral values within the community.</li>
              <li>Organize religious programs, discourses, and cultural programs.</li>
              <li>Support and develop Temples, Dharamshalas, and Prayer Halls.</li>
              <li>Celebrate religious festivals for public welfare and unity.</li>
            </ul>
          </div>

          {/* Category C */}
          <div className="bg-[#f9fafb] p-10 rounded-[2.5rem] border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-6 italic text-black uppercase">C. EDUCATIONAL & SOCIAL AWARENESS</h3>
            <ul className="space-y-4 text-black/70 leading-relaxed list-disc pl-5">
              <li>Conduct awareness programs on health, hygiene, and social responsibility.</li>
              <li>Organize seminars, workshops, and specialized training programs.</li>
              <li>Publish books, pamphlets, and educational awareness material.</li>
              <li>Run educational and skill development institutions and programs.</li>
            </ul>
          </div>

          {/* Category D */}
          <div className="bg-[#f9fafb] p-10 rounded-[2.5rem] border border-black/5 hover:shadow-xl transition-all duration-500">
            <div className="w-14 h-14 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mb-6">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-6 italic text-black uppercase">D. ENVIRONMENT PROTECTION</h3>
            <ul className="space-y-4 text-black/70 leading-relaxed list-disc pl-5">
              <li>Promote conservation and improvement of the natural environment.</li>
              <li>Organize tree plantation drives and water conservation projects.</li>
              <li>Promote pond development and community cleanliness drives.</li>
              <li>Create awareness regarding pollution control and sustainable living.</li>
              <li>Undertake activities for the preservation of natural resources.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* How We Serve Section */}
      <section className="py-24 bg-[#050505] text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-[#00b749] font-bold uppercase tracking-widest text-sm mb-4 block">Our Impact</span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">How we Serve those in need</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Healthcare", desc: "Mobile medical units and dedicated health camps reaching the remotest seniors.", icon: "🏥" },
              { title: "Age-Care", desc: "Setting up model elder care homes and day centers across the country.", icon: "🏡" },
              { title: "Livelihood", desc: "Enabling elders to remain self-reliant and live with dignity.", icon: "💪" },
              { title: "Advocacy", desc: "Working with the government to influence policy and ensure senior rights.", icon: "⚖️" }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00b749] transition-colors">{item.title}</h3>
                <p className="text-white/60 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsCounter />
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
