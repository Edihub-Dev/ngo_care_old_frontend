'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribing:', email);
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="bg-black border-t border-white/10">
      <section className="fr-section pt-20 pb-12">
        <div className="fr-container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
          >
            <div className="lg:col-span-5">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">Together</h2>
              <p className="mt-3 text-white/70 max-w-md">
                Be the first to hear how you're making a difference.
              </p>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="text-sm font-semibold text-white">Newsletter</div>
                <div className="mt-1 text-sm text-white/70">Sign in to newsletter and never miss update.</div>
                <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 rounded-full bg-black/40 border border-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-green-500"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-sm font-semibold text-white mb-4">Navigation</div>
                  <ul className="space-y-2">
                    <li><Link href="/" className="text-white/70 hover:text-white transition-colors text-sm">Home</Link></li>
                    <li><Link href="/about" className="text-white/70 hover:text-white transition-colors text-sm">About</Link></li>
                    <li><Link href="/causes" className="text-white/70 hover:text-white transition-colors text-sm">Causes</Link></li>
                    <li><Link href="/donate" className="text-white/70 hover:text-white transition-colors text-sm">Donate</Link></li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-4">Other Links</div>
                  <ul className="space-y-2">
                    <li><Link href="/programs" className="text-white/70 hover:text-white transition-colors text-sm">Programs</Link></li>
                    <li><Link href="/blog" className="text-white/70 hover:text-white transition-colors text-sm">Blogs</Link></li>
                    <li><Link href="/policies/privacy-policy" className="text-white/70 hover:text-white transition-colors text-sm">Privacy policy</Link></li>
                    <li><Link href="/policies/terms-conditions" className="text-white/70 hover:text-white transition-colors text-sm">Terms and Conditions</Link></li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-4">Social Connect</div>
                  <ul className="space-y-2">
                    <li><a href="https://www.linkedin.com/in/jitendra-raut/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">Linkedin</a></li>
                    <li><a href="https://www.instagram.com/jitu.ux/" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">Instagram</a></li>
                    <li><a href="https://x.com/jituux" target="_blank" rel="noreferrer" className="text-white/70 hover:text-white transition-colors text-sm">X/twitter</a></li>
                  </ul>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-4">Contact us</div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-white/70 text-sm"><Phone className="h-4 w-4 text-green-500" /><a href="tel:+1-555-44-456" className="hover:text-white transition-colors">+91 9730627087</a></li>
                    <li className="flex items-center gap-2 text-white/70 text-sm"><Mail className="h-4 w-4 text-green-500" /><a href="mailto:info@careon.com" className="hover:text-white transition-colors">Careon.foundation@gmail.com</a></li>
                    <li className="flex items-center gap-2 text-white/70 text-sm"><MapPin className="h-4 w-4 text-green-500" /><a href="https://www.google.com/maps" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">123, Park , Las Vegas - 110016</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="text-white/60 text-sm">All copyrights reserved for @Careon</div>
            <a
              href="https://fremix.design/"
              target="_blank"
              rel="noreferrer"
              className="text-white/60 hover:text-white transition-colors text-sm"
            >
              Designed by Jitu Raut @fremix.com
            </a>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="text-white/60 text-sm">- HopeUnityCareImpactGrowthTrustTogether</div>
          </div>
        </div>
      </section>
    </footer>
  );
}
