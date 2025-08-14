import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Temporary mock data — replace with API call later
const nearbyTasks = [
  { id: 1, title: 'Overflowing bin near India Gate', distance: '0.5 km away', points: 75, timeAgo: 'Reported 30 mins ago' },
  { id: 2, title: 'Illegal dumping at Connaught Place', distance: '1.2 km away', points: 150, timeAgo: 'Reported 2 hours ago' },
  { id: 3, title: 'Pothole on road in Hauz Khas Village', distance: '2.8 km away', points: 50, timeAgo: 'Reported 1 day ago' },
];

const TaskListPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Nearby Tasks (0–3 km)</h1>
      <div className="space-y-4">
        {nearbyTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => navigate(`/task/${task.id}`)}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="font-bold text-lg text-gray-800 mb-2">{task.title}</h2>
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <span>{task.distance}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    <span>{task.timeAgo}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                <div className="text-center">
                  <div className="font-bold text-xl text-green-600">{task.points}</div>
                  <div className="text-xs text-gray-500">Points</div>
                </div>
                <div className="bg-green-500 text-white p-3 rounded-full">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskListPage;