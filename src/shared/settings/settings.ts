import { isRecord } from '@/shared/utils/is-record';
import { isThemeId, type ThemeId } from '@/shared/config/themes';
import { site } from '@/shared/config/site';

const STORAGE_KEY = 'tweakmc-admin-settings-v1';

const defaultSections = {
  mapPage: true,
  shopPage: true,
  topboards: true,
  hero: true,
  heroGlobe: true,
  ticker: true,
  modes: true,
  earthsmp: true,
  tank3d: true,
  join: true,
  discord: true,
  seasonFx: true,
};

export interface Settings {
  theme: ThemeId;
  motion: boolean;
  mapFrame: 'hud' | 'fullscreen' | 'tactical';
  maintenanceMsg: string;
  sections: typeof defaultSections;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: site.defaultTheme,
  motion: true,
  mapFrame: 'hud',
  maintenanceMsg: 'Ta sekcja jest chwilowo wyłączona przez administrację. Wrócimy za moment!',
  sections: defaultSections,
};

export function loadSettings(): Settings {
  const merged = {
    ...DEFAULT_SETTINGS,
    sections: { ...DEFAULT_SETTINGS.sections },
  };

  if (typeof window === 'undefined') return merged;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      if (isRecord(parsed)) {
        if (isThemeId(parsed.theme)) merged.theme = parsed.theme;
        if (typeof parsed.motion === 'boolean') merged.motion = parsed.motion;
        if (
          parsed.mapFrame === 'hud' ||
          parsed.mapFrame === 'tactical' ||
          parsed.mapFrame === 'fullscreen'
        )
          merged.mapFrame = parsed.mapFrame;
        if (typeof parsed.maintenanceMsg === 'string')
          merged.maintenanceMsg = parsed.maintenanceMsg;
        if (isRecord(parsed.sections)) {
          for (const key of Object.keys(defaultSections) as Array<keyof Settings['sections']>) {
            const value = parsed.sections[key];
            if (typeof value === 'boolean') merged.sections[key] = value;
          }
        }
      }
    }
  } catch {
    // ignore corrupt storage
  }

  const q = new URLSearchParams(window.location.search).get('motyw');
  if (isThemeId(q)) {
    merged.theme = q;
  }

  return merged;
}

export function saveSettings(next: Settings) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function resetSettings() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }

  return {
    ...DEFAULT_SETTINGS,
    sections: { ...DEFAULT_SETTINGS.sections },
  };
}
