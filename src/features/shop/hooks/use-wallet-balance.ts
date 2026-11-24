import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { NICK_RE } from '@/shared/utils/player-name';
import { fetchWalletBalance } from '../api';

export function useWalletBalance(nick: string) {
  const [settledNick, setSettledNick] = useState('');
  const validNick = NICK_RE.test(nick);

  useEffect(() => {
    if (!validNick) return;

    const timer = setTimeout(() => setSettledNick(nick), 350);

    return () => clearTimeout(timer);
  }, [nick, validNick]);

  const enabled = validNick && settledNick === nick;
  const { data, isFetching } = useQuery({
    queryKey: ['shop', 'wallet', nick],
    queryFn: ({ signal }) => fetchWalletBalance(nick, signal),
    enabled,
  });

  if (!enabled) return { status: 'idle', balance: null } as const;
  if (data?.connected) return { status: 'connected', balance: data.balance } as const;

  return { status: isFetching ? 'loading' : 'offline', balance: null } as const;
}
