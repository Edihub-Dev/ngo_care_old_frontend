import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-24 bg-[#050505] min-h-screen text-white pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-20 max-w-3xl mx-auto">
           <span className="bg-[#00b749]/20 text-[#00b749] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block">
             Reach Out
           </span>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
             Get In Touch
           </h1>
           <p className="text-xl text-white/70">
             We are always keen on discussing new partnerships, answering queries, or listening to feedback.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="bg-[#111] p-10 md:p-12 rounded-[2rem] border border-white/5">
            <h3 className="text-3xl font-bold tracking-tight mb-8">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label className="block text-white/60 text-sm mb-2 font-medium">First Name</label>
                    <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors" placeholder="John" />
                 </div>
                 <div>
                    <label className="block text-white/60 text-sm mb-2 font-medium">Last Name</label>
                    <input type="text" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors" placeholder="Doe" />
                 </div>
              </div>
              <div>
                 <label className="block text-white/60 text-sm mb-2 font-medium">Email Address</label>
                 <input type="email" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors" placeholder="contact@example.com" />
              </div>
              <div>
                 <label className="block text-white/60 text-sm mb-2 font-medium">Message</label>
                 <textarea rows={5} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 placeholder-white/30 text-white focus:outline-none focus:border-[#00b749] transition-colors resize-none" placeholder="How can we help?" />
              </div>
              <button className="w-full bg-[#00b749] hover:bg-[#00a040] text-white font-bold py-4 rounded-xl transition-colors mt-4 shadow-sm text-lg">
                Submit Message
              </button>
            </form>
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
                       <h4 className="text-xl font-semibold mb-2">Our Headquarters</h4>
                       <p className="text-white/60 leading-relaxed text-lg">1200 Hope Boulevard<br/>Suite 300<br/>San Francisco, CA 94103</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                     <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-[#00b749]">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="text-xl font-semibold mb-2">Email Address</h4>
                       <p className="text-white/60 leading-relaxed text-lg">contact@goldenyears.foundation</p>
                    </div>
                 </div>
                 <div className="flex gap-4 items-start">
                     <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0 border border-white/10 text-[#00b749]">
                       <Phone className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="text-xl font-semibold mb-2">Phone Number</h4>
                       <p className="text-white/60 leading-relaxed text-lg">+1 (555) 123-4567</p>
                    </div>
                 </div>
              </div>
            </div>
            
            <div className="w-full h-full min-h-[300px] bg-[#1a1a1a] rounded-[2rem] border border-white/5 flex items-center justify-center text-white/30 opacity-50 overflow-hidden relative grayscale">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80")' }} />
               <span className="relative z-10 font-bold tracking-widest uppercase">Office Image Example</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
