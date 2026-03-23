'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FaqSection from '@/components/sections/FaqSection';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-black">
      <Navigation />
      <main className="pt-28 pb-16 fr-container">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Reach Out. We’re Here Always</h1>
          <p className="mt-3 text-zinc-600">
            Have questions, ideas, or need support? Connect with us we’re ready to listen &amp; help.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-7">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Mail className="h-4 w-4 text-green-600" />
              Our Mail
            </div>
            <div className="mt-3 text-zinc-600">Careon@gmail.com</div>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-7">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Phone className="h-4 w-4 text-green-600" />
              Our Contact
            </div>
            <div className="mt-3 text-zinc-600">+91 9730627087</div>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-7">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <MapPin className="h-4 w-4 text-green-600" />
              Our Address
            </div>
            <div className="mt-3 text-zinc-600">No: 78 B Willow Park Drive Austin, TX, USA, 73301</div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8">
          <h2 className="text-2xl font-semibold tracking-tight">Contact Information</h2>

          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea rows={5} className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-green-600" />
            </div>
            <div className="md:col-span-2">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </main>

      <FaqSection />
      <Footer />
    </div>
  );
}
