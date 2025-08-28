import React, { useState, useRef } from 'react';
import { User, Mail, MapPin, Award, Save, Camera, Lock, Key, LocateFixed } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import ChangePasswordModal from '../components/Profile/ChangePasswordModal';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const { addToast } = useToast();
  
  // State for the main profile form
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [address, setAddress] = useState(user?.address || '');
  const [latitude, setLatitude] = useState(user?.latitude);
  const [longitude, setLongitude] = useState(user?.longitude);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for the password modal
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);

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
  
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      addToast('Geolocation is not supported by your browser.', 'error');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          setAddress(data.display_name || 'Location fetched successfully!');
          addToast('Location fetched successfully!', 'success');
        } catch (error) {
          addToast('Could not fetch address, but coordinates are saved.', 'info');
        }
      },
      () => {
        addToast('Unable to retrieve your location. Please enable location services.', 'error');
      }
    );
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: displayName, avatar: avatarPreview, address, latitude, longitude });
    addToast('Profile updated successfully!', 'success');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setPasswordModalOpen(false)} 
      />
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
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Home Address</label>
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-grow">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleGetLocation}
                      className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
                      title="Get Current Location"
                    >
                      <LocateFixed className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  {latitude && longitude && (
                    <p className="text-xs text-gray-500 mt-1">Coordinates: {latitude.toFixed(4)}, {longitude.toFixed(4)}</p>
                  )}
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

            
<div className="bg-white p-8 rounded-2xl shadow-lg">
  <h2 className="text-xl font-bold text-gray-800 mb-4">Security</h2>
  <div className="flex justify-between items-center">
    <p className="text-gray-600">Update your password to keep your account secure.</p>
    {/* THIS BUTTON WAS MISSING */}
    <button
      onClick={() => setPasswordModalOpen(true)}
      className="flex items-center space-x-2 py-2 px-4 rounded-lg text-white font-semibold bg-gray-700 hover:bg-gray-800"
    >
      <Key className="w-5 h-5" />
      <span>Change Password</span>
    </button>
  </div>
</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
