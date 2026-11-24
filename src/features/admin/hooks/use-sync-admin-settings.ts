import { useMutation } from '@tanstack/react-query';
import { syncAdminSettings } from '../api';

export function useSyncAdminSettings() {
  return useMutation({
    mutationFn: syncAdminSettings,
    scope: { id: 'admin-settings' },
  });
}
