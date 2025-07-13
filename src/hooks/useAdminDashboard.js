import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { toast } from '../components/common/CustomToast';
import { useAuth } from '../contexts/AuthContext';

// --- Admin Dashboard Stats ---
const fetchDashboardStats = async () => {
  const { data } = await api.get('/admin/stats');
  return data.data;
};

export const useAdminDashboardStats = () => {
  const { user, isLoggedIn } = useAuth();
  return useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && user?.role === 'admin',
  });
};

// --- Admin Manage Bookings (Approval Requests) ---
const fetchBookingRequests = async () => {
  const { data } = await api.get('/bookings/admin/requests');
  return data.data;
};

export const useAdminBookingRequests = () => {
  const { user, isLoggedIn } = useAuth();
  return useQuery({
    queryKey: ['adminBookingRequests'],
    queryFn: fetchBookingRequests,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && user?.role === 'admin',
  });
};

const updateBookingStatusRequest = async ({ id, status }) => {
  const { data } = await api.put(`/bookings/admin/status/${id}`, { status });
  return data;
};

export const useUpdateBookingStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBookingStatusRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Booking status updated successfully!');
      queryClient.invalidateQueries(['adminBookingRequests']); // Invalidate requests list
      queryClient.invalidateQueries(['myBookings']); // Invalidate user's general bookings
      queryClient.invalidateQueries(['approvedBookings']); // If it moves to approved
      queryClient.invalidateQueries(['confirmedBookings']); // If it moves to confirmed
      queryClient.invalidateQueries(['userProfile']); // User might become member
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to update booking status.';
      toast.error(errorMessage);
    },
  });
};

// --- Admin Manage Confirmed Bookings ---
const fetchAdminConfirmedBookings = async () => {
  const { data } = await api.get('/bookings/admin/confirmed');
  return data.data;
};

export const useAdminConfirmedBookings = () => {
  const { user, isLoggedIn } = useAuth();
  return useQuery({
    queryKey: ['adminConfirmedBookings'],
    queryFn: fetchAdminConfirmedBookings,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && user?.role === 'admin',
  });
};

// --- Admin Manage Users/Members ---
// Re-use useUsers for all users, but ensure it's protected in the component/route if not already
// const { useUsers } from './useUsers'; (already exists)

const fetchAllUsersAdmin = async () => {
  const { data } = await api.get('/users'); // This endpoint should be admin protected in backend
  return data.data;
};

export const useAllUsersAdmin = () => {
  const { user, isLoggedIn } = useAuth();
  return useQuery({
    queryKey: ['allUsersAdmin'],
    queryFn: fetchAllUsersAdmin,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && user?.role === 'admin',
  });
};

const deleteUserRequest = async (userId) => {
  const { data } = await api.delete(`/users/${userId}`); // Need this endpoint in user routes
  return data;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'User deleted successfully!');
      queryClient.invalidateQueries(['allUsersAdmin']);
      queryClient.invalidateQueries(['adminDashboardStats']); // Stats might change
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to delete user.';
      toast.error(errorMessage);
    },
  });
};

// --- Admin Manage Courts ---
// Re-use useCourts for fetching, but need admin specific mutations
// const { useCourts } from './useCourts'; (already exists)

const addCourtRequest = async (courtData) => {
  const { data } = await api.post('/courts', courtData);
  return data;
};

export const useAddCourt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCourtRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Court added successfully!');
      queryClient.invalidateQueries(['courts']); // Invalidate public court list
      queryClient.invalidateQueries(['adminDashboardStats']); // Stats might change
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to add court.';
      toast.error(errorMessage);
    },
  });
};

const updateCourtRequest = async ({ id, courtData }) => {
  const { data } = await api.put(`/courts/${id}`, courtData);
  return data;
};

export const useUpdateCourt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCourtRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Court updated successfully!');
      queryClient.invalidateQueries(['courts']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to update court.';
      toast.error(errorMessage);
    },
  });
};

const deleteCourtRequest = async (courtId) => {
  const { data } = await api.delete(`/courts/${courtId}`);
  return data;
};

export const useDeleteCourt = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCourtRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Court deleted successfully!');
      queryClient.invalidateQueries(['courts']);
      queryClient.invalidateQueries(['adminDashboardStats']); // Stats might change
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to delete court.';
      toast.error(errorMessage);
    },
  });
};

