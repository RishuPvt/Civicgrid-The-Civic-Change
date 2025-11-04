
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Edit, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleEditProfile = () => {
    onClose();
    navigate('/profile');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-center border-b">
              <img src={currentUser.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-green-200" />
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <div className="mt-4 text-2xl font-bold text-green-600">{currentUser.civicScore.toLocaleString()} pts</div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 px-4 mb-2">Badges</h3>
              <div className="flex justify-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center" title="First Contribution"><Award className="w-6 h-6 text-white" /></div>
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center" title="Community Helper"><Award className="w-6 h-6 text-white" /></div>
              </div>
              <div className="flex space-x-2 mt-4">
                <button onClick={handleEditProfile} className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 font-semibold">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button onClick={logout} className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-semibold">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;