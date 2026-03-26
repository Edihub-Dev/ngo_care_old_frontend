import AboutSection from '@/components/AboutSection';
import StatsCounter from '@/components/StatsCounter';
import { Heart, Shield, Eye, Activity, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-20 bg-white">
      {/* Header Section */}
      <div className="bg-[#f8f9fa] py-28 px-6 mt-12 text-center border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="bg-[#e5f7ed] text-[#00b749] px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-8 inline-block shadow-sm">
            About Us
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900 leading-[1.1]">
            About Golden Years Care Foundation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Golden Years Care Foundation is a non-profit organization committed to supporting 
            senior citizens through care, compassion, and community-driven initiatives.
          </p>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b749]/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00b749]/5 rounded-full blur-[100px] -ml-48 -mb-48" />
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
                To provide holistic care — including shelter, healthcare, emotional support, and dignity 
                — to elderly individuals, especially those who are neglected or living alone.
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

      <StatsCounter />
    </div>
  );
}
