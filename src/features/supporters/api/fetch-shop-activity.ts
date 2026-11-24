import { isRecord } from '@/shared/utils/is-record';
import { site } from '@/shared/config/site';
import type { Donor, ShopActivity } from '../types/shop-activity';
import { PREVIEW_SHOP_ACTIVITY } from '../data/preview-shop-activity';

function isDonor(value: unknown): value is Donor {
  return isRecord(value) && typeof value.nick === 'string' && typeof value.amount === 'number';
}
function isPurchase(value: unknown): value is ShopActivity['recentPurchases'][number] {
  return isDonor(value) && 'timeAgo' in value && typeof value.timeAgo === 'string';
}

export async function fetchShopActivity(signal: AbortSignal): Promise<ShopActivity> {
  if (!site.shopApiEnabled) {
    return PREVIEW_SHOP_ACTIVITY;
  }
  try {
    const res = await fetch(site.shopActivityEndpoint, {
      signal,
      headers: { Accept: 'application/json' },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      return PREVIEW_SHOP_ACTIVITY;
    }
    const data: unknown = await res.json();
    if (!isRecord(data)) return PREVIEW_SHOP_ACTIVITY;
    return {
      isPreview: false,
      topDonors: Array.isArray(data.topDonors) ? data.topDonors.filter(isDonor).slice(0, 3) : [],
      recentPurchases: Array.isArray(data.recentPurchases)
        ? data.recentPurchases.filter(isPurchase).slice(0, 5)
        : [],
    };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    return PREVIEW_SHOP_ACTIVITY;
  }
}
