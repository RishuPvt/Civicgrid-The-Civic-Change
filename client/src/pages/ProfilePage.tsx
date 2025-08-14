import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Award, Save, Camera } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  
  // Initialize state with the current user's data from the context
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [address, setAddress] = useState('New Delhi, India'); // Mock address for now
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const earnedBadges = [
    { name: 'First Contribution', icon: Award },
    { name: 'Community Helper', icon: Award },
    { name: 'Clean-up Champion', icon: Award },
  ];

  // This function handles the image selection from the gallery
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  // This function triggers the hidden file input
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // This function saves all the changes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the user's name and new avatar in the global state
    updateUser({ name: displayName, avatar: avatarPreview });
    // Show a professional success notification
    addToast('Profile updated successfully!', 'success');
  };

  if (!user) {
    return <div>Loading...</div>; // Safety check if user is not logged in
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Profile Picture and Badges */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Picture Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
              accept="image/*"
            />
            <div className="relative w-32 h-32 mx-auto mb-4">
              <img src={avatarPreview} alt={user.name} className="w-full h-full rounded-full border-4 border-green-200 object-cover" />
              <button 
                onClick={handleCameraClick}
                className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                title="Change profile picture"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">0 pts</p>
          </div>

          {/* Badges Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Your Badges</h3>
            <div className="space-y-4">
              {earnedBadges.map(badge => (
                <div key={badge.name} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mr-4">
                    <badge.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Information</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email (cannot be changed)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  disabled
                />
              </div>
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address / Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 transition-opacity"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
