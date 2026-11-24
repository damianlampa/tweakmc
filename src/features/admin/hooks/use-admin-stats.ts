import { useState, useEffect } from 'react';
import type { AdminStats } from '../types/admin-stats';
import { fetchAdminStats } from '../api';

export function useAdminStats(authed: boolean) {
  const [stats, setStats] = useState<AdminStats | null>(null);
  useEffect(() => {
    if (!authed) return;

    const ctrl = new AbortController();
    fetchAdminStats(ctrl.signal)
      .then((d) => setStats(d))
      .catch(() => {});

    return () => ctrl.abort();
  }, [authed]);

  return stats;
}
