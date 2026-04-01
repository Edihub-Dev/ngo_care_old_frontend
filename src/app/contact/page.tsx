'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useSettings } from '@/context/SettingsContext';

export default function ContactPage() {
  const { settings: platformInfo } = useSettings();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await apiClient.post<any>('/api/public/contact', formData);
      if (res.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        alert(res.error?.message || 'Failed to send message');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-[#050505] min-h-screen text-white pb-24">
      {/* Full-Screen Hero Section for Contact */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/contact_office.png")' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="bg-[#00b749] text-white  px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block border border-[#00b749]/30">
            Reach Out
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
            Contact Us
          </h1>
          <p className="text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
            We’d love to hear from you. Reach out to support, volunteer, or collaborate with {platformInfo.orgName}.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-[#111] p-10 md:p-12 rounded-[2rem] border border-white/5">
            <h3 className="text-3xl font-bold tracking-tight mb-8">Send a Message</h3>
            {success ? (
              <div className="bg-[#00b749]/10 border border-[#00b749]/30 p-8 rounded-2xl text-center">
                <div className="w-16 h-16 bg-[#00b749] rounded-full flex items-center justify-center mx-auto mb-4 italic text-2xl font-black">✓</div>
                <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
                <p className="text-white/60 mb-6">Thank you for reaching out. Our team will get back to you shortly.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full font-bold transition-all text-sm"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2 font-medium">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors"
                      placeholder="Full Name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors"
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm mb-2 font-medium">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors"
                      placeholder="+91 00000 00000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-2 font-medium">Message</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors resize-none"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="pt-4 border-t border-white/10 mt-6">
                  <h4 className="text-xl font-bold text-white mb-2">Make a Difference Today</h4>
                  <p className="text-white/60 text-sm mb-4">Your support can bring comfort and dignity to someone’s life.</p>
                  <button
                    disabled={loading}
                    className="w-full bg-[#00b749] hover:bg-[#00a040] text-white font-bold py-4 rounded-xl transition-colors shadow-sm text-lg disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Submit Message'}
                  </button>
                </div>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-12 pt-4">
            <div>
              <h3 className="text-3xl font-bold tracking-tight mb-10">Contact Information</h3>
              <div className="space-y-8">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-[#00b749]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Registered Office</h4>
                    <p className="text-white/60 leading-relaxed text-lg">LGF-95, RDC, Durga Tower<br />Rajnagar, Ghaziabad<br />Uttar Pradesh, India</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-[#00b749]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Email Address</h4>
                    <p className="text-white/60 leading-relaxed text-lg">{platformInfo.contactEmail}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-[#00b749]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Phone Number</h4>
                    <p className="text-white/60 leading-relaxed text-lg">{platformInfo.supportPhone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full min-h-[300px] bg-[#1a1a1a] rounded-[2rem] border border-white/5 flex items-center justify-center text-white/30 opacity-70 overflow-hidden relative">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/assets/contact_office.png")' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <h3 className="relative z-10 font-bold text-3xl tracking-tight text-white mb-2 translate-y-24">We Are Here For You</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
