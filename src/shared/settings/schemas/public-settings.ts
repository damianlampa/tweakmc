import { z } from 'zod';
import type { ThemeId } from '@/shared/config/themes';
import { DEFAULT_SETTINGS, type Settings } from '../settings';
import { isThemeId } from '../utils/is-theme-id';

const sectionKeys = Object.keys(DEFAULT_SETTINGS.sections) as Array<keyof Settings['sections']>;

export const publicSettingsSchema = z
  .object({
    theme: z.custom<ThemeId>(isThemeId),
    motion: z.boolean(),
    mapFrame: z.enum(['hud', 'fullscreen', 'tactical']),
    maintenanceMsg: z.string(),
    sections: z.partialRecord(z.enum(sectionKeys), z.boolean()),
  })
  .partial()
  .refine((settings) => Object.keys(settings).length > 0)
  .transform((settings) => ({
    ...DEFAULT_SETTINGS,
    ...settings,
    sections: { ...DEFAULT_SETTINGS.sections, ...settings.sections },
  }));
