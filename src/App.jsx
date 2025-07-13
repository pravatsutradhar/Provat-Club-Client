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
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Dashboard Layouts
import UserDashboard from './pages/UserDashboard';
import MemberDashboard from './pages/MemberDashboard';
import AdminDashboard from './pages/AdminDashboard'; // Import AdminDashboard


// Nested Dashboard Components (Shared & Admin Specific)
import UserMyProfile from './components/dashboard/UserMyProfile'; // Re-used for User/Member/Admin Profile
import UserPendingBookings from './components/dashboard/UserPendingBookings'; // Re-used for User/Member Pending Bookings
import MemberApprovedBookings from './components/dashboard/MemberApprovedBookings';
import MemberConfirmedBookings from './components/dashboard/MemberConfirmedBookings';
import MemberPaymentHistory from './components/dashboard/MemberPaymentHistory';
import AnnouncementsList from './components/dashboard/AnnouncementsList'; // Re-used for all dashboards Announcements

import AdminProfile from './components/dashboard/AdminProfile'; // Admin specific Profile
import AdminDashboardOverview from './components/dashboard/AdminDashboardOverview'; // Admin specific Overview


// Payment Page
import PaymentPage from './pages/PaymentPage';


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
              <Route path="/users" element={<UsersPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Payment Page Route */}
              <Route path="/payment/:bookingId" element={<PrivateRoute allowedRoles={['member', 'admin']}><PaymentPage /></PrivateRoute>} />

              {/* Protected Routes for Dashboards */}
              {/* User Dashboard */}
              <Route path="/user/dashboard/*" element={<PrivateRoute allowedRoles={['user', 'member', 'admin']} />}>
                <Route element={<UserDashboard />}>
                  <Route index element={<UserMyProfile />} />
                  <Route path="profile" element={<UserMyProfile />} />
                  <Route path="pending-bookings" element={<UserPendingBookings />} />
                  <Route path="announcements" element={<AnnouncementsList />} />
                  {/* Additional user-specific routes */}
                </Route>
              </Route>

              {/* Member Dashboard */}
              <Route path="/member/dashboard/*" element={<PrivateRoute allowedRoles={['member', 'admin']} />}>
                <Route element={<MemberDashboard />}>
                  <Route index element={<UserMyProfile />} />
                  <Route path="profile" element={<UserMyProfile />} />
                  <Route path="pending-bookings" element={<UserPendingBookings />} />
                  <Route path="approved-bookings" element={<MemberApprovedBookings />} />
                  <Route path="confirmed-bookings" element={<MemberConfirmedBookings />} />
                  <Route path="payment-history" element={<MemberPaymentHistory />} />
                  <Route path="announcements" element={<AnnouncementsList />} />
                </Route>
              </Route>

              {/* Admin Dashboard */}
              <Route path="/admin/dashboard/*" element={<PrivateRoute allowedRoles={['admin']} />}>
                <Route element={<AdminDashboard />}> {/* Render AdminDashboard here */}
                  <Route index element={<AdminDashboardOverview />} /> {/* Default child route for Admin */}
                  <Route path="profile" element={<AdminProfile />} /> {/* Admin specific profile */}
                  <Route path="overview" element={<AdminDashboardOverview />} /> {/* Admin specific overview */}
                  <Route path="announcements" element={<AnnouncementsList />} /> {/* Re-use general announcements list */}
                  {/* Other admin routes will go here in subsequent steps */}
                </Route>
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;