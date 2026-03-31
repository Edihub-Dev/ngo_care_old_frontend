'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  ShieldCheckIcon, 
  UsersIcon, 
  CalendarIcon, 
  MapPinIcon, 
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
  ChevronDownIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import { apiClient } from '@/lib/api';
import { cn } from "../../lib/utils";

interface Staff {
  _id: string;
  name: string;
  role: string;
  specialization?: string;
  experience: number;
  rating: { average: number; count: number };
}

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [serviceStaff, setServiceStaff] = useState<Record<string, Staff[]>>({});
  const [loadingStaff, setLoadingStaff] = useState<string | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await apiClient.get<any>('/api/services/types');
      if (response.success && response.data?.serviceTypes) {
        setServices(response.data.serviceTypes);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaffForService = async (serviceId: string) => {
    if (serviceStaff[serviceId]) return;
    
    try {
      setLoadingStaff(serviceId);
      const response = await apiClient.get<any>(`/api/services/staff/${serviceId}`);
      if (response.success && response.data?.staff) {
        setServiceStaff(prev => ({ ...prev, [serviceId]: response.data.staff }));
      }
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    } finally {
      setLoadingStaff(null);
    }
  };

  const toggleService = (id: string) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
      fetchStaffForService(id);
    }
  };

  const handleMessageRequest = async (role: string, staffName?: string) => {
    const isAuth = !!localStorage.getItem('token');
    if (!isAuth) {
      window.location.href = '/login';
      return;
    }

    const confirmed = confirm(`Request a callback/message from ${staffName || `a ${role}`}?`);
    if (confirmed) {
      try {
        const response = await apiClient.post('/api/services/request', {
          serviceType: 'custom',
          customServiceName: `Inquiry: ${role}`,
          description: `User requested a callback/message regarding ${role} services. ${staffName ? `Specific interest in ${staffName}.` : ''}`,
          urgency: 'medium',
          requestedDate: new Date().toISOString()
        });
        
        if (response.success) {
          alert('Request sent! Our team will contact you shortly.');
        }
      } catch (err) {
        alert('Failed to send request. Please try again later.');
      }
    }
  };

  const getServiceIcon = (serviceId: string) => {
    const icons: { [key: string]: any } = {
      'doctor_visit': HeartIcon,
      'nurse_care': ShieldCheckIcon,
      'physiotherapy': UsersIcon,
      'old_age_home': CalendarIcon,
      'emergency_help': PhoneIcon,
      'custom': MapPinIcon
    };
    return icons[serviceId] || HeartIcon;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="inline-flex items-center text-blue-600 font-medium">
              <ArrowLeftIcon className="h-5 w-5 mr-1" />
              Home
            </Link>
            <h1 className="text-xl font-bold">Browse Services</h1>
            <Link href="/dashboard">
              <Button size="sm" variant="outline" className="rounded-full">My Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">How can we help you today?</h2>
          <p className="text-lg text-gray-600">Select a service to see available experts and details</p>
        </div>

        <div className="space-y-6">
          {services.map((service) => {
            const Icon = getServiceIcon(service.id);
            const isExpanded = expandedService === service.id;
            
            return (
              <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
                <div 
                  className={cn(
                    "p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors",
                    isExpanded && "bg-blue-50/50"
                  )}
                  onClick={() => toggleService(service.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 p-3 rounded-xl">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                      <p className="text-gray-500 text-sm">Starts from ₹{service.basePrice}</p>
                    </div>
                  </div>
                  <ChevronDownIcon className={cn("h-6 w-6 text-gray-400 transition-transform", isExpanded && "rotate-180")} />
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100"
                    >
                      <div className="p-6">
                        <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                        
                        <div className="mb-6 flex items-center justify-between">
                          <h4 className="font-bold text-gray-900 flex items-center">
                            <InformationCircleIcon className="h-5 w-5 mr-2 text-blue-500" />
                            Available {service.name} Professionals
                          </h4>
                        </div>

                        {loadingStaff === service.id ? (
                          <div className="flex justify-center py-8">
                            <div className="animate-spin h-6 w-6 border-b-2 border-blue-600 rounded-full"></div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(serviceStaff[service.id] || []).length > 0 ? (
                              serviceStaff[service.id].map(staff => (
                                <div key={staff._id} className="border rounded-xl p-4 flex items-center justify-between hover:border-blue-300 transition-colors">
                                  <div className="flex items-center space-x-3">
                                    <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center border text-blue-600 font-bold">
                                      {staff.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="font-bold text-gray-900">{staff.name}</p>
                                      <p className="text-xs text-gray-500 capitalize">{staff.specialization || staff.role} • {staff.experience} yrs exp</p>
                                      <div className="flex items-center mt-1">
                                        <StarIcon className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs ml-1 font-medium">{staff.rating.average.toFixed(1)} ({staff.rating.count})</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex space-x-2">
                                    <button 
                                      onClick={() => handleMessageRequest(staff.role, staff.name)}
                                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
                                      title="Send Message"
                                    >
                                      <ChatBubbleLeftRightIcon className="h-5 w-5" />
                                    </button>
                                    <button 
                                      onClick={() => handleMessageRequest(staff.role, staff.name)}
                                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-green-100"
                                      title="Call"
                                    >
                                      <PhoneIcon className="h-5 w-5" />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="md:col-span-2 text-center py-4 bg-gray-50 rounded-xl text-sm text-gray-500 italic">
                                No specific profiles found. You can still message our team to assign the best available expert.
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4">
                          <Link href="/services" className="flex-1">
                            <Button className="w-full rounded-xl py-3" onClick={() => handleMessageRequest(service.id)}>
                              Book Official {service.name}
                            </Button>
                          </Link>
                          <Button variant="outline" className="flex-1 rounded-xl" onClick={() => handleMessageRequest(service.id)}>
                             I have a question
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
