'use client';

const stats = [
  {
    id: 1,
    title: 'Seniors Supported',
    value: '1,200+',
    subtitle: 'Providing dignity and companionship.',
    image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Health Checkups',
    value: '5,000+',
    subtitle: 'Specialized geriatric medical care.',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Balanced Meals',
    value: '10k+',
    subtitle: 'Tailored nutrition for every elder.',
    image: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=80',
  }
];

export default function StatsCounter() {
  return (
    <section className="bg-[#f2f4f5] py-24" id="impact">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#00b749]" />
              <span className="text-black/80 font-medium">Our Impact</span>
            </div>
            <h2 className="text-black text-4xl md:text-5xl font-bold tracking-tight">
              A Legacy of Care
            </h2>
          </div>
          <p className="text-black/70 text-lg max-w-md">
            Our impact is measured in the smiles, health, and dignity of the seniors we serve every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="relative rounded-3xl overflow-hidden h-[360px] flex flex-col justify-end p-8"
              style={{ backgroundImage: `url(${stat.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              
              <div className="relative z-10 w-full transform transition-transform duration-500">
                <h3 className="text-white font-bold text-5xl md:text-[56px] tracking-tight mb-2">
                  {stat.value}
                </h3>
                <p className="text-white font-bold text-xl mb-1">
                  {stat.title}
                </p>
                <p className="text-white/80 text-sm">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
