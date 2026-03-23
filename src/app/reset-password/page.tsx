'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LockClosedIcon, LockOpenIcon, ArrowRightIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { authApi } from '@/lib/api';

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobile = searchParams.get('mobile') || '';
  const otp = searchParams.get('otp') || '';
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!mobile || !otp) {
      router.push('/forgot-password');
      return;
    }
  }, [mobile, otp, router]);

  const validatePassword = (value: string): string | null => {
    if (!value || value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (value.length > 50) {
      return 'Password must not exceed 50 characters';
    }
    return null;
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const passwordError = validatePassword(password);
    if (passwordError) {
      setErrors({ password: passwordError });
      return;
    }
    
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await authApi.resetPassword(mobile, otp, password);

      if (response.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        throw new Error(response.error?.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset password. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-10 text-center">
            <div className="mb-6">
              <CheckCircleIcon className="h-16 w-16 text-green-600 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Changed!</h2>
            <p className="text-gray-500 mb-6">
              Your password has been successfully reset. Redirecting to login...
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-3xl transition-all"
            >
              Go to Login
              <ArrowRightIcon className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 relative">
      <Link href="/verify-otp" className="absolute top-4 left-4 inline-flex items-center text-green-700 hover:text-green-800 text-sm font-semibold">
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
            <p className="text-gray-500">Create a new password for your account.</p>
          </div>

          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password || errors.general) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.password;
                        delete newErrors.general;
                        return newErrors;
                      });
                    }
                  }}
                  className="w-full px-4 py-1 bg-gray-100 border-0 rounded-3xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:bg-white transition-all pr-12 h-9 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <LockOpenIcon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword || errors.general) {
                      setErrors(prev => {
                        const newErrors = { ...prev };
                        delete newErrors.confirmPassword;
                        delete newErrors.general;
                        return newErrors;
                      });
                    }
                  }}
                  className="w-full px-4 py-1 bg-gray-100 border-0 rounded-3xl text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-green-600 focus:bg-white transition-all pr-12 h-9 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <LockOpenIcon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            {errors.general && (
              <p className="text-sm text-red-600 text-center">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password || !confirmPassword}
              className="w-full h-9 px-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-3xl shadow-lg shadow-green-700/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? 'Changing Password...' : (
                <>
                  Change Password
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

export default function ResetPassword() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-green-700 font-semibold">Loading...</div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
