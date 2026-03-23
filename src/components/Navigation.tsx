'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <nav className="bg-black/90 backdrop-blur-lg rounded-full px-6 py-2 border border-white/10 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl md:text-2xl font-bold text-white tracking-tight">Careon</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-sm font-medium text-white/80 hover:text-white transition-colors">About</Link>
            <Link href="/causes" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Causes</Link>
            <Link href="/programs" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Programs</Link>
            <Link href="/blog" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm font-medium text-white/80 hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="hidden md:block">
            <Link href="/donate" className="bg-[#00b749] hover:bg-[#00a040] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2">
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden mt-2 bg-black/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/about" className="block text-white/80 hover:text-white font-medium">About</Link>
              <Link href="/causes" className="block text-white/80 hover:text-white font-medium">Causes</Link>
              <Link href="/programs" className="block text-white/80 hover:text-white font-medium">Programs</Link>
              <Link href="/blog" className="block text-white/80 hover:text-white font-medium">Blog</Link>
              <Link href="/contact" className="block text-white/80 hover:text-white font-medium">Contact</Link>
              <Link href="/donate" className="bg-[#00b749] text-white px-5 py-3 rounded-xl font-semibold w-full flex justify-center text-center">
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
