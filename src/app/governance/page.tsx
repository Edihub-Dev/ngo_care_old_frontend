import React from 'react';

export default function GovernancePage() {
  return (
    <div className="bg-white min-h-screen text-gray-900 pb-24">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/governance_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
           <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block leading-none shadow-lg">
             Legal & Structure
           </span>
           <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-white">
             Trust Deed & Governance
           </h1>
           <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
             Complete rules, regulations, clauses, and structure operating Golden Years Care Foundation.
           </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16">

        <div className="space-y-12">
          
          <section className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">1. Declaration</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Settlor(s) hereby create a Religious and Public Charitable Trust known as: <strong>“GOLDEN YEARS CARE FOUNDATION” (GYCF)</strong>. The Trust is created out of natural love, affection and charitable intention for the benefit of the public at large.
            </p>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Nature of Trust</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
              <li>The Trust shall be Religious and Public Charitable in nature. It shall operate on non-profit basis.</li>
              <li>Benefits shall be available to public without discrimination.</li>
              <li>The Trust is irrevocable.</li>
            </ul>
          </section>

          <section className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
            <h2 className="text-2xl font-bold mb-4">3. Registered Office & Area of Operation</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Registered Office:</strong> LGF -95, RDC, DURGA TOWER RAJNAGAR, GHAZIABAD. UP.<br />
              <strong>Area of Operation:</strong> The Trust shall operate throughout India and, if required, abroad in accordance with applicable laws.
            </p>
          </section>

          <section className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
             <h2 className="text-2xl font-bold mb-6">4. Governing Body & Powers</h2>
             <p className="text-gray-700 leading-relaxed mb-4">
               The Governing Body shall be the supreme authority of the Trust, consisting of Surjeet Kumar, Narendra Singh Teotia, and Suneel Kumar Bansal.
             </p>
             <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2">
                <li>Frame rules and policies.</li>
                <li>Appoint trustee (a member may be appointed as trustee if he/she has been completed 2 years of continuous service).</li>
                <li>Approve budget and financial matters.</li>
                <li>Management of trust properties and approve property transactions.</li>
                <li>All disputes shall be resolved by the governing body.</li>
             </ul>
          </section>

          <section className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
             <h2 className="text-2xl font-bold mb-6">5. Rules and Regulations for Executive Committee</h2>
             <p className="text-gray-700 leading-relaxed mb-4">
                The affairs of the trust shall be managed by an Executive Committee constituted by the Governing Body for the efficient administration and implementation of the objectives of the trust.
             </p>
             <h3 className="font-bold text-gray-900 mb-2 mt-4">Composition & Tenure</h3>
             <p className="text-gray-700 leading-relaxed mb-4">
               The Executive Committee shall consist of President, Vice-President, Secretary, Sub-Treasurer, and Executive Members. The tenure is one year for the first five years and later two years.
             </p>
             <h3 className="font-bold text-gray-900 mb-2">Meetings & Quorum</h3>
             <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-4">
               <li>The Executive Committee shall meet at least once every two months or as required.</li>
               <li>The quorum for the meeting of the Executive Committee shall be two-third or three-fourth of its total members.</li>
               <li>All decisions shall be taken by majority vote of members present. In case of equality of votes, the President shall have the casting vote.</li>
             </ul>
          </section>

          <section className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
             <h2 className="text-2xl font-bold mb-6">6. Succession of Founder Trustee</h2>
             <p className="text-gray-700 leading-relaxed mb-4">
              Each Founder Trustee shall have absolute right to nominate, during his lifetime, one competent person as his Successor Trustee. Upon death, permanent incapacity or legal disqualification of a Founder Trustee, the nominated person shall automatically assume office as Founder Trustee without requiring approval of remaining Founder Trustees.
             </p>
             <p className="text-gray-700 leading-relaxed">
              If a Founder Trustee dies without nomination, the lawful legal heir(s) shall have the right to nominate one competent person.
             </p>
          </section>

          <section className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
            <h2 className="text-2xl font-bold mb-6">7. Financial Management & Safeguards</h2>
             <ul className="list-disc list-inside text-gray-700 leading-relaxed space-y-2 mb-4">
               <li>Books of accounts shall be maintained properly. Annual audit by Chartered Accountant is mandatory.</li>
               <li>All income shall be deposited in Trust bank account only. Bank account shall be operated jointly by chairman & Treasurer.</li>
               <li>No personal use of Trust funds permitted.</li>
               <li>Maintenance of Asset, Donation and Salary Registers compulsory.</li>
               <li>Trustees must disclose any personal interest in transactions (Conflict of Interest).</li>
               <li>Misuse of funds shall result in removal by 2/3rd majority.</li>
             </ul>
          </section>

          <section className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100">
             <h2 className="text-2xl font-bold mb-4">8. Amendment & Dissolution</h2>
             <h3 className="font-bold text-gray-900 mb-2">Amendment Clause</h3>
             <p className="text-gray-700 leading-relaxed mb-4">
               Administrative clauses may be amended by majority. However, the Objects, Succession clause, Religious & charitable nature, and Irrevocability clause shall not be amended without unanimous consent of settlor/Founder Trustees.
             </p>
             <h3 className="font-bold text-gray-900 mb-2">Entrenchment Clause</h3>
             <p className="text-gray-700 leading-relaxed mb-4">
               Provisions relating to Governing Body structure, Founder powers, Approval mechanism, Salary provisions, Succession of Founder Trustee, Objects of Trust, and Management of trust properties shall not be amended, altered or deleted without unanimous written consent of all existing Founders trustees.
             </p>
             <h3 className="font-bold text-gray-900 mb-2">Dissolution</h3>
             <p className="text-gray-700 leading-relaxed">
               In the event of dissolution or winding up of the trust, the assets remaining on the date of dissolution shall under no circumstance be distributed among the trustees, but shall be transferred to another trust, society, association or institution whose objects are similar to those of this trust.
             </p>
          </section>

        </div>
      </div>
    </div>
  );
}
