import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Filter } from 'lucide-react';
import { leaderboardData, currentUser } from '../data/mockData';

const Leaderboard: React.FC = () => {
  const [filter, setFilter] = useState('all-time');

  const filters = [
    { key: 'weekly', label: 'This Week' },
    { key: 'monthly', label: 'This Month' },
    { key: 'all-time', label: 'All Time' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Award className="w-6 h-6 text-amber-600" />;
    return <div className="w-6 h-6 flex items-center justify-center font-bold text-gray-500">#{rank}</div>;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-400 to-amber-600';
    return 'bg-gradient-to-r from-civic-500 to-civic-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-poppins font-bold text-3xl text-gray-900 mb-2">Community Leaderboard</h1>
          <p className="text-gray-600">See how you rank among fellow civic champions in your city.</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-2xl p-4 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex space-x-2">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                    filter === filterOption.key
                      ? 'bg-civic-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Second Place */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-3xl p-6 shadow-lg text-center order-3 md:order-1"
            >
              <div className="relative mb-4">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-gray-300"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
              </div>
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                {leaderboardData[1].name}
              </h3>
              <div className="text-2xl font-bold text-gray-500 mb-4">
                {leaderboardData[1].civicScore.toLocaleString()}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {leaderboardData[1].badges?.slice(0, 2).map((badge) => (
                  <span key={badge} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* First Place */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-3xl p-6 shadow-xl text-center text-white transform scale-105 order-1 md:order-2"
            >
              <div className="relative mb-4">
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].name}
                  className="w-24 h-24 rounded-full mx-auto border-4 border-white"
                />
                <div className="absolute -top-3 -right-2 w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <h3 className="font-poppins font-semibold text-xl mb-2">
                {leaderboardData[0].name}
              </h3>
              <div className="text-3xl font-bold mb-4">
                {leaderboardData[0].civicScore.toLocaleString()}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {leaderboardData[0].badges?.slice(0, 2).map((badge) => (
                  <span key={badge} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Third Place */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white rounded-3xl p-6 shadow-lg text-center order-2 md:order-3"
            >
              <div className="relative mb-4">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-amber-300"
                />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
              </div>
              <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2">
                {leaderboardData[2].name}
              </h3>
              <div className="text-2xl font-bold text-amber-600 mb-4">
                {leaderboardData[2].civicScore.toLocaleString()}
              </div>
              <div className="flex flex-wrap gap-1 justify-center">
                {leaderboardData[2].badges?.slice(0, 2).map((badge) => (
                  <span key={badge} className="text-xs bg-amber-50 text-amber-600 px-2 py-1 rounded-full">
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="font-poppins font-semibold text-xl text-gray-900">Full Rankings</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className={`p-6 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  user.id === currentUser.id ? 'bg-civic-50 border-l-4 border-l-civic-500' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12">
                    {getRankIcon(user.rank)}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{user.name}</h3>
                      {user.id === currentUser.id && (
                        <span className="text-xs bg-civic-100 text-civic-600 px-2 py-1 rounded-full font-medium">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {user.badges?.slice(0, 2).map((badge) => (
                        <span key={badge} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl text-gray-900">
                    {user.civicScore.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;