import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Trophy, Target, Sparkles } from 'lucide-react';
import Footer from '../components/Layout/Footer';
import HowItWorks from '../components/Landing/HowItWorks';
import Testimonials from '../components/Landing/Testimonials';
import ReelsSection from '../components/Landing/ReelsSection'; // New section

// Data for the community feed
const feedArticles = [
  {
    category: 'Community Event',
    title: 'Successful Park Cleanup at Lodhi Garden',
    summary:
      'Over 50 volunteers joined forces this weekend to collect 200kg of waste, making the park cleaner and safer for everyone. The event was organized by the Green Earth Foundation.',
    author: 'Green Earth Foundation',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706f',
    timestamp: '2 hours ago',
  },
  {
    category: 'Achievement Unlocked',
    title: 'Priya Sharma Reaches "Civic Champion" Level!',
    summary:
      'Congratulations to Priya for submitting her 50th verified report! Her consistent efforts in reporting potholes and illegal dumping have made a significant impact in her neighborhood.',
    author: 'CivicGrid Bot',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705e',
    timestamp: '1 day ago',
  },
];

// Stats data
const stats = [
  { number: '12,500+', label: 'Active Citizens' },
  { number: '8,750', label: 'Issues Resolved' },
  { number: '45', label: 'Partner Cities' },
  { number: '₹2.5M', label: 'Rewards Distributed' },
];

const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="font-bold text-5xl lg:text-6xl text-gray-900 mb-6">
                Track Your{' '}
                <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Civic Score
                </span>
                . Impact Your City.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of citizens making a real difference. Report issues, volunteer, participate in civic activities, and watch your community transform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/dashboard')}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <span>Join the Movement</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1"
                  alt="Community volunteering"
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Community Impact</div>
                    <div className="text-green-600">+150 Civic Points Earned</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-3xl font-bold text-green-600">{stat.number}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* NEW: Reels Section */}
      <ReelsSection />

      {/* Community Pulse Feed */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl text-gray-900 mb-4">Community Pulse</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The latest stories, achievements, and updates from the CivicGrid community.
            </p>
          </div>
          <div className="space-y-8 max-w-3xl mx-auto">
            {feedArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <p className="text-sm font-semibold text-green-600 mb-2">{article.category}</p>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{article.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">{article.summary}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img src={article.avatar} alt={article.author} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-700">{article.author}</p>
                        <p className="text-xs text-gray-500">{article.timestamp}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert('Read more functionality to be added!')}
                      className="flex items-center space-x-2 text-sm font-medium text-green-600 hover:text-green-700"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Landing;
