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
    </div>
  );
}
