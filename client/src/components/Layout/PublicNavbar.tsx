
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Trophy, LogIn, UserPlus, Info } from 'lucide-react';

const PublicNavbar: React.FC = () => {
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { path: '/about', label: 'About Us', icon: Info },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">CG</span>
            </div>
            <span className="font-bold text-xl text-gray-900">CivicGrid</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center space-x-1 text-sm font-medium transition-colors ${
                    isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/login" className="text-sm font-medium text-gray-600 hover:text-green-600 px-4 py-2 rounded-lg">
              Login
            </NavLink>
            <NavLink to="/register" className="text-sm font-medium text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-sm">
              Register
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default PublicNavbar;