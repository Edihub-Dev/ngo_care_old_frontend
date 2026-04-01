'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeftIcon,
  UserIcon,
  DocumentTextIcon,
  PhoneIcon,
  HeartIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  ChevronDownIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import { AuthManager } from '@/lib/auth';
import { apiClient, ApiResponse } from '@/lib/api';
import { useGeolocation } from '@/lib/geolocation';
import { cn } from "../../lib/utils";

interface UserStats {
  totalRequests: number;
  completedRequests: number;
  pendingRequests: number;
  currentPlan: string;
  subscriptionActive: boolean;
  membershipActive?: boolean;
  membershipPlan?: string;
  membershipExpiry?: string;
  recentRequests: Array<{
    _id: string;
    serviceType: string;
    status: string;
    createdAt: string;
  }>;
}

export default function Dashboard() {
  const router = useRouter();
  const authManager = AuthManager.getInstance();
  const { getLocationWithFallback } = useGeolocation();

  const [authState, setAuthState] = useState(() => authManager.getAuthState());
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sosLoading, setSosLoading] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    authManager.setRouter(router);
    initializeDashboard();
  }, [router]);

  const initializeDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      // Check authentication first
      const currentAuthState = authManager.requireAuth();
      setAuthState(currentAuthState);

      // Only fetch stats if authenticated
      if (currentAuthState.isAuthenticated) {
        await fetchUserStats();
      }
    } catch (error) {
      console.error('Dashboard initialization error:', error);
      setError(error instanceof Error ? error.message : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const response = await apiClient.get<UserStats>('/api/users/stats');

      if (response.success && response.data) {
        setStats(response.data);
      } else {
        throw new Error(response.error?.message || 'Failed to fetch stats');
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch stats');
    }
  };

  const handleLogout = () => {
    authManager.logout();
  };

  const triggerSOS = async () => {
    if (sosLoading) return;

    const { default: toast } = await import('react-hot-toast');
    const loadingToast = toast.loading('Establishing emergency sync...');

    try {
      setSosLoading(true);
      const location = await getLocationWithFallback();

      const response = await apiClient.post('/api/emergency/sos', {
        location,
        description: 'Emergency SOS triggered from dashboard'
      });

      if (response.success) {
        toast.success('Emergency alert deployed. Help is on the way.', { id: loadingToast });
      } else {
        throw new Error(response.error?.message || 'Failed to send emergency alert');
      }
    } catch (error) {
      console.error('SOS Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'SOS broadcast failed';
      toast.error(`${errorMessage}. Call 108 immediately.`, { id: loadingToast, duration: 6000 });
    } finally {
      setSosLoading(false);
    }
  };

  const handlePurchaseMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentLoading) return;

    const { default: toast } = await import('react-hot-toast');
    const loadingToast = toast.loading('Securing transaction...');

    try {
      setPaymentLoading(true);
      const response = await apiClient.post('/api/users/membership/purchase', { amount: 1100 });
      if (response.success) {
        toast.success('Membership activated. Welcome to the Foundation!', { id: loadingToast });
        setPaymentModalOpen(false);
        fetchUserStats();
      } else {
        throw new Error(response.error?.message || 'Payment authentication failed');
      }
    } catch (error) {
      console.error('Payment Error:', error);
      toast.error(error instanceof Error ? error.message : 'Transaction failed', { id: loadingToast });
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={cn('min-h-screen', 'bg-linear-to-b', 'from-blue-50', 'to-white', 'flex', 'items-center', 'justify-center')}>
        <div className="text-center">
          <div className={cn('animate-spin', 'rounded-full', 'h-12', 'w-12', 'border-b-2', 'border-blue-600', 'mx-auto')}></div>
          <p className={cn('mt-4', 'text-gray-600')}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('min-h-screen', 'bg-linear-to-b', 'from-blue-50', 'to-white', 'flex', 'items-center', 'justify-center')}>
        <div className={cn('text-center', 'max-w-md', 'mx-auto', 'p-6')}>
          <div className={cn('bg-red-100', 'rounded-full', 'w-16', 'h-16', 'flex', 'items-center', 'justify-center', 'mx-auto', 'mb-4')}>
            <ExclamationTriangleIcon className={cn('h-8', 'w-8', 'text-red-600')} />
          </div>
          <h2 className={cn('text-xl', 'font-semibold', 'text-gray-900', 'mb-2')}>Error Loading Dashboard</h2>
          <p className={cn('text-gray-600', 'mb-6')}>{error}</p>
          <Button onClick={initializeDashboard} className="w-full">Try Again</Button>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return null; // Will redirect via authManager
  }

  return (
    <div className={cn('min-h-screen', 'bg-[#FAFCFF]', 'relative', 'overflow-hidden')}>
      {/* Abstract Background Blobs */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>
      <div className="fixed top-1/2 -right-24 w-80 h-80 bg-purple-50 rounded-full blur-3xl opacity-40 z-0"></div>

      {/* Header */}
      <header className={cn('glass', 'sticky', 'top-0', 'z-50', 'mx-2', 'sm:mx-4', 'mt-2', 'sm:mt-4', 'rounded-2xl', 'sm:rounded-3xl', 'shadow-xl', 'shadow-blue-900/5')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-3', 'sm:px-6')}>
          <div className={cn('flex', 'justify-between', 'items-center', 'h-16', 'sm:h-20')}>
            {/* Logo */}
            <Link href="/" className={cn('flex', 'items-center', 'hover:opacity-80 transition-opacity')}>
              <img
                src="/assets/Logo.png"
                alt="Golden Years Foundation"
                className="h-10 sm:h-16 w-auto object-contain"
              />
            </Link>

            {/* Actions */}
            <div className={cn('flex', 'items-center', 'space-x-2', 'sm:space-x-4')}>
              <button
                onClick={triggerSOS}
                disabled={sosLoading}
                className={cn(
                  'px-3', 'sm:px-6', 'py-1.5', 'sm:py-2.5', 'bg-red-600', 'hover:bg-red-700', 'text-white', 'font-black',
                  'rounded-full', 'shadow-xl', 'shadow-red-600/30', 'transition-all', 'text-[10px]', 'sm:text-xs',
                  'flex', 'items-center', 'gap-1', 'sm:gap-2', 'disabled:opacity-50'
                )}
              >
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
                <span className="hidden xs:inline">{sosLoading ? '...' : 'SOS EMERGENCY'}</span>
                <span className="xs:hidden">{sosLoading ? '...' : 'SOS'}</span>
              </button>


              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={cn(
                    'w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/20 transition-all hover:scale-105 active:scale-95',
                    dropdownOpen && 'ring-2 ring-blue-500 ring-offset-2 bg-blue-700'
                  )}
                >
                  <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      {/* Back-drop for click-away closure */}
                      <div
                        className="fixed inset-0 z-0 bg-transparent"
                        onClick={() => setDropdownOpen(false)}
                      />

                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className={cn(
                          'absolute right-0 mt-3 w-56 rounded-[2rem] border border-gray-100 bg-white/80 backdrop-blur-xl shadow-2xl shadow-blue-900/10 overflow-hidden z-10'
                        )}
                      >
                        <div className="p-2 space-y-1">
                          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-white hover:shadow-sm transition-all group">
                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                              <HomeIcon className="w-4 h-4" />
                            </div>
                            <span>Back to home</span>
                          </Link>

                          <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-700 hover:bg-white hover:shadow-sm transition-all group">
                            <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                              <UserIcon className="w-4 h-4" />
                            </div>
                            <span>My Profile</span>
                          </Link>

                          {(authState.user?.role === 'admin' || authState.user?.role === 'subadmin') && (
                            <Link href={process.env.NEXT_PUBLIC_ADMIN_URL || '#'} className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-blue-700 hover:bg-white hover:shadow-sm transition-all group">
                              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                                <ShieldCheckIcon className="w-4 h-4" />
                              </div>
                              <span>Admin Panel</span>
                            </Link>
                          )}

                          <div className="h-px bg-gray-100 mx-4 my-1" />

                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500 group-hover:bg-red-100 transition-colors">
                              <ArrowRightOnRectangleIcon className="w-4 h-4" />
                            </div>
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={cn('max-w-7xl', 'mx-auto', 'px-6', 'sm:px-8', 'py-12', 'relative', 'z-10')}>

        {/* Welcome Section */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">
              Namaste, {authState.user?.name?.split(' ')[0] || 'Member'}!
            </h2>
            <p className="text-gray-500 font-medium">Here's what's happening with your care today.</p>
          </motion.div>
        </div>

        {/* Main Dashboard Section - NOW IN A SINGLE LINE ON DESKTOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 items-stretch">
          {/* 1. Membership / Join Foundation */}
          {stats && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn('rounded-[2.5rem]', 'p-8', 'bg-gradient-to-br', 'from-blue-600', 'via-blue-700', 'to-indigo-900', 'text-white', 'relative', 'overflow-hidden', 'shadow-2xl', 'shadow-blue-900/20', 'flex flex-col')}
            >
              <div className="absolute -top-12 -right-12 p-4 opacity-10">
                <UserIcon className="w-48 h-48 rotate-12" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4">Foundation Status</p>
                <p className="text-2xl font-black mb-2 leading-tight">{stats.membershipActive ? 'Verified Member' : 'Guest Account'}</p>
                <p className="text-[10px] opacity-80 mb-8 leading-relaxed">
                  {stats.membershipActive && stats.membershipExpiry ? `System active till ${new Date(stats.membershipExpiry).toLocaleDateString()}` : 'Unlock professional elder care and NGO benefits.'}
                </p>

                <div className="mt-auto">
                  {!stats.membershipActive ? (
                    <button
                      onClick={() => setPaymentModalOpen(true)}
                      className="w-full bg-white text-blue-700 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95"
                    >
                      Join Foundation
                    </button>
                  ) : (
                    <button
                      onClick={() => setPaymentModalOpen(true)}
                      className="w-full bg-white/20 backdrop-blur-md text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white/30 transition-all border border-white/20"
                    >
                      Renew
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. Book Care */}
          <Link href="/services">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="card-modern group flex flex-col h-full hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="h-40 bg-gray-100 rounded-3xl mb-6 overflow-hidden relative shadow-inner">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-90"
                  style={{ backgroundImage: 'url("/assets/dashboard_care_v2.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Book Care</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-8 flex-1">Professional doctor visits, nursing, and companionship services at your doorstep.</p>
              <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Browse Services <ArrowLeftIcon className="w-4 h-4 rotate-180" />
              </div>
            </motion.div>
          </Link>

          {/* 3. Profile Shield */}
          <Link href="/dashboard/profile">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="card-modern group flex flex-col h-full hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="h-40 bg-gray-100 rounded-3xl mb-6 overflow-hidden relative shadow-inner">
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 opacity-90"
                  style={{ backgroundImage: 'url("/assets/dashboard_profile_v2.png")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">Profile Shield</h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-8 flex-1">Update your medical records, emergency contacts, and personalized preferences.</p>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                Edit Profile <ArrowLeftIcon className="w-4 h-4 rotate-180" />
              </div>
            </motion.div>
          </Link>

          {/* 4. Activity Sidebar */}
          <Link href="/dashboard/history">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="card-modern flex flex-col shadow-xl h-full hover:scale-[1.02] transition-transform duration-300 pointer-events-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Activity</h3>
                <span className="text-[10px] font-black uppercase text-blue-600">Recent</span>
              </div>

              {/* Activity Stats Summary */}
              {stats && (
                <div className="grid grid-cols-3 gap-2 mb-8 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-gray-900">{stats.totalRequests}</p>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">Total</p>
                  </div>
                  <div className="text-center border-x border-gray-200">
                    <p className="text-[10px] font-black text-emerald-600">{stats.completedRequests}</p>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">Done</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-black text-blue-600">{stats.pendingRequests}</p>
                    <p className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">Active</p>
                  </div>
                </div>
              )}

              <div className="flex-1 pr-1">
                {stats?.recentRequests && stats.recentRequests.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentRequests.slice(0, 2).map((request: any, index: number) => (
                      <div key={index} className="flex gap-4 group">
                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors',
                          request.status === 'completed' ? 'border-emerald-100 bg-emerald-50 text-emerald-600 group-hover:border-emerald-200' :
                          'border-blue-100 bg-blue-50 text-blue-600 group-hover:border-blue-200'
                        )}>
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        </div>
                        <div className="flex-1 border-b border-gray-50 pb-4 group-last:border-0 grow">
                          <p className="font-bold text-gray-900 text-xs capitalize truncate mb-1 group-hover:text-blue-600 transition-colors">{request.serviceType?.replace('_', ' ')}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(request.createdAt).toLocaleDateString()}</p>
                            <span className={cn(
                              'text-[8px] font-black uppercase px-2 py-0.5 rounded-md border',
                              request.status === 'completed' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-blue-600 bg-blue-50 border-blue-100'
                            )}>
                              {request.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <DocumentTextIcon className="w-5 h-5 text-gray-200" />
                    </div>
                    <p className="text-gray-400 font-bold text-[9px]">No recent activity</p>
                  </div>
                )}
              </div>
              
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                <span className="text-[9px] font-black uppercase text-gray-300">View History</span>
                <ArrowLeftIcon className="w-4 h-4 rotate-180 text-blue-600" />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Status Summary Section - NOW BOTTOM */}
        {stats && (
          <div className="mt-20 pt-12 border-t border-gray-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px bg-gray-100 flex-1" />
              <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] whitespace-nowrap">Platform Summary</h3>
              <div className="h-px bg-gray-100 flex-1" />
            </div>
            <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8')}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn('card-modern', 'flex', 'flex-col', 'gap-4', 'hover:shadow-blue-900/5 transition-all')}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                  <DocumentTextIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className={cn('text-[10px]', 'font-black', 'text-gray-400', 'uppercase', 'tracking-widest', 'mb-1')}>Total Interactions</p>
                  <p className={cn('text-3xl', 'font-black', 'text-gray-900', 'tracking-tighter')}>{stats.totalRequests}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={cn('card-modern', 'flex', 'flex-col', 'gap-4', 'hover:shadow-emerald-900/5 transition-all')}
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <HeartIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className={cn('text-[10px]', 'font-black', 'text-gray-400', 'uppercase', 'tracking-widest', 'mb-1')}>Completed Care</p>
                  <p className={cn('text-3xl', 'font-black', 'text-emerald-600', 'tracking-tighter')}>{stats.completedRequests}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={cn('card-modern', 'flex', 'flex-col', 'gap-4', 'hover:shadow-amber-900/5 transition-all')}
              >
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                  <PhoneIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className={cn('text-[10px]', 'font-black', 'text-gray-400', 'uppercase', 'tracking-widest', 'mb-1')}>Active Requests</p>
                  <p className={cn('text-3xl', 'font-black', 'text-gray-900', 'tracking-tighter')}>{stats.pendingRequests}</p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {paymentModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <h2 className="text-xl font-bold mb-2">Verified Membership</h2>
            <p className="text-gray-600 mb-6">Join Golden Years Care Foundation as a verified member. Get priority access to services, tax-exempt donation receipts, and exclusive updates.</p>

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 text-center text-blue-800">
              <div className="text-sm font-medium">Annual Plan</div>
              <div className="text-3xl font-bold mt-1">₹1,100<span className="text-sm text-blue-600 font-normal"> / year</span></div>
            </div>

            <form onSubmit={handlePurchaseMembership}>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number (Mock)</label>
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border rounded-md p-2" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full border rounded-md p-2" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input type="text" placeholder="123" className="w-full border rounded-md p-2" required />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full py-3" disabled={paymentLoading}>
                {paymentLoading ? 'Processing...' : 'Pay ₹1,100 & Join'}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
