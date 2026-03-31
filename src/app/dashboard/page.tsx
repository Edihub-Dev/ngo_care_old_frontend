'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  UserIcon, 
  DocumentTextIcon, 
  PhoneIcon,
  HeartIcon,
  ExclamationTriangleIcon
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
    
    try {
      setSosLoading(true);
      
      // Get user's current location with fallback
      const location = await getLocationWithFallback();
      
      const response = await apiClient.post('/api/emergency/sos', {
        location,
        description: 'Emergency SOS triggered from dashboard'
      });
      
      if (response.success) {
        alert('Emergency alert sent successfully! Help is on the way.');
      } else {
        throw new Error(response.error?.message || 'Failed to send emergency alert');
      }
    } catch (error) {
      console.error('SOS Error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Error sending emergency alert';
      alert(`${errorMessage}. Please call emergency services immediately.`);
    } finally {
      setSosLoading(false);
    }
  };

  const handlePurchaseMembership = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentLoading) return;
    
    try {
      setPaymentLoading(true);
      const response = await apiClient.post('/api/users/membership/purchase', { amount: 1100 });
      if (response.success) {
        alert('Membership activated successfully!');
        setPaymentModalOpen(false);
        fetchUserStats(); // Refresh dashboard
      } else {
        throw new Error(response.error?.message || 'Payment failed');
      }
    } catch (error) {
       console.error('Payment Error:', error);
       alert(error instanceof Error ? error.message : 'Payment failed');
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
            <div className={cn('flex', 'items-center')}>
              <img 
                src="/assets/Logo.png" 
                alt="Golden Years Foundation" 
                className="h-10 sm:h-16 w-auto object-contain"
              />
            </div>

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

              <button 
                onClick={handleLogout} 
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white border border-gray-200 text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 hover:border-red-100 transition-all shadow-sm shrink-0"
                title="Logout"
              >
                <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
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

        {/* Stats Grid */}
        {stats && (
          <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-8', 'mb-12')}>
            {/* Membership / Join Foundation - NOW FIRST */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn('rounded-[2.5rem]', 'p-8', 'bg-gradient-to-br', 'from-blue-600', 'via-blue-700', 'to-indigo-900', 'text-white', 'relative', 'overflow-hidden', 'shadow-2xl', 'shadow-blue-900/20')}
            >
              <div className="absolute -top-12 -right-12 p-4 opacity-10">
                <UserIcon className="w-48 h-48 rotate-12" />
              </div>
              <div className="relative z-10 h-full flex flex-col">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-4">Foundation Status</p>
                <p className="text-2xl font-black mb-2">{stats.membershipActive ? 'Verified Member' : 'Guest Account'}</p>
                <p className="text-xs opacity-80 mb-8 leading-relaxed max-w-[200px]">
                  {stats.membershipActive && stats.membershipExpiry ? `System active till ${new Date(stats.membershipExpiry).toLocaleDateString()}` : 'Unlock professional elder care and NGO benefits.'}
                </p>
                
                <div className="mt-auto">
                  {!stats.membershipActive ? (
                    <button 
                      onClick={() => setPaymentModalOpen(true)}
                      className="w-full bg-white text-blue-700 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl active:scale-95"
                    >
                      Join Foundation
                    </button>
                  ) : (
                    <button 
                      onClick={() => setPaymentModalOpen(true)}
                      className="w-full bg-white/20 backdrop-blur-md text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-all border border-white/20"
                    >
                      Renew Membership
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn('card-modern', 'flex', 'flex-col', 'gap-4')}
            >
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <DocumentTextIcon className="h-6 w-6" />
              </div>
              <div>
                <p className={cn('text-xs', 'font-black', 'text-gray-400', 'uppercase', 'tracking-widest', 'mb-1')}>Total Interactions</p>
                <p className={cn('text-3xl', 'font-black', 'text-gray-900', 'tracking-tighter')}>{stats.totalRequests}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn('card-modern', 'flex', 'flex-col', 'gap-4')}
            >
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <HeartIcon className="h-6 w-6" />
              </div>
              <div>
                <p className={cn('text-xs', 'font-black', 'text-gray-400', 'uppercase', 'tracking-widest', 'mb-1')}>Completed Care</p>
                <p className={cn('text-3xl', 'font-black', 'text-emerald-600', 'tracking-tighter')}>{stats.completedRequests}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn('card-modern', 'flex', 'flex-col', 'gap-4')}
            >
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                <PhoneIcon className="h-6 w-6" />
              </div>
              <div>
                <p className={cn('text-xs', 'font-black', 'text-gray-400', 'uppercase', 'tracking-widest', 'mb-1')}>Active Requests</p>
                <p className={cn('text-3xl', 'font-black', 'text-gray-900', 'tracking-tighter')}>{stats.pendingRequests}</p>
              </div>
            </motion.div>
          </div>
        )}

        {/* Action Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="card-modern group">
               <div className="h-40 bg-gray-50 rounded-3xl mb-6 overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity" />
                  <DocumentTextIcon className="w-16 h-16 text-blue-200 group-hover:scale-110 transition-transform duration-500" />
               </div>
               <h3 className="text-2xl font-black text-gray-900 mb-2">Book Care</h3>
               <p className="text-gray-500 text-sm leading-relaxed mb-8">Professional doctor visits, nursing, and companionship services at your doorstep.</p>
               <Link href="/services">
                <button className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Browse Services <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                </button>
               </Link>
            </div>

            <div className="card-modern group">
               <div className="h-40 bg-gray-50 rounded-3xl mb-6 overflow-hidden flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-emerald-600 opacity-0 group-hover:opacity-5 transition-opacity" />
                  <HeartIcon className="w-16 h-16 text-emerald-200 group-hover:scale-110 transition-transform duration-500" />
               </div>
               <h3 className="text-2xl font-black text-gray-900 mb-2">Profile Shield</h3>
               <p className="text-gray-500 text-sm leading-relaxed mb-8">Update your medical records, emergency contacts, and personalized preferences.</p>
               <Link href="/dashboard/profile">
                <button className="flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
                  Edit Profile <ArrowLeftIcon className="w-4 h-4 rotate-180" />
                </button>
               </Link>
            </div>
          </motion.div>

          {/* Recent Activity Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-8"
          >
            <div className="card-modern flex-1">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-gray-900">Activity</h3>
                <Link href="/dashboard/history" className="text-[10px] font-black uppercase text-blue-600 hover:underline">View All</Link>
              </div>

              {stats?.recentRequests && stats.recentRequests.length > 0 ? (
                <div className="space-y-6">
                  {stats.recentRequests.map((request: any, index: number) => (
                    <div key={index} className="flex gap-4 group">
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2',
                        request.status === 'completed' ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 
                        'border-blue-100 bg-blue-50 text-blue-600'
                      )}>
                        <div className="w-2 h-2 rounded-full bg-current" />
                      </div>
                      <div className="flex-1 border-b border-gray-50 pb-4 group-last:border-0 grow">
                        <p className="font-bold text-gray-900 text-sm capitalize">{request.serviceType?.replace('_', ' ')}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(request.createdAt).toLocaleDateString()}</p>
                          <span className={cn(
                            'text-[10px] font-black uppercase px-2 py-0.5 rounded-md',
                            request.status === 'completed' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50'
                          )}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DocumentTextIcon className="w-8 h-8 text-gray-200" />
                  </div>
                  <p className="text-gray-400 font-bold text-sm">No recent activity</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
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
