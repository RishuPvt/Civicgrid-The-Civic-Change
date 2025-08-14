
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Using CivicGrid is empowering. I reported a broken streetlight on my block, and it was fixed within two days. It feels great to see a direct result of my actions.",
    name: 'Priya Sharma',
    location: 'Delhi, IN',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705e',
  },
  {
    quote: "The competitive aspect is so much fun! I'm currently #5 on my neighborhood's leaderboard. It's a great motivator to stay active and keep my area clean.",
    name: 'Rohan Verma',
    location: 'Mumbai, IN',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026707d',
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl text-gray-900 mb-4">What Our Citizens Are Saying</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real stories from people making a real impact.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" />)}
              </div>
              <p className="text-gray-600 italic leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
