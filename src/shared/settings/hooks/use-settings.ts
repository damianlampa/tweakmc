import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { site } from '@/shared/config/site';
import { fetchPublicSettings } from '../api';
import { loadSettings, saveSettings, withThemePreview, type Settings } from '../settings';

const settingsKey = ['public-settings'] as const;

export function useSettings() {
  const client = useQueryClient();
  const [localSettings, setLocalSettings] = useState(loadSettings);
  const query = useQuery({
    queryKey: settingsKey,
    enabled: site.shopApiEnabled,
    staleTime: Infinity,
    queryFn: async ({ signal }) => {
      const remote = await fetchPublicSettings(signal);
      saveSettings(remote);
      return withThemePreview(remote);
    },
  });
  const settings = query.data ?? localSettings;

  const updateSettings = useCallback(
    (next: Settings) => {
      void client.cancelQueries({ queryKey: settingsKey });
      client.setQueryData(settingsKey, next);
      setLocalSettings(next);
      saveSettings(next);
    },
    [client],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.motion = settings.motion ? 'on' : 'off';
  }, [settings.theme, settings.motion]);

  return { settings, updateSettings, isLoading: query.isLoading };
}
