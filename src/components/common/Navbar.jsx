import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Ensure this path is correct

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdown or mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the click is outside the dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      // Check if the click is outside the mobile menu
      // Make sure the event target is not the mobile menu toggle button itself
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('.mobile-menu-toggle')) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false); // Close mobile menu on logout
    navigate('/login');
  };

  const handleDashboardClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false); // Close mobile menu on dashboard click
    if (user?.role === 'admin') {
      navigate('/admin/dashboard/profile');
    } else if (user?.role === 'member') {
      navigate('/member/dashboard/profile');
    } else {
      navigate('/user/dashboard/profile');
    }
  };

  // New function to handle closing the mobile menu from the cross icon
  const handleCloseMobileMenu = (event) => {
    // Stop the event from bubbling up to the document's mousedown listener
    event.stopPropagation();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-xl relative z-50">
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        {/* Logo and Site Name */}
        <Link to="/" className="flex items-center text-white text-2xl md:text-3xl font-extrabold tracking-wide hover:text-gray-200 transition-colors duration-200">
          Provat Club
        </Link>

        {/* Mobile Menu Button (Hamburger/Cross) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white mobile-menu-toggle" // Added class for easier targeting
            aria-label="Toggle navigation menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                // This is the cross icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                // This is the hamburger icon
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-gray-700">
            Home
          </Link>
          <Link to="/courts" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 hover:bg-gray-700">
            Courts
          </Link>

          {/* Conditional Login/Profile Button (Desktop) */}
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 focus:outline-none ring-2 ring-transparent focus:ring-blue-400 rounded-full transition-all duration-200"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="User profile menu"
              >
                <img
                  src={user?.image || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'}
                  alt={`${user?.name || 'User'} Profile`}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-lg"
                />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-1 z-20 animate-fade-in-down origin-top-right">
                  <div className="block px-4 py-2 text-sm text-gray-800 border-b border-gray-200">
                    <p className="font-bold truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleDashboardClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200 rounded-b-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-700 mt-4 rounded-lg shadow-xl animate-slide-down absolute w-[calc(100%-2rem)] left-4 right-4 z-50" ref={mobileMenuRef}>
          <div className="flex flex-col items-stretch py-2">
            {isLoggedIn && (
              <div className="flex items-center px-4 py-3 border-b border-gray-600">
                <img
                  src={user?.image || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'}
                  alt={`${user?.name || 'User'} Profile`}
                  className="w-12 h-12 rounded-full border-2 border-white object-cover mr-3"
                />
                <div>
                  <p className="font-bold text-white truncate">{user?.name}</p>
                  <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                </div>
              </div>
            )}
            <Link
              to="/"
              className="block text-gray-300 hover:text-white px-4 py-3 text-lg font-medium transition-all duration-300 hover:bg-gray-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)} // Close on navigation
            >
              Home
            </Link>
            <Link
              to="/courts"
              className="block text-gray-300 hover:text-white px-4 py-3 text-lg font-medium transition-all duration-300 hover:bg-gray-600 rounded-md"
              onClick={() => setMobileMenuOpen(false)} // Close on navigation
            >
              Courts
            </Link>
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="block w-full text-left text-white px-4 py-3 text-lg font-medium transition-all duration-300 hover:bg-gray-600 rounded-md"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-red-400 px-4 py-3 text-lg font-medium transition-all duration-300 hover:bg-gray-600 rounded-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 mt-2 mx-4 rounded-lg text-lg font-semibold transition-all duration-300 shadow-lg"
                onClick={() => setMobileMenuOpen(false)} // Close on navigation
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;