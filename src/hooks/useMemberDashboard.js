import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from '../components/common/CustomToast';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

// Fetch member's approved bookings (pending payment)
const fetchApprovedBookings = async () => {
  const { data } = await api.get('/bookings/my/approved');
  return data.data;
};

export const useApprovedBookings = () => {
  const { isLoggedIn, user } = useAuth(); // Check user role as well
  return useQuery({
    queryKey: ['approvedBookings'],
    queryFn: fetchApprovedBookings,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && (user?.role === 'member' || user?.role === 'admin'), // Only fetch if logged in and member/admin
  });
};

// Fetch member's confirmed bookings (paid)
const fetchConfirmedBookings = async () => {
  const { data } = await api.get('/bookings/my/confirmed');
  return data.data;
};

export const useConfirmedBookings = () => {
  const { isLoggedIn, user } = useAuth();
  return useQuery({
    queryKey: ['confirmedBookings'],
    queryFn: fetchConfirmedBookings,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && (user?.role === 'member' || user?.role === 'admin'), // Only fetch if logged in and member/admin
  });
};

// Mutation to cancel any booking (re-using the one from useUserBookings but available here too)
const cancelBookingRequest = async (bookingId) => {
  const { data } = await api.put(`/bookings/${bookingId}/cancel`);
  return data;
};

export const useCancelBookingForMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBookingRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Booking cancelled successfully!');
      queryClient.invalidateQueries(['approvedBookings']);
      queryClient.invalidateQueries(['confirmedBookings']);
      queryClient.invalidateQueries(['myBookings']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to cancel booking.';
      toast.error(errorMessage);
    },
  });
};