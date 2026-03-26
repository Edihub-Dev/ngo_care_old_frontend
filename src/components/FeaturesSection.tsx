import { ArrowRight, Heart, Sun, BookOpen, Leaf } from 'lucide-react';
import Link from 'next/link';

const programs = [
  {
    id: 'old-age-homes',
    category: 'Residential Care',
    title: 'Old Age Homes',
    icon: <Heart className="w-6 h-6" />,
    description: 'Safe residential facilities providing complete care and support for senior citizens.',
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&q=80',
  },
  {
    id: 'day-care-services',
    category: 'Social Engagement',
    title: 'Day Care Services',
    icon: <Sun className="w-6 h-6" />,
    description: 'Engaging environment for seniors with social interaction and daily care.',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80',
  },
  {
    id: 'healthcare-programs',
    category: 'Medical Support',
    title: 'Healthcare Programs',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Free medical camps, physiotherapy, and ongoing health support.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80',
  },
  {
    id: 'relief-for-needy',
    category: 'Basic Necessities',
    title: 'Relief for Needy',
    icon: <Leaf className="w-6 h-6" />,
    description: 'Providing essentials like food, shelter, and care to underprivileged elderly individuals.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80',
  },
  {
    id: 'awareness-and-training',
    category: 'Education',
    title: 'Awareness & Training',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Seminars, workshops, and skill development programs.',
    image: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80',
  },
  {
    id: 'environmental-initiatives',
    category: 'Environment',
    title: 'Environmental Initiatives',
    icon: <Leaf className="w-6 h-6" />,
    description: 'Tree plantation, cleanliness drives, and sustainability awareness.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80',
  }
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-24" id="programs">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00b749]" />
              <span className="text-black/80 font-medium tracking-wide">Initiatives</span>
            </div>
            <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
              Our Key Programs
            </h2>
          </div>
          <p className="text-black/60 text-lg max-w-sm">
            Nurturing a dignified and supportive world for our seniors to live with comfort and honor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <div key={program.id} className="group bg-[#f9fafb] rounded-[3rem] p-8 md:p-12 border border-black/5 hover:bg-black hover:text-white transition-all duration-500 overflow-hidden relative shadow-sm">
              <div className="relative z-10 flex flex-col h-full">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#e5f7ed] text-[#00b749] text-xs font-bold rounded-full mb-8 w-fit group-hover:bg-[#00b749] group-hover:text-white transition-colors duration-500">
                  {program.category}
                </div>
                
                <h3 className="text-3xl font-bold mb-6 tracking-tight">
                  {program.title}
                </h3>
                
                <p className="text-black/60 group-hover:text-white/70 text-lg mb-10 leading-relaxed max-w-xl transition-colors duration-500">
                  {program.description}
                </p>

                <div className="mt-auto pt-8 border-t border-black/5 group-hover:border-white/10 transition-colors duration-500 overflow-hidden rounded-[2.5rem]">
                   <img src={program.image} alt={program.title} className="w-full h-56 object-cover rounded-[2rem] group-hover:scale-105 transition-transform duration-700 shadow-sm" />
                </div>
                
                <Link 
                  href={`/programs/${program.id}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-bold group-hover:text-[#00b749] transition-colors"
                >
                  View Initiative Details
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
