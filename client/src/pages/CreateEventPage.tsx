
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

const CreateEventPage: React.FC = () => {
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Your community event "${eventName}" has been created!`);
    setEventName('');
    setLocation('');
    setDate('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Create a Community Event</h1>
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="eventName" className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
            <input
              id="eventName"
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="e.g., Neighborhood Watch Meeting"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
              placeholder="e.g., Community Hall"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create My Event</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
