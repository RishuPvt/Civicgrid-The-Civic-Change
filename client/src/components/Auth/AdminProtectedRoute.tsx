
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminProtectedRoute: React.FC = () => {
  const { user } = useAuth();

  // First, check if the user is logged in at all.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Next, check if the logged-in user has the 'ADMIN' role.
  // In a real app, this role would come from the database.
  if (user.role !== 'ADMIN') {
    // If not an admin, redirect them to the dashboard.
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is logged in AND is an admin, show the page.
  return <Outlet />;
};

export default AdminProtectedRoute;
