'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PhoneIcon, LockClosedIcon, LockOpenIcon, ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { AuthManager } from '@/lib/auth';
import { authApi } from '@/lib/api';
import { Validator, validationRules } from '@/lib/validation';

interface LoginResponseData {
  token: string;
  user: {
    _id: string;
    mobile: string;
    name?: string;
    email?: string;
    role?: string;
  };
}

export default function Login() {
  const router = useRouter();
  const authManager = AuthManager.getInstance();
  
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    authManager.setRouter(router);
    
    const authState = authManager.getAuthState();
    
    if (authState.isAuthenticated) {
      if (authManager.isUserRegistered()) {
        router.push('/dashboard');
      } else {
        router.push('/register');
      }
    }
  }, [router, authManager]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const mobileError = Validator.validateField(mobile, validationRules.mobile, 'Mobile Number');
    if (mobileError) {
      setErrors({ mobile: mobileError });
      return;
    }
    
    if (!password || password.length < 6) {
      setErrors({ password: 'Password must be at least 6 characters' });
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await authApi.login(mobile, password);

      if (response.success) {
        const data = response.data as LoginResponseData;
        if (data && 'token' in data) {
          authManager.setToken(data.token);
        }
        
        if (data && 'user' in data) {
          authManager.setUser(data.user);
        }
        
        router.push('/dashboard');
      } else {
        throw new Error(response.error?.message || 'Invalid mobile or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to login. Please try again.';
      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 relative">
      {/* Back Button - Outside box, top left */}
      <Link href="/" className="absolute top-4 left-4 inline-flex items-center text-green-700 hover:text-green-800 text-sm font-semibold">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-700 tracking-tight">Careon</h1>
          </div>

          {/* Welcome Text */}
          <div className="text-center mb-8 mt-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-500">Sign in to continue your care journey.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Mobile Field */}
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-semibold text-green-700 hover:text-green-800 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
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

            {/* General Error */}
            {errors.general && (
              <p className="text-sm text-red-600 text-center">{errors.general}</p>
            )}

            {/* Remember Me Toggle */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setRememberMe(!rememberMe)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  rememberMe ? 'bg-green-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    rememberMe ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className="ml-3 text-sm text-gray-600">Remember me for 30 days</span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || !mobile || !password}
              className="w-full h-9 px-6 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-3xl shadow-lg shadow-green-700/20 transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? 'Signing in...' : (
                <>
                  Login
                  <ArrowRightIcon className="h-4 w-4" />
                </>
              )}
            </button>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-green-700 hover:text-green-800 transition-colors">
                Register
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
