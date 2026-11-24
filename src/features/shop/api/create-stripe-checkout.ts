import { isRecord } from '@/shared/utils/is-record';
import { site } from '@/shared/config/site';

export async function createStripeCheckout({
  nick,
  amount,
}: {
  nick: string;
  amount: number;
}): Promise<{ mode: 'preview' } | { mode: 'live'; checkoutUrl: string }> {
  if (!site.shopApiEnabled) {
    return { mode: 'preview' };
  }

  try {
    const res = await fetch(site.stripeCheckoutEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ nick, amount }),
    });
    const contentType = res.headers.get('content-type') || '';

    if (res.ok && contentType.includes('application/json')) {
      const data: unknown = await res.json();

      if (!isRecord(data)) return { mode: 'preview' };

      const checkoutUrl = data.url || data.checkoutUrl;

      if (typeof checkoutUrl === 'string' && checkoutUrl) {
        return { mode: 'live', checkoutUrl };
      }
    }

    return { mode: 'preview' };
  } catch {
    return { mode: 'preview' };
  }
}
