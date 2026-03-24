'use client';

<<<<<<< HEAD
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Users, Heart, Target, Globe } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
}

function Stat({ icon, value, label, suffix = "" }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="flex justify-center mb-4 text-green-500">
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

export default function StatsCounter() {
  return (
    <section className="py-20 bg-linear-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Impact Together
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Every contribution creates lasting change in communities worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Stat 
            icon={<Users className="h-8 w-8" />}
            value={50000}
            label="Lives Impacted"
          />
          <Stat 
            icon={<Heart className="h-8 w-8" />}
            value={250}
            label="Active Campaigns"
          />
          <Stat 
            icon={<Target className="h-8 w-8" />}
            value={95}
            label="Success Rate"
            suffix="%"
          />
          <Stat 
            icon={<Globe className="h-8 w-8" />}
            value={120}
            label="Countries Reached"
          />
=======
const stats = [
  {
    id: 1,
    title: 'Meals Distributed',
    value: '1,000+',
    subtitle: 'For families and individuals.',
    image: 'https://images.unsplash.com/photo-1593113589914-075568e0ea00?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Homes rebuilt',
    value: '300+',
    subtitle: 'Families restore safety & dignity.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Projects delivered',
    value: '256+',
    subtitle: 'Supporting in healthcare & crisis.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80',
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
              Together for change
            </h2>
          </div>
          <p className="text-black/70 text-lg max-w-md">
            Feeding families, educating children & rebuilding lives what our impact shows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="relative rounded-3xl overflow-hidden h-90 flex flex-col justify-end p-8"
              style={{ backgroundImage: `url(${stat.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
              
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
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
        </div>
      </div>
    </section>
  );
}
