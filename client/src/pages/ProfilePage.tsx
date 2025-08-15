// FILE: src/pages/ProfilePage.tsx
// This is the final, corrected version with all features integrated.

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Award, Save, Camera, Lock, Key } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  
  // State for the main profile form
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [address, setAddress] = useState('New Delhi, India');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for the change password form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const earnedBadges = [
    { name: 'First Contribution', icon: Award },
    { name: 'Community Helper', icon: Award },
    { name: 'Clean-up Champion', icon: Award },
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // Handler for the main profile update
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: displayName, avatar: avatarPreview });
    addToast('Profile updated successfully!', 'success');
  };

  // Handler for the password change
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('New passwords do not match.', 'error');
      return;
    }
    // In a real app, you would send this to the backend
    addToast('Password changed successfully!', 'success');
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column: Profile Picture and Badges */}
        <div className="lg:col-span-1 space-y-8">
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

        {/* Right Column: Edit Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Edit Information Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Edit Information</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-6">
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
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Change Password</h2>
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label htmlFor="oldPassword"  className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="oldPassword"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="newPassword"  className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword"  className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 hover:opacity-90"
              >
                <Save className="w-5 h-5" />
                <span>Update Password</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
