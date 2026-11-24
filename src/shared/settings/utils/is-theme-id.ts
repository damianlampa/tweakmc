import { THEMES, type ThemeId } from '@/shared/config/themes';

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && Object.hasOwn(THEMES, value);
}
