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

  const res = await fetch(site.stripeCheckoutEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ nick, amount }),
  });

  const checkoutUrl = await readJsonResponse(res, checkoutUrlSchema);

  if (!checkoutUrl) {
    throw new Error('The checkout service did not return a valid session URL.');
  }

  return { mode: 'live', checkoutUrl };
}
