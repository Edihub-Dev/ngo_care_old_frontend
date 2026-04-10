'use client';

import { useState } from 'react';
import { XIcon } from 'lucide-react';

interface Founder {
  _id: string;
  name: string;
  role: string;
  description?: string;
  initial: string;
  image?: string;
}

export default function FoundersList({ founders }: { founders: Founder[] }) {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  if (founders.length === 0) {
    return (
      <div className="col-span-1 md:col-span-3 text-center text-gray-500 py-12">
        Our Governing Body information details will be updated soon.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {founders.map((person, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedFounder(person)}
            className="bg-[#f9fafb] p-8 rounded-[2rem] border border-gray-100 text-center flex flex-col items-center cursor-pointer hover:shadow-xl hover:bg-white transition-all duration-300 group"
          >
            {person.image ? (
              <img 
                src={person.image} 
                alt={person.name} 
                className="w-24 h-24 bg-gray-200 rounded-full mb-6 relative overflow-hidden object-cover transition-transform duration-300 group-hover:scale-110 shadow-md" 
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 relative overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-md">
                <span className="text-3xl text-gray-400 font-bold">{person.initial || person.name.charAt(0).toUpperCase()}</span>
              </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{person.name}</h3>
            <p className="text-[#00b749] font-medium mb-4">{person.role}</p>
            <span className="text-sm text-gray-400 font-bold uppercase tracking-wider group-hover:text-gray-600 transition-colors">
              View Info &rarr;
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedFounder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedFounder(null)}
          ></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 p-8 md:p-12 animate-in zoom-in-95 duration-200 flex flex-col md:flex-row items-center md:items-start gap-8">
            <button 
              onClick={() => setSelectedFounder(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black transition-colors bg-gray-100 hover:bg-gray-200 rounded-full"
              title="Close"
            >
              <XIcon className="h-6 w-6" />
            </button>
            
            <div className="flex-shrink-0">
               {selectedFounder.image ? (
                 <img 
                    src={selectedFounder.image} 
                    alt={selectedFounder.name} 
                    className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full object-cover shadow-lg" 
                  />
               ) : (
                 <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-5xl text-gray-400 font-bold">
                      {selectedFounder.initial || selectedFounder.name.charAt(0).toUpperCase()}
                    </span>
                 </div>
               )}
            </div>
            
            <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
               <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                 {selectedFounder.name}
               </h2>
               <p className="text-[#00b749] font-bold text-lg mb-6 uppercase tracking-wider text-sm">
                 {selectedFounder.role}
               </p>
               
               <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
                 {selectedFounder.description ? (
                   <p>{selectedFounder.description}</p>
                 ) : (
                   <p className="italic text-gray-400">No additional information provided.</p>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
