'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { authApi } from '@/lib/api';
import { Validator, validationRules } from '@/lib/validation';

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '';
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!mobile) {
      router.push('/forgot-password');
      return;
    }
  }, [mobile, router]);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpError = Validator.validateField(otp, validationRules.otp, 'OTP');
    if (otpError) {
      setErrors({ otp: otpError });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await authApi.forgotPasswordVerifyOTP(mobile, otp);

      if (response.success) {
        router.push(`/reset-password?mobile=${encodeURIComponent(mobile)}&otp=${encodeURIComponent(otp)}`);
      } else {
        throw new Error(response.error?.message || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to verify OTP. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setLoading(true);
    setErrors({});

    try {
      const response = await authApi.forgotPasswordSendOTP(mobile);

      if (response.success) {
        setCountdown(60);
        setCanResend(false);
      } else {
        throw new Error(response.error?.message || 'Failed to resend OTP. Please try again.');
      }
    } catch (error) {
      console.error('Resend OTP error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to resend OTP. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    const newOtp = otp.split('');
    newOtp[index] = value;
    const updatedOtp = newOtp.join('').slice(0, 6);
    setOtp(updatedOtp);
    
    if (errors.otp || errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.otp;
        delete newErrors.general;
        return newErrors;
      });
    }

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 relative">
      <Link href="/forgot-password" className="absolute top-4 left-4 inline-flex items-center text-green-700 hover:text-green-800 text-sm font-semibold">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify OTP</h2>
            <p className="text-gray-500">
              Enter the 6-digit OTP sent to <span className="font-semibold">{mobile}</span>
            </p>
          </div>

          <form onSubmit={handleVerifyOTP} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Enter OTP
              </label>
              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleOtpChange(e.target.value.replace(/\D/g, ''), index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center bg-gray-100 border-0 rounded-2xl text-gray-900 text-lg font-semibold focus:ring-2 focus:ring-green-600 focus:bg-white transition-all"
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="mt-1.5 text-sm text-red-600 text-center">{errors.otp}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-sm text-red-600 text-center">{errors.general}</p>
            )}

            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                >
                  Resend OTP
                </button>
              ) : (
                <p className="text-sm text-gray-500">
                  Resend OTP in <span className="font-semibold text-green-700">{countdown}s</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full h-9 px-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-3xl shadow-lg shadow-green-700/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? 'Verifying...' : (
                <>
                  Verify OTP
                  <ArrowRightIcon className="h-4 w-4" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-600">
              <Link href="/login" className="font-semibold text-green-700 hover:text-green-800 transition-colors">
                Back to Login
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-green-700 font-semibold">Loading...</div>
      </div>
    }>
      <VerifyOTPContent />
    </Suspense>
  );
}
