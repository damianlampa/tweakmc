import { readJsonResponse } from '@/shared/utils/read-json-response';
import { site } from '@/shared/config/site';
import { walletBalanceSchema } from '../schemas/wallet-balance';

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

    const balance = await readJsonResponse(res, walletBalanceSchema);

    return balance === null ? { connected: false, balance: null } : { connected: true, balance };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;

    return { connected: false, balance: null };
  }
}
