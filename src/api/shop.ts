import { site } from '../config';

/**
 * Pobiera aktualne saldo /portfel gracza z pluginu Minecraft.
 * Oczekiwany JSON z backendu: { balance: number } (lub { wallet: number }).
 * W trybie lokalnego podglądu (bez backendu) zwraca { connected: false, balance: null }.
 */
export async function fetchWalletBalance(
  nick: string,
  signal: AbortSignal,
): Promise<{ connected: true; balance: number } | { connected: false; balance: null }> {
  if (!site.shopApiEnabled) {
    return { connected: false, balance: null };
  }
  try {
    const res = await fetch(`${site.walletApiBase}?nick=${encodeURIComponent(nick)}`, {
      signal,
      headers: { Accept: 'application/json' },
    });
    const contentType = res.headers.get('content-type') || '';
    if (!res.ok || !contentType.includes('application/json')) {
      return { connected: false, balance: null };
    }
    const data = await res.json();
    const raw = data.balance ?? data.wallet ?? data.amount;
    const balance = typeof raw === 'number' ? raw : parseFloat(raw);
    return {
      connected: true,
      balance: Number.isFinite(balance) ? balance : 0,
    };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    return { connected: false, balance: null };
  }
}

/**
 * Tworzy sesję płatności Stripe Checkout.
 * Po opłaceniu webhook Stripe po stronie backendu wysyła doładowanie do pluginu MC (/portfel).
 * Oczekiwany JSON z backendu: { url: "https://checkout.stripe.com/..." }
 */
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
      const data = await res.json();
      const checkoutUrl = data.url || data.checkoutUrl;
      if (checkoutUrl) {
        return { mode: 'live', checkoutUrl };
      }
    }
    return { mode: 'preview' };
  } catch {
    return { mode: 'preview' };
  }
}

// Dane poglądowe UI (wyświetlane tylko gdy shopApiEnabled === false)
export const PREVIEW_SHOP_ACTIVITY = {
  isPreview: true,
  topDonors: [
    { nick: 'Gracz_01', amount: 250 },
    { nick: 'Gracz_02', amount: 150 },
    { nick: 'Gracz_03', amount: 100 },
  ],
  recentPurchases: [
    { nick: 'Gracz_01', amount: 50, timeAgo: 'przed chwilą' },
    { nick: 'Gracz_04', amount: 25, timeAgo: '12 min temu' },
    { nick: 'Gracz_02', amount: 100, timeAgo: '38 min temu' },
    { nick: 'Gracz_05', amount: 10, timeAgo: '1 godz. temu' },
    { nick: 'Gracz_03', amount: 50, timeAgo: '2 godz. temu' },
  ],
};

/**
 * Pobiera Top 3 wpłat oraz 5 ostatnich zakupów z backendu sklepu/pluginu MC.
 * Oczekiwany JSON: { topDonors: [{ nick, amount }], recentPurchases: [{ nick, amount, timeAgo }] }
 */
export type ShopActivity = typeof PREVIEW_SHOP_ACTIVITY;
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
    const data = await res.json();
    return {
      isPreview: false,
      topDonors: Array.isArray(data.topDonors) ? data.topDonors.slice(0, 3) : [],
      recentPurchases: Array.isArray(data.recentPurchases) ? data.recentPurchases.slice(0, 5) : [],
    };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    return PREVIEW_SHOP_ACTIVITY;
  }
}
