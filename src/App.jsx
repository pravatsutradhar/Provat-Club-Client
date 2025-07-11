import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CourtsPage from './pages/CourtsPage'; // Import CourtsPage
import { useAuth } from './contexts/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const queryClient = new QueryClient();

// Placeholder Dashboard Components
const UserDashboardPlaceholder = () => <div className="p-8 text-center text-2xl font-bold min-h-[calc(100vh-200px)] flex items-center justify-center">User Dashboard (Coming Soon!)</div>;
const MemberDashboardPlaceholder = () => <div className="p-8 text-center text-2xl font-bold min-h-[calc(100vh-200px)] flex items-center justify-center">Member Dashboard (Coming Soon!)</div>;
const AdminDashboardPlaceholder = () => <div className="p-8 text-center text-2xl font-bold min-h-[calc(100vh-200px)] flex items-center justify-center">Admin Dashboard (Coming Soon!)</div>;


function App() {
  const { loading: authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading application...
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
              <Route path="/courts" element={<CourtsPage />} /> {/* Render CourtsPage here */}
              <Route path="/users" element={<UsersPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Dashboard Placeholders (will become private routes later) */}
              <Route path="/user/dashboard" element={<UserDashboardPlaceholder />} />
              <Route path="/member/dashboard" element={<MemberDashboardPlaceholder />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPlaceholder />} />

              {/* Other routes will go here */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;