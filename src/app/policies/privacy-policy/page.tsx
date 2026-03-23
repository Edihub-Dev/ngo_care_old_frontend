'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-black">
      <Navigation />
      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Privacy policy</h1>
        <p className="mt-6 text-zinc-600 leading-relaxed">
          This is a placeholder privacy policy page to match the Framer routes. Provide your organization’s privacy policy text and I’ll format it to match the template.
        </p>
      </main>
      <Footer />
    </div>
  );
}
