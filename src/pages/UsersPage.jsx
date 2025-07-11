import React from 'react';
import { useUsers } from '../hooks/useUsers';

function UsersPage() {
  const { data: users, isLoading, isError, error } = useUsers();

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (isError) {
    return <div>Error fetching users: {error.message}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Users</h1>
      {users && users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Registered:</strong> {new Date(user.registrationDate).toLocaleDateString()}</p>
              {user.role === 'member' && (
                <p><strong>Member Since:</strong> {new Date(user.memberSince).toLocaleDateString()}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

export default UsersPage;