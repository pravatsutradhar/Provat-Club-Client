import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/common/CustomToast';
import { useQueryClient } from '@tanstack/react-query'; // Import useQueryClient

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn, loginStatus, user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // Initialize query client

  // Redirect if already logged in based on user role
  useEffect(() => {
    // Only redirect if auth loading is complete and user is genuinely logged in
    if (isLoggedIn && user) {
      let redirectPath = '/';
      if (user.role === 'admin') {
        redirectPath = '/admin/dashboard/profile';
      } else if (user.role === 'member') {
        redirectPath = '/member/dashboard/profile';
      } else {
        redirectPath = '/user/dashboard/profile';
      }
      navigate(redirectPath, { replace: true });
      // The toast.info might be causing the issue if it's called too early
      // Let's remove it from here if the user is already logged in, as they are being navigated away.
      // toast.info(`You are already logged in as a ${user.role}.`); // Removed this line
    }
  }, [isLoggedIn, navigate, user]); // Added 'user' to dependencies

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password.');
      return;
    }
    // Call login mutation
    login({ email, password }, {
      onSuccess: (data) => {
        // Invalidate and potentially refetch user-specific queries after successful login
        // This is key for the "after login profile not loading properly" issue
        queryClient.invalidateQueries(['userProfile']);
        queryClient.invalidateQueries(['myBookings']);
        queryClient.invalidateQueries(['approvedBookings']);
        queryClient.invalidateQueries(['confirmedBookings']);
        queryClient.invalidateQueries(['paymentHistory']);
        queryClient.invalidateQueries(['users']); // If admin needs updated user list
        // TanStack Query's invalidation will trigger refetching if those components are mounted/active.
        // The useEffect above will handle navigation once AuthContext's 'user' state updates.
        // We ensure the toast is called *after* login is successful here:
        toast.success(data.message || 'Login successful!'); // Added toast here
      },
      // onError is handled globally by useAuth's loginMutation, so no need to duplicate here
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full"
              disabled={loginStatus === 'pending'}
            >
              {loginStatus === 'pending' ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:text-blue-800 font-bold focus:outline-none"
            >
              Register
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;