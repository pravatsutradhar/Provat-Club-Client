import React, { useState, useEffect } from 'react';
import { useAllAnnouncementsAdmin, useCreateAnnouncement, useUpdateAnnouncement, useDeleteAnnouncement } from '../../hooks/useAdminDashboard';
import { toast } from '../common/CustomToast';

// Form for adding/editing an announcement
const AnnouncementForm = ({ initialData = null, onClose, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isActive, setIsActive] = useState(initialData?.isActive !== undefined ? initialData.isActive : true);

  const isEditing = !!initialData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error('Please fill in both title and content.');
      return;
    }
    onSave({
      _id: initialData?._id, // Pass ID if editing
      title,
      content,
      isActive
    });
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto my-8 border border-blue-200">
      <h3 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 border-blue-200 pb-3 text-center tracking-tight drop-shadow-lg">
        {isEditing ? 'Edit Announcement' : 'Make New Announcement'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8">
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="announcementTitle">Title</label>
          <input type="text" id="announcementTitle" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength="100" />
        </div>
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="announcementContent">Content</label>
          <textarea id="announcementContent" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={content} onChange={(e) => setContent(e.target.value)} rows="5" required maxLength="1000"></textarea>
        </div>
        <div className="flex items-center mt-2">
          <input type="checkbox" id="isActive" className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-400" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
          <label htmlFor="isActive" className="ml-2 text-blue-700 text-base font-semibold">Is Active</label>
        </div>
        <div className="flex flex-col md:flex-row justify-end items-center space-y-3 md:space-y-0 md:space-x-4 mt-6">
          <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-xl shadow transition-all duration-200 text-lg">
            Cancel
          </button>
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg">
            {isEditing ? 'Update Announcement' : 'Publish Announcement'}
          </button>
        </div>
      </form>
    </div>
  );
};

function AdminManageAnnouncements() {
  const { data: announcements, isLoading, isError, error } = useAllAnnouncementsAdmin();
  const createAnnouncementMutation = useCreateAnnouncement();
  const updateAnnouncementMutation = useUpdateAnnouncement();
  const deleteAnnouncementMutation = useDeleteAnnouncement();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading announcements...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load announcements.'}</div>;
  }

  const handleSaveAnnouncement = (announcementData) => {
    if (announcementData._id) {
      updateAnnouncementMutation.mutate({ id: announcementData._id, announcementData });
    } else {
      createAnnouncementMutation.mutate(announcementData);
    }
    setShowAddForm(false);
    setEditingAnnouncement(null);
  };

  const handleDeleteAnnouncement = (announcementId, announcementTitle) => {
    if (window.confirm(`Are you sure you want to delete announcement "${announcementTitle}"? This action cannot be undone.`)) {
      deleteAnnouncementMutation.mutate(announcementId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Announcements</h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => { setShowAddForm(true); setEditingAnnouncement(null); }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Make New Announcement
        </button>
      </div>

      {(showAddForm || editingAnnouncement) && (
        <AnnouncementForm
          initialData={editingAnnouncement}
          onClose={() => { setShowAddForm(false); setEditingAnnouncement(null); }}
          onSave={handleSaveAnnouncement}
        />
      )}

      {announcements.length === 0 && !showAddForm ? (
        <p className="text-center text-gray-600 text-lg py-10">No announcements available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published By
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Active
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {announcements.map((announcement) => (
                <tr key={announcement._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {announcement.title}
                  </td>
                  <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-700" title={announcement.content}>
                    {announcement.content}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {announcement.author?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(announcement.publishedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      announcement.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {announcement.isActive ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingAnnouncement(announcement)}
                      className="text-blue-600 hover:text-blue-900 transition duration-200 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAnnouncement(announcement._id, announcement.title)}
                      className="text-red-600 hover:text-red-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={deleteAnnouncementMutation.status === 'pending' && deleteAnnouncementMutation.variables === announcement._id}
                    >
                      {deleteAnnouncementMutation.variables === announcement._id && deleteAnnouncementMutation.status === 'pending' ? 'Deleting...' : 'Delete'}
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

export default AdminManageAnnouncements;