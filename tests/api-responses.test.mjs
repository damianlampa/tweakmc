import assert from 'node:assert/strict';
import { test } from 'node:test';
import { adminStatsSchema } from '../src/features/admin/schemas/admin-stats.ts';
import { checkoutUrlSchema } from '../src/features/shop/schemas/checkout-url.ts';
import { walletBalanceSchema } from '../src/features/shop/schemas/wallet-balance.ts';
import { shopActivitySchema } from '../src/features/supporters/schemas/shop-activity.ts';
import { readJsonResponse } from '../src/shared/utils/read-json-response.ts';

const { Response } = globalThis;

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
