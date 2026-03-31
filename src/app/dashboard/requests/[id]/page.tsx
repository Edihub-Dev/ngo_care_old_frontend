'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserIcon,
  CalendarIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { AuthManager } from '@/lib/auth';
import { apiClient } from '@/lib/api';
import { cn } from "../../../../lib/utils";

interface ServiceRequest {
  _id: string;
  serviceType: string;
  customServiceName?: string;
  description: string;
  status: string;
  urgency: string;
  createdAt: string;
  requestedDate: string;
  preferredTime: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
    coordinates?: { lat: number; lng: number }
  };
  assignedStaff?: Array<{
    staff: { name: string; mobile: string; role: string };
    status: string;
  }>;
  timeline: Array<{
    action: string;
    description: string;
    timestamp: string;
  }>;
  payment: { amount: number; status: string };
}

export default function RequestDetails() {
  const { id } = useParams();
  const router = useRouter();
  const authManager = AuthManager.getInstance();
  
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    authManager.setRouter(router);
    const authState = authManager.requireAuth();
    if (authState.isAuthenticated) {
      fetchRequestDetails();
    }
  }, [router, id]);

  const fetchRequestDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<any>(`/api/services/request/${id}`);
      if (response.success && response.data?.serviceRequest) {
        setRequest(response.data.serviceRequest);
      } else {
        throw new Error(response.error?.message || 'Failed to load request details');
      }
    } catch (err) {
      console.error('Request Detail Fetch Error:', err);
      setError('Service request not found or not authorized to view.');
    } finally {
      setLoading(false);
    }
  };

  const statusConfig: Record<string, { color: string; bg: string; icon: any }> = {
    'completed': { color: 'text-emerald-700', bg: 'bg-emerald-50', icon: CheckCircleIcon },
    'cancelled': { color: 'text-red-700', bg: 'bg-red-50', icon: XCircleIcon },
    'pending': { color: 'text-amber-700', bg: 'bg-amber-50', icon: ClockIcon },
    'assigned': { color: 'text-blue-700', bg: 'bg-blue-50', icon: UserIcon },
    'in_progress': { color: 'text-purple-700', bg: 'bg-purple-50', icon: ClockIcon },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <XCircleIcon className="h-16 w-16 text-red-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Request Not Found</h2>
        <p className="text-gray-500 mb-6 text-center">{error}</p>
        <button onClick={() => router.push('/dashboard/history')} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
          Back to History
        </button>
      </div>
    );
  }

  const currentStatus = statusConfig[request.status] || { color: 'text-gray-700', bg: 'bg-gray-50', icon: DocumentTextIcon };
  const StatusIcon = currentStatus.icon;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => router.push('/dashboard/history')} className="text-gray-600 hover:text-blue-600 flex items-center">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            History
          </button>
          <h1 className="text-lg font-bold text-gray-900">Request Details</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Summary Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className={cn("px-6 py-4 flex justify-between items-center", currentStatus.bg)}>
              <div className="flex items-center space-x-2">
                <StatusIcon className={cn("h-6 w-6", currentStatus.color)} />
                <span className={cn("font-bold capitalize", currentStatus.color)}>
                  {request.status.replace('_', ' ')}
                </span>
              </div>
              <span className="text-xs font-mono text-gray-400 uppercase tracking-tighter">
                ID: {request._id}
              </span>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-black text-gray-900 mb-2 capitalize">
                {request.serviceType === 'custom' ? request.customServiceName : request.serviceType?.replace('_', ' ')}
              </h2>
              <p className="text-gray-600 mb-6 text-lg">{request.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Scheduled For</p>
                    <p className="text-sm font-bold text-gray-700">
                      {new Date(request.requestedDate).toLocaleDateString()} at {request.preferredTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400 font-medium">Location</p>
                    <p className="text-sm font-bold text-gray-700">
                      {typeof request.address === 'string' ? request.address : `${request.address?.street}, ${request.address?.city}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assigned Staff */}
          {request.assignedStaff && request.assignedStaff.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-blue-600" />
                Assigned Expert
              </h3>
              {request.assignedStaff.map((assignment, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {assignment.staff.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{assignment.staff.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{assignment.staff.role}</p>
                    </div>
                  </div>
                  <a href={`tel:${assignment.staff.mobile}`}>
                    <button className="px-4 py-2 bg-white border border-blue-100 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-50">
                      Contact
                    </button>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Service Timeline</h3>
            <div className="space-y-6 relative">
              <div className="absolute left-4 top-1 bottom-1 w-0.5 bg-gray-100" />
              {request.timeline.map((entry, idx) => (
                <div key={idx} className="relative pl-10">
                  <div className="absolute left-2.5 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-50" />
                  <p className="text-sm font-bold text-gray-900">{entry.description}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          {request.status === 'pending' && (
            <div className="flex space-x-4">
              <button 
                onClick={() => {
                  if(confirm('Are you sure you want to cancel this request?')) {
                     apiClient.put(`/api/services/request/${request._id}/cancel`, { reason: 'User cancelled' }).then(() => fetchRequestDetails());
                  }
                }}
                className="flex-1 py-4 bg-red-50 text-red-700 font-bold rounded-2xl border border-red-100 hover:bg-red-100 transition-colors"
              >
                Cancel Request
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
