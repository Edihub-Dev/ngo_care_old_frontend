'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon, UserIcon, MapPinIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { cn } from "../../lib/utils";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    },
    emergencyContact: {
      name: '',
      mobile: '',
      relationship: ''
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already fully registered
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const userData = JSON.parse(user);
      if (userData.name) {
        // User is already registered, redirect to dashboard
        window.location.href = '/dashboard';
        return;
      }
    }
    
    // Allow access to register page if not logged in or not registered
  }, []);

  // Check if user is logged in
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  const isLoggedIn = !!(token && userData);

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      // If not logged in, redirect to login first
      if (!token || !userData) {
        alert('Please login first to complete registration');
        window.location.href = '/login';
        return;
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mobile: JSON.parse(userData).mobile,
          otp: 'verified', // This would be handled differently in production
          ...formData
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Registration successful! Redirecting to login...');
        window.location.href = '/login';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.age &&
      parseInt(formData.age) >= 50 &&
      formData.address.street &&
      formData.address.city &&
      formData.address.state &&
      formData.address.pincode.length === 6 &&
      formData.emergencyContact.name &&
      formData.emergencyContact.mobile.length === 10 &&
      formData.emergencyContact.relationship
    );
  };

  return (
    <div className={cn('min-h-screen', 'bg-linear-to-b', 'from-blue-50', 'to-white', 'py-12', 'px-4')}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={cn('max-w-2xl', 'mx-auto')}
      >
        {/* Header */}
        <div className={cn('text-center', 'mb-8')}>
          <Link href="/login" className={cn('inline-flex', 'items-center', 'text-blue-600', 'hover:text-blue-700', 'mb-6')}>
            <ArrowLeftIcon className={cn('h-4', 'w-4', 'mr-2')} />
            Back to Login
          </Link>
          
          <div className={cn('bg-blue-100', 'w-16', 'h-16', 'rounded-full', 'flex', 'items-center', 'justify-center', 'mx-auto', 'mb-4')}>
            <UserIcon className={cn('h-8', 'w-8', 'text-blue-600')} />
          </div>
          
          <h1 className={cn('text-3xl', 'font-bold', 'text-gray-900', 'mb-2', 'text-xxlarge')}>
            Complete Your Profile
          </h1>
          <p className={cn('text-gray-600', 'text-xlarge')}>
            Help us provide better care by sharing your details
          </p>
          
          {!isLoggedIn && (
            <div className={cn('mt-4', 'p-4', 'bg-yellow-50', 'border', 'border-yellow-200', 'rounded-lg')}>
              <p className={cn('text-yellow-800', 'text-large')}>
                Please <Link href="/login" className={cn('text-blue-600', 'hover:text-blue-700', 'font-medium')}>login first</Link> to complete your registration
              </p>
            </div>
          )}
        </div>

        {/* Form */}
        <div className={cn('card-soft', 'p-8')}>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className={cn('text-xl', 'font-semibold', 'text-gray-900', 'mb-4', 'text-large', 'flex', 'items-center')}>
                <UserIcon className={cn('h-5', 'w-5', 'mr-2')} />
                Personal Information
              </h2>
              <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'gap-6')}>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                  className={cn('input-large', 'text-large')}
                />
                <Input
                  label="Age"
                  type="number"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  min="50"
                  max="120"
                  required
                  className={cn('input-large', 'text-large')}
                />
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className={cn('text-xl', 'font-semibold', 'text-gray-900', 'mb-4', 'text-large', 'flex', 'items-center')}>
                <MapPinIcon className={cn('h-5', 'w-5', 'mr-2')} />
                Address Information
              </h2>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  type="text"
                  placeholder="Enter your street address"
                  value={formData.address.street}
                  onChange={(e) => handleInputChange('address.street', e.target.value)}
                  required
                  className={cn('input-large', 'text-large')}
                />
                <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4')}>
                  <Input
                    label="City"
                    type="text"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) => handleInputChange('address.city', e.target.value)}
                    required
                    className={cn('input-large', 'text-large')}
                  />
                  <Input
                    label="State"
                    type="text"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={(e) => handleInputChange('address.state', e.target.value)}
                    required
                    className={cn('input-large', 'text-large')}
                  />
                  <Input
                    label="Pincode"
                    type="text"
                    placeholder="6-digit pincode"
                    value={formData.address.pincode}
                    onChange={(e) => handleInputChange('address.pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    required
                    className={cn('input-large', 'text-large')}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div>
              <h2 className={cn('text-xl', 'font-semibold', 'text-gray-900', 'mb-4', 'text-large', 'flex', 'items-center')}>
                <PhoneIcon className={cn('h-5', 'w-5', 'mr-2')} />
                Emergency Contact
              </h2>
              <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-4')}>
                <Input
                  label="Contact Name"
                  type="text"
                  placeholder="Emergency contact name"
                  value={formData.emergencyContact.name}
                  onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                  required
                  className={cn('input-large', 'text-large')}
                />
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={formData.emergencyContact.mobile}
                  onChange={(e) => handleInputChange('emergencyContact.mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                  className={cn('input-large', 'text-large')}
                />
                <Input
                  label="Relationship"
                  type="text"
                  placeholder="e.g., Son, Daughter, Spouse"
                  value={formData.emergencyContact.relationship}
                  onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                  required
                  className={cn('input-large', 'text-large')}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                size="lg"
                className={cn('w-full', 'btn-large')}
                disabled={loading || !isFormValid()}
              >
                {loading ? 'Registering...' : 'Complete Registration'}
              </Button>
            </div>
          </form>

          {/* Important Note */}
          <div className={cn('mt-8', 'p-4', 'bg-blue-50', 'rounded-lg')}>
            <h3 className={cn('text-sm', 'font-semibold', 'text-blue-900', 'mb-2')}>Important Note:</h3>
            <ul className={cn('text-sm', 'text-blue-800', 'space-y-1')}>
              <li>• Your information helps us provide personalized care</li>
              <li>• Emergency contact will be notified in urgent situations</li>
              <li>• All your data is secure and confidential</li>
              <li>• You can update this information anytime</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
