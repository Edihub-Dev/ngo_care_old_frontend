'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  UserIcon, 
  DocumentTextIcon, 
  PhoneIcon,
  HeartIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchUserStats();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      window.location.href = '/login';
      return;
    }
    
    setUser(JSON.parse(userData));
    setLoading(false);
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/users/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const triggerSOS = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/emergency/sos', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: { lat: 28.6139, lng: 77.2090 }, // Default Delhi location
          description: 'Emergency SOS triggered from dashboard'
        })
      });
      
      if (response.ok) {
        alert('Emergency alert sent successfully! Help is on the way.');
      } else {
        alert('Failed to send emergency alert. Please call emergency services.');
      }
    } catch (error) {
      console.error('SOS Error:', error);
      alert('Error sending emergency alert. Please call emergency services immediately.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <Button onClick={handleLogout} variant="outline" size="sm">Logout</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Emergency SOS Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-red-900 mb-2 text-large">Emergency SOS</h2>
            <p className="text-red-700 mb-4 text-large">Press for immediate assistance</p>
            <button
              onClick={triggerSOS}
              className="sos-button mx-auto"
            >
              SOS
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card-soft p-6"
            >
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRequests}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card-soft p-6"
            >
              <div className="flex items-center">
                <HeartIcon className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedRequests}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card-soft p-6"
            >
              <div className="flex items-center">
                <PhoneIcon className="h-8 w-8 text-yellow-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="card-soft p-6"
            >
              <div className="flex items-center">
                <UserIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Subscription</p>
                  <p className="text-lg font-bold text-gray-900 capitalize">{stats.currentPlan}</p>
                  <p className="text-sm text-gray-500">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div className="card-soft p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-large">Request Service</h3>
            <p className="text-gray-600 mb-4 text-large">Book doctor visits, nurse care, and more</p>
            <Link href="/services">
              <Button className="w-full btn-large">Browse Services</Button>
            </Link>
          </div>

          <div className="card-soft p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-large">My Requests</h3>
            <p className="text-gray-600 mb-4 text-large">View and track your service requests</p>
            <Button variant="outline" className="w-full btn-large">View History</Button>
          </div>

          <div className="card-soft p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-large">Profile Settings</h3>
            <p className="text-gray-600 mb-4 text-large">Update your information and preferences</p>
            <Button variant="outline" className="w-full btn-large">Edit Profile</Button>
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
            <div className="card-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-large">Recent Activity</h3>
              <div className="space-y-3">
                {stats.recentRequests.map((request: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900 text-large">{request.serviceType?.replace('_', ' ') || 'Service'}</p>
                      <p className="text-sm text-gray-500">{new Date(request.createdAt).toLocaleDateString()}</p>
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
