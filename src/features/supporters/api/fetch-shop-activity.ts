import { readJsonResponse } from '@/shared/utils/read-json-response';
import { site } from '@/shared/config/site';
import { shopActivitySchema } from '../schemas/shop-activity';
import type { ShopActivity } from '../types/shop-activity';
import { PREVIEW_SHOP_ACTIVITY } from '../data/preview-shop-activity';

export async function fetchShopActivity(signal: AbortSignal): Promise<ShopActivity> {
  if (!site.shopApiEnabled) {
    return PREVIEW_SHOP_ACTIVITY;
  }

  try {
    const res = await fetch(site.shopActivityEndpoint, {
      signal,
      headers: { Accept: 'application/json' },
    });

    const activity = await readJsonResponse(res, shopActivitySchema);

    return activity ? { ...activity, isPreview: false } : PREVIEW_SHOP_ACTIVITY;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;

    return PREVIEW_SHOP_ACTIVITY;
  }
}
