import { useRouteSettings } from '@/router/use-route-settings';
import { resetSettings, type Settings } from '@/shared/settings/settings';
import { useAdminToast } from './use-admin-toast';
import { useSyncAdminSettings } from './use-sync-admin-settings';

export function useAdminSettings() {
  const { settings, updateSettings } = useRouteSettings();
  const { mutate } = useSyncAdminSettings();
  const { message, showToast } = useAdminToast();

  const applySettings = (next: Settings, restoringDefaults = false) => {
    updateSettings(next);
    mutate(next, {
      onSuccess: ({ synced }) => {
        if (restoringDefaults) {
          showToast(synced ? 'toast.reset' : 'toast.resetLocal');
          return;
        }

        showToast(synced ? 'toast.synced' : 'toast.applied');
      },
    });
  };

  const restoreDefaults = () => {
    applySettings(resetSettings(), true);
  };

  return { settings, applySettings, restoreDefaults, message };
}
