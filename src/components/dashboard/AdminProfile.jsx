import React from 'react';
import { useUserProfile } from '../../hooks/useUserProfile'; // Re-use general user profile hook

function AdminProfile() {
  const { data: userProfile, isLoading, isError, error } = useUserProfile();

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading admin profile...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load admin profile.'}</div>;
  }

  if (!userProfile || userProfile.role !== 'admin') {
      return <div className="text-center text-red-600 text-lg py-10">Access Denied: Not an admin.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Admin Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={userProfile.image || 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Admin'} // Admin specific placeholder
          alt={`${userProfile.name} Admin Profile`}
          className="w-32 h-32 rounded-full object-cover border-4 border-red-500 shadow-md mb-4"
        />
        <h3 className="text-2xl font-semibold text-gray-900">{userProfile.name}</h3>
        <p className="text-gray-600">{userProfile.email}</p>
      </div>

      <div className="text-lg text-gray-700">
        <p className="mb-2"><span className="font-semibold">Role:</span> <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Administrator</span></p>
        <p className="mb-2"><span className="font-semibold">Registration Date:</span> {new Date(userProfile.registrationDate).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default AdminProfile;