import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from './CustomToast';

function PrivateRoute({ allowedRoles }) {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    // Show a loading indicator while checking auth status (especially on refresh)
    // This prevents immediate redirect before context has a chance to load from localStorage
    return (
      <div className="flex justify-center items-center h-[calc(100vh-150px)] text-xl font-semibold text-gray-700">
        Authenticating...
      </div>
    );
  }

  if (!isLoggedIn) {
    // Not logged in, redirect to login page
    toast.error('You need to be logged in to access this page.');
    return <Navigate to="/login" replace />; // 'replace' avoids adding to history
  }

  // If allowedRoles are specified, and user exists, check user's role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    toast.error(`Access denied. Your role (${user.role.charAt(0).toUpperCase() + user.role.slice(1)}) is not authorized for this page.`);
    // Redirect unauthorized users to the home page
    return <Navigate to="/" replace />;
  }

  // User is logged in and authorized, render the child routes/components
  return <Outlet />;
}

export default PrivateRoute;