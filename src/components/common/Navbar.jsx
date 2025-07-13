import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from './CustomToast';

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]); // Dependency array should include dropdownRef

  const handleLogout = () => {
    logout();
    setDropdownOpen(false); // Close dropdown on logout
    navigate('/login'); // Redirect to login page after logout
  };

  const handleDashboardClick = () => {
    setDropdownOpen(false); // Close dropdown
    // Determine the correct dashboard path based on user role
    if (user?.role === 'admin') {
      navigate('/admin/dashboard/profile'); // Specific route within admin dashboard
    } else if (user?.role === 'member') {
      navigate('/member/dashboard/profile'); // Specific route within member dashboard
    } else { // 'user' role or default
      navigate('/user/dashboard/profile'); // Specific route within user dashboard
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo and Site Name */}
        <Link to="/" className="flex items-center text-white text-2xl font-bold tracking-wide">
          <img src="https://via.placeholder.com/40/0000FF/FFFFFF?text=MC" alt="My Club Logo" className="h-10 w-10 rounded-full mr-3" />
          My Club
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200">
            Home
          </Link>
          <Link to="/courts" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200">
            Courts
          </Link>

          {/* Conditional Login/Profile Button */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 focus:outline-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User profile menu" // Added for accessibility
              >
                <img
                  src={user?.image || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'} // Use user's image or a placeholder
                  alt={`${user?.name || 'User'} Profile`} // Alt text for accessibility
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                  <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                    <p className="font-semibold truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleDashboardClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-lg font-medium transition-colors duration-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;