
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// New mock data with a more professional, article-like structure
const feedArticles = [
  {
    category: 'Community Event',
    title: 'Successful Park Cleanup at Lodhi Garden',
    summary: 'Over 50 volunteers joined forces this weekend to collect 200kg of waste, making the park cleaner and safer for everyone. The event was organized by the Green Earth Foundation.',
    author: 'Green Earth Foundation',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026706f',
    timestamp: '2 hours ago',
  },
  {
    category: 'Achievement Unlocked',
    title: 'Priya Sharma Reaches "Civic Champion" Level!',
    summary: 'Congratulations to Priya for submitting her 50th verified report! Her consistent efforts in reporting potholes and illegal dumping have made a significant impact in her neighborhood.',
    author: 'CivicGrid Bot',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026705e',
    timestamp: '1 day ago',
  },
  {
    category: 'User Story',
    title: 'How We Got Our Streetlights Fixed in 48 Hours',
    summary: 'For weeks, our street was dangerously dark. After multiple users reported the issue on CivicGrid, the local authorities took notice and resolved the problem. It shows what we can do when we work together!',
    author: 'Harsh Ranjan',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    timestamp: '3 days ago',
  },
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Community Pulse</h1>
        <p className="text-lg text-gray-600">The latest stories, achievements, and updates from the CivicGrid community.</p>
      </div>

      {/* Article Feed */}
      <div className="space-y-8 max-w-3xl mx-auto">
        {feedArticles.map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
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
  );
};

export default HomePage;

