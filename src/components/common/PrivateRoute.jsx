import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from './CustomToast'; // For showing a toast if redirected

function PrivateRoute({ allowedRoles }) {
  const { user, isLoggedIn, loading } = useAuth(); // Get user, isLoggedIn, and loading from AuthContext

  if (loading) {
    // Show a loading indicator while checking auth status (especially on refresh)
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

  // If allowedRoles are specified, check user's role
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    toast.error(`Access denied. Your role (${user.role}) is not authorized for this page.`);
    // You might redirect to a specific "unauthorized" page or home
    return <Navigate to="/" replace />;
  }

  // User is logged in and authorized, render the child routes/components
  return <Outlet />;
}

export default PrivateRoute;