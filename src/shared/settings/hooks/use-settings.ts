import { useCallback, useEffect, useState } from 'react';
import { loadSettings, saveSettings, type Settings } from '../settings';

export function useSettings() {
  const [settings, setSettings] = useState(() => loadSettings());
  const updateSettings = useCallback((next: Settings) => {
    setSettings(next);
    saveSettings(next);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = settings.theme;
    document.documentElement.dataset.motion = settings.motion ? 'on' : 'off';
  }, [settings.theme, settings.motion]);

  return { settings, updateSettings };
}
