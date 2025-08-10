
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Heart } from 'lucide-react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CivicGrid</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering citizens to build better communities, one report at a time.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid md:grid-cols-3 gap-8 text-center"
        >
          <div className="p-6">
            <Target className="w-12 h-12 mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            <p className="mt-2 text-gray-600">
              To provide a simple, effective platform that connects citizens with local authorities to resolve civic issues quickly and transparently.
            </p>
          </div>
          <div className="p-6">
            <Users className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
            <p className="mt-2 text-gray-600">
              We envision a future where every citizen is an active participant in the development and maintenance of their city, fostering a strong sense of community ownership.
            </p>
          </div>
          <div className="p-6">
            <Heart className="w-12 h-12 mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
            <p className="mt-2 text-gray-600">
              We believe in transparency, collaboration, and the power of community. Every action, big or small, contributes to a greater good.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUsPage;