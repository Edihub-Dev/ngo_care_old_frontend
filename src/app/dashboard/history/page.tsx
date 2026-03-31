'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  DocumentTextIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AuthManager } from '@/lib/auth';
import { apiClient } from '@/lib/api';
import { cn } from "../../../lib/utils";

interface ServiceRequest {
  _id: string;
  serviceType: string;
  description: string;
  status: string;
  urgency: string;
  createdAt: string;
  requestedDate: string;
}

export default function RequestHistory() {
  const router = useRouter();
  const authManager = AuthManager.getInstance();
  
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authManager.setRouter(router);
    const authState = authManager.requireAuth();
    if (authState.isAuthenticated) {
      fetchHistory();
    }
  }, [router]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<any>('/api/services/my-requests');
      if (response.success && response.data?.serviceRequests) {
        setRequests(response.data.serviceRequests);
      } else {
        throw new Error(response.error?.message || 'Failed to load history');
      }
    } catch (err) {
      console.error('History Fetch Error:', err);
      setError('Could not load request history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="h-5 w-5 text-emerald-600" />;
      case 'cancelled': return <XCircleIcon className="h-5 w-5 text-red-600" />;
      case 'pending': return <ClockIcon className="h-5 w-5 text-amber-600" />;
      case 'in_progress': return <ExclamationCircleIcon className="h-5 w-5 text-blue-600" />;
      default: return <DocumentTextIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-blue-600 flex items-center">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Dashboard
          </button>
          <h1 className="text-xl font-bold text-gray-900">Request History</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {requests.length === 0 && !error && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center border-2 border-dashed border-gray-200">
              <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">No service requests found.</p>
              <Link href="/services">
                <button className="mt-4 text-blue-600 hover:underline">Request your first service</button>
              </Link>
            </div>
          )}

          {requests.map((request) => (
            <div 
              key={request._id} 
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-blue-200 transition-all cursor-pointer group"
              onClick={() => router.push(`/dashboard/requests/${request._id}`)}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <DocumentTextIcon className="h-6 w-6 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 capitalize text-lg">
                      {request.serviceType?.replace('_', ' ')}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">{request.description}</p>
                    <div className="flex items-center space-x-4 text-xs font-medium uppercase tracking-wider">
                      <span className="text-gray-400">Created: {new Date(request.createdAt).toLocaleDateString()}</span>
                      <span className={cn(
                        'px-2 py-0.5 rounded-full',
                        request.urgency === 'high' || request.urgency === 'critical' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                      )}>
                        {request.urgency}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={cn(
                  'flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border text-sm font-semibold capitalize',
                  request.status === 'completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                  request.status === 'cancelled' ? 'bg-red-50 text-red-700 border-red-100' :
                  'bg-blue-50 text-blue-700 border-blue-100'
                )}>
                  {getStatusIcon(request.status)}
                  <span>{request.status.replace('_', ' ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
