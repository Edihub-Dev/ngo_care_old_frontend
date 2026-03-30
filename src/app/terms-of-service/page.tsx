import React from 'react';
import { FileText, CheckCircle, AlertTriangle, Scale } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 pb-24 font-sans">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/governance_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-white">
          <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
            Legal Terms
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Terms of Service
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            By accessing or using our website, you agree to comply with and be bound by these terms. 
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-24">
        {/* Policy Content */}
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Scale className="w-8 h-8 text-[#00b749]" />
              1. General Terms
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              The term "Golden Years Care Foundation" or "us" or "we" refers to the owner of the website. The term "you" refers to the user or viewer of our website. The content of the pages of this website is for your general information and use only. It is subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-[#00b749]" />
              2. Use of Content
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-[#00b749]" />
              3. Disclaimer
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              While we strive for accuracy, we do not provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose.
            </p>
          </section>

          <section className="bg-black text-white p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden">
             <h2 className="text-3xl font-bold mb-8 italic tracking-tight">Acceptance of Terms</h2>
             <p className="text-white/60 leading-relaxed text-lg mb-10 max-w-xl mx-auto">
               Your use of this website and any dispute arising out of such use of the website is subject to the laws of India.
             </p>
             <div className="w-24 h-1 bg-[#00b749] mx-auto rounded-full" />
             <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#00b749]/10 rounded-full blur-[100px] pointer-events-none" />
          </section>
        </div>
      </div>
    </div>
  );
}
