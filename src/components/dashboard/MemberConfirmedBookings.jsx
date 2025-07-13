import React from 'react';
import { useConfirmedBookings, useCancelBookingForMember } from '../../hooks/useMemberDashboard'; // Re-use cancel mutation
// Removed useNavigate and toast as direct actions are not here (or handled by mutation hook)

function MemberConfirmedBookings() {
  const { data: confirmedBookings, isLoading, isError, error } = useConfirmedBookings();
  const cancelBookingMutation = useCancelBookingForMember(); // Still allow cancellation (if logic permits)

  if (isLoading) {
    return <div className="text-center text-gray-600 text-lg py-10">Loading confirmed bookings...</div>;
  }

  if (isError) {
    return <div className="text-center text-red-600 text-lg py-10">Error: {error.message || 'Failed to load confirmed bookings.'}</div>;
  }

  const handleCancelBooking = (bookingId) => {
    // Note: Backend logic prevents canceling paid/confirmed bookings.
    // This button might be removed or conditionally rendered later based on strict rules.
    // For now, it's here as per requirement, but it should mostly result in an error toast.
    if (window.confirm('Are you sure you want to cancel this confirmed booking? This will likely require admin intervention for refunds.')) {
      cancelBookingMutation.mutate(bookingId);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Confirmed Bookings</h2>

      {confirmedBookings.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">You have no confirmed bookings.</p>
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
                  Payment Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {confirmedBookings.map((booking) => (
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
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Backend prevents cancellation of paid/confirmed, so this button is mostly for UX */}
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

export default MemberConfirmedBookings;