
import React, { useState } from 'react';
import { Award } from 'lucide-react';

const AwardPointsPage: React.FC = () => {
  const [userId, setUserId] = useState('');
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the backend
    alert(`Awarded ${points} bonus points to user ${userId} for: ${reason}`);
    setUserId('');
    setPoints('');
    setReason('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Award Bonus Points</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
            <input
              id="userId"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter the user's unique ID"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label htmlFor="points" className="block text-sm font-medium text-gray-700 mb-1">Points to Award</label>
            <input
              id="points"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="e.g., 500"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Reason for Award</label>
            <input
              id="reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Outstanding participation in cleanup drive"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 transition-opacity"
          >
            <Award className="w-5 h-5" />
            <span>Confirm Award</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AwardPointsPage;
