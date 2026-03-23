'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
<<<<<<< HEAD
import { usePathname } from 'next/navigation';
=======
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
<<<<<<< HEAD
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/causes', label: 'Causes' },
    { href: '/programs', label: 'Programs' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50">
      <div className="fr-container">
        <div className="mx-auto flex items-center justify-between rounded-full border border-white/10 bg-black/55 backdrop-blur-md px-4 py-2">
          <Link href="/" className="flex items-center gap-2 rounded-full px-3 py-2">
            <span className="text-xl font-semibold tracking-tight text-white">Careon</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isActive(item.href)
                    ? 'text-white text-sm font-medium'
                    : 'text-white/70 hover:text-white text-sm font-medium transition-colors'
                }
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
            >
=======

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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
              Donate Now
            </Link>
          </div>

<<<<<<< HEAD
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mt-3 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-md p-3 md:hidden"
          >
            <div className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={
                    isActive(item.href)
                      ? 'rounded-2xl px-4 py-3 text-sm font-medium text-white bg-white/10'
                      : 'rounded-2xl px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors'
                  }
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link
                  href="/donate"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
                >
                  Donate Now
                </Link>
              </div>
=======
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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
            </div>
          </motion.div>
        )}
      </div>
<<<<<<< HEAD
    </nav>
=======
    </>
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
  );
}
