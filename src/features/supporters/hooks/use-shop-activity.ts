import { useQuery } from '@tanstack/react-query';
import { fetchShopActivity } from '../api';
import { PREVIEW_SHOP_ACTIVITY } from '../data/preview-shop-activity';

export function useShopActivity() {
  const { data } = useQuery({
    queryKey: ['supporters', 'activity'],
    queryFn: ({ signal }) => fetchShopActivity(signal),
    staleTime: (query) => (query.state.data?.isPreview ? 0 : 30_000),
  });

  return data ?? PREVIEW_SHOP_ACTIVITY;
}
