'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      const userData = JSON.parse(user);
      if (userData.name) {
        // User is already registered, redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        // User needs to complete registration
        window.location.href = '/register';
      }
    }
  }, []);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (data.success) {
        setShowOtp(true);
        setIsNewUser(data.isNewUser);
        
        // For development, show OTP
        if (process.env.NODE_ENV === 'development' && data.devOTP) {
          alert(`Development OTP: ${data.devOTP}`);
        }
      } else {
        alert(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      alert('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json();

      if (data.success) {
        // Store token and redirect
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Check if user is already registered (has name)
        if (data.user.name) {
          // User is already registered, go to dashboard
          window.location.href = '/dashboard';
        } else {
          // New user needs to complete registration
          window.location.href = '/register';
        }
      } else {
        alert(data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      alert('Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-xxlarge">
            {isNewUser ? 'Complete Registration' : 'Welcome Back'}
          </h1>
          <p className="text-gray-600 text-xlarge">
            {isNewUser 
              ? 'Verify your mobile number to continue' 
              : 'Sign in with your mobile number'
            }
          </p>
        </div>

        {/* Form */}
        <div className="card-soft p-8">
          {!showOtp ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <Input
                  label="Mobile Number"
                  type="tel"
                  placeholder="Enter your 10-digit mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength={10}
                  required
                  className="input-large text-large"
                />
                <p className="text-sm text-gray-500 mt-2">
                  We'll send a 6-digit verification code
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full btn-large"
                disabled={loading || mobile.length !== 10}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <Input
                  label="Verification Code"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  required
                  className="input-large text-large text-center"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Enter the code sent to +91 {mobile}
                </p>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full btn-large"
                disabled={loading || otp.length !== 6}
              >
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </Button>

              <button
                type="button"
                onClick={() => setShowOtp(false)}
                className="w-full text-center text-blue-600 hover:text-blue-700 text-large"
              >
                Change mobile number
              </button>
            </form>
          )}

          {/* Help Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 text-large">Need Help?</h3>
              <div className="space-y-2">
                <p className="text-gray-600 text-large">
                  <strong>Support:</strong> 1800-123-4567
                </p>
                <p className="text-gray-600 text-large">
                  <strong>Emergency:</strong> 108
                </p>
                <p className="text-gray-600 text-large">
                  <strong>Email:</strong> support@eldercare.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
              Privacy Policy
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
