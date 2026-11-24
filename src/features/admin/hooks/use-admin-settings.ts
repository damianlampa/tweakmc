import { useRouteSettings } from '@/router/use-route-settings';
import { resetSettings, type Settings } from '@/shared/settings/settings';
import { useAdminToast } from './use-admin-toast';
import { useSyncAdminSettings } from './use-sync-admin-settings';

export function useAdminSettings() {
  const { settings, updateSettings } = useRouteSettings();
  const { mutate, reset: dismissPendingFeedback } = useSyncAdminSettings();
  const { message, showToast } = useAdminToast();

  const applySettings = (next: Settings) => {
    updateSettings(next);
    mutate(next, {
      onSuccess: ({ synced }) => showToast(synced ? 'toast.synced' : 'toast.applied'),
    });
  };

  const restoreDefaults = () => {
    dismissPendingFeedback();
    updateSettings(resetSettings());
    showToast('toast.reset');
  };

  return { settings, applySettings, restoreDefaults, message };
}
