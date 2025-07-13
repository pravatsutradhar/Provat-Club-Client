import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/common/CustomToast';

function MemberDashboard() {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return null; // Or a loading spinner

  // Redirect if user is not logged in or not authorized
  // PrivateRoute should handle this, but as a fallback
  if (!isLoggedIn || !user || !['member', 'admin'].includes(user.role)) {
    toast.error('You are not authorized to access the Member Dashboard.');
    return <Navigate to="/" replace />;
  }

  // Redirect Admins to their specific dashboard
  useEffect(() => {
    if (!loading && isLoggedIn && user && user.role === 'admin') {
      toast.info('Redirecting to your Admin Dashboard.');
      navigate('/admin/dashboard/profile', { replace: true });
    }
  }, [loading, isLoggedIn, user, navigate]);

  // Default redirect to /member/dashboard/profile if user lands on /member/dashboard
  useEffect(() => {
    if (!loading && isLoggedIn && user && user.role === 'member' && location.pathname === '/member/dashboard') {
      navigate('/member/dashboard/profile', { replace: true });
    }
  }, [loading, isLoggedIn, user, location.pathname, navigate]);

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
      <DashboardSidebar />
      <div className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* Renders the nested route component */}
      </div>
    </div>
  );
}

export default MemberDashboard;