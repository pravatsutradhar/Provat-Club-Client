import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchCourts = async ({ queryKey }) => {
  const [_key, page, limit] = queryKey;
  const { data } = await api.get(`/courts?page=${page}&limit=${limit}`);
  return data; // Backend now returns { success, count, total, pagination, data: [...] }
};

export const useCourts = (page = 1, limit = 6) => {
  return useQuery({
    queryKey: ['courts', page, limit],
    queryFn: fetchCourts,
    placeholderData: (previousData) => previousData, // Keep previous data while fetching new page
    staleTime: 5 * 60 * 1000, // 5 minutes
    keepPreviousData: true, // Keep displaying previous data until new data arrives
  });
};