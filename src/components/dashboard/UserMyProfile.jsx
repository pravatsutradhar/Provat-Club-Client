import React, { useState } from 'react';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useAuth } from '../../contexts/AuthContext';
import ImageUpload from '../common/ImageUpload';
import api from '../../services/api';

function UserMyProfile() {
  const { data: userProfile, isLoading, isError, error, refetch } = useUserProfile();
  const { user, setUser } = useAuth();
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (url) => {
    setUploading(true);
    try {
      await api.put('/users/profile', { image: url });
      // Update AuthContext and localStorage
      const updatedUser = { ...user, image: url };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      refetch();
    } catch (err) {
      alert('Failed to update profile image');
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading profile...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load profile.'}</div>;
  }

  if (!userProfile) {
    return <div className="text-center text-gray-600 text-lg py-10">No user data available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">My Profile</h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={userProfile.image || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User'}
          alt={`${userProfile.name} Profile`}
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md mb-4"
        />
        <ImageUpload onUpload={handleImageUpload} />
        {uploading && <p>Updating image...</p>}
        <h3 className="text-2xl font-semibold text-gray-900">{userProfile.name}</h3>
        <p className="text-gray-600">{userProfile.email}</p>
      </div>
      <div className="text-lg text-gray-700">
        <p className="mb-2"><span className="font-semibold">Role:</span> {userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}</p>
        <p className="mb-2"><span className="font-semibold">Registration Date:</span> {new Date(userProfile.registrationDate).toLocaleDateString()}</p>
        {userProfile.role === 'member' && userProfile.memberSince && (
          <p><span className="font-semibold">Member Since:</span> {new Date(userProfile.memberSince).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  );
}

export default UserMyProfile;