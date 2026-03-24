import Link from 'next/link';

export default function DonatePage() {
  return (
    <div className="pt-24 bg-[#f0f2f5] min-h-screen text-black pb-24">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center mb-16 max-w-2xl mx-auto">
           <span className="bg-[#e5f7ed] text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
             Donation
           </span>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
             Your Gift Matters
           </h1>
           <p className="text-lg text-black/60">
             Choose an amount to support our mission in providing dignity and care for seniors. Every dollar is tracked and effectively utilized.
           </p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-black/5">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Select Donation Frequency</h3>
            <div className="flex gap-4 p-2 bg-gray-100 rounded-2xl w-fit">
              <button className="bg-white text-black px-8 py-3 rounded-xl font-bold shadow-sm transition-all focus:outline-none ring-2 ring-[#00b749]">One Time</button>
              <button className="text-black/60 px-8 py-3 rounded-xl font-bold hover:bg-black/5 transition-all focus:outline-none">Monthly</button>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Select Amount</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[25, 50, 100, 250].map((amt, idx) => (
                 <button 
                  key={amt} 
                  className={`py-4 rounded-2xl border-2 font-bold text-xl transition-all outline-none ${idx === 2 ? 'border-[#00b749] bg-[#e5f7ed] text-[#00b749]' : 'border-black/10 hover:border-black/30'}`}
                 >
                   ${amt}
                 </button>
               ))}
               <div className="col-span-2 md:col-span-4 mt-2">
                 <input type="number" placeholder="Custom Amount" className="w-full bg-gray-50 border border-black/10 rounded-2xl px-6 py-4 text-xl font-medium focus:outline-none focus:border-[#00b749] transition-colors" />
               </div>
            </div>
          </div>

          <div className="mb-12 border-t border-black/10 pt-10">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <input type="text" placeholder="First Name" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors" />
               <input type="text" placeholder="Last Name" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors" />
               <input type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-black/10 rounded-xl px-4 py-3 text-black focus:outline-none focus:border-[#00b749] transition-colors col-span-1 md:col-span-2" />
            </div>
          </div>

          <button className="w-full py-5 bg-[#00b749] hover:bg-[#00a040] text-white rounded-2xl font-bold text-xl transition-colors shadow-md">
            Complete Donation of $100
          </button>
          
          <p className="text-center text-black/50 text-sm mt-6 font-medium">
             Your payment information is globally secured by standard encryption.
          </p>
        </div>
      </div>
    </div>
  );
}
