import React, { useEffect } from 'react'; // Import useEffect
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from './CustomToast';

function PrivateRoute({ allowedRoles }) {
  const { user, isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-150px)] text-xl font-semibold text-gray-700">
        Authenticating...
      </div>
    );
  }

  // Use useEffect for side effects like navigation and toasts
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('You need to be logged in to access this page.');
    } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
      toast.error(`Access denied. Your role (${user.role.charAt(0).toUpperCase() + user.role.slice(1)}) is not authorized for this page.`);
    }
  }, [isLoggedIn, allowedRoles, user]); // Dependencies for this effect

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Redirect unauthorized users to home
  }

  return <Outlet />;
}

export default PrivateRoute;