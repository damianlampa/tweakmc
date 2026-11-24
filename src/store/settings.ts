import { isThemeId, type ThemeId } from '../themes';
import { site } from '../config';

const STORAGE_KEY = 'tweakmc-admin-settings-v1';

export const DEFAULT_SETTINGS = {
  theme: site.defaultTheme as ThemeId,
  motion: true,
  mapFrame: 'hud', // 'hud' | 'fullscreen' | 'tactical'
  maintenanceMsg: 'Ta sekcja jest chwilowo wyłączona przez administrację. Wrócimy za moment!',
  sections: {
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
  },
};

export type Settings = typeof DEFAULT_SETTINGS;

export function loadSettings(): Settings {
  let merged = {
    ...DEFAULT_SETTINGS,
    sections: { ...DEFAULT_SETTINGS.sections },
  };
  if (typeof window === 'undefined') return merged;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      merged = {
        ...merged,
        ...parsed,
        sections: { ...merged.sections, ...(parsed.sections || {}) },
      };
    }
  } catch {
    // ignore corrupt storage
  }

  // Parametr URL ?motyw= pozwala przetestować sezon od razu
  const q = new URLSearchParams(window.location.search).get('motyw');
  if (isThemeId(q)) {
    merged.theme = q;
  }
  if (!isThemeId(merged.theme)) merged.theme = 'default';
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
