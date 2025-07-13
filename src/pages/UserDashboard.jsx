import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '../components/common/CustomToast';

function UserDashboard() {
  const { user, isLoggedIn, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle initial redirection for dashboard layout
  // Ensures that if user goes to /user/dashboard, they land on /user/dashboard/profile
  useEffect(() => {
    if (!loading && isLoggedIn && user && location.pathname === `/user/dashboard`) {
      navigate(`/user/dashboard/profile`, { replace: true });
    }
  }, [loading, isLoggedIn, user, location.pathname, navigate]);

  // If user is logged in, but not specifically 'user' role for this path
  // This ensures that if an admin/member hits /user/dashboard, they are redirected to their specific dashboard
  useEffect(() => {
    if (!loading && isLoggedIn && user && (user.role === 'member' || user.role === 'admin')) {
        const redirectPath = user.role === 'admin' ? '/admin/dashboard/profile' : '/member/dashboard/profile';
        toast.info(`Redirecting to your ${user.role} dashboard.`);
        navigate(redirectPath, { replace: true });
    }
  }, [loading, isLoggedIn, user, navigate]);


  if (loading) return null; // Or a loading spinner defined at a higher level (e.g., in App.jsx)

  // This should ideally be handled by PrivateRoute, but as a fallback
  if (!isLoggedIn || !user) {
      return <Navigate to="/login" replace />;
  }

  // If the user's role is 'user' and they are on a valid path within /user/dashboard/*
  // (or if higher roles are implicitly allowed here before specific dashboard routes are implemented)
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-80px)]"> {/* Adjust min-h based on Navbar height */}
      <DashboardSidebar />
      <div className="flex-grow p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* Renders the nested route component (MyProfile, PendingBookings, etc.) */}
      </div>
    </div>
  );
}

export default UserDashboard;