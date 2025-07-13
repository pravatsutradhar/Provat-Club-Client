import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from '../components/common/CustomToast';

// Fetch user's bookings
const fetchMyBookings = async () => {
  const { data } = await api.get('/bookings/my');
  return data.data;
};

export const useUserBookings = () => {
  return useQuery({
    queryKey: ['myBookings'], // Query key for user's bookings
    queryFn: fetchMyBookings,
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    // Adding retry for network errors
    retry: 3,
    retryDelay: 1000,
  });
};

// Cancel a booking
const cancelBookingRequest = async (bookingId) => {
  const { data } = await api.put(`/bookings/${bookingId}/cancel`);
  return data;
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBookingRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Booking cancelled successfully!');
      // Invalidate user's bookings query to refetch data after successful cancellation
      queryClient.invalidateQueries(['myBookings']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to cancel booking.';
      toast.error(errorMessage);
    },
  });
};