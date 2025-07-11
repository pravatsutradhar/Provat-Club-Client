import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

const fetchUsers = async () => {
  const { data } = await api.get('/users');
  return data.data; // Backend response is { success, count, data: [...] }
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};