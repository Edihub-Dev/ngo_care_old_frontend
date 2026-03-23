'use client';

<<<<<<< HEAD
import { motion } from 'framer-motion';
import CampaignCard from './CampaignCard';

// Sample campaign data
const campaigns = [
  {
    id: '1',
    title: 'Building Food Security Through Community Farming',
    description: 'Help us establish sustainable community farms that provide fresh, nutritious food to families in need while creating economic opportunities.',
    image: 'https://images.unsplash.com/photo-1590433834016-9a9322a6c19a?w=600&h=400&fit=crop',
    raised: 45000,
    goal: 75000,
    category: 'Food Security'
  },
  {
    id: '2',
    title: 'Education for Every Child: Hope Beyond Hunger',
    description: 'Support our mission to provide educational resources, school supplies, and nutritious meals to children in underserved communities.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
    raised: 32000,
    goal: 50000,
    category: 'Education'
  },
  {
    id: '3',
    title: 'Water for Life: Restoring Health and Dignity',
    description: 'Help us build clean water systems and sanitation facilities in communities where access to safe water is a daily struggle.',
    image: 'https://images.unsplash.com/photo-1548484352-ea579e5233a8?w=600&h=400&fit=crop',
    raised: 68000,
    goal: 100000,
    category: 'Clean Water'
  },
  {
    id: '4',
    title: 'Restoring Hope in Times of Urgency',
    description: 'Support our emergency relief fund that provides immediate assistance to families affected by natural disasters and crises.',
    image: 'https://images.unsplash.com/photo-1593115057326-e110e975f556?w=600&h=400&fit=crop',
    raised: 85000,
    goal: 120000,
    category: 'Emergency Relief'
  },
  {
    id: '5',
    title: 'Learning for Life: Creating Pathways to Success',
    description: 'Empower youth and adults with vocational training, mentorship programs, and educational scholarships for brighter futures.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
    raised: 28000,
    goal: 45000,
    category: 'Skills Training'
  },
  {
    id: '6',
    title: 'Healthcare Access for All Communities',
    description: 'Support mobile health clinics and medical outreach programs that bring essential healthcare services to remote areas.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    raised: 52000,
    goal: 80000,
    category: 'Healthcare'
=======
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const campaigns = [
  {
    id: 'fundraising-for-education-equality-and-access',
    title: 'Fundraising for Education Equality and Access',
    raised: 40000,
    goal: 65200,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
  },
  {
    id: 'building-stronger-futures-through-healthcare-access',
    title: 'Building Stronger Futures Through Healthcare Access',
    raised: 52000,
    goal: 75200,
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80',
  },
  {
    id: 'empowering-women-and-girls-through-education',
    title: 'Empowering Women and Girls Through Education',
    raised: 80000,
    goal: 85000,
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&q=80',
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
  }
];

export default function CampaignsSection() {
  return (
<<<<<<< HEAD
    <section id="campaigns" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Active Campaigns
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join our ongoing initiatives and help make a tangible difference in communities worldwide
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={campaign.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CampaignCard {...campaign} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="btn-outline text-lg px-8 py-4">
            View All Campaigns
          </button>
        </motion.div>
=======
    <section className="bg-[#050505] py-24 relative overflow-hidden" id="causes">
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00b749]" />
                <span className="text-white/80 font-medium">Causes</span>
             </div>
             <h2 className="text-white text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Causes That Inspire
             </h2>
          </div>
          <p className="text-white/70 text-lg max-w-sm">
            From education to relief efforts, every cause reflects our shared mission to empower.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((camp) => {
            return (
              <div key={camp.id} className="group bg-[#111111] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 p-4">
                <div className="h-48 md:h-56 overflow-hidden rounded-2xl relative mb-6">
                  <div 
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" 
                    style={{ backgroundImage: `url(${camp.image})` }} 
                  />
                </div>
                
                <div className="px-2 pb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-8 min-h-[3rem] tracking-tight">{camp.title}</h3>
                  
                  <div className="flex justify-between text-sm font-semibold mb-2">
                     <div className="flex flex-col">
                        <span className="text-white/60 font-normal text-xs mb-1">Raised Amount</span>
                        <span className="text-white text-lg">${camp.raised.toLocaleString()}</span>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-white/60 font-normal text-xs mb-1">Goal Amount</span>
                        <span className="text-white text-lg">${camp.goal.toLocaleString()}</span>
                     </div>
                  </div>

                  <Link 
                    href={`/causes/${camp.id}`}
                    className="group/button outline-none mt-6 flex flex-row items-center justify-center w-full py-3.5 px-6 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors duration-300 gap-2"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
>>>>>>> 5c90f1c201ecb0125b17314320968086e2ffd1b5
      </div>
    </section>
  );
}
