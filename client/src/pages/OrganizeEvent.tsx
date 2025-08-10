
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const OrganizeEventPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to the backend
    alert(`Event "${eventName}" created at ${location} on ${date}!`);
    setEventName('');
    setLocation('');
    setDate('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Organize a New Event</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., City Park Cleanup Drive"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Central Park, Delhi"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 transition-opacity"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create Event</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrganizeEventPage;
