import React from 'react';
import { useAdminDashboardStats } from '../../hooks/useAdminDashboard';
import { FaUsers, FaDumbbell, FaBook, FaDollarSign, FaCreditCard } from 'react-icons/fa';

function AdminDashboardOverview() {
  const { data: stats, isLoading, isError, error } = useAdminDashboardStats();

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading dashboard stats...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load dashboard stats.'}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Dashboard Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Users Card */}
        <div className="bg-blue-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaUsers className="text-4xl text-blue-600" />
          <div>
            <p className="text-gray-600 text-lg">Total Users</p>
            <p className="text-3xl font-bold text-blue-800">{stats.totalUsers}</p>
          </div>
        </div>

        {/* Total Members Card */}
        <div className="bg-green-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaUsers className="text-4xl text-green-600" />
          <div>
            <p className="text-gray-600 text-lg">Total Members</p>
            <p className="text-3xl font-bold text-green-800">{stats.totalMembers}</p>
          </div>
        </div>

        {/* Total Courts Card */}
        <div className="bg-purple-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaDumbbell className="text-4xl text-purple-600" />
          <div>
            <p className="text-gray-600 text-lg">Total Courts</p>
            <p className="text-3xl font-bold text-purple-800">{stats.totalCourts}</p>
          </div>
        </div>

        {/* Pending Bookings Card */}
        <div className="bg-yellow-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaBook className="text-4xl text-yellow-600" />
          <div>
            <p className="text-gray-600 text-lg">Pending Bookings</p>
            <p className="text-3xl font-bold text-yellow-800">{stats.pendingBookings}</p>
          </div>
        </div>

        {/* Approved Bookings Card */}
        <div className="bg-indigo-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaBook className="text-4xl text-indigo-600" />
          <div>
            <p className="text-gray-600 text-lg">Approved Bookings</p>
            <p className="text-3xl font-bold text-indigo-800">{stats.approvedBookings}</p>
          </div>
        </div>

        {/* Confirmed Bookings Card */}
        <div className="bg-teal-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaBook className="text-4xl text-teal-600" />
          <div>
            <p className="text-gray-600 text-lg">Confirmed Bookings</p>
            <p className="text-3xl font-bold text-teal-800">{stats.confirmedBookings}</p>
          </div>
        </div>

        {/* Total Payments Card */}
        <div className="bg-orange-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaCreditCard className="text-4xl text-orange-600" />
          <div>
            <p className="text-gray-600 text-lg">Total Payments</p>
            <p className="text-3xl font-bold text-orange-800">{stats.totalPayments}</p>
          </div>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-red-100 p-6 rounded-lg flex items-center space-x-4 shadow-sm">
          <FaDollarSign className="text-4xl text-red-600" />
          <div>
            <p className="text-gray-600 text-lg">Total Revenue</p>
            <p className="text-3xl font-bold text-red-800">${stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardOverview;