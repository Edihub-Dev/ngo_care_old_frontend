'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeftIcon, 
  UserIcon, 
  MapPinIcon, 
  PhoneIcon,
  CheckCircleIcon,
  IdentificationIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { AuthManager } from '@/lib/auth';
import { apiClient } from '@/lib/api';
import { cn } from "../../../lib/utils";

export default function EditProfile() {
  const router = useRouter();
  const authManager = AuthManager.getInstance();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    age: '',
    gender: 'male',
    bloodGroup: '',
    aadharNumber: '',
    address: '',
    permanentAddress: '',
    emergencyContact: {
      name: '',
      mobile: '',
      relationship: ''
    }
  });

  useEffect(() => {
    authManager.setRouter(router);
    const authState = authManager.requireAuth();
    if (authState.isAuthenticated) {
      loadProfileData();
    }
  }, [router]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<any>('/api/auth/profile');
      if (response.success && response.data?.user) {
        const user = response.data.user;
        setFormData({
          name: user.name || '',
          email: user.email || '',
          mobile: user.mobile || '',
          age: user.age?.toString() || '',
          gender: user.gender || 'male',
          bloodGroup: user.bloodGroup || '',
          aadharNumber: user.aadharNumber || '',
          address: user.address || '',
          permanentAddress: user.permanentAddress || '',
          emergencyContact: {
            name: user.emergencyContact?.name || '',
            mobile: user.emergencyContact?.mobile || '',
            relationship: user.emergencyContact?.relationship || ''
          }
        });
      }
    } catch (err) {
      console.error('Failed to load profile:', err);
      setError('Could not load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      const response = await apiClient.put<any>('/api/users/update-profile', formData);
      if (response.success) {
        setSuccess(true);
        // Update local storage user data
        if (response.data?.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        setTimeout(() => {
          setSuccess(false);
          router.push('/dashboard');
        }, 2000);
      } else {
        throw new Error(response.error?.message || 'Update failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <header className="bg-white shadow-sm h-16 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-full flex items-center justify-between">
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 flex items-center">
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back
          </Link>
          <h1 className="text-xl font-bold text-gray-900">Edit NGO Profile</h1>
          <div className="flex items-center space-x-2">
            {(authManager.getUser()?.role === 'admin' || authManager.getUser()?.role === 'subadmin') && (
              <a 
                href={`${process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3001'}/admin`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center shadow-lg shadow-blue-600/20"
              >
                Admin Portal
              </a>
            )}
            <div className="w-4"></div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-6 space-x-2 border-b pb-4">
              <UserIcon className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Personal Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number (Read-only)</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  disabled
                  className="w-full border p-2.5 rounded-lg bg-gray-50 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg"
                  min="1"
                  max="120"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* NGO Required Details */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-6 space-x-2 border-b pb-4">
              <IdentificationIcon className="h-6 w-6 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-900">NGO Registration Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleChange}
                  placeholder="12-digit Aadhar number"
                  className="w-full border p-2.5 rounded-lg"
                  maxLength={12}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border p-2.5 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
                <textarea
                  name="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  rows={2}
                  className="w-full border p-2.5 rounded-lg"
                  placeholder="Same as current if not mentioned"
                />
              </div>
            </div>
          </section>

          {/* Emergency Contact */}
          <section className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center mb-6 space-x-2 border-b pb-4">
              <PhoneIcon className="h-6 w-6 text-red-600" />
              <h2 className="text-lg font-bold text-gray-900">Emergency Contact</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  name="emergencyContact.name"
                  value={formData.emergencyContact.name}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Mobile</label>
                <input
                  type="tel"
                  name="emergencyContact.mobile"
                  value={formData.emergencyContact.mobile}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg"
                  maxLength={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                <input
                  type="text"
                  name="emergencyContact.relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleChange}
                  className="w-full border p-2.5 rounded-lg"
                  placeholder="e.g. Son, Daughter, Friend"
                />
              </div>
            </div>
          </section>

          {/* Feedback Messages */}
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center">
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              <p>Profile updated successfully!</p>
            </div>
          )}

          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard')}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="px-8"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
