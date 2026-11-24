import { site } from '@/shared/config/site';

export function clampAmount(raw: string | number) {
  const num = parseFloat(String(raw).replace(',', '.'));

  if (Number.isNaN(num)) return site.shopMin;

  return Math.round(Math.min(site.shopMax, Math.max(site.shopMin, num)) * 100) / 100;
}
