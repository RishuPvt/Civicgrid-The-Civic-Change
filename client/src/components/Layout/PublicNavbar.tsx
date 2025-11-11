import React, { useState } from 'react'; // We need useState now
import { NavLink } from 'react-router-dom';
import { Home, Trophy, LogIn, UserPlus, Info, Menu, X } from 'lucide-react'; // Import Menu and X

const PublicNavbar: React.FC = () => {
  // State to manage the mobile menu (open/closed)
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <NavLink
            to="/"
            className="flex items-center space-x-2"
            onClick={() => setMobileMenuOpen(false)} // Close menu if logo is clicked
          >
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/login" className="text-sm font-medium text-gray-600 hover:text-green-600 px-4 py-2 rounded-lg">
              Login
            </NavLink>
            <NavLink to="/register" className="text-sm font-medium text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-sm">
              Register
            </NavLink>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} // Toggle state
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" /> // Close icon
              ) : (
                <Menu className="block h-6 w-6" /> // Hamburger icon
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {/* This section will show only if isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)} // Close menu on click
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Auth Buttons */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-5 space-y-2">
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)} // Close menu on click
                className="block w-full text-center px-4 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setMobileMenuOpen(false)} // Close menu on click
                className="block w-full text-center px-4 py-2 rounded-lg text-base font-medium text-white bg-green-500 hover:bg-green-600"
              >
                Register
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;