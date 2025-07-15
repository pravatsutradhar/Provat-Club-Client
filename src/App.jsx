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
import AdminDashboard from './pages/AdminDashboard';


// Nested Dashboard Components (Shared & Admin Specific)
import UserMyProfile from './components/dashboard/UserMyProfile';
import UserPendingBookings from './components/dashboard/UserPendingBookings';
import MemberApprovedBookings from './components/dashboard/MemberApprovedBookings';
import MemberConfirmedBookings from './components/dashboard/MemberConfirmedBookings';
import MemberPaymentHistory from './components/dashboard/MemberPaymentHistory';
import AnnouncementsList from './components/dashboard/AnnouncementsList'; // General announcements list for users/members

import AdminProfile from './components/dashboard/AdminProfile';
import AdminDashboardOverview from './components/dashboard/AdminDashboardOverview';
import AdminManageBookingApprovals from './components/dashboard/AdminManageBookingApprovals';
import AdminAllUsers from './components/dashboard/AdminAllUsers';
import AdminManageMembers from './components/dashboard/AdminManageMembers';
import AdminManageCourts from './components/dashboard/AdminManageCourts'; // New Import
import AdminManageAllBookings from './components/dashboard/AdminManageAllBookings'; // New Import
import AdminManageCoupons from './components/dashboard/AdminManageCoupons'; // New Import
import AdminManageAnnouncements from './components/dashboard/AdminManageAnnouncements'; // New Import (Admin's CRUD Announcements)


// Payment Page
import PaymentPage from './pages/PaymentPage';

// 404 Page
import NotFoundPage from './pages/NotFoundPage';


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
              {/* <Route path="/payment/:bookingId" element={<PrivateRoute allowedRoles={['member', 'admin']}><PaymentPage /></PrivateRoute>} /> */}

              <Route element={<PrivateRoute allowedRoles={['member', 'admin']} />}>
                <Route path="/payment/:bookingId" element={<PaymentPage />} />
              </Route>

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
                <Route element={<AdminDashboard />}>
                  <Route index element={<AdminDashboardOverview />} />
                  <Route path="profile" element={<AdminProfile />} />
                  <Route path="overview" element={<AdminDashboardOverview />} />
                  <Route path="manage-bookings-approval" element={<AdminManageBookingApprovals />} />
                  <Route path="manage-members" element={<AdminManageMembers />} />
                  <Route path="all-users" element={<AdminAllUsers />} />
                  <Route path="manage-courts" element={<AdminManageCourts />} /> {/* New Route */}
                  <Route path="manage-all-bookings" element={<AdminManageAllBookings />} /> {/* New Route */}
                  <Route path="manage-coupons" element={<AdminManageCoupons />} /> {/* New Route */}
                  <Route path="make-announcement" element={<AdminManageAnnouncements />} /> {/* New Route (Admin's CRUD) */}
                  <Route path="announcements" element={<AnnouncementsList />} /> {/* Re-use general announcements list, distinct from admin management one */}
                </Route>
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;