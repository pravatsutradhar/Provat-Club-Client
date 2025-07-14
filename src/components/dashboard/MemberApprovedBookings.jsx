import React from 'react';
import { useApprovedBookings, useCancelBookingForMember } from '../../hooks/useMemberDashboard';
import { useNavigate } from 'react-router-dom';

function MemberApprovedBookings() {
  const { data: approvedBookings, isLoading, isError, error } = useApprovedBookings();
  const cancelBookingMutation = useCancelBookingForMember();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading approved bookings...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load approved bookings.'}</div>;
  }

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this approved booking? This cannot be undone.')) {
      cancelBookingMutation.mutate(bookingId);
    }
  };

  const handlePayment = (booking) => {
    navigate(`/payment/${booking._id}`, { state: { bookingData: booking } }); // Pass booking data via state
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Approved Bookings (Awaiting Payment)</h2>

      {approvedBookings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">You have no approved bookings awaiting payment.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Court
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slots
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {approvedBookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {booking.court?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.court?.type || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {booking.selectedSlots.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-bold">
                    ${booking.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handlePayment(booking)}
                      className="text-green-600 hover:text-green-900 transition duration-200 mr-3"
                    >
                      Payment
                    </button>
                    <button
                      onClick={() => handleCancelBooking(booking._id)}
                      className="text-red-600 hover:text-red-900 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={cancelBookingMutation.status === 'pending' && cancelBookingMutation.variables === booking._id}
                    >
                      {cancelBookingMutation.variables === booking._id && cancelBookingMutation.status === 'pending' ? 'Cancelling...' : 'Cancel'}
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

export default MemberApprovedBookings;