import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchCourts = async ({ queryKey }) => {
  const [_key, page, limit] = queryKey;
  // Ensure page and limit are correctly passed as query parameters
  const { data } = await api.get(`/courts?page=${page}&limit=${limit}`);
  return data; // Backend returns { success, count, total, pagination, data: [...] }
};

export const useCourts = (page = 1, limit = 6) => {
  return useQuery({
    queryKey: ['courts', page, limit],
    queryFn: fetchCourts,
    // placeholderData: (previousData) => previousData, // Good for smooth transitions between pages
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep displaying previous data until new data arrives
  });
};