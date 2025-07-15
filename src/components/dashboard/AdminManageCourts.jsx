import React, { useState, useEffect } from 'react';
import { useCourts } from '../../hooks/useCourts'; // Re-use public courts hook
import { useAddCourt, useUpdateCourt, useDeleteCourt } from '../../hooks/useAdminDashboard';
import { toast } from '../common/CustomToast';
import ImageUpload from '../common/ImageUpload';

// Form for adding/editing a court
const CourtForm = ({ initialData = null, onClose, onSave }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState(initialData?.type || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [pricePerSession, setPricePerSession] = useState(initialData?.pricePerSession || '');
  const [capacity, setCapacity] = useState(initialData?.capacity || '');
  const [description, setDescription] = useState(initialData?.description || '');

  const isEditing = !!initialData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !type || !pricePerSession || !capacity) {
      toast.error('Please fill in all required fields: Name, Type, Price, Capacity.');
      return;
    }
    onSave({
      _id: initialData?._id, // Pass ID if editing
      name, type, image,
      pricePerSession: Number(pricePerSession),
      capacity: Number(capacity),
      description
    });
  };

  const handleImageUpload = (url) => setImage(url);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto my-8 border border-blue-200">
      <h3 className="text-3xl font-extrabold text-blue-800 mb-6 border-b-2 border-blue-200 pb-3 text-center tracking-tight drop-shadow-lg">
        {isEditing ? 'Edit Court' : 'Add New Court'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="courtName">Name</label>
          <input type="text" id="courtName" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="courtType">Type</label>
          <select id="courtType" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Select Type</option>
            {['Tennis', 'Badminton', 'Squash', 'Basketball', 'Volleyball', 'Table Tennis', 'Padel'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col items-center">
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="image">Court Image</label>
          <ImageUpload onUpload={handleImageUpload} />
          {image && <img src={image} alt="Court Preview" className="mt-4 w-32 h-32 object-cover rounded-2xl border-4 border-blue-300 shadow-lg" />}
        </div>
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="pricePerSession">Price Per Session</label>
          <input type="number" id="pricePerSession" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={pricePerSession} onChange={(e) => setPricePerSession(e.target.value)} required min="0" step="0.01" />
        </div>
        <div>
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="capacity">Capacity</label>
          <input type="number" id="capacity" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={capacity} onChange={(e) => setCapacity(e.target.value)} required min="1" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-blue-700 text-base font-semibold mb-2" htmlFor="description">Description</label>
          <textarea id="description" className="form-input w-full rounded-xl border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition p-3 text-lg" value={description} onChange={(e) => setDescription(e.target.value)} rows="3" maxLength="500"></textarea>
        </div>
        <div className="md:col-span-2 flex flex-col md:flex-row justify-end items-center space-y-3 md:space-y-0 md:space-x-4 mt-6">
          <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-xl shadow transition-all duration-200 text-lg">
            Cancel
          </button>
          <button type="submit" className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-2 px-8 rounded-xl shadow-lg transition-all duration-200 text-lg">
            {isEditing ? 'Update Court' : 'Add Court'}
          </button>
        </div>
      </form>
    </div>
  );
};

function AdminManageCourts() {
  // We'll use useCourts to fetch all courts, and set a high limit for admin view.
  const { data: courtsData, isLoading, isError, error } = useCourts(1, 100); // Fetch all courts (or a very high limit)
  const addCourtMutation = useAddCourt();
  const updateCourtMutation = useUpdateCourt();
  const deleteCourtMutation = useDeleteCourt();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null); // Holds court data if in edit mode

  const courts = courtsData?.data || [];

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading courts...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load courts.'}</div>;
  }

  const handleSaveCourt = (courtData) => {
    if (courtData._id) { // If _id exists, it's an update
      updateCourtMutation.mutate({ id: courtData._id, courtData });
    } else { // Otherwise, it's a new add
      addCourtMutation.mutate(courtData);
    }
    setShowAddForm(false);
    setEditingCourt(null);
  };

  const handleDeleteCourt = (courtId, courtName) => {
    if (window.confirm(`Are you sure you want to delete court "${courtName}"? This action cannot be undone.`)) {
      deleteCourtMutation.mutate(courtId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Manage Courts</h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => { setShowAddForm(true); setEditingCourt(null); }}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Add New Court
        </button>
      </div>

      {(showAddForm || editingCourt) && (
        <CourtForm
          initialData={editingCourt}
          onClose={() => { setShowAddForm(false); setEditingCourt(null); }}
          onSave={handleSaveCourt}
        />
      )}

      {courts.length === 0 && !showAddForm ? (
        <p className="text-center text-gray-600 text-lg py-10">No courts available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courts.map((court) => (
                <tr key={court._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={court.image || 'https://via.placeholder.com/50x50?text=Court'} alt={court.name} className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {court.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {court.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${court.pricePerSession.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {court.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setEditingCourt(court)}
                      className="text-blue-600 hover:text-blue-900 transition duration-200 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCourt(court._id, court.name)}
                      className="text-red-600 hover:text-red-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={deleteCourtMutation.status === 'pending' && deleteCourtMutation.variables === court._id}
                    >
                      {deleteCourtMutation.variables === court._id && deleteCourtMutation.status === 'pending' ? 'Deleting...' : 'Delete'}
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

export default AdminManageCourts;