import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../API/BackendUrl";
import { toast } from "react-toastify";

interface Task {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  points: number;
  createdAt: string;
  creator: { name: string };
}

const TaskListPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyTasks = async () => {
      try {
        const res = await axios.get(
          `${backendUrl}/users/getNearbyTasks`, // 3 km radius
          { withCredentials: true } // important if you're using cookies for auth
        );
        setTasks(res.data.data);
      } catch (error) {
        toast.error("Error fetching nearby tasks:");
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyTasks();
  }, []);

  if (loading) {
    return (
      <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-80">
        <div className="flex flex-col items-center">
          <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
          <p className="mt-2 text-gray-700 font-semibold">
            Loading NearBy Task...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Nearby Tasks (0–3 km)
      </h1>
      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500">No nearby tasks found.</p>
        ) : (
          tasks.map((task, index) => (
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
                  <h2 className="font-bold text-lg text-gray-800 mb-2">
                    {task.title}
                  </h2>
                  <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1.5" />
                      <span>
                        {/* optional: calculate distance client-side if you return lat/lon */}
                        Within 3 km
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5" />
                      <span>{new Date(task.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                  <div className="text-center">
                    <div className="font-bold text-xl text-green-600">
                      {task.points}
                    </div>
                    <div className="text-xs text-gray-500">Points</div>
                  </div>
                  <div className="bg-green-500 text-white p-3 rounded-full">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskListPage;
