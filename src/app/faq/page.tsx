'use client';

import React, { useState } from 'react';
import { Plus, Minus, Search, HelpCircle } from 'lucide-react';

const faqData = [
  {
    category: 'About us',
    questions: [
      { q: "What is Golden Years Care Foundation?", a: "We are a Religious and Public Charitable Trust dedicated to supporting elderly individuals through comprehensive care, shelter, and community initiatives." },
      { q: "Where is your office located?", a: "Our registered office is at LGF-95, RDC, Durga Tower, Rajnagar, Ghaziabad, Uttar Pradesh, India." },
      { q: "Who can benefit from your services?", a: "Our services are available to all senior citizens in need, without discrimination based on religion, caste, or background." }
    ]
  },
  {
    category: 'Donations',
    questions: [
      { q: "How can I donate?", a: "You can donate directly through our website using the 'Donate Now' button, or by bank transfer. All contributions are credited to the Foundation's account." },
      { q: "Are my donations tax-deductible?", a: "Yes, we are a registered trust. Please contact us for specific certificate details for tax exemptions on your contributions." },
      { q: "Can I donate in kind (food, medicine)?", a: "Absolutely! We welcome donations of food, medicine, and other essentials. Please reach out to our team to coordinate these contributions." }
    ]
  }
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleAccordion = (index: string) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 pb-24">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/hero_happy.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-white">
          <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
            Support Center
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Common Questions
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our foundation, our work, and how you can get involved.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-24">
        {/* Search Bar Placeholder */}
        <div className="relative mb-24">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search questions..." 
            className="w-full bg-[#f9fafb] border border-gray-100 rounded-full py-5 pl-14 pr-8 text-lg focus:outline-none focus:border-[#00b749] transition-all"
          />
        </div>

        {/* FAQ Sections */}
        <div className="space-y-16">
          {faqData.map((section, sIndex) => (
            <div key={sIndex}>
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-[#00b749]" />
                {section.category}
              </h2>
              <div className="space-y-4">
                {section.questions.map((item, qIndex) => {
                  const id = `${sIndex}-${qIndex}`;
                  const isOpen = activeIndex === id;
                  return (
                    <div key={qIndex} className="bg-[#f9fafb] rounded-[2rem] border border-gray-50 overflow-hidden group">
                      <button 
                        onClick={() => toggleAccordion(id)}
                        className="w-full text-left p-8 flex justify-between items-center bg-white group-hover:bg-[#f9fafb] transition-colors"
                      >
                        <span className="text-xl font-bold tracking-tight">{item.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#00b749] text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </div>
                      </button>
                      <div className={`transition-all duration-500 ease-in-out px-8 overflow-hidden ${isOpen ? 'max-h-96 py-8 border-t border-gray-50' : 'max-h-0 py-0'}`}>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-24 bg-[#050505] text-white p-12 md:p-16 rounded-[4rem] text-center border border-white/5 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 italic tracking-tight">Still have questions?</h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              If you couldn't find what you were looking for, don't hesitate to reach out to our dedicated support team.
            </p>
            <a href="/contact" className="inline-block bg-[#00b749] hover:bg-[#00a040] text-white px-10 py-4 rounded-full font-bold transition-all shadow-lg">Contact Us Directly</a>
          </div>
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#00b749]/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
