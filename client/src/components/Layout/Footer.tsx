
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Award, Target, Users, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CG</span>
              </div>
              <span className="font-bold text-xl">CivicGrid</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our goal is to empower citizens to make a tangible impact on their communities. By reporting issues, participating in events, and collaborating with neighbors, we can build cleaner, safer, and better cities together.
            </p>
          </div>

          {/* Key Links Section */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Key Links</h3>
            <ul className="space-y-2">
              <li><NavLink to="/leaderboard" className="text-sm text-gray-400 hover:text-white">Leaderboard</NavLink></li>
              <li><NavLink to="/tasks" className="text-sm text-gray-400 hover:text-white">Nearby Tasks</NavLink></li>
              <li><NavLink to="/register" className="text-sm text-gray-400 hover:text-white">Join the Movement</NavLink></li>
            </ul>
          </div>

          {/* Achievements Section */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Our Achievements</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-sm">
                <Users className="w-5 h-5 mr-2 text-green-400" />
                <span>12,500+ Active Citizens</span>
              </li>
              <li className="flex items-center text-sm">
                <Target className="w-5 h-5 mr-2 text-blue-400" />
                <span>8,750+ Issues Resolved</span>
              </li>
              <li className="flex items-center text-sm">
                <Award className="w-5 h-5 mr-2 text-yellow-400" />
                <span>₹2.5M in Rewards</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">&copy; 2025 CivicGrid. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Linkedin /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