// --- Admin Manage Coupons ---
const fetchAllCoupons = async () => {
  const { data } = await api.get('/coupons'); // Admin endpoint
  return data.data;
};

export const useAllCoupons = () => {
  const { user, isLoggedIn } = useAuth();
  return useQuery({
    queryKey: ['allCoupons'],
    queryFn: fetchAllCoupons,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn && user?.role === 'admin',
  });
};

const addCouponRequest = async (couponData) => {
  const { data } = await api.post('/coupons', couponData);
  return data;
};

export const useAddCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCouponRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Coupon added successfully!');
      queryClient.invalidateQueries(['allCoupons']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to add coupon.';
      toast.error(errorMessage);
    },
  });
};

const updateCouponRequest = async ({ id, couponData }) => {
  const { data } = await api.put(`/coupons/${id}`, couponData);
  return data;
};

export const useUpdateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCouponRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Coupon updated successfully!');
      queryClient.invalidateQueries(['allCoupons']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to update coupon.';
      toast.error(errorMessage);
    },
  });
};

const deleteCouponRequest = async (couponId) => {
  const { data } = await api.delete(`/coupons/${couponId}`);
  return data;
};

export const useDeleteCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCouponRequest,
    onSuccess: (data) => {
      toast.success(data.message || 'Coupon deleted successfully!');
      queryClient.invalidateQueries(['allCoupons']);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Failed to delete coupon.';
      toast.error(errorMessage);
    },
  });
};


// --- Announcements (General use, but admin also manages) ---
// This is the public facing one, admin has a separate one for all
// export const useAnnouncements = () => { ... } (already exists in useUserDashboard or shared)
const fetchAnnouncements = async () => {
    const { data } = await api.get('/announcements');
    return data.data;
};

export const useAnnouncements = () => {
    return useQuery({
        queryKey: ['announcements'],
        queryFn: fetchAnnouncements,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: 1000,
    });
};

// Admin Specific Announcements
const fetchAllAnnouncementsAdmin = async () => {
  const { data } = await api.get('/announcements/admin');
  return data.data;
};

export const useAllAnnouncementsAdmin = () => {
    const { user, isLoggedIn } = useAuth();
    return useQuery({
        queryKey: ['allAnnouncementsAdmin'],
        queryFn: fetchAllAnnouncementsAdmin,
        staleTime: 5 * 60 * 1000,
        retry: 3,
        retryDelay: 1000,
        enabled: isLoggedIn && user?.role === 'admin',
    });
};

const createAnnouncementRequest = async (announcementData) => {
    const { data } = await api.post('/announcements', announcementData);
    return data;
};

export const useCreateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAnnouncementRequest,
        onSuccess: (data) => {
            toast.success(data.message || 'Announcement created successfully!');
            queryClient.invalidateQueries(['announcements']); // Invalidate public list
            queryClient.invalidateQueries(['allAnnouncementsAdmin']); // Invalidate admin list
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to create announcement.';
            toast.error(errorMessage);
        },
    });
};

const updateAnnouncementRequest = async ({ id, announcementData }) => {
    const { data } = await api.put(`/announcements/admin/${id}`, announcementData);
    return data;
};

export const useUpdateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateAnnouncementRequest,
        onSuccess: (data) => {
            toast.success(data.message || 'Announcement updated successfully!');
            queryClient.invalidateQueries(['announcements']);
            queryClient.invalidateQueries(['allAnnouncementsAdmin']);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to update announcement.';
            toast.error(errorMessage);
        },
    });
};

const deleteAnnouncementRequest = async (announcementId) => {
    const { data } = await api.delete(`/announcements/admin/${announcementId}`);
    return data;
};

export const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteAnnouncementRequest,
        onSuccess: (data) => {
            toast.success(data.message || 'Announcement deleted successfully!');
            queryClient.invalidateQueries(['announcements']);
            queryClient.invalidateQueries(['allAnnouncementsAdmin']);
        },
        onError: (error) => {
            const errorMessage = error.response?.data?.message || 'Failed to delete announcement.';
            toast.error(errorMessage);
        },
    });
};