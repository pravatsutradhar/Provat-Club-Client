import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/common/CustomToast';

function AdminDashboard() {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return null;

  // Redirect if user is not logged in or not an admin
  // PrivateRoute should handle this, but as a fallback
  useEffect(() => {
    if (!isLoggedIn || !user || user.role !== 'admin') {
      toast.error('You are not authorized to access the Admin Dashboard.');
      navigate('/', { replace: true }); // Redirect to home if not admin
    }
  }, [isLoggedIn, user, navigate]);

  // Default redirect to /admin/dashboard/profile if user lands on /admin/dashboard
  useEffect(() => {
    if (!loading && isLoggedIn && user && user.role === 'admin' && location.pathname === '/admin/dashboard') {
      navigate('/admin/dashboard/profile', { replace: true });
    }
  }, [loading, isLoggedIn, user, location.pathname, navigate]);


  // If the user's role is 'admin' and they are on a valid path within /admin/dashboard/*
  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      <DashboardSidebar />
      <div className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* Renders the nested route component */}
      </div>
    </div>
  );
}

export default AdminDashboard;