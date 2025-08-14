// FILE: src/components/Common/WelcomeModal.tsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, userName }) => {
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
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center relative"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CivicGrid, {userName}!</h2>
            <p className="text-gray-600 mb-6">
              You're all set to start making a real impact in your community. Here's how you can begin:
            </p>
            <ul className="text-left space-y-2 text-gray-600">
              <li className="flex items-start"><span className="mr-2">1.</span><strong>Submit a Report:</strong> See an issue? Snap a photo and report it to earn your first points.</li>
              <li className="flex items-start"><span className="mr-2">2.</span><strong>Explore the Map:</strong> Find nearby tasks reported by others that you can help resolve.</li>
              <li className="flex items-start"><span className="mr-2">3.</span><strong>Climb the Leaderboard:</strong> Compete with others and earn rewards for your contributions.</li>
            </ul>
            <button
              onClick={onClose}
              className="mt-8 w-full py-3 px-4 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 transition-opacity"
            >
              Let's Get Started
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeModal;
