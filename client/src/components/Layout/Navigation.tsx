import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Home,
  BarChart3,
  FileText,
  Trophy,
  Gift,
  History,
  LogIn,
  UserPlus,
  LogOut,
  Map,
  ListChecks,
  PlusSquare,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.tsx";
import { motion, AnimatePresence } from "framer-motion";

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const loggedInNavItems = [
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/map", label: "Tasks Map", icon: Map },
    { path: "/tasks", label: "Nearby Tasks", icon: ListChecks },
    { path: "/submit-report", label: "Submit Report", icon: FileText },
    { path: "/rewards", label: "Rewards", icon: Gift },
    { path: "/my-contributions", label: "My Reports", icon: History },
  ];

  const loggedOutNavItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/login", label: "Login", icon: LogIn },
    { path: "/register", label: "Register", icon: UserPlus },
  ];

  const navItems = user ? loggedInNavItems : loggedOutNavItems;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center px-4 border-b">
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CG</span>
          </div>
          <span className="font-bold text-xl text-gray-900">CivicGrid</span>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile / Logout */}
      <div className="px-4 py-6 border-t">
        {user ? (
          <div className="flex flex-col space-y-3">
            {/* Profile Link */}
            <NavLink
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center space-x-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={user.avatar} // Use the avatar from the context
                alt={user.name}
                className="w-10 h-10 rounded-full border-2 border-green-200 object-cover"
              />
              <div className="flex-1 text-left">
                <div className="text-sm font-medium text-gray-900">
                  {user.name}
                </div>
                <div className="text-xs text-green-600 font-semibold">
                  {user.civicScore}
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400" />
            </NavLink>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </button>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500">
            Please log in to participate.
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-white shadow-md h-screen fixed top-0 left-0 hidden md:flex md:flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-full shadow-lg"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu className="w-6 h-6 text-gray-800" />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden fixed top-0 left-0 h-full w-64 bg-white z-50"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
