
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, CheckCircle, Gift } from 'lucide-react';

const steps = [
  {
    icon: Camera,
    title: '1. Snap & Report',
    description: 'See a civic issue like litter or a pothole? Open the app, take a photo, and submit a report in seconds.',
  },
  {
    icon: CheckCircle,
    title: '2. Community Verification',
    description: 'Other users in your area will quickly verify the issue, ensuring all reports are genuine and actionable.',
  },
  {
    icon: Gift,
    title: '3. Earn Rewards & Impact',
    description: 'Once the issue is resolved, you earn Civic Points that can be redeemed for real rewards. Watch your community improve!',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Making a difference is as easy as 1, 2, 3.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-semibold text-2xl text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

