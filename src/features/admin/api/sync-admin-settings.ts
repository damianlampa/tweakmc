import { site } from '@/shared/config/site';
import type { Settings } from '@/shared/settings/settings';
import { readJsonResponse } from '@/shared/utils/read-json-response';
import { settingsSaveConfirmationSchema } from '../schemas/settings-save-confirmation';

export async function syncAdminSettings(settings: Settings) {
  if (!site.shopApiEnabled) {
    return { synced: false, mode: 'local' };
  }

  try {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      credentials: 'include',
      redirect: 'error',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(settings),
    });

    const synced =
      res.status === 204 ||
      (res.status === 200 &&
        (await readJsonResponse(res, settingsSaveConfirmationSchema)) !== null);

    return { synced, mode: synced ? 'remote' : 'local' };
  } catch {
    return { synced: false, mode: 'local' };
  }
}
