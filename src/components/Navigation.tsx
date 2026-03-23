'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
              Donate Now
            </Link>
          </div>

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
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
