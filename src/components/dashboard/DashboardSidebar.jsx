import React from 'react'; // No need for useState as we remove the toggle
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaUser, FaClipboardList, FaBullhorn, FaCreditCard, FaHistory, FaUsers, FaDumbbell, FaTicketAlt, FaChartBar, FaUserShield, FaCalendarCheck } from 'react-icons/fa';

function DashboardSidebar() {
  const { user, isLoggedIn } = useAuth();

  let baseDashboardPath = '/user/dashboard';
  if (isLoggedIn && user) {
    if (user.role === 'admin') {
      baseDashboardPath = '/admin/dashboard';
    } else if (user.role === 'member') {
      baseDashboardPath = '/member/dashboard';
    }
  }

  if (!isLoggedIn || !user) {
    return null; // Don't render sidebar if not logged in
  }

  const navItems = [
    {
      to: `${baseDashboardPath}/profile`,
      icon: FaUser,
      text: 'My Profile',
      roles: ['admin', 'member', 'user'],
    },
    {
      to: `${baseDashboardPath}/announcements`,
      icon: FaBullhorn,
      text: 'Announcements',
      roles: ['admin', 'member', 'user'],
    },
    {
      to: `${baseDashboardPath}/pending-bookings`,
      icon: FaClipboardList,
      text: 'Pending Bookings',
      roles: ['member', 'user'],
    },
    {
      to: `${baseDashboardPath}/approved-bookings`,
      icon: FaCreditCard,
      text: 'Approved Bookings',
      roles: ['member'],
    },
    {
      to: `${baseDashboardPath}/confirmed-bookings`,
      icon: FaCalendarCheck,
      text: 'Confirmed Bookings',
      roles: ['member'],
    },
    {
      to: `${baseDashboardPath}/payment-history`,
      icon: FaHistory,
      text: 'Payment History',
      roles: ['member'],
    },
    {
      to: `${baseDashboardPath}/overview`,
      icon: FaChartBar,
      text: 'Dashboard Overview',
      roles: ['admin'],
    },
    {
      to: `${baseDashboardPath}/manage-bookings-approval`,
      icon: FaClipboardList,
      text: 'Manage Approvals',
      roles: ['admin'],
    },
    {
      to: `${baseDashboardPath}/manage-members`,
      icon: FaUserShield,
      text: 'Manage Members',
      roles: ['admin'],
    },
    {
      to: `${baseDashboardPath}/all-users`,
      icon: FaUsers,
      text: 'All Users',
      roles: ['admin'],
    },
    {
      to: `${baseDashboardPath}/manage-courts`,
      icon: FaDumbbell,
      text: 'Manage Courts',
      roles: ['admin'],
    },
    {
      to: `${baseDashboardPath}/manage-all-bookings`,
      icon: FaCalendarCheck,
      text: 'Manage All Bookings',
      roles: ['admin'],
    },
    {
      to: `${baseDashboardPath}/manage-coupons`,
      icon: FaTicketAlt,
      text: 'Manage Coupons',
      roles: ['admin'],
    },
    {
      to: `${baseDashboardPath}/make-announcement`,
      icon: FaBullhorn,
      text: 'Make Announcement',
      roles: ['admin'],
    },
  ];

  return (
    <div className='bg-gradient-to-br from-blue-50 via-white to-blue-100 h-full'> {/* Ensure main div takes full height */}
      <div
        className={`w-12 md:w-64 bg-gray-800 text-white flex flex-col shadow-lg h-full`} // Fixed width for mobile, wider for desktop
        style={{ minHeight: '100vh' }}
      >
        <div className="p-4 md:p-6 border-b border-gray-700 flex items-center justify-center md:justify-between"> {/* Center content on mobile */}
          <h2 className="text-xl md:text-2xl font-bold hidden md:block">Dashboard</h2> {/* Hidden on mobile */}
          <h2 className="text-base md:hidden font-bold">Menu</h2> {/* "Menu" text for mobile if desired, or remove */}
        </div>
        <nav className="flex-grow py-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) =>
              item.roles.includes(user.role) && (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-center md:justify-start px-2 md:px-6 py-3 text-lg hover:bg-gray-700 transition-colors duration-200 ${
                        isActive ? 'bg-blue-600 font-semibold' : 'text-gray-300'
                      }`
                    }
                  >
                    <item.icon className="text-2xl md:mr-3" /> {/* Larger icon on mobile, with margin on desktop */}
                    <span className="hidden md:inline">{item.text}</span> {/* Text only on desktop */}
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default DashboardSidebar;