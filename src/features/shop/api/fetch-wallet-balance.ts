import { isRecord } from '@/shared/utils/is-record';
import { site } from '@/shared/config/site';

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
    const data: unknown = await res.json();
    if (!isRecord(data)) return { connected: false, balance: null };
    const raw = data.balance ?? data.wallet ?? data.amount;
    const balance = typeof raw === 'number' ? raw : parseFloat(String(raw));
    return {
      connected: true,
      balance: Number.isFinite(balance) ? balance : 0,
    };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    return { connected: false, balance: null };
  }
}
