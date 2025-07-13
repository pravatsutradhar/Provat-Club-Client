import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from '../components/common/CustomToast';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

// Fetch user's payment history
const fetchPaymentHistory = async () => {
  const { data } = await api.get('/payments/my');
  return data.data;
};

export const usePaymentHistory = () => {
  const { isLoggedIn, user } = useAuth();
  return useQuery({
    queryKey: ['paymentHistory'],
    queryFn: fetchPaymentHistory,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && (user?.role === 'member' || user?.role === 'admin'), // Only fetch if logged in and member/admin
  });
};

// Validate a coupon code (no change)
const validateCouponCode = async (code) => {
  const { data } = await api.get(`/coupons/validate/${code}`);
  return data.data;
};

export const useCouponValidation = () => {
  return useMutation({
    mutationFn: validateCouponCode,
    onSuccess: (data) => {
      toast.success(`Coupon "${data.code}" applied! ${data.discountPercentage}% off.`);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Invalid or expired coupon.';
      toast.error(errorMessage);
    },
  });
};

// Process a payment and confirm booking (no change)
const processPaymentRequest = async (paymentDetails) => {
  const { data } = await api.post('/payments', paymentDetails);
  return data;
};

export const useProcessPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: processPaymentRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Payment successful and booking confirmed!');
      queryClient.invalidateQueries(['approvedBookings']);
      queryClient.invalidateQueries(['confirmedBookings']);
      queryClient.invalidateQueries(['paymentHistory']);
      queryClient.invalidateQueries(['myBookings']);
      queryClient.invalidateQueries(['userProfile']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Payment failed. Please try again.';
      toast.error(errorMessage);
    },
  });
};