import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Filter, Calendar, MapPin, User, Eye } from 'lucide-react';
import { reportsData } from '../data/mockData';

const Admin: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Extended reports with more data for admin view
  const adminReports = [
    ...reportsData,
    {
      id: '3',
      userId: '2',
      title: 'Broken streetlight causing safety issues',
      description: 'The streetlight has been out for over a week, making the area unsafe for pedestrians at night.',
      imageUrl: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=1',
      location: {
        lat: 40.7489,
        lng: -73.9857,
        address: '5th Avenue, New York, NY',
      },
      issueType: 'Streetlight Issue',
      status: 'pending' as const,
      pointsAwarded: 0,
      createdAt: '2025-01-06T09:20:00Z',
    },
  ];

  const statusFilters = [
    { key: 'all', label: 'All Reports', count: adminReports.length },
    { key: 'pending', label: 'Pending Review', count: adminReports.filter(r => r.status === 'pending').length },
    { key: 'verified', label: 'Verified', count: adminReports.filter(r => r.status === 'verified').length },
    { key: 'rejected', label: 'Rejected', count: 0 },
  ];

  const filteredReports = selectedStatus === 'all' 
    ? adminReports 
    : adminReports.filter(report => report.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-civic-100 text-civic-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'rejected': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleApprove = (reportId: string) => {
    // In a real app, this would make an API call
    console.log('Approving report:', reportId);
    // Show success toast or update state
  };

  const handleReject = (reportId: string) => {
    // In a real app, this would make an API call
    console.log('Rejecting report:', reportId);
    // Show success toast or update state
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="font-poppins font-bold text-3xl text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Review and moderate civic reports from community members.</p>
        </motion.div>

        {/* Admin Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {adminReports.filter(r => r.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-civic-100 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-civic-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-civic-600">
                  {adminReports.filter(r => r.status === 'verified').length}
                </div>
                <div className="text-sm text-gray-600">Verified Today</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">0</div>
                <div className="text-sm text-gray-600">Rejected Today</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-4 shadow-lg mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Filter className="w-4 h-4" />
              <span className="font-medium">Filter by status:</span>
            </div>
            <div className="flex space-x-2">
              {statusFilters.map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedStatus(filter.key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-colors flex items-center space-x-2 ${
                    selectedStatus === filter.key
                      ? 'bg-civic-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{filter.label}</span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                    {filter.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Reports Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={report.imageUrl}
                    alt={report.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                
                <div className="md:w-2/3 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusBadge(report.status)}`}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {report.issueType}
                        </span>
                      </div>
                      <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
                        {report.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{report.description}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>User #{report.userId}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{report.location.address}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(report.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {report.status === 'pending' && (
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleApprove(report.id)}
                        className="flex-1 bg-gradient-to-r from-civic-500 to-civic-600 text-white py-3 px-6 rounded-2xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Approve (+50 pts)</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleReject(report.id)}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 px-6 rounded-2xl font-medium hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Reject</span>
                      </motion.button>
                    </div>
                  )}
                  
                  {report.status === 'verified' && (
                    <div className="bg-civic-50 border border-civic-200 rounded-2xl p-4">
                      <div className="flex items-center space-x-2 text-civic-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Verified - {report.pointsAwarded} points awarded</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredReports.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-poppins font-semibold text-xl text-gray-900 mb-2">
              No reports found
            </h3>
            <p className="text-gray-600">
              No reports match the current filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;