import AboutSection from '@/components/AboutSection';
import StatsCounter from '@/components/StatsCounter';
import { Heart, Shield, Eye, Activity, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/about_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-8 inline-block shadow-lg">
            About Us
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white leading-[1.1]">
            About Golden Years Care Foundation
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Golden Years Care Foundation is a non-profit organization committed to supporting senior citizens through care, compassion, and community-driven initiatives.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 bg-[#f9fafb] rounded-[3rem] border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mb-8">
                <Shield className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide holistic care — including shelter, healthcare, emotional support, and dignity — to elderly individuals, especially those who are neglected or living alone.
              </p>
            </div>
            <div className="p-10 bg-[#f9fafb] rounded-[3rem] border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To build a society where every elderly person feels respected, secure, and valued.
              </p>
            </div>
        </div>
      </section>

      <AboutSection />

      {/* What We Do Section */}
      <section className="py-24 px-6 bg-[#050505] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">What We Do</h2>
            <p className="text-white/60 text-lg">Meaningful actions that make a difference every single day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Old age homes & rehabilitation centers", icon: "🏡" },
              { title: "Day care and assisted living services", icon: "☀️" },
              { title: "Health camps and medical support", icon: "🏥" },
              { title: "Emotional and spiritual care programs", icon: "🙏" }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group flex flex-col items-center text-center">
                <div className="text-5xl mb-8 transform transition-transform group-hover:scale-110">{item.icon}</div>
                <h3 className="text-xl font-bold leading-tight group-hover:text-[#00b749] transition-colors">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 italic">Our Values</h2>
          <div className="w-20 h-1 bg-[#00b749] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Compassion", icon: <Heart className="w-6 h-6" /> },
            { name: "Respect", icon: <CheckCircle className="w-6 h-6" /> },
            { name: "Integrity", icon: <Shield className="w-6 h-6" /> },
            { name: "Service", icon: <Activity className="w-6 h-6" /> }
          ].map((value, i) => (
            <div key={i} className="flex flex-col items-center p-8 bg-[#f9fafb] rounded-[2rem] border border-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-white text-[#00b749] rounded-xl flex items-center justify-center mb-4 shadow-sm">
                {value.icon}
              </div>
              <span className="font-bold text-gray-900 text-lg">{value.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Governing Body */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Our Governing Body & Founders</h2>
            <div className="w-20 h-1 bg-[#00b749] mx-auto rounded-full" />
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our Trust is led and managed by our visionary Founder Trustees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Mr. Surjeet Kumar", role: "Settlor / Founder Trustee", initial: "S" },
              { name: "Mr. Narendra Singh Teotia", role: "Founder Trustee", initial: "N" },
              { name: "Mr. Suneel Kumar Bansal", role: "Founder Trustee", initial: "S" }
            ].map((person, i) => (
              <div key={i} className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100 text-center flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 relative overflow-hidden flex items-center justify-center">
                   <span className="text-3xl text-gray-400 font-bold">{person.initial}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{person.name}</h3>
                <p className="text-[#00b749] font-medium">{person.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Transparency */}
      <section className="py-24 px-6 bg-[#f9fafb] border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Governance & Transparency</h2>
            <div className="w-20 h-1 bg-[#00b749] mx-auto rounded-full" />
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We operate under strict financial safeguards to ensure every contribution reaches those in need.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Executive Committee</h3>
               <p className="text-gray-600 leading-relaxed text-lg mb-4">
                 Our daily operations are managed by an Executive Committee comprising a President, Vice-President, Secretary, and Treasurer. They implement decisions approved by the Governing Body and ensure the efficient administration of the Trust's objectives.
               </p>
            </div>
            <div className="bg-white p-10 rounded-[2rem] border border-gray-100 shadow-sm">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Financial Safeguards</h3>
               <ul className="text-gray-600 leading-relaxed text-lg space-y-3">
                 <li>• Daily operations are conducted strictly for charitable purposes.</li>
                 <li>• Accounts are audited annually by a Chartered Accountant.</li>
                 <li>• No profit distribution or personal use of Trust properties is permitted.</li>
                 <li>• Bank accounts are operated jointly to maintain absolute accountability.</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      <StatsCounter />
    </div>
  );
}
