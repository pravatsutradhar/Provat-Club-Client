import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '../components/common/CustomToast';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn, loginStatus, user } = useAuth(); // Destructure 'user' to handle redirection for different roles
  const navigate = useNavigate();

  // Redirect if already logged in based on user role
  useEffect(() => {
    if (isLoggedIn && user) { // Ensure user object is available
      let redirectPath = '/'; // Default redirect
      if (user.role === 'admin') {
        redirectPath = '/admin/dashboard/profile';
      } else if (user.role === 'member') {
        redirectPath = '/member/dashboard/profile';
      } else { // 'user' role
        redirectPath = '/user/dashboard/profile';
      }
      navigate(redirectPath, { replace: true });
      toast.info(`You are already logged in as a ${user.role}.`);
    }
  }, [isLoggedIn, navigate, user]); // Added 'user' to dependencies

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in both email and password.');
      return;
    }
    login({ email, password });
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
              autoComplete="email" // Added for accessibility
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
              autoComplete="current-password" // Added for accessibility
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