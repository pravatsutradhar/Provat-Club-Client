import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from '../components/common/CustomToast';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

// Fetch user's bookings
const fetchMyBookings = async () => {
  const { data } = await api.get('/bookings/my');
  return data.data;
};

export const useUserBookings = () => {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn status
  return useQuery({
    queryKey: ['myBookings'],
    queryFn: fetchMyBookings,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn, // <--- Only fetch if user is logged in
  });
};

// Cancel a booking (no change to this part)
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
      queryClient.invalidateQueries(['myBookings']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to cancel booking.';
      toast.error(errorMessage);
    },
  });
};