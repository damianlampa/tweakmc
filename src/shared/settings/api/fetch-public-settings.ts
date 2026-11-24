import { site } from '@/shared/config/site';
import { readJsonResponse } from '@/shared/utils/read-json-response';
import { publicSettingsSchema } from '../schemas/public-settings';

export async function fetchPublicSettings(signal: AbortSignal) {
  const response = await fetch(site.publicSettingsEndpoint, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    credentials: 'omit',
    signal: AbortSignal.any([signal, AbortSignal.timeout(5000)]),
  });
  const settings = await readJsonResponse(response, publicSettingsSchema);

  if (!settings) throw new Error('Invalid public settings response.');

  return settings;
}
