'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const programs = [
  {
    id: 'healthcare-access',
    category: 'Emergency Health Relief',
    title: 'Healthcare Access',
    description: 'Ensure fast delivery of medical and health units during emergency to provide care and support recovery.',
    raised: 16800,
    goal: 40000,
  },
  {
    id: 'nutritional-support',
    category: 'Food Security Initiative',
    title: 'Nutritional Support',
    description: 'Ensure timely access to nutritious food, clean water, and supplements for communities in times of crisis.',
    raised: 24500,
    goal: 55000,
  }
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#f0f2f5] py-24" id="programs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00b749]" />
              <span className="text-black/80 font-medium tracking-wide">Programs</span>
            </div>
            <h2 className="text-black text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Spark Positive Change
            </h2>
          </div>
          <p className="text-black/60 text-lg max-w-sm">
            Our efforts provide care, skills, and support igniting hope and lasting impact in the lives.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column Image */}
          <div className="w-full lg:w-5/12 relative h-[500px] lg:h-auto rounded-[2rem] overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")' }}
            />
          </div>

          {/* Right Column Cards */}
          <div className="w-full lg:w-7/12 flex flex-col gap-6">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-block px-4 py-1.5 bg-[#e5f7ed] text-[#00b749] text-xs font-bold rounded-full mb-6">
                  {program.category}
                </div>
                
                <h3 className="text-3xl font-bold text-black mb-4 tracking-tight">
                  {program.title}
                </h3>
                
                <p className="text-black/60 text-lg mb-8 leading-relaxed max-w-xl">
                  {program.description}
                </p>

                <div className="flex justify-between items-end mb-8 pt-4 border-t border-black/5">
                  <div className="flex flex-col">
                    <span className="text-black/60 text-sm mb-1">Raised Amount</span>
                    <span className="text-black font-bold text-2xl">${program.raised.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-black/60 text-sm mb-1">Goal Amount</span>
                    <span className="text-black font-bold text-2xl">${program.goal.toLocaleString()}</span>
                  </div>
                </div>

                <Link 
                  href={`/programs/${program.id}`}
                  className="inline-flex group/button items-center justify-center py-3 px-8 rounded-full border border-black text-black font-semibold hover:bg-black hover:text-white transition-colors duration-300 gap-2 text-sm"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
