'use client';

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
  }
];

export default function CampaignsSection() {
  return (
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
      </div>
    </section>
  );
}
