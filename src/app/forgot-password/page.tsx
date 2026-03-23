'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PhoneIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { authApi } from '@/lib/api';
import { Validator, validationRules } from '@/lib/validation';

export default function ForgotPassword() {
  const router = useRouter();
  
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mobileError = Validator.validateField(mobile, validationRules.mobile, 'Mobile Number');
    if (mobileError) {
      setErrors({ mobile: mobileError });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await authApi.forgotPasswordSendOTP(mobile);

      if (response.success) {
        router.push(`/verify-otp?mobile=${encodeURIComponent(mobile)}`);
      } else {
        throw new Error(response.error?.message || 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 relative">
      <Link href="/login" className="absolute top-4 left-4 inline-flex items-center text-green-700 hover:text-green-800 text-sm font-semibold">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Login
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 tracking-tight">Careon</h1>
          </div>

          <div className="text-center mb-8 mt-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
            <p className="text-gray-500">Enter your mobile number to reset your password.</p>
          </div>

          <form onSubmit={handleSendOTP} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 0000000000"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                    if (errors.mobile || errors.general) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.mobile;
                        delete newErrors.general;
                        return newErrors;
                      });
                    }
                  }}
                  className="w-full px-4 py-1 bg-gray-100 border-0 rounded-3xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:bg-white transition-all pr-12 h-9 text-sm"
                />
                <PhoneIcon className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              {errors.mobile && (
                <p className="mt-1.5 text-sm text-red-600">{errors.mobile}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-sm text-red-600 text-center">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={loading || !mobile || mobile.length < 10}
              className="w-full h-9 px-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-3xl shadow-lg shadow-green-700/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? 'Sending OTP...' : (
                <>
                  Reset Password
                  <ArrowRightIcon className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              Remember your password?{' '}
              <Link href="/login" className="font-semibold text-green-700 hover:text-green-800 transition-colors">
                Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
