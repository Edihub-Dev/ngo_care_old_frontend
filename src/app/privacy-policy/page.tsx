import React from 'react';
import { Shield, Lock, Eye, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 pb-24 font-sans">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/governance_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-white">
          <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
            Legal Compliance
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Your privacy is as important to us as our mission. We are committed to protecting all data shared with our foundation.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-24">
        {/* Policy Content */}
        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#00b749]" />
              1. Information Collection
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              Golden Years Care Foundation collects personal information (such as name, email, and address) solely when voluntarily submitted by visitors. This information is used for specific requests such as donations, volunteering, or receiving our newsletter.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Lock className="w-8 h-8 text-[#00b749]" />
              2. Data Security
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              We take all necessary administrative and technical precautions to safeguard your personal data against loss, theft, and unauthorized access. All online donation information is encrypted and transmitted securely.
            </p>
          </section>

          <section>
             <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Eye className="w-8 h-8 text-[#00b749]" />
              3. Data Retention
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section className="bg-[#f9fafb] p-10 rounded-[3rem] border border-gray-100">
             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6 text-[#00b749]" />
              Contact Our Data Officer
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you have any questions or concerns regarding this Privacy Policy, please contact our Data Protection Officer at:
            </p>
            <div className="font-bold text-gray-900">
              <p>Email: contact@goldenyears.foundation</p>
              <p>Address: LGF-95, Durga Tower, Rajnagar, Ghaziabad</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
