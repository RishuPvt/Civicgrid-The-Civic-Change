// FILE: src/components/Dashboard/ScoreWidget.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, Users, RefreshCw } from "lucide-react";
import axios from "axios";
import { backendUrl } from "../../API/BackendUrl";
import { toast } from "react-toastify";
import { feConvolveMatrix, feMerge } from "framer-motion/client";
import { marker } from "leaflet";
interface User {
  civicScore: number;
  rank: number;
}








const ScoreWidget: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatedScore, setAnimatedScore] = useState(0);

  // Fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/users/getCurrentUser`, {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Animate score when user is loaded
  useEffect(() => {
    if (!user) return;
    const score = user.civicScore;

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
  }, [user]);

  if (loading) {
    return (

     <div className="flex flex-col items-center">
            <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
            <p className="mt-2 text-gray-700 font-semibold">Loading your Civic Score...</p>
          </div>
   
    );
  }

  if (!user) {
    return (
      <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl p-8 text-white shadow-2xl text-center">
        <p>Failed to load user data</p>
      </div>
    );
  }

  const score = user.civicScore;
  const rank = user.rank;

  // --- LEVELS ---
  const levels = [
    { name: "Newbie", minPoints: 0 },
    { name: "Starter", minPoints: 500 },
    { name: "Champion", minPoints: 2500 },
    { name: "Master", minPoints: 5000 },
  ];

  const currentLevel =
    levels.slice().reverse().find((l) => score >= l.minPoints) || levels[0];
  const nextLevelIndex =
    levels.findIndex((l) => l.name === currentLevel.name) + 1;
  const nextLevel =
    nextLevelIndex < levels.length ? levels[nextLevelIndex] : null;

  const progressToNext = nextLevel
    ? ((score - currentLevel.minPoints) /
        (nextLevel.minPoints - currentLevel.minPoints)) *
      100
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
        <motion.div className="font-bold text-5xl mb-2" key={animatedScore}>
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
          <div className="font-bold text-2xl">
            {rank > 0 ? `#${rank}` : "Unranked"}
          </div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4">
          <div className="text-sm text-green-200 mb-2">Level</div>
          <div className="font-bold text-2xl">{currentLevel.name}</div>
        </div>
      </div>

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
