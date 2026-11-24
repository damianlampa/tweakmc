import { site } from '@/shared/config/site';
import type { Settings } from '@/shared/settings/settings';

export async function syncAdminSettings(settings: Settings) {
  if (!site.shopApiEnabled) {
    return { synced: false, mode: 'local' };
  }

  try {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(settings),
    });

    return { synced: res.ok, mode: res.ok ? 'remote' : 'local' };
  } catch {
    return { synced: false, mode: 'local' };
  }
}
