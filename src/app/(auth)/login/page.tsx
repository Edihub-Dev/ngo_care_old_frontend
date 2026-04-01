'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, DevicePhoneMobileIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function Login() {
  const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!mobile.trim()) {
      nextErrors.mobile = 'Please enter your mobile number';
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      nextErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!password) {
      nextErrors.password = 'Please enter your password';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { AuthService } = await import('@/lib/api');
      const { AuthManager } = await import('@/lib/auth');
      const response = await AuthService.login({ mobile, password });
      if (response.success && response.data) {
        const { token, user } = response.data as { token: string; user: any };
        AuthManager.getInstance().setToken(token);
        AuthManager.getInstance().setUser(user);
        router.push('/dashboard');
      } else {
        setErrors({ general: response.error?.message || 'Incorrect mobile number or password. Please try again.' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Unable to connect. Please check your internet connection.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col lg:flex-row overflow-hidden">

      {/* Left: Brand Panel */}
      <div className="hidden lg:flex lg:w-[42%] bg-[#064E3B] p-12 xl:p-16 flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00b749]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#00b749]/30 rounded-full blur-[120px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-12">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 group-hover:bg-white/20 transition-all">
              <ArrowLeftIcon className="h-5 w-5 text-[#00b749]" />
            </div>
            <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">Back to Main Site</span>
          </Link>

          <p className="text-[#00b749] text-sm font-bold mb-3">Golden Years Care Foundation</p>
          <h2 className="text-5xl font-black leading-tight tracking-tight mb-5">
            Welcome <br />
            <span className="text-[#00b749]">Back. 💚</span>
          </h2>
          <p className="text-white/70 font-medium text-lg leading-relaxed max-w-sm">
            Sign in to continue your care journey. Empowering dignified lives through compassionate elder care.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-10 bg-[#00b749]" />
            <p className="text-sm font-bold text-white/60">Trusted by thousands of families</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-[#00b749]">5k+</p>
              <p className="text-sm font-semibold text-white/50 mt-1">Service Requests</p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-sm font-semibold text-white/50 mt-1">Verified Members</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-6 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[440px]"
        >
          {/* Mobile back link */}
          <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 lg:hidden font-semibold text-sm">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Main Site
          </Link>

          <div className="mb-8">
            <p className="text-[#00b749] text-sm font-bold mb-1">Golden Years Care Foundation</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h1>
            <p className="text-slate-500 font-medium text-base">Sign in to continue your care journey.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00b749] to-emerald-400" />

            {errors.general && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <div className="h-5 w-5 flex-shrink-0 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-black">!</span>
                </div>
                <p className="text-red-600 text-sm font-semibold">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Mobile Number */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Mobile Number</label>
                <div className="relative">
                  <DevicePhoneMobileIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={mobile}
                    onChange={(e) => {
                      setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                      if (errors.mobile) setErrors((p) => ({ ...p, mobile: '' }));
                    }}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 focus:border-[#00b749] focus:bg-white rounded-xl text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                </div>
                {errors.mobile && <p className="text-sm font-semibold text-red-500">{errors.mobile}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-bold text-slate-700">Password</label>
                  <Link href="/forgot-password" className="text-sm font-semibold text-[#00b749] hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors((p) => ({ ...p, password: '' }));
                    }}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border-2 border-slate-200 focus:border-[#00b749] focus:bg-white rounded-xl text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-all"
                  >
                    {showPassword ? <LockOpenIcon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-sm font-semibold text-red-500">{errors.password}</p>}
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} className="hidden" />
                <div className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${rememberMe ? 'bg-[#00b749] border-[#00b749]' : 'border-slate-300 group-hover:border-[#00b749]'}`}>
                  {rememberMe && <div className="h-2.5 w-2.5 bg-white rounded-sm" />}
                </div>
                <span className="text-sm font-semibold text-slate-600">Keep me signed in</span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#00b749] hover:bg-[#00a040] disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 text-base active:scale-[0.99]"
              >
                {loading ? (
                  <><div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing In...</>
                ) : (
                  'Sign In →'
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-sm font-medium text-slate-500">
                  New to our platform?{' '}
                  <Link href="/register" className="text-[#00b749] font-bold hover:underline">Create an Account</Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
