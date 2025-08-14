import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Trophy, TrendingUp, Info } from 'lucide-react';
import ScoreWidget from '../components/Dashboard/ScoreWidget';
import ScoreBreakdown from '../components/Dashboard/ScoreBreakdown';
import { useAuth } from '../context/AuthContext';
import WelcomeModal from '../components/Common/WelcomeModal';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    // Check for the new user flag from session storage
    const newUserFlag = sessionStorage.getItem('isNewUser');
    if (newUserFlag) {
      setIsNewUser(true);
      sessionStorage.removeItem('isNewUser');
    }

    const hasSeenWelcome = localStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenWelcome && user) {
      setShowWelcome(true);
      localStorage.setItem('hasSeenWelcomeModal', 'true');
    }
  }, [user]);

  const recentActivities: any[] = [];

  const quickActions = [
    {
      title: 'Submit Report',
      description: 'Report civic issues in your area',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      onClick: () => navigate('/submit-report'),
    },
    {
      title: 'View Leaderboard',
      description: 'See how you rank among peers',
      icon: Trophy,
      color: 'from-blue-500 to-blue-600',
      onClick: () => navigate('/leaderboard'),
    },
  ];

  if (!user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <>
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => setShowWelcome(false)}
        userName={user.name}
      />
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="font-bold text-3xl text-gray-900 mb-1">
              {isNewUser ? `Welcome, ${user.name}!` : `Welcome back, ${user.name}! 👋`}
            </h1>
            <p className="text-gray-600">Here's your civic impact overview for today.</p>
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start gap-8 mb-8">
            {/* Score Widget */}
            <div className="lg:col-span-1">
              <ScoreWidget score={0} rank={0} />
            </div>

            {/* Score Breakdown */}
            <div className="lg:col-span-1">
              <ScoreBreakdown cleanliness={0} reports={0} participation={0} />
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1 space-y-4">
              <h3 className="font-semibold text-xl text-gray-900 mb-4">Quick Actions</h3>
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={action.onClick}
                  className={`w-full bg-gradient-to-r ${action.color} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-lg">{action.title}</div>
                      <div className="text-white/80 text-sm">{action.description}</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Recent Activity and Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:items-start gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="font-semibold text-xl text-gray-900 mb-6">Recent Activity</h3>
              {recentActivities.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  <Info className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="font-medium">No recent activity to show.</p>
                  <p className="text-sm">Submit a report to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">{/* Map through activities here */}</div>
              )}
            </div>

            {/* Weekly Stats */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="font-semibold text-xl text-gray-900 mb-6">This Week</h3>
              <div className="space-y-6">
                {/* Reports Submitted */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Reports Submitted</span>
                    <span className="font-bold text-green-600">0</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>

                {/* Points Earned */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Points Earned</span>
                    <span className="font-bold text-blue-600">0</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>

                {/* Issues Resolved */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Issues Resolved</span>
                    <span className="font-bold text-yellow-600">0</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">No change from last week</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
