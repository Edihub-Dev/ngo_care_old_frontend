'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Menu, X, User, LogOut, LayoutDashboard, Heart, ShieldCheck, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '../lib/utils';
import { apiClient } from '@/lib/api';
import { AuthManager } from '@/lib/auth';
import { useSettings } from '@/context/SettingsContext';

export default function Navigation() {
  const { settings } = useSettings();
  const orgName = settings.orgName;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [auth, setAuth] = useState({ isAuthenticated: false, user: null as any, token: null as any });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();


  // Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    setMounted(true);
  }, []); // Run ONLY once on mount

  useEffect(() => {
    if (!mounted) return;

    // Initial auth load
    setAuth(AuthManager.getInstance().getAuthState());

    // Subscribe to auth state changes
    const interval = setInterval(() => {
      const current = AuthManager.getInstance().getAuthState();
      const prevStr = JSON.stringify(auth);
      const currStr = JSON.stringify(current);
      if (currStr !== prevStr) {
        setAuth(current);
      }
    }, 2000); // 2 seconds is enough for auth check
    return () => clearInterval(interval);
  }, [mounted]); // Only trigger when mounted or manually if needed

  const closeMenu = () => setIsMenuOpen(false);
  const closeProfile = () => setIsProfileOpen(false);

  const handleLogout = () => {
    AuthManager.getInstance().logout();
    setAuth(AuthManager.getInstance().getAuthState());
    closeMenu();
    closeProfile();
    router.push('/');
  };

  return (
    <>
      {/* Invisible Overlay for click-outside closure */}
      {(isMenuOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            closeMenu();
            closeProfile();
          }}
        />
      )}

      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-50">
        <nav className="bg-white/80 backdrop-blur-xl rounded-full px-6 py-2 border border-black/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center px-3 py-1.5 rounded-xl space-x-2" onClick={closeMenu}>
            <img src="/assets/Logo.png" alt={orgName} className="h-7 md:h-9 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/about" className="text-sm font-bold text-black/60 hover:text-black transition-colors">About</Link>
            <Link href="/causes" className="text-sm font-bold text-black/60 hover:text-black transition-colors">Causes</Link>
            <Link href="/programs" className="text-sm font-bold text-black/60 hover:text-black transition-colors">Programs</Link>
            <Link href="/governance" className="text-sm font-bold text-black/60 hover:text-black transition-colors">Governance</Link>
            <Link href="/blog" className="text-sm font-bold text-black/60 hover:text-black transition-colors">Blog</Link>
            <Link href="/contact" className="text-sm font-bold text-black/60 hover:text-black transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {!mounted ? (
              <div className="w-32 h-10 bg-gray-100/50 rounded-full animate-pulse" />
            ) : auth.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300",
                    isProfileOpen ? "bg-blue-600 text-white shadow-lg shadow-blue-200" : "text-gray-700 hover:bg-gray-100"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                    isProfileOpen ? "bg-white/20" : "bg-blue-100 text-blue-600"
                  )}>
                    <User className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold">My Profile</span>
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isProfileOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 overflow-hidden z-50 p-2"
                    >
                      <div className="space-y-1">
                        <Link
                          href="/donate"
                          onClick={closeProfile}
                          className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold text-emerald-600 hover:bg-emerald-50 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                            <Heart className="w-4 h-4" />
                          </div>
                          <span>Donate</span>
                        </Link>

                        <Link
                          href="/dashboard"
                          onClick={closeProfile}
                          className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold text-blue-600 hover:bg-blue-50 transition-all group"
                        >
                          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                          </div>
                          <span>Dashboard</span>
                        </Link>
                        
                        {(auth.user?.role === 'admin' || auth.user?.role === 'subadmin') && (
                          <a
                            href={`${process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001'}/admin`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={closeProfile}
                            className="flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold text-blue-700 hover:bg-blue-50 transition-all group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <span>Admin Portal</span>
                          </a>
                        )}

                        <div className="h-px bg-gray-100 mx-4 my-1" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all group text-left"
                        >
                          <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                            <LogOut className="w-4 h-4" />
                          </div>
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-bold text-black/60 hover:text-black transition-colors px-4 py-2">
                  Login
                </Link>
                <Link href="/register" className="bg-[#00B749] hover:bg-[#00A040] text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-green-500/20">
                  Join Us
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-black p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="md:hidden mt-2 bg-white/95 backdrop-blur-2xl border border-black/5 rounded-[2rem] overflow-hidden shadow-2xl relative z-50 origin-top"
            >
              <div className="px-6 py-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/about" onClick={closeMenu} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-bold text-black/70">About</span>
                  </Link>
                  <Link href="/causes" onClick={closeMenu} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-bold text-black/70">Causes</span>
                  </Link>
                  <Link href="/programs" onClick={closeMenu} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-bold text-black/70">Programs</span>
                  </Link>
                  <Link href="/governance" onClick={closeMenu} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-bold text-black/70">Governance</span>
                  </Link>
                  <Link href="/blog" onClick={closeMenu} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-bold text-black/70">Blog</span>
                  </Link>
                  <Link href="/contact" onClick={closeMenu} className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center justify-center gap-2">
                    <span className="text-sm font-bold text-black/70">Contact</span>
                  </Link>
                </div>

                <div className="pt-4 border-t border-black/5">
                  {!mounted ? (
                    <div className="h-24 bg-gray-50 rounded-2xl animate-pulse" />
                  ) : auth.isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Link href="/donate" onClick={closeMenu} className="flex items-center justify-center space-x-2 bg-emerald-50 text-emerald-600 p-4 rounded-2xl font-bold">
                          <Heart className="w-5 h-5" />
                          <span>Donate</span>
                        </Link>
                        <Link href="/dashboard" onClick={closeMenu} className="flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 p-4 rounded-2xl font-bold">
                          <LayoutDashboard className="w-5 h-5" />
                          <span>Dashboard</span>
                        </Link>
                      </div>

                      <button
                        onClick={handleLogout}
                        className="flex items-center justify-center space-x-2 bg-red-50 text-red-600 p-4 rounded-2xl font-bold w-full"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/register" onClick={closeMenu} className="bg-[#00B749] text-white p-4 rounded-2xl font-bold w-full flex justify-center text-center shadow-lg shadow-green-500/20">
                        Create Account
                      </Link>
                      <Link href="/login" onClick={closeMenu} className="bg-gray-100 text-black p-4 rounded-2xl font-bold w-full flex justify-center text-center">
                        Log In
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}