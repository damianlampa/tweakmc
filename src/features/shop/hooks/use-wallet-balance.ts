import { useEffect, useState } from 'react';
import { fetchWalletBalance } from '../api';
import { NICK_RE } from '@/shared/utils/player-name';

export function useWalletBalance(trimmedNick: string) {
  const validNick = NICK_RE.test(trimmedNick);
  const [wallet, setWallet] = useState<
    | { nick: string; status: 'idle' | 'offline' | 'loading'; balance: null }
    | { nick: string; status: 'connected'; balance: number }
  >({ nick: '', status: 'idle', balance: null });
  useEffect(() => {
    if (!validNick) return;

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setWallet({ nick: trimmedNick, status: 'loading', balance: null });
      try {
        const res = await fetchWalletBalance(trimmedNick, ctrl.signal);

        if (ctrl.signal.aborted) return;

        setWallet(
          res.connected
            ? { nick: trimmedNick, status: 'connected', balance: res.balance }
            : { nick: trimmedNick, status: 'offline', balance: null },
        );
      } catch {
        // A new name or unmount can cancel the request.
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [trimmedNick, validNick]);

  return wallet.nick === trimmedNick && validNick
    ? wallet
    : { status: 'idle' as const, balance: null };
}
