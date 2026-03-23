'use client';

import { motion } from 'framer-motion';
import { Shield, Globe, Heart, Users, Target, Award } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Transparent Operations",
    description: "Every donation is tracked and reported with complete transparency. See exactly how your contribution makes an impact.",
    reverse: false
  },
  {
    icon: <Globe className="h-8 w-8" />,
    title: "Global Reach, Local Impact",
    description: "While we operate worldwide, our focus remains on creating meaningful, lasting change in local communities.",
    reverse: true
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "Compassionate Approach",
    description: "We believe in dignity and respect for every individual we serve, ensuring help reaches those who need it most.",
    reverse: false
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community-Driven Solutions",
    description: "Working hand-in-hand with local communities to develop sustainable solutions that address real needs.",
    reverse: true
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Measurable Results",
    description: "Our impact is quantified and verified, ensuring that every dollar donated creates maximum positive change.",
    reverse: false
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: "Proven Track Record",
    description: "With over a decade of experience, we've successfully completed thousands of projects worldwide.",
    reverse: true
  }
];

export default function FeaturesSection() {
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
            Why Choose Careon
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We're committed to creating lasting change through transparent, effective, and compassionate charitable work
          </p>
        </motion.div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                feature.reverse ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className={feature.reverse ? 'lg:order-2' : ''}>
                <div className="flex items-center mb-6 text-green-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Visual Element */}
              <div className={`${feature.reverse ? 'lg:order-1' : ''}`}>
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500/20 rounded-2xl blur-3xl"></div>
                  <div className="relative bg-gray-800 border border-white/10 rounded-2xl p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        {feature.icon}
                      </div>
                      <div className="text-gray-400 text-sm">
                        Feature {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of donors who trust Careon to deliver meaningful impact where it matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                Start Donating
              </button>
              <button className="btn-outline text-lg px-8 py-4">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
