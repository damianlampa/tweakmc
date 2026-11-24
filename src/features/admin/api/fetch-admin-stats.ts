import { readJsonResponse } from '@/shared/utils/read-json-response';
import { site } from '@/shared/config/site';
import { adminStatsSchema } from '../schemas/admin-stats';
import type { AdminStats } from '../types/admin-stats';
import { PREVIEW_ADMIN_STATS } from '../data/preview-admin-stats';

export async function fetchAdminStats(signal: AbortSignal): Promise<AdminStats> {
  if (!site.shopApiEnabled) {
    return PREVIEW_ADMIN_STATS;
  }

  try {
    const res = await fetch('/api/admin/stats', {
      signal,
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });

    const stats = await readJsonResponse(res, adminStatsSchema);

    return stats ? { ...stats, isPreview: false } : PREVIEW_ADMIN_STATS;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;

    return PREVIEW_ADMIN_STATS;
  }
}
