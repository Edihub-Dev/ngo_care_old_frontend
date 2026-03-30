import React from 'react';
import { BarChart3, PieChart, ShieldCheck, TrendingUp } from 'lucide-react';

export default function FinancialsPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 pb-24">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/governance_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
            Transparency
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-tight">
            Our Financials
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            We are committed to absolute transparency. Every rupee donated is tracked, audited, and utilized for the maximum possible impact.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24">
        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-[#f9fafb] p-10 rounded-[3rem] border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">100% Transparency</h3>
            <p className="text-gray-600">Full disclosure of all donations and expenditures.</p>
          </div>
          <div className="bg-[#f9fafb] p-10 rounded-[3rem] border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Audited Reports</h3>
            <p className="text-gray-600">Annual financial audits conducted by certified professionals.</p>
          </div>
          <div className="bg-[#f9fafb] p-10 rounded-[3rem] border border-gray-100 text-center">
            <div className="w-16 h-16 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Efficiency</h3>
            <p className="text-gray-600">Low administrative costs to ensure more funds reach beneficiaries.</p>
          </div>
        </div>

        {/* Allocation Section */}
        <div className="bg-[#050505] text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Where Your Money Goes</h2>
              <div className="space-y-6">
                {[
                  { label: "Old Age Care & Welfare", value: 45 },
                  { label: "Healthcare & Medical Aid", value: 30 },
                  { label: "Food & Shelter Support", value: 15 },
                  { label: "Environment & Social Awareness", value: 10 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{item.label}</span>
                      <span className="text-[#00b749] font-bold">{item.value}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div className="bg-[#00b749] h-2 rounded-full" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 border-8 border-[#00b749]/20 rounded-full flex items-center justify-center relative">
                 <div className="text-center">
                    <PieChart className="w-20 h-20 text-[#00b749] mx-auto mb-2" />
                    <p className="text-4xl font-bold">$0.90</p>
                    <p className="text-white/40 text-sm">of every $1 goes directly<br/>to beneficiaries</p>
                 </div>
                 {/* Decorative elements */}
                 <div className="absolute inset-0 border-8 border-t-[#00b749] border-transparent rounded-full rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
