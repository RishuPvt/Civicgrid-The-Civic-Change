// FILE: src/components/Dashboard/ScoreWidget.tsx
// This is the corrected version that properly handles a zero state.

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Users } from 'lucide-react';

interface ScoreWidgetProps {
  score: number;
  rank: number;
}

const ScoreWidget: React.FC<ScoreWidgetProps> = ({ score, rank }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  // This effect animates the score counting up
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          const increment = Math.ceil((score - prev) / 20);
          return prev + (increment > 0 ? increment : 1);
        });
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [score]);

  // --- LOGIC FOR DYNAMIC LEVELS AND PROGRESS ---
  const levels = [
    { name: 'Newbie', minPoints: 0 },
    { name: 'Starter', minPoints: 500 },
    { name: 'Champion', minPoints: 2500 },
    { name: 'Master', minPoints: 5000 },
  ];

  const currentLevel = levels.slice().reverse().find(l => score >= l.minPoints) || levels[0];
  const nextLevelIndex = levels.findIndex(l => l.name === currentLevel.name) + 1;
  const nextLevel = nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;

  const progressToNext = nextLevel
    ? ((score - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  const pointsToGo = nextLevel ? nextLevel.minPoints - score : 0;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-green-500 to-blue-500 rounded-3xl p-8 text-white shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg opacity-90">Your Civic Score</h3>
          <div className="flex items-center space-x-2 mt-1">
            <TrendingUp className="w-4 h-4 text-green-200" />
            <span className="text-sm text-green-200">+0 this week</span>
          </div>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="text-center mb-8">
        <motion.div
          className="font-bold text-5xl mb-2"
          key={animatedScore}
        >
          {animatedScore.toLocaleString()}
        </motion.div>
        <div className="text-green-100">Civic Points</div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-green-200" />
            <span className="text-sm text-green-200">City Rank</span>
          </div>
          <div className="font-bold text-2xl">{rank > 0 ? `#${rank}` : 'Unranked'}</div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="text-sm text-green-200 mb-2">Level</div>
          <div className="font-bold text-2xl">{currentLevel.name}</div>
        </div>
      </div>

      {/* Progress bar to next level */}
      {nextLevel && (
        <div className="mt-6">
          <div className="flex justify-between text-sm text-green-200 mb-2">
            <span>Progress to {nextLevel.name}</span>
            <span>{pointsToGo.toLocaleString()} pts to go</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToNext}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="bg-yellow-400 h-2 rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ScoreWidget;
