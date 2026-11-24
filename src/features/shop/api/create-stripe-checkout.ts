import { readJsonResponse } from '@/shared/utils/read-json-response';
import { site } from '@/shared/config/site';
import { checkoutUrlSchema } from '../schemas/checkout-url';

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

    const checkoutUrl = await readJsonResponse(res, checkoutUrlSchema);

    return checkoutUrl ? { mode: 'live', checkoutUrl } : { mode: 'preview' };
  } catch {
    return { mode: 'preview' };
  }
}
