'use client';

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
        </div>
      </div>
    </section>
  );
}
