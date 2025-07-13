import React from 'react';
import { useUsers } from '../hooks/useUsers';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth
import { Navigate } from 'react-router-dom'; // Import Navigate

function UsersPage() {
  const { user, loading: authLoading } = useAuth(); // Get user and auth loading
  const { data: users, isLoading, isError, error } = useUsers();

  // Redirect if not admin and auth has loaded
  if (!authLoading && (!user || user.role !== 'admin')) {
    // Show a toast if you want to explicitly tell them they were redirected
    // toast.error("You are not authorized to view this page.");
    return <Navigate to="/" replace />; // Redirect to home or a suitable unauthorized page
  }

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading users...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error fetching users: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">All Users (Admin View)</h1>
      {users && users.length > 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member Since</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'member' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{new Date(user.registrationDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {user.memberSince ? new Date(user.memberSince).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg py-10">No users found.</p>
      )}
    </div>
  );
}

export default UsersPage;