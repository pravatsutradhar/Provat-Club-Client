import React from 'react';

function AnnouncementsList() {
  // For now, static data. Will fetch from API later.
  const announcements = [
    { id: 1, title: 'New Gym Equipment Available!', content: 'We\'ve added state-of-the-art treadmills and weight benches. Check them out!', date: '2025-07-01' },
    { id: 2, title: 'Summer Camp Registration Open', content: 'Enroll your kids in our exciting summer sports camp. Limited slots!', date: '2025-06-15' },
    { id: 3, title: 'Club Maintenance Notice', content: 'Swimming pool closed for maintenance on July 20th.', date: '2025-07-05' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Announcements</h2>

      {announcements.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">No new announcements at the moment.</p>
      ) : (
        <div className="space-y-6">
          {announcements.map(announcement => (
            <div key={announcement.id} className="border border-gray-200 p-4 rounded-md bg-gray-50">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{announcement.title}</h3>
              <p className="text-gray-700 mb-3">{announcement.content}</p>
              <p className="text-sm text-gray-500">Published: {new Date(announcement.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnouncementsList;