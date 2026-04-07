'use client';

import { useState } from 'react';

export default function DonatePage() {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(500000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const displayAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleAmountClick = (amt: number) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation Data:', {
      frequency,
      amount: displayAmount,
      ...formData
    });
    alert(`Thank you for your ${frequency} donation of ₹${displayAmount?.toLocaleString()}!`);
  };

  return (
    <div className="pt-24 bg-[#f0f2f5] min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
            Donation
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Give Love. Give Care. Give Dignity.
          </h1>
          <p className="text-lg text-black/60 leading-relaxed">
            Your donation helps us provide shelter, medical aid, and dignity to senior citizens in need.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-black/5">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Select Donation Frequency</h3>
            <div className="flex gap-4 p-2 bg-gray-100 rounded-2xl w-fit">
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`${frequency === 'one-time' ? 'bg-white text-black shadow-sm ring-2 ring-[#00b749]' : 'text-black/60 hover:bg-black/5'} px-8 py-3 rounded-xl font-bold transition-all focus:outline-none`}
              >
                One Time
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`${frequency === 'monthly' ? 'bg-white text-black shadow-sm ring-2 ring-[#00b749]' : 'text-black/60 hover:bg-black/5'} px-8 py-3 rounded-xl font-bold transition-all focus:outline-none`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Select Amount</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[5000, 50000, 500000, 5000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => handleAmountClick(amt)}
                  className={`py-4 rounded-2xl border-2 font-bold text-xl transition-all outline-none ${selectedAmount === amt ? 'border-[#00b749] bg-[#e5f7ed] text-[#00b749]' : 'border-black/10 hover:border-black/30'}`}
                >
                  ₹{amt.toLocaleString()}
                </button>
              ))}
              <div className="col-span-2 md:col-span-4 mt-2">
                <input
                  type="number"
                  placeholder="Custom Amount"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full bg-gray-50 border border-black/10 rounded-2xl px-6 py-4 text-xl font-medium focus:outline-none focus:border-[#00b749] transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="mb-12 border-t border-black/10 pt-10">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors"
              />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors col-span-1 md:col-span-2"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-[#00b749] hover:bg-[#00a040] text-white rounded-2xl font-bold text-xl transition-colors shadow-md disabled:opacity-50"
            disabled={!displayAmount}
          >
            Complete Donation {displayAmount ? `of ₹${displayAmount.toLocaleString()}` : ''}
          </button>

          <p className="text-center text-black/50 text-sm mt-6 font-medium">
            Your payment information is globally secured by standard encryption.
          </p>
        </form>
      </div>
    </div>
  );
}
