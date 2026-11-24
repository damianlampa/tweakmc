import { useOutletContext } from 'react-router';
import type { useSettings } from '@/shared/settings/hooks/use-settings';

export function useRouteSettings() {
  return useOutletContext<ReturnType<typeof useSettings>>();
}
