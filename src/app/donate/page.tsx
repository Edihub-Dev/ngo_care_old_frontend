'use client';

import { useState } from 'react';
import { CreditCard, Calendar, Landmark, TreePine, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { apiClient } from '@/lib/api';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function DonatePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'online' | 'monthly' | 'bank'>('online');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(5000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donationCause, setDonationCause] = useState<'general' | 'environmental'>('general');
  const [showMoreGeneral, setShowMoreGeneral] = useState(false);
  const [showMoreEnvironmental, setShowMoreEnvironmental] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    fathersName: '',
    phone: '',
    email: '',
    address: '',
    pan: ''
  });

  const displayAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (parseFloat(val) < 0) return;
    setCustomAmount(val);
    setSelectedAmount(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Initiating impact transaction...');

    try {
      const response = await apiClient.post('/api/donations', {
        type: activeTab === 'monthly' ? 'monthly' : (activeTab === 'bank' ? 'bank_transfer' : 'one-time'),
        cause: donationCause,
        amount: displayAmount,
        fullName: formData.fullName,
        fathersName: formData.fathersName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        pan: formData.pan
      });

      if (response.success) {
        toast.success(`Thank you for your contribution of ₹${displayAmount?.toLocaleString()}!`, { id: loadingToast });
        router.push('/dashboard');
      } else {
        toast.error(response.error?.message || 'Transaction failed to log', { id: loadingToast });
      }
    } catch (error) {
       toast.error('Network error. Please try again later.', { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  const causeDetails = {
    general: {
      title: 'General Fund',
      text: 'Contributions to the General Fund allow us to allocate resources where they are needed most, supporting our daily operations, staff nutrition, and emergency medical care services for our residents.',
      icon: <Heart className="w-6 h-6" />,
      expanded: showMoreGeneral,
      setExpanded: setShowMoreGeneral
    },
    environmental: {
      title: 'Environmental Donation',
      text: 'Support our green initiatives, including organic kitchen gardening, tree plantation drives, waste recycling plants, and solar energy installations at our shelter homes.',
      icon: <TreePine className="w-6 h-6" />,
      expanded: showMoreEnvironmental,
      setExpanded: setShowMoreEnvironmental
    }
  };

  return (
    <div className="pt-24 bg-[#f8faff] min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center mb-12">
          <span className="bg-[#e5f7ed] text-[#00b749] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block">
            Make an Impact
          </span>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-[#1a2b4b]">
            Contribute to the Cause
          </h1>
          <p className="text-lg text-black/60 max-w-2xl mx-auto">
            Your support brings dignity, comfort, and hope to senior citizens. Choose how you want to make a difference today.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap md:flex-nowrap gap-2 p-2 bg-white rounded-3xl shadow-sm border border-gray-100 mb-8 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('online')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'online' ? 'bg-[#00b749] text-white shadow-lg shadow-[#00b749]/20' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <CreditCard className="w-5 h-5" />
            Online Payment
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'monthly' ? 'bg-[#00b749] text-white shadow-lg shadow-[#00b749]/20' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Calendar className="w-5 h-5" />
            Monthly Donation
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === 'bank' ? 'bg-[#00b749] text-white shadow-lg shadow-[#00b749]/20' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Landmark className="w-5 h-5" />
            Bank Transfer
          </button>
        </div>

        {activeTab !== 'bank' ? (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-black/5 border border-gray-100">
            {/* Donation Cause Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#1a2b4b]">Select Donation Purpose</h3>
              
              <div className="border-b border-gray-200 mb-8">
                <div className="flex w-full overflow-x-auto no-scrollbar scroll-smooth">
                  {(['general', 'environmental'] as const).map((cause) => (
                    <button
                      key={cause}
                      type="button"
                      onClick={() => setDonationCause(cause)}
                      className={`
                        flex-none flex flex-col items-center justify-center gap-1 px-8 py-5 transition-all relative
                        ${donationCause === cause 
                          ? 'bg-[#e5f7ed]/60 text-[#00b749]' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${donationCause === cause ? 'text-[#00b749]' : 'text-gray-300'}`}>
                          {causeDetails[cause].icon}
                        </span>
                        <span className={`whitespace-nowrap font-black text-sm md:text-base tracking-tight ${donationCause === cause ? 'opacity-100' : 'opacity-60'}`}>
                          {causeDetails[cause].title}
                        </span>
                      </div>
                      
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setDonationCause(cause);
                          causeDetails[cause].setExpanded(true);
                        }}
                        className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#00b749] hover:underline cursor-pointer opacity-80"
                      >
                        (more)
                      </div>
                      
                      {donationCause === cause && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#00b749] animate-in slide-in-from-bottom-1" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Content Card for selected cause */}
              <div className={`bg-gray-50 rounded-[2.5rem] border border-gray-100 transition-all duration-500 overflow-hidden ${causeDetails[donationCause].expanded ? 'p-8 opacity-100' : 'h-0 p-0 border-0 opacity-0'}`}>
                {causeDetails[donationCause].expanded && (
                  <div className="animate-in fade-in slide-in-from-top-1 duration-500">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-bold text-xl text-[#1a2b4b]">About {causeDetails[donationCause].title}</h4>
                      <button 
                        type="button"
                        onClick={() => causeDetails[donationCause].setExpanded(false)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <ChevronUp className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-base text-black/60 leading-relaxed max-w-3xl">
                      {causeDetails[donationCause].text}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#1a2b4b]">Select Amount</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                {[500, 1000, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      handleAmountClick(amt);
                      setCustomAmount('');
                    }}
                    className={`py-4 rounded-2xl border-2 font-bold transition-all ${selectedAmount === amt && !customAmount ? 'border-[#00b749] bg-[#e5f7ed] text-[#00b749]' : 'border-gray-100 hover:border-gray-300 shadow-sm'}`}
                  >
                    ₹{amt.toLocaleString()}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAmount(null);
                    setCustomAmount(''); 
                  }}
                  className={`py-4 rounded-2xl border-2 font-bold transition-all md:col-span-1 ${!selectedAmount ? 'border-[#00b749] bg-[#e5f7ed] text-[#00b749]' : 'border-gray-100 hover:border-gray-300 text-gray-400 bg-gray-50/50'}`}
                >
                  Custom
                </button>
              </div>
              
              {!selectedAmount && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-300">₹</span>
                    <input
                      type="number"
                      placeholder="Enter Custom Amount"
                      value={customAmount}
                      onChange={handleCustomChange}
                      className="w-full bg-white border-2 border-[#00b749] rounded-2xl pl-12 pr-6 py-5 text-2xl font-black text-[#00b749] focus:outline-none shadow-lg shadow-[#00b749]/10"
                      autoFocus
                      required
                      min="1"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Personal Details */}
            <div className="mb-12 border-t border-gray-100 pt-10">
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-[#1a2b4b]">Donor Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:border-[#00b749] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Father's Name"
                  required
                  value={formData.fathersName}
                  onChange={(e) => setFormData({ ...formData, fathersName: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:border-[#00b749] transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:border-[#00b749] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:border-[#00b749] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:border-[#00b749] transition-colors col-span-1 md:col-span-2"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="PAN Number"
                  required
                  value={formData.pan}
                  onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 text-black focus:outline-none focus:border-[#00b749] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-[#00b749] hover:bg-[#00a040] text-white rounded-[2rem] font-bold text-xl transition-all shadow-xl shadow-[#00b749]/30 disabled:opacity-50 hover:-translate-y-1 active:scale-[0.98] flex items-center justify-center gap-3"
              disabled={loading || !displayAmount}
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Initiating...
                </>
              ) : (
                <>
                  {activeTab === 'monthly' ? 'Start Monthly Donation' : 'Donate Now'} {displayAmount ? `of ₹${displayAmount.toLocaleString()}` : ''}
                </>
              )}
            </button>

            <p className="text-center text-black/40 text-sm mt-8 font-medium">
              We do not accept Foreign donations. All donations are 100% secure.
            </p>
          </form>
        ) : (
          <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-black/5 border border-gray-100">
            <h3 className="text-3xl font-bold mb-8 tracking-tight text-[#1a2b4b] flex items-center gap-3">
              <Landmark className="w-8 h-8 text-[#00b749]" />
              Bank Transfer Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
              <div className="space-y-6">
                <div>
                  <label className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 block">Bank Name</label>
                  <p className="text-xl font-bold text-[#1a2b4b]">XXXXXXXXXXX</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 block">Account Name</label>
                  <p className="text-xl font-bold text-[#1a2b4b]">XXXXXXXXXXX</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 block">Account Number</label>
                  <p className="text-xl font-bold text-[#1a2b4b] tracking-wider">XXXXXXXXXXX</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 block">Account Type</label>
                  <p className="text-xl font-bold text-[#1a2b4b]">Savings Account</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 block">IFSC Code</label>
                  <p className="text-xl font-bold text-[#1a2b4b]">XXXXXXXXXXX</p>
                </div>
                <div>
                  <label className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 block">Branch</label>
                  <p className="text-xl font-bold text-[#1a2b4b]">XXXXXXXXXXX</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2 pt-4 border-t border-gray-200 mt-2">
                <label className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-1 block">NGO Address</label>
                <p className="text-lg font-medium text-[#1a2b4b]">LGF-95, RDC, Durga Tower Rajnagar, Ghaziabad Uttar Pradesh, India</p>
              </div>
            </div>

            <div className="mt-10 p-6 bg-[#e5f7ed] rounded-3xl border border-[#00b749]/20">
              <p className="text-[#00b749] font-medium text-center">
                Please share the transaction screenshot at <strong>goldenyearscare.in@protonmail.com</strong> after your transfer.
              </p>
            </div>
            
            <p className="text-center text-black/40 text-sm mt-8 font-medium">
              We do not accept Foreign donations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
