import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaClipboardList, FaBullhorn, FaCreditCard, FaHistory, FaUsers, FaDumbbell, FaTicketAlt, FaChartBar, FaUserShield, FaCalendarCheck } from 'react-icons/fa'; // Added FaCalendarCheck for confirmed bookings management

function DashboardSidebar() {
  const { user, isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  let baseDashboardPath = '/user/dashboard';
  if (isLoggedIn && user) {
    if (user.role === 'admin') {
      baseDashboardPath = '/admin/dashboard';
    } else if (user.role === 'member') {
      baseDashboardPath = '/member/dashboard';
    }
  }

  if (!isLoggedIn || !user) {
    return null;
  }

  // Hamburger button for mobile
  const Hamburger = (
    <button
      className="md:hidden absolute top-0 left-0 z-50 bg-gray-600 text-white p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={() => setIsOpen((prev) => !prev)}
      aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        {isOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
        )}
      </svg>
    </button>
  );

  return (
    <div className='bg-gradient-to-br relative from-blue-50 via-white to-blue-100'>
      {Hamburger}
      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 text-white flex flex-col shadow-lg transform transition-transform duration-300 md:static md:translate-x-0 md:flex md:h-full md:w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:opacity-100`}
        style={{ minHeight: '100vh' }}
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-white p-1 ml-2 focus:outline-none"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-grow py-4 overflow-y-auto">
          <ul className="space-y-2">
            {/* Shared Routes (My Profile, Announcements) - paths adjusted per role baseDashboardPath */}
            <li>
              <NavLink
                to={`${baseDashboardPath}/profile`}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                    isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                  }`
                }
              >
                <FaUser className="mr-3 text-xl" /> My Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`${baseDashboardPath}/announcements`}
                className={({ isActive }) =>
                  `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                    isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                  }`
                }
              >
                <FaBullhorn className="mr-3 text-xl" /> Announcements
              </NavLink>
            </li>

            {/* User/Member Specific Links */}
            {user.role !== 'admin' && ( // Hide these for admin, as admin has separate management links
              <>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/pending-bookings`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaClipboardList className="mr-3 text-xl" /> Pending Bookings
                  </NavLink>
                </li>
              </>
            )}

            {/* Member-specific links */}
            {user.role === 'member' && (
              <>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/approved-bookings`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaCreditCard className="mr-3 text-xl" /> Approved Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/confirmed-bookings`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaHistory className="mr-3 text-xl" /> Confirmed Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/payment-history`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaHistory className="mr-3 text-xl" /> Payment History
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin-specific links */}
            {user.role === 'admin' && (
              <>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/overview`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaChartBar className="mr-3 text-xl" /> Dashboard Overview
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/manage-bookings-approval`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaClipboardList className="mr-3 text-xl" /> Manage Approvals
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/manage-members`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaUserShield className="mr-3 text-xl" /> Manage Members
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/all-users`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaUsers className="mr-3 text-xl" /> All Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/manage-courts`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaDumbbell className="mr-3 text-xl" /> Manage Courts
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/manage-all-bookings`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaCalendarCheck className="mr-3 text-xl" /> Manage All Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/manage-coupons`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaTicketAlt className="mr-3 text-xl" /> Manage Coupons
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={`${baseDashboardPath}/make-announcement`}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <FaBullhorn className="mr-3 text-xl" /> Make Announcement
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DashboardSidebar;