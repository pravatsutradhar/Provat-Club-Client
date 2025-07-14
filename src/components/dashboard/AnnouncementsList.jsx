import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // You can use your own axios instance

function AnnouncementsList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log('AnnouncementsList component rendered', announcements);

  
useEffect(() => {
  const fetchAnnouncements = async () => {
    try {
      const response = await api.get('/announcements'); // this becomes http://localhost:5000/api/announcements
      console.log('Fetched announcements:', response.data.data); // ✅ Debug log
      setAnnouncements(response.data.data || []);
    } catch (err) {
      console.error('Error fetching:', err);
      setError('Failed to fetch announcements.');
    } finally {
      setLoading(false);
    }
  };

  fetchAnnouncements();
}, []);
  if (loading) {
    return <p className="text-center text-gray-600 text-lg py-10">Loading announcements...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600 text-lg py-10">{error}</p>;
  }

  if (!announcements.length) {
    return <p className="text-center text-gray-600 text-lg py-10">No announcements available.</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Announcements</h2>

      <div className="space-y-6">
        {announcements.map((announcement) => (
          <div key={announcement._id} className="border border-gray-200 p-4 rounded-md bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
            <p className="text-gray-700 mb-3">{announcement.content}</p>
            <p className="text-sm text-gray-500">
              Published: {new Date(announcement.publishedDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-400">
              By: {announcement.author?.name || 'Unknown'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnnouncementsList;
