import React, { useState, useEffect } from 'react';
import { useCourts } from '../hooks/useCourts';
import CourtCard from '../components/courts/CourtCard';
import { toast } from '../components/common/CustomToast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BookingModal from '../components/courts/BookingModal';

function CourtsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState('card');

  // State for Booking Modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCourtForBooking, setSelectedCourtForBooking] = useState(null);

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth(); // Crucial for checking login status

  // Fetch courts using the custom hook with current page and limit
  const { data, isLoading, isError, error, isFetching } = useCourts(currentPage, itemsPerPage);

  // Error handling for Toast
  useEffect(() => {
    if (isError) {
      toast.error(error.message || 'Failed to fetch courts.');
    }
  }, [isError, error]);

  const courts = data?.data || [];
  const totalCourts = data?.total || 0;
  const pagination = data?.pagination || {};

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(totalCourts / itemsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setItemsPerPage(mode === 'card' ? 6 : 10); // As per requirements
    setCurrentPage(1); // Reset to first page on view mode change
  };

  // Unified function to open the booking modal
  const handleOpenBookingModal = (court) => {
    if (!isLoggedIn) { // Check login status here
      toast.info('Please log in to book a court.');
      navigate('/login');
    } else {
      setSelectedCourtForBooking(court);
      setIsBookingModalOpen(true);
    }
  };

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedCourtForBooking(null); // Clear selected court when modal closes
  };

  if (isLoading && !isFetching) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-150px)] text-xl font-semibold">
        Loading courts...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">Our Courts</h1>

      {/* View Mode & Pagination Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0">
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewModeChange('card')}
            className={`px-4 py-2 rounded-md transition duration-300 ${
              viewMode === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Card View
          </button>
          <button
            onClick={() => handleViewModeChange('table')}
            className={`px-4 py-2 rounded-md transition duration-300 ${
              viewMode === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Table View
          </button>
        </div>

        {/* Pagination */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isFetching}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-lg font-medium">Page {currentPage} of {Math.ceil(totalCourts / itemsPerPage) || 1}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.next || isFetching}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {isFetching && <div className="text-center text-blue-500 mb-4">Loading more courts...</div>}

      {courts.length === 0 && !isLoading && !isFetching ? (
        <div className="text-center text-xl text-gray-600 mt-10">No courts available at the moment.</div>
      ) : (
        <>
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {courts.map((court) => (
                <CourtCard
                  key={court._id}
                  court={court}
                  onBookNowClick={handleOpenBookingModal} // Pass the handler
                />
              ))}
            </div>
          )}

          {viewMode === 'table' && (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Court Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price/Session
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courts.map((court) => (
                    <tr key={court._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {court.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {court.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                        ${court.pricePerSession.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleOpenBookingModal(court)} // Direct call to the unified handler
                          className="text-blue-600 hover:text-blue-900 transition duration-200"
                        >
                          Book Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Render the single Booking Modal here, controlled by state in CourtsPage */}
      {selectedCourtForBooking && ( // Only render if a court is selected
        <BookingModal
          isOpen={isBookingModalOpen}
          onRequestClose={handleCloseBookingModal}
          court={selectedCourtForBooking} // Pass the dynamically selected court
        />
      )}
    </div>
  );
}

export default CourtsPage;