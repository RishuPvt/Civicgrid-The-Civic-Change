import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Lock, CheckCircle, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth to get the real user

const Rewards: React.FC = () => {
  const { user } = useAuth(); // 2. Get the logged-in user from the context

  // For a new user, the score is 0. If no user is logged in, default to 0.
  const userScore = user ? 0 : 0; 
  
  // 3. The rewardsData is now populated. The component logic will handle the locked state.
  const rewardsData = [
    {
      id: 1,
      title: 'Free Coffee Voucher',
      description: 'Get a free coffee from our partner cafes.',
      pointsRequired: 750,
      category: 'Food & Beverage',
      imageUrl: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      claimed: false,
    },
    {
      id: 2,
      title: 'Movie Ticket Discount',
      description: '50% off on your next movie ticket.',
      pointsRequired: 1500,
      category: 'Entertainment',
      imageUrl: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400',
      claimed: false,
    },
    {
      id: 3,
      title: 'Online Shopping Voucher',
      description: '₹250 off on your favorite online stores.',
      pointsRequired: 3000,
      category: 'Shopping',
      imageUrl: 'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=400',
      claimed: false,
    },
     {
      id: 4,
      title: 'City Park Pass',
      description: 'Free entry to all city parks for a month.',
      pointsRequired: 4500,
      category: 'Lifestyle',
      imageUrl: 'https://images.pexels.com/photos/158028/bellingrath-gardens-and-home-scenic-pastoral-scenery-158028.jpeg?auto=compress&cs=tinysrgb&w=400',
      claimed: false, // Corrected from true to false
    },
  ];

  // The milestones can remain as they represent the goals for all users.
  const milestones = [
    { points: 500, title: 'Civic Starter', description: 'Welcome to the community!', achieved: userScore >= 500 },
    { points: 1000, title: 'Community Helper', description: 'Making a difference daily', achieved: userScore >= 1000 },
    { points: 2500, title: 'Civic Champion', description: 'Leading by example', achieved: userScore >= 2500 },
    { points: 5000, title: 'Community Leader', description: 'Inspiring others to act', achieved: userScore >= 5000 },
  ];

  const nextMilestone = milestones.find(m => !m.achieved);
  const progressToNext = nextMilestone ? (userScore / nextMilestone.points) * 100 : 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-bold text-3xl text-gray-900 mb-2">Civic Rewards</h1>
          <p className="text-gray-600">Earn points through civic activities and unlock exclusive rewards.</p>
        </motion.div>

        {/* Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-8 text-white mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-bold text-2xl mb-2">Your Progress</h2>
              <p className="text-green-100">Keep earning points to unlock more rewards!</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userScore.toLocaleString()}</div>
              <div className="text-green-200">Current Points</div>
            </div>
          </div>

          {nextMilestone && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Progress to {nextMilestone.title}</span>
                <span className="text-green-200">
                  {nextMilestone.points - userScore} points to go
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progressToNext, 100)}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="bg-yellow-400 h-3 rounded-full"
                />
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rewards Grid */}
          <div className="lg:col-span-2">
            <h2 className="font-semibold text-xl text-gray-900 mb-6">Available Rewards</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {rewardsData.map((reward, index) => {
                const canClaim = userScore >= reward.pointsRequired;
                const isClaimed = reward.claimed;

                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-3xl shadow-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={reward.imageUrl}
                        alt={reward.title}
                        className={`w-full h-48 object-cover ${!canClaim && !isClaimed ? 'filter grayscale' : ''}`}
                      />
                      <div className="absolute top-4 right-4">
                        {isClaimed ? (
                          <div className="bg-green-500 text-white p-2 rounded-full">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        ) : canClaim ? (
                          <div className="bg-yellow-400 text-gray-900 p-2 rounded-full">
                            <Gift className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="bg-gray-400 text-white p-2 rounded-full">
                            <Lock className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {reward.category}
                        </span>
                        <span className={`text-sm font-bold ${
                          canClaim ? 'text-green-600' : 'text-gray-400'
                        }`}>
                          {reward.pointsRequired.toLocaleString()} pts
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {reward.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                      
                      {isClaimed ? (
                        <button
                          disabled
                          className="w-full bg-gray-100 text-gray-500 py-3 rounded-2xl font-medium"
                        >
                          Claimed ✓
                        </button>
                      ) : canClaim ? (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl font-medium hover:shadow-lg transition-shadow"
                        >
                          Claim Reward
                        </motion.button>
                      ) : (
                        <button
                          disabled
                          className="w-full bg-gray-100 text-gray-400 py-3 rounded-2xl font-medium cursor-not-allowed"
                        >
                          {(reward.pointsRequired - userScore).toLocaleString()} more points needed
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Milestones Sidebar */}
          <div>
            <h2 className="font-semibold text-xl text-gray-900 mb-6">Milestones</h2>
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.points}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`flex items-start space-x-4 ${
                      milestone.achieved ? 'opacity-100' : 'opacity-60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      milestone.achieved 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {milestone.achieved ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Star className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{milestone.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium text-gray-500">
                          {milestone.points.toLocaleString()} pts
                        </span>
                        {milestone.achieved && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            Achieved
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
