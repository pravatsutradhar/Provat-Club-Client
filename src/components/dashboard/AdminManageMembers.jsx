import React, { useState, useMemo } from 'react';
import { useAllUsersAdmin, useDeleteUser } from '../../hooks/useAdminDashboard'; // Re-use hooks
import { toast } from '../common/CustomToast';

function AdminManageMembers() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: allUsers, isLoading, isError, error } = useAllUsersAdmin();
  const deleteUserMutation = useDeleteUser();

  const members = useMemo(() => {
    return allUsers ? allUsers.filter(user => user.role === 'member') : [];
  }, [allUsers]);

  const filteredMembers = useMemo(() => {
    return members.filter(member =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [members, searchTerm]);

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading members...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load members.'}</div>;
  }

  const handleDeleteMember = (memberId, memberName) => {
    if (window.confirm(`Are you sure you want to delete member "${memberName}"? This action cannot be undone.`)) {
      deleteUserMutation.mutate(memberId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Members</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search member by name or email..."
          className="form-input w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">No members found matching your search.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Since
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {member.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {member.memberSince ? new Date(member.memberSince).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteMember(member._id, member.name)}
                      className="text-red-600 hover:text-red-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={deleteUserMutation.status === 'pending' && deleteUserMutation.variables === member._id}
                    >
                      {deleteUserMutation.variables === member._id && deleteUserMutation.status === 'pending' ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminManageMembers;