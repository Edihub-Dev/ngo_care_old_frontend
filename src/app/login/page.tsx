'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { AuthManager } from '@/lib/auth';
import { authApi } from '@/lib/api';
import { Validator, validationRules } from '@/lib/validation';

export default function Login() {
  const router = useRouter();
  const authManager = AuthManager.getInstance();
  
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    authManager.setRouter(router);
    
    // Check if user is already logged in
    const authState = authManager.getAuthState();
    
    if (authState.isAuthenticated) {
      if (authManager.isUserRegistered()) {
        // User is already registered, redirect to dashboard
        router.push('/dashboard');
      } else {
        // User needs to complete registration
        router.push('/register');
      }
    }
  }, [router, authManager]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate mobile number
    const mobileError = Validator.validateField(mobile, validationRules.mobile, 'Mobile Number');
    if (mobileError) {
      setErrors({ mobile: mobileError });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await authApi.sendOTP(mobile);

      if (response.success) {
        setShowOtp(true);
        setIsNewUser(response.data && typeof response.data === 'object' && 'isNewUser' in response.data ? Boolean((response.data as any).isNewUser) : false);
        
        // For development, show OTP
        if (process.env.NODE_ENV === 'development' && response.data && typeof response.data === 'object' && 'devOTP' in response.data) {
          alert(`Development OTP: ${(response.data as any).devOTP}`);
        }
      } else {
        throw new Error(response.error?.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      setErrors({ mobile: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate OTP
    const otpError = Validator.validateField(otp, validationRules.otp, 'OTP');
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await authApi.verifyOTP(mobile, otp);

      if (response.success) {
        // Store token and user data securely
        if (response.data && typeof response.data === 'object' && response.data !== null && 'token' in response.data) {
          authManager.setToken((response.data as any).token);
        }
        
        if (response.data && typeof response.data === 'object' && response.data !== null && 'user' in response.data) {
          authManager.setUser((response.data as any).user);
        }
        
        // Check if user is already registered (has name)
        if (response.data && typeof response.data === 'object' && response.data !== null && 'user' in response.data && (response.data as any).user?.name) {
          // User is already registered, go to dashboard
          router.push('/dashboard');
        } else {
          // New user needs to complete registration
          router.push('/register');
        }
      } else {
        throw new Error(response.error?.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify OTP. Please try again.';
      setErrors({ otp: errorMessage });
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
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                    // Clear error when user starts typing
                    if (errors.mobile) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.mobile;
                        return newErrors;
                      });
                    }
                  }}
                  maxLength={10}
                  required
                  error={errors.mobile}
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
                disabled={loading || mobile.length !== 10 || !!errors.mobile}
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
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    // Clear error when user starts typing
                    if (errors.otp) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.otp;
                        return newErrors;
                      });
                    }
                  }}
                  maxLength={6}
                  required
                  error={errors.otp}
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
                disabled={loading || otp.length !== 6 || !!errors.otp}
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
