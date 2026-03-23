<<<<<<< HEAD
'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FaqSection from '@/components/sections/FaqSection';

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-black">
      <Navigation />
      <main className="pt-28 pb-16 fr-container">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Donate. Impact. Transform Lives.</h1>
          <p className="mt-3 text-zinc-600">
            Your generosity supports life-changing missions and community recovery.
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-8">
          <div className="text-sm font-semibold text-zinc-700">Donate in 4 Easy Steps</div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { step: '01', title: 'Enter Details', desc: 'Please complete your basic essential information.' },
              { step: '02', title: 'Choose Amount', desc: 'Select a donation amount that works for you.' },
              { step: '03', title: 'Confirm', desc: 'Review your details before continuing.' },
              { step: '04', title: 'Complete', desc: 'Finish payment and receive confirmation.' },
            ].map((s) => (
              <div key={s.step} className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6">
                <div className="text-xs text-zinc-500">{s.step}</div>
                <div className="mt-2 text-lg font-semibold">{s.title}</div>
                <div className="mt-2 text-sm text-zinc-600">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name*</label>
              <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-600" placeholder="First Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name*</label>
              <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-600" placeholder="Last Name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email*</label>
              <input type="email" className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-600" placeholder="Email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Number*</label>
              <input className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-600" placeholder="Contact Number" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Choose Amount</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['₹100', '₹500', '₹1,000', '₹2,000'].map((a) => (
                  <button
                    key={a}
                    type="button"
                    className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold hover:border-green-600"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="button"
                className="inline-flex w-full items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                Continue
              </button>
              <p className="mt-3 text-xs text-zinc-500">
                Payment integration is not wired yet. Tell me Razorpay/Stripe and I’ll connect it.
              </p>
            </div>
          </div>
        </div>
      </main>

      <FaqSection />
      <Footer />
=======
import Link from 'next/link';

export default function DonatePage() {
  return (
    <div className="pt-24 bg-[#f0f2f5] min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
             Donation
           </span>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
             Your Gift Matters
           </h1>
           <p className="text-lg text-black/60">
             Choose an amount to support our ongoing missions. Every dollar is tracked and effectively utilized.
           </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-black/5">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Select Donation Frequency</h3>
            <div className="flex gap-4 p-2 bg-gray-100 rounded-2xl w-fit">
              <button className="bg-white text-black px-8 py-3 rounded-xl font-bold shadow-sm transition-all focus:outline-none ring-2 ring-[#00b749]">One Time</button>
              <button className="text-black/60 px-8 py-3 rounded-xl font-bold hover:bg-black/5 transition-all focus:outline-none">Monthly</button>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Select Amount</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[25, 50, 100, 250].map((amt, idx) => (
                 <button 
                  key={amt} 
                  className={`py-4 rounded-2xl border-2 font-bold text-xl transition-all outline-none ${idx === 2 ? 'border-[#00b749] bg-[#e5f7ed] text-[#00b749]' : 'border-black/10 hover:border-black/30'}`}
                 >
                   ${amt}
                 </button>
               ))}
               <div className="col-span-2 md:col-span-4 mt-2">
                 <input type="number" placeholder="Custom Amount" className="w-full bg-gray-50 border border-black/10 rounded-2xl px-6 py-4 text-xl font-medium focus:outline-none focus:border-[#00b749] transition-colors" />
               </div>
            </div>
          </div>

          <div className="mb-12 border-t border-black/10 pt-10">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input type="text" placeholder="First Name" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors" />
               <input type="text" placeholder="Last Name" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors" />
               <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors col-span-1 md:col-span-2" />
            </div>
          </div>

          <button className="w-full py-5 bg-[#00b749] hover:bg-[#00a040] text-white rounded-2xl font-bold text-xl transition-colors shadow-md">
            Complete Donation of $100
          </button>
          
          <p className="text-center text-black/50 text-sm mt-6 font-medium">
             Your payment information is globally secured by standard encryption.
          </p>
        </div>
      </div>
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
    </div>
  );
}
