import type { Settings } from '../store/settings';
import { site } from '../config';

// Dane poglądowe zarobków do panelu admina (gdy shopApiEnabled === false)
export const PREVIEW_ADMIN_STATS = {
  isPreview: true,
  totalRevenue: 4825.0,
  monthRevenue: 1460.0,
  totalTransactions: 118,
  avgOrder: 40.89,
  daily: [
    { day: 'Pon', amount: 185 },
    { day: 'Wt', amount: 240 },
    { day: 'Śr', amount: 150 },
    { day: 'Czw', amount: 310 },
    { day: 'Pt', amount: 425 },
    { day: 'Sob', amount: 540 },
    { day: 'Nd', amount: 390 },
  ],
  transactions: [
    {
      id: 'TX-1048',
      nick: 'Gracz_01',
      amount: 50,
      method: 'BLIK',
      status: 'Dopisano /portfel',
      time: 'przed chwilą',
    },
    {
      id: 'TX-1047',
      nick: 'Gracz_04',
      amount: 25,
      method: 'Apple Pay',
      status: 'Dopisano /portfel',
      time: '12 min temu',
    },
    {
      id: 'TX-1046',
      nick: 'Gracz_02',
      amount: 100,
      method: 'BLIK',
      status: 'Dopisano /portfel',
      time: '38 min temu',
    },
    {
      id: 'TX-1045',
      nick: 'Gracz_05',
      amount: 10,
      method: 'Karta',
      status: 'Dopisano /portfel',
      time: '1 godz. temu',
    },
    {
      id: 'TX-1044',
      nick: 'Gracz_03',
      amount: 50,
      method: 'Google Pay',
      status: 'Dopisano /portfel',
      time: '2 godz. temu',
    },
  ],
};

/**
 * Pobiera statystyki zarobków Stripe + plugin MC z backendu (/api/admin/stats).
 * W trybie podglądu (shopApiEnabled === false) zwraca oznaczone dane poglądowe.
 */
export type AdminStats = typeof PREVIEW_ADMIN_STATS;
export async function fetchAdminStats(signal: AbortSignal): Promise<AdminStats> {
  if (!site.shopApiEnabled) {
    return PREVIEW_ADMIN_STATS;
  }
  try {
    const res = await fetch('/api/admin/stats', {
      signal,
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok || !ct.includes('application/json')) return PREVIEW_ADMIN_STATS;
    const data = await res.json();
    return { isPreview: false, ...data };
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') throw err;
    return PREVIEW_ADMIN_STATS;
  }
}

/**
 * Zapisuje ustawienia panelu admina na backendzie (/api/admin/settings), gdy API jest podpięte.
 */
export async function syncAdminSettings(settings: Settings) {
  if (!site.shopApiEnabled) {
    return { synced: false, mode: 'local' };
  }
  try {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(settings),
    });
    return { synced: res.ok, mode: res.ok ? 'remote' : 'local' };
  } catch {
    return { synced: false, mode: 'local' };
  }
}
