'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon, HeartIcon, ShieldCheckIcon, UsersIcon, CalendarIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services/types');
      const data = await response.json();
      if (data.success) {
        setServices(data.serviceTypes);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
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
      <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <Link href="/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4 text-xxlarge">Our Services</h1>
            <p className="text-xl text-gray-600 mb-8 text-xlarge max-w-3xl mx-auto">
              Comprehensive care services designed to support the health and well-being of our senior citizens
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = getServiceIcon(service.id);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="card-soft p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 text-large">{service.name}</h3>
                      <p className="text-gray-500">Starting from ₹{service.basePrice}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 text-large">{service.description}</p>
                  <Link href="/login">
                    <Button className="w-full btn-large">Request Service</Button>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-xxlarge">How It Works</h2>
            <p className="text-lg text-gray-600 text-xlarge">Simple steps to get the care you need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Login with OTP', description: 'Use your mobile number to securely login' },
              { step: '2', title: 'Complete Profile', description: 'Tell us about your needs and preferences' },
              { step: '3', title: 'Request Service', description: 'Choose the service and schedule your appointment' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 text-large">{item.title}</h3>
                <p className="text-gray-600 text-large">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-xxlarge">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8 text-xlarge">
              Join thousands of families who trust us with their loved ones' care
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="btn-large">Register Now</Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="btn-large">Login</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
