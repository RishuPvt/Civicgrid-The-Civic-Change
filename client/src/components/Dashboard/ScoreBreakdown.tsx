import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, FileText, Users } from 'lucide-react';

interface ScoreBreakdownProps {
  cleanliness: number;
  reports: number;
  participation: number;
}

const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ cleanliness, reports, participation }) => {
  const categories = [
    { 
      icon: Trash2, 
      label: 'Cleanliness', 
      score: cleanliness, 
      color: 'bg-civic-500',
      bgColor: 'bg-civic-50',
      textColor: 'text-civic-600'
    },
    { 
      icon: FileText, 
      label: 'Reports', 
      score: reports, 
      color: 'bg-sky-500',
      bgColor: 'bg-sky-50',
      textColor: 'text-sky-600'
    },
    { 
      icon: Users, 
      label: 'Participation', 
      score: participation, 
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600'
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-6">Score Breakdown</h3>
      
      <div className="space-y-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`${category.bgColor} rounded-2xl p-4`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${category.color} rounded-xl flex items-center justify-center`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <span className={`font-medium ${category.textColor}`}>{category.label}</span>
              </div>
              <span className={`font-bold text-lg ${category.textColor}`}>{category.score}</span>
            </div>
            
            <div className="w-full bg-white/60 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(category.score / 1000) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                className={`${category.color} h-2 rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBreakdown;