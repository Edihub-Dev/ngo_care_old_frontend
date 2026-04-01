'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function Register() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const nextErrors: Record<string, string> = {};
    if (!fullName.trim()) nextErrors.fullName = 'Please enter your full name';
    if (phone.trim().length !== 10) nextErrors.phone = 'Please enter a valid 10-digit mobile number';
    if (!address.trim()) nextErrors.address = 'Please enter your address';
    if (!password) nextErrors.password = 'Please enter a password';
    if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { AuthService } = await import('@/lib/api');
      const response = await AuthService.register({ name: fullName, mobile: phone, password, address });
      if (response.success) {
        alert('Registration successful! You can now sign in.');
        router.push('/login');
      } else {
        alert(response.error?.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('This mobile number may already be registered. Please try signing in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col lg:flex-row overflow-hidden">

      {/* Left: Brand Panel */}
      <div className="hidden lg:flex lg:w-[40%] bg-[#064E3B] p-12 xl:p-16 flex-col justify-between relative overflow-hidden text-white">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#00b749]/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#00b749]/30 rounded-full blur-[120px] pointer-events-none" />

        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10">
          <Link href="/login" className="inline-flex items-center gap-3 group mb-12">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10 group-hover:bg-white/20 transition-all">
              <ArrowLeftIcon className="h-5 w-5 text-[#00b749]" />
            </div>
            <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">Back to Sign In</span>
          </Link>

          <p className="text-[#00b749] text-sm font-bold mb-3">Golden Years Care Foundation</p>
          <h2 className="text-5xl font-black leading-tight tracking-tight mb-5">
            Join Our<br />
            <span className="text-[#00b749]">Family. 💚</span>
          </h2>
          <p className="text-white/70 font-medium text-lg leading-relaxed max-w-sm">
            Begin your care journey with us. Dedicated to dignified elder care and community support.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="relative z-10">
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-sm font-bold text-[#00b749] mb-4">Already helping thousands</p>
            <div className="flex -space-x-3 mb-3">
              {[1,2,3,4].map(i => <div key={i} className="h-10 w-10 rounded-full border-4 border-[#064E3B] bg-slate-300" />)}
              <div className="h-10 w-10 rounded-full border-4 border-[#064E3B] bg-[#00b749] flex items-center justify-center text-sm font-bold">+2k</div>
            </div>
            <p className="text-white/60 font-medium text-sm">Join thousands of active community members.</p>
          </div>
        </motion.div>
      </div>

      {/* Right: Registration Form */}
      <div className="flex-1 bg-slate-50 flex items-center justify-center p-6 lg:p-12 overflow-y-auto lg:overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[560px]"
        >
          {/* Mobile back link */}
          <Link href="/login" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 lg:hidden font-semibold text-sm">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Sign In
          </Link>

          <div className="mb-6">
            <p className="text-[#00b749] text-sm font-bold mb-1">Golden Years Care Foundation</p>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Create Your Account</h1>
            <p className="text-slate-500 font-medium text-base">Begin your care journey with us today.</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#00b749] to-emerald-400" />

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-[#00b749] focus:bg-white rounded-xl text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                  {errors.fullName && <p className="text-sm font-semibold text-red-500">{errors.fullName}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-[#00b749] focus:bg-white rounded-xl text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                  />
                  {errors.phone && <p className="text-sm font-semibold text-red-500">{errors.phone}</p>}
                </div>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="block text-sm font-bold text-slate-700">Home Address</label>
                <input
                  type="text"
                  placeholder="e.g. 12 MG Road, Mumbai, 400001"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-[#00b749] focus:bg-white rounded-xl text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                />
                {errors.address && <p className="text-sm font-semibold text-red-500">{errors.address}</p>}
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-4 pr-11 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-[#00b749] focus:bg-white rounded-xl text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1">
                      {showPassword ? <LockOpenIcon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm font-semibold text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-1.5">
                  <label className="block text-sm font-bold text-slate-700">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-4 pr-11 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-[#00b749] focus:bg-white rounded-xl text-base font-semibold text-slate-900 placeholder:text-slate-400 outline-none transition-all"
                    />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1">
                      {showConfirmPassword ? <LockOpenIcon className="h-5 w-5" /> : <LockClosedIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm font-semibold text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#00b749] hover:bg-[#00a040] disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 text-base active:scale-[0.99]"
              >
                {loading ? (
                  <><div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating Account...</>
                ) : (
                  'Create My Account →'
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-sm font-medium text-slate-500">
                  Already have an account?{' '}
                  <Link href="/login" className="text-[#00b749] font-bold hover:underline">Sign In Here</Link>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
