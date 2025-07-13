import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaClipboardList, FaBullhorn, FaCreditCard, FaHistory, FaUsers, FaDumbbell, FaTicketAlt } from 'react-icons/fa'; // Added more icons

function DashboardSidebar() {
  const { user, isLoggedIn } = useAuth(); // Ensure isLoggedIn is also available

  // Determine the base path for the current user's dashboard
  let baseDashboardPath = '/user/dashboard'; // Default
  if (isLoggedIn && user) {
    if (user.role === 'admin') {
      baseDashboardPath = '/admin/dashboard';
    } else if (user.role === 'member') {
      baseDashboardPath = '/member/dashboard';
    }
  }

  // If not logged in, prevent rendering sidebar (though PrivateRoute should handle this)
  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-full shadow-lg">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <nav className="flex-grow py-4">
        <ul className="space-y-2">
          {/* Always available routes for any dashboard */}
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
                  <FaUsers className="mr-3 text-xl" /> Manage Members
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
          {/* Announcements route is available for all roles within their respective dashboards */}
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
        </ul>
      </nav>
    </div>
  );
}

export default DashboardSidebar;