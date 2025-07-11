import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import { useAuth } from './contexts/AuthContext'; // Import useAuth to check loading state

const queryClient = new QueryClient();

function App() {
  const { loading: authLoading } = useAuth(); // Get auth loading state

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
        <Routes>
          <Route path="/" element={<div>Home Page (Placeholder)</div>} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* Add Login Route */}
          <Route path="/register" element={<RegisterPage />} /> {/* Add Register Route */}
          {/* Other routes will go here */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;