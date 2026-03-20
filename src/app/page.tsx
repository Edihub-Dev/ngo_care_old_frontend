'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Heart, Phone, Shield, Users, Calendar, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from "../lib/utils";

export default function Home() {
  return (
    <div className={cn('min-h-screen', 'bg-linear-to-b', 'from-blue-50', 'to-white')}>
      {/* Navigation */}
      <nav className={cn('bg-white', 'shadow-sm')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')}>
          <div className={cn('flex', 'justify-between', 'items-center', 'h-16')}>
            <div className={cn('flex', 'items-center', 'space-x-2')}>
              <Heart className={cn('h-8', 'w-8', 'text-blue-600')} />
              <span className={cn('text-xl', 'font-bold', 'text-gray-900')}>ElderCare</span>
            </div>
            <div className={cn('flex', 'space-x-4')}>
              <Link href="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={cn('relative', 'overflow-hidden')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'py-20')}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className={cn('text-4xl', 'md:text-6xl', 'font-bold', 'text-gray-900', 'mb-6', 'text-xxlarge')}>
              Compassionate Care for
              <span className={cn('text-blue-600', 'block')}>Our Senior Citizens</span>
            </h1>
            <p className={cn('text-xl', 'text-gray-600', 'mb-8', 'max-w-3xl', 'mx-auto', 'text-xlarge')}>
              Professional elder care services at your fingertips. From medical assistance to daily support, we're here to help.
            </p>
            <div className={cn('flex', 'flex-col', 'sm:flex-row', 'gap-4', 'justify-center')}>
              <Link href="/register">
                <Button size="lg" className="btn-large">
                  Get Access
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="btn-large">
                  Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency SOS */}
      <section className={cn('py-12', 'bg-red-50')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8', 'text-center')}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className={cn('text-2xl', 'font-bold', 'text-gray-900', 'mb-4', 'text-xlarge')}>Emergency Support</h2>
            <p className={cn('text-gray-600', 'mb-6', 'text-large')}>Press the SOS button for immediate assistance</p>
            <button className="sos-button">
              SOS
            </button>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn('text-center', 'mb-12')}
          >
            <h2 className={cn('text-3xl', 'font-bold', 'text-gray-900', 'mb-4', 'text-xxlarge')}>Our Services</h2>
            <p className={cn('text-lg', 'text-gray-600', 'text-xlarge')}>Comprehensive care tailored to your needs</p>
          </motion.div>

          <div className={cn('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8')}>
            {[
              { icon: Heart, title: 'Doctor Visit', description: 'Professional medical consultations at home' },
              { icon: Shield, title: 'Nurse Care', description: '24/7 nursing support and assistance' },
              { icon: Users, title: 'Physiotherapy', description: 'Rehabilitation and physical therapy' },
              { icon: Calendar, title: 'Old Age Home', description: 'Comfortable residential care facilities' },
              { icon: Phone, title: 'Emergency Help', description: 'Immediate emergency response services' },
              { icon: MapPin, title: 'Location Tracking', description: 'GPS-based safety and monitoring' }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={cn('card-soft', 'p-6', 'hover:shadow-lg', 'transition-shadow')}
              >
                <service.icon className={cn('h-12', 'w-12', 'text-blue-600', 'mb-4')} />
                <h3 className={cn('text-xl', 'font-semibold', 'text-gray-900', 'mb-2', 'text-large')}>{service.title}</h3>
                <p className={cn('text-gray-600', 'text-large')}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={cn('py-20', 'bg-gray-50')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')}>
          <div className={cn('grid', 'grid-cols-1', 'lg:grid-cols-2', 'gap-12', 'items-center')}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className={cn('text-3xl', 'font-bold', 'text-gray-900', 'mb-6', 'text-xxlarge')}>Why Choose ElderCare?</h2>
              <ul className="space-y-4">
                {[
                  'Mobile OTP login for easy access',
                  'WhatsApp integration for family updates',
                  'Razorpay secure payment system',
                  'Real-time service tracking',
                  'Professional and verified caregivers',
                  '24/7 emergency support'
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className={cn('flex', 'items-start', 'space-x-3')}
                  >
                    <div className={cn('w-2', 'h-2', 'bg-blue-600', 'rounded-full', 'mt-2', 'shrink-0')}></div>
                    <span className={cn('text-gray-700', 'text-large')}>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className={cn('bg-white', 'p-8', 'rounded-2xl', 'shadow-lg')}
            >
              <h3 className={cn('text-2xl', 'font-bold', 'text-gray-900', 'mb-4', 'text-xlarge')}>Get Started Today</h3>
              <p className={cn('text-gray-600', 'mb-6', 'text-large')}>Join thousands of families who trust us with their loved ones' care.</p>
              <Link href="/register">
                <Button size="lg" className={cn('w-full', 'btn-large')}>Register Now</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn('bg-gray-900', 'text-white', 'py-12')}>
        <div className={cn('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')}>
          <div className="text-center">
            <div className={cn('flex', 'items-center', 'justify-center', 'space-x-2', 'mb-4')}>
              <Heart className={cn('h-6', 'w-6')} />
              <span className={cn('text-xl', 'font-bold')}>ElderCare</span>
            </div>
            <p className={cn('text-gray-400', 'text-large')}>© 2024 ElderCare. Compassionate care for our seniors.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
