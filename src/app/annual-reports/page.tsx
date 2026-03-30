import React from 'react';
import { Download, FileText, Calendar, CloudDownload } from 'lucide-react';

export default function AnnualReportsPage() {
  const reports = [
    { year: '2023-2024', status: 'Available', size: '2.4 MB' },
    { year: '2022-2023', status: 'Available', size: '1.8 MB' },
    { year: '2021-2022', status: 'Available', size: '2.1 MB' },
    { year: '2020-2021', status: 'Available', size: '1.5 MB' },
  ];

  return (
    <div className="bg-[#f9fafb] min-h-screen text-gray-900 pb-24">
      {/* Full-Screen Hero Section */}
      <div className="relative h-[100dvh] w-full flex items-center justify-center text-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/assets/about_hero_bg.png")' }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="bg-[#00b749] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-6 inline-block shadow-lg">
            Impact Documentation
          </span>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-tight">
            Annual Reports
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Detailed insights into our year-round activities, financial expenditures, and the specific lives changed by our initiatives.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-24">
        {/* Reports Grid */}
        <div className="grid grid-cols-1 gap-6">
          {reports.map((report, i) => (
            <div key={i} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-xl transition-all duration-300">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#e5f7ed] text-[#00b749] rounded-2xl flex items-center justify-center">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">Fiscal Year {report.year}</h3>
                    <div className="flex items-center gap-4 text-gray-500 text-sm">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Released Oct {report.year.split('-')[1]}</span>
                      <span className="flex items-center gap-1"><CloudDownload className="w-4 h-4" /> PDF {report.size}</span>
                    </div>
                  </div>
               </div>
               <button className="flex items-center gap-2 bg-[#00b749] hover:bg-[#00a040] text-white px-8 py-3.5 rounded-full font-bold shadow-sm transition-colors">
                 Download Report
                 <Download className="w-4 h-4" />
               </button>
            </div>
          ))}
        </div>

        {/* Impact Message */}
        <div className="mt-24 text-center">
          <div className="w-20 h-1 bg-[#00b749] mx-auto rounded-full mb-8" />
          <h2 className="text-3xl font-bold mb-6">Our Measured Impact</h2>
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Our annual reports are more than just numbers. They tell the stories of hope, health, and dignity restored to our elderly community. We invite you to explore the transparency and progress of Golden Years Care Foundation.
          </p>
        </div>
      </div>
    </div>
  );
}
