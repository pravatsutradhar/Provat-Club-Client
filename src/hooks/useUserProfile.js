import { useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth

const fetchUserProfile = async () => {
  const { data } = await api.get('/users/profile');
  return data.data;
};

export const useUserProfile = () => {
  const { isLoggedIn } = useAuth(); // Get isLoggedIn status

  return useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: 1000,
    enabled: isLoggedIn, // <--- Only fetch if user is logged in
  });
};