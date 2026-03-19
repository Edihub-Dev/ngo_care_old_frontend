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
    <div className={cn('min-h-screen', 'bg-linear-to-b', 'from-blue-50', 'to-white')}>
      {/* Header */}
      <header className={cn('bg-white', 'shadow-sm')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')}>
          <div className={cn('flex', 'justify-between', 'items-center', 'h-16')}>
            <div className={cn('flex', 'items-center', 'space-x-4')}>
              <Link href="/" className={cn('inline-flex', 'items-center', 'text-blue-600', 'hover:text-blue-700')}>
                <ArrowLeftIcon className={cn('h-4', 'w-4', 'mr-2')} />
                Back to Home
              </Link>
              <h1 className={cn('text-xl', 'font-semibold', 'text-gray-900')}>Dashboard</h1>
            </div>
            <div className={cn('flex', 'items-center', 'space-x-4')}>
              <span className="text-gray-700">Welcome, {authState.user?.name || 'User'}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-8')}>
        {/* Emergency SOS Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className={cn('bg-red-50', 'border', 'border-red-200', 'rounded-lg', 'p-6', 'text-center')}>
            <ExclamationTriangleIcon className={cn('h-8', 'w-8', 'text-red-600', 'mx-auto', 'mb-4')} />
            <h2 className={cn('text-lg', 'font-bold', 'text-red-900', 'mb-2', 'text-large')}>Emergency SOS</h2>
            <p className={cn('text-red-700', 'mb-4', 'text-large')}>Press for immediate assistance</p>
            <button
              onClick={triggerSOS}
              disabled={sosLoading}
              className={cn('sos-button', 'mx-auto', 'disabled:opacity-50', 'disabled:cursor-not-allowed')}
            >
              {sosLoading ? '...' : 'SOS'}
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-6', 'mb-8')}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn('card-soft', 'p-6')}
            >
              <div className={cn('flex', 'items-center')}>
                <DocumentTextIcon className={cn('h-8', 'w-8', 'text-blue-600', 'mr-3')} />
                <div>
                  <p className={cn('text-sm', 'font-medium', 'text-gray-600')}>Total Requests</p>
                  <p className={cn('text-2xl', 'font-bold', 'text-gray-900')}>{stats.totalRequests}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn('card-soft', 'p-6')}
            >
              <div className={cn('flex', 'items-center')}>
                <HeartIcon className={cn('h-8', 'w-8', 'text-green-600', 'mr-3')} />
                <div>
                  <p className={cn('text-sm', 'font-medium', 'text-gray-600')}>Completed</p>
                  <p className={cn('text-2xl', 'font-bold', 'text-gray-900')}>{stats.completedRequests}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={cn('card-soft', 'p-6')}
            >
              <div className={cn('flex', 'items-center')}>
                <PhoneIcon className={cn('h-8', 'w-8', 'text-yellow-600', 'mr-3')} />
                <div>
                  <p className={cn('text-sm', 'font-medium', 'text-gray-600')}>Pending</p>
                  <p className={cn('text-2xl', 'font-bold', 'text-gray-900')}>{stats.pendingRequests}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={cn('card-soft', 'p-6')}
            >
              <div className={cn('flex', 'items-center')}>
                <UserIcon className={cn('h-8', 'w-8', 'text-purple-600', 'mr-3')} />
                <div>
                  <p className={cn('text-sm', 'font-medium', 'text-gray-600')}>Subscription</p>
                  <p className={cn('text-lg', 'font-bold', 'text-gray-900', 'capitalize')}>{stats.currentPlan}</p>
                  <p className={cn('text-sm', 'text-gray-500')}>
                    {stats.subscriptionActive ? 'Active' : 'Inactive'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6')}
        >
          <div className={cn('card-soft', 'p-6')}>
            <h3 className={cn('text-lg', 'font-semibold', 'text-gray-900', 'mb-4', 'text-large')}>Request Service</h3>
            <p className={cn('text-gray-600', 'mb-4', 'text-large')}>Book doctor visits, nurse care, and more</p>
            <Link href="/services">
              <Button className={cn('w-full', 'btn-large')}>Browse Services</Button>
            </Link>
          </div>

          <div className={cn('card-soft', 'p-6')}>
            <h3 className={cn('text-lg', 'font-semibold', 'text-gray-900', 'mb-4', 'text-large')}>My Requests</h3>
            <p className={cn('text-gray-600', 'mb-4', 'text-large')}>View and track your service requests</p>
            <Button variant="outline" className={cn('w-full', 'btn-large')}>View History</Button>
          </div>

          <div className={cn('card-soft', 'p-6')}>
            <h3 className={cn('text-lg', 'font-semibold', 'text-gray-900', 'mb-4', 'text-large')}>Profile Settings</h3>
            <p className={cn('text-gray-600', 'mb-4', 'text-large')}>Update your information and preferences</p>
            <Button variant="outline" className={cn('w-full', 'btn-large')}>Edit Profile</Button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        {stats?.recentRequests && stats.recentRequests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-8"
          >
            <div className={cn('card-soft', 'p-6')}>
              <h3 className={cn('text-lg', 'font-semibold', 'text-gray-900', 'mb-4', 'text-large')}>Recent Activity</h3>
              <div className="space-y-3">
                {stats.recentRequests.map((request: any, index: number) => (
                  <div key={index} className={cn('flex', 'items-center', 'justify-between', 'py-3', 'border-b', 'border-gray-100', 'last:border-0')}>
                    <div>
                      <p className={cn('font-medium', 'text-gray-900', 'text-large')}>{request.serviceType?.replace('_', ' ') || 'Service'}</p>
                      <p className={cn('text-sm', 'text-gray-500')}>{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`status-badge status-${request.status}`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
