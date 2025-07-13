import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchUserProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data.data;
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'], // Query key for user's profile
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: 1000,
  });
};