import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle, XCircle, AlertCircle, Filter, Info, FileText, Star, ThumbsUp, ThumbsDown,RefreshCw } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { backendUrl } from '../API/BackendUrl';
import toast from 'react-hot-toast';

// This is the correct version with API calls
const MyContributionsPage: React.FC = () => {
  const [reportsData, setReportsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Assuming useAuth provides the logged-in user

  useEffect(() => {
    const fetchUserTasks = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`${backendUrl}/users/task/GetTasksbyUser`, {
          withCredentials: true,
        });
        const tasks = response.data.data;

        // Process the tasks to calculate stats like points and votes
        const processedTasks = tasks.map(task => {
          const verifiedVotes = task.votes ? task.votes.filter(vote => vote.value === true).length : 0;
          const invalidVotes = task.votes ? task.votes.filter(vote => vote.value === false).length : 0;

          return {
            ...task,
            verifiedVotes,
            invalidVotes,
          };
        });

        setReportsData(processedTasks);
      } catch (err) {
        toast.error("Failed to fetch user tasks:");
        setError("Failed to load your contributions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserTasks();
  }, [user]); // Re-run effect if the user object changes

  // Stats are now calculated based on fetched data
  const totalReports = reportsData.length;
  const verifiedReports = reportsData.filter(r => r.status === 'COMPLETED').length;
  const pendingReports = reportsData.filter(r => r.status === 'PENDING_VERIFICATION' || r.status === 'IN_PROGRESS').length;
  const pointsEarned = reportsData.reduce((acc, report) => acc + (report.points || 0), 0);

  const statCards = [
    { label: 'Total Reports', value: totalReports, icon: FileText },
    { label: 'Verified', value: verifiedReports, icon: CheckCircle },
    { label: 'Under Review', value: pendingReports, icon: Clock },
    { label: 'Points Earned', value: `+${pointsEarned}`, icon: Star },
  ];

  // Helper function to get status icon and color
  const getStatusInfo = (status) => {
    switch (status) {
      case 'PENDING_VERIFICATION':
        return { icon: AlertCircle, color: 'text-yellow-500' };
      case 'IN_PROGRESS':
        return { icon: Clock, color: 'text-blue-500' };
      case 'COMPLETED':
        return { icon: CheckCircle, color: 'text-green-500' };
      case 'REJECTED':
        return { icon: XCircle, color: 'text-red-500' };
      default:
        return { icon: Info, color: 'text-gray-500' };
    }
  };

  if (loading) {
    return  <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-80">
          <div className="flex flex-col items-center">
            <RefreshCw className="w-8 h-8 text-green-500 animate-spin" />
            <p className="mt-2 text-gray-700 font-semibold">Loading your contributions...</p>
          </div>
        </div>
    
    
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Contributions</h1>
      <p className="text-gray-600 mb-6">Track all your civic reports and their impact on the community.</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white p-4 rounded-2xl shadow-lg flex items-center space-x-3"
          >
            <div className="bg-green-100 text-green-600 p-3 rounded-full">
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Reports List */}
      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Report History</h2>
        {reportsData.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <Info className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-700">You haven't submitted any reports yet.</h3>
            <p className="mt-2">See an issue in your community? Be the first to report it!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reportsData.map((report, index) => {
              const { icon: StatusIcon, color } = getStatusInfo(report.status);
              return (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="p-4 border rounded-xl shadow-sm flex items-start space-x-4"
                >
                  <img
                    src={report.imageUrl[0] || 'https://via.placeholder.com/150'}
                    alt={report.title}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
                    <p className="text-sm text-gray-600 my-1">{report.description.substring(0, 100)}...</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{report.latitude}, {report.longitude}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center space-x-1 text-sm font-semibold">
                          <StatusIcon className={`w-4 h-4 ${color}`} />
                          <span className={color}>{report.status}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <ThumbsUp className="w-4 h-4 text-green-500" />
                        <span>{report.verifiedVotes}</span>
                        <ThumbsDown className="w-4 h-4 text-red-500 ml-2" />
                        <span>{report.invalidVotes}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContributionsPage;