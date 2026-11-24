import assert from 'node:assert/strict';
import { test } from 'node:test';
import { adminStatsSchema } from '../src/features/admin/schemas/admin-stats.ts';
import { settingsSaveConfirmationSchema } from '../src/features/admin/schemas/settings-save-confirmation.ts';
import { checkoutUrlSchema } from '../src/features/shop/schemas/checkout-url.ts';
import { walletBalanceSchema } from '../src/features/shop/schemas/wallet-balance.ts';
import { parseTopUpAmount } from '../src/features/shop/utils/parse-top-up-amount.ts';
import { site } from '../src/shared/config/site.ts';
import { shopActivitySchema } from '../src/features/supporters/schemas/shop-activity.ts';
import { readJsonResponse } from '../src/shared/utils/read-json-response.ts';

const { Response } = globalThis;

test('requires an explicit JSON confirmation of an admin settings save', async () => {
  const confirmation = { saved: true };
  assert.deepEqual(
    await readJsonResponse(Response.json(confirmation), settingsSaveConfirmationSchema),
    confirmation,
  );

  for (const response of [
    new Response('<html>Sign in</html>', { headers: { 'Content-Type': 'text/html' } }),
    Response.json({}),
    Response.json({ saved: false }),
    Response.json({ saved: 'true' }),
    Response.json(confirmation, { status: 403 }),
  ]) {
    assert.equal(await readJsonResponse(response, settingsSaveConfirmationSchema), null);
  }
});

test('accepts only checkout amounts in range that can be paid exactly in grosze', () => {
  for (const input of ['', '2', '1000.01', '25.999', '10abc', '1e2']) {
    assert.equal(parseTopUpAmount(input, site.shopMin, site.shopMax), null, input);
  }

  for (const [input, expected] of [
    ['5', 5],
    ['1000.00', 1000],
    ['12,34', 12.34],
    ['5.01', 5.01],
  ]) {
    assert.equal(parseTopUpAmount(input, site.shopMin, site.shopMax), expected, input);
  }
});

test('keeps valid ranking entries in server order and caps both lists', () => {
  const entries = Array.from({ length: 6 }, (_, index) => ({
    nick: 'Player' + index,
    amount: index,
  }));
  const purchases = entries.map((entry) => ({ ...entry, timeAgo: 'now' }));

  const activity = shopActivitySchema.parse({
    topDonors: [null, ...entries],
    recentPurchases: [entries[0], ...purchases],
  });

  assert.deepEqual(activity.topDonors, entries.slice(0, 3));
  assert.deepEqual(activity.recentPurchases, purchases.slice(0, 5));
});

test('accepts supported wallet aliases and distinguishes zero from invalid data', () => {
  for (const key of ['balance', 'wallet', 'amount']) {
    assert.equal(walletBalanceSchema.parse({ [key]: '12.50' }), 12.5);
  }

  assert.equal(walletBalanceSchema.parse({ balance: 0 }), 0);
  for (const body of [{}, { balance: '' }, { balance: '7abc' }, { wallet: null }]) {
    assert.equal(walletBalanceSchema.safeParse(body).success, false);
  }
});

test('validates checkout destinations for both supported response fields', () => {
  assert.equal(
    checkoutUrlSchema.parse({ url: 'https://checkout.stripe.com/pay/demo' }),
    'https://checkout.stripe.com/pay/demo',
  );
  assert.equal(checkoutUrlSchema.parse({ checkoutUrl: '/checkout/demo' }), '/checkout/demo');
  assert.equal(checkoutUrlSchema.safeParse({ url: 'javascript:void(0)' }).success, false);
  assert.equal(checkoutUrlSchema.safeParse({ url: 42 }).success, false);
});

test('checks the HTTP response and nested admin statistics before exposing them', async () => {
  const stats = {
    totalRevenue: 1,
    monthRevenue: 1,
    totalTransactions: 1,
    avgOrder: 1,
    daily: [{ day: 'Mon', amount: 1 }],
    transactions: [],
  };
  assert.deepEqual(await readJsonResponse(Response.json(stats), adminStatsSchema), stats);
  assert.equal(
    await readJsonResponse(Response.json({ ...stats, daily: [{ day: 'Mon' }] }), adminStatsSchema),
    null,
  );
  assert.equal(
    await readJsonResponse(Response.json(stats, { status: 403 }), adminStatsSchema),
    null,
  );
  assert.equal(await readJsonResponse(new Response('<html></html>'), adminStatsSchema), null);
});
