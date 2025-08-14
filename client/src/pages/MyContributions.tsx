// FILE: src/pages/MyContributions.tsx
// This is the corrected version with a zero state for new users.

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, CheckCircle, XCircle, AlertCircle, Filter, Info, FileText, Star } from 'lucide-react'; // Added Star here

const MyContributionsPage: React.FC = () => {
  // The reportsData is now an empty array for a new user
  const [reportsData, setReportsData] = useState<any[]>([]);
  
  // Stats are now calculated or set to 0
  const totalReports = reportsData.length;
  const verifiedReports = reportsData.filter(r => r.status === 'Verified').length;
  const pendingReports = reportsData.filter(r => r.status === 'Pending').length;
  const pointsEarned = reportsData.reduce((acc, report) => acc + (report.points || 0), 0);

  const statCards = [
    { label: 'Total Reports', value: totalReports, icon: FileText },
    { label: 'Verified', value: verifiedReports, icon: CheckCircle },
    { label: 'Under Review', value: pendingReports, icon: Clock },
    { label: 'Points Earned', value: `+${pointsEarned}`, icon: Star },
  ];

  return (
    <div>
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
          <div>
            {/* The list of reports would be rendered here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContributionsPage;
