import { useQuery } from '@tanstack/react-query';
import { fetchAdminStats } from '../api';

export function useAdminStats() {
  const { data } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: ({ signal }) => fetchAdminStats(signal),
    gcTime: 0,
  });

  return data;
}
