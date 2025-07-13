import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth } from './contexts/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/common/PrivateRoute';

// Pages
import HomePage from './pages/HomePage';
import CourtsPage from './pages/CourtsPage';
import UsersPage from './pages/UsersPage'; // For debugging/testing, will be restricted later
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard'; // Main User Dashboard Layout
import MemberDashboardPlaceholder from './components/dashboard/MemberDashboardPlaceholder'; // Placeholder for Member Dashboard
import AdminDashboardPlaceholder from './components/dashboard/AdminDashboardPlaceholder';   // Placeholder for Admin Dashboard

// Nested Dashboard Components (these will be rendered by the Outlet in UserDashboard, etc.)
import UserMyProfile from './components/dashboard/UserMyProfile';
import UserPendingBookings from './components/dashboard/UserPendingBookings';
import AnnouncementsList from './components/dashboard/AnnouncementsList'; // For User/Member/Admin


const queryClient = new QueryClient();

function App() {
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">
        Authenticating session...
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courts" element={<CourtsPage />} />
              <Route path="/users" element={<UsersPage />} /> {/* This route will eventually be protected for admin */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Protected Routes for Dashboards */}
              {/* User Dashboard: Access for 'user', 'member', 'admin'. UserDashboard component handles specific role redirection. */}
              <Route path="/user/dashboard/*" element={<PrivateRoute allowedRoles={['user', 'member', 'admin']} />}>
                <Route element={<UserDashboard />}> {/* This wraps the dashboard layout */}
                  <Route index element={<UserMyProfile />} /> {/* Default child route for /user/dashboard */}
                  <Route path="profile" element={<UserMyProfile />} />
                  <Route path="pending-bookings" element={<UserPendingBookings />} />
                  <Route path="announcements" element={<AnnouncementsList />} />
                  {/* Add more user-specific routes here as needed */}
                </Route>
              </Route>

              {/* Member Dashboard: Access for 'member', 'admin' */}
              <Route path="/member/dashboard/*" element={<PrivateRoute allowedRoles={['member', 'admin']} />}>
                {/* Currently a placeholder. Will be replaced by a MemberDashboard component similar to UserDashboard */}
                <Route index element={<MemberDashboardPlaceholder />} />
                <Route path="*" element={<MemberDashboardPlaceholder />} /> {/* Catch-all for any nested paths */}
              </Route>

              {/* Admin Dashboard: Access for 'admin' only */}
              <Route path="/admin/dashboard/*" element={<PrivateRoute allowedRoles={['admin']} />}>
                {/* Currently a placeholder. Will be replaced by an AdminDashboard component */}
                <Route index element={<AdminDashboardPlaceholder />} />
                <Route path="*" element={<AdminDashboardPlaceholder />} /> {/* Catch-all for any nested paths */}
              </Route>

              {/* Catch-all for 404 Not Found (optional) */}
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;