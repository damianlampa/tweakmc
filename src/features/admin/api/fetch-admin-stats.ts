import { isRecord } from '@/shared/utils/is-record';
import { site } from '@/shared/config/site';
import type { AdminStats } from '../types/admin-stats';
import { PREVIEW_ADMIN_STATS } from '../data/preview-admin-stats';

function isStats(value: unknown): value is Omit<AdminStats, 'isPreview'> {
  if (!isRecord(value)) return false;
  return (
    ['totalRevenue', 'monthRevenue', 'totalTransactions', 'avgOrder'].every(
      (key) => typeof value[key] === 'number',
    ) &&
    Array.isArray(value.daily) &&
    value.daily.every(
      (row: unknown) =>
        isRecord(row) && typeof row.day === 'string' && typeof row.amount === 'number',
    ) &&
    Array.isArray(value.transactions) &&
    value.transactions.every(
      (row: unknown) =>
        isRecord(row) &&
        typeof row.amount === 'number' &&
        ['id', 'nick', 'method', 'status', 'time'].every((key) => typeof row[key] === 'string'),
    )
  );
}

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
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) return PREVIEW_ADMIN_STATS;
    const data: unknown = await res.json();
    return isStats(data) ? { ...data, isPreview: false } : PREVIEW_ADMIN_STATS;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    return PREVIEW_ADMIN_STATS;
  }
}
