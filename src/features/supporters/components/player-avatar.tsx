import { useState } from 'react';
import { Icon } from '@/shared/components/icons';
import { NICK_RE } from '@/shared/utils/player-name';

export function PlayerAvatar({ nick }: { nick: string }) {
  const [failed, setFailed] = useState(false);
  const valid = NICK_RE.test(nick || '');

  return (
    <span className="mini-avatar" aria-hidden="true">
      {valid && !failed ? (
        <img
          src={`https://mc-heads.net/avatar/${encodeURIComponent(nick)}/36`}
          alt=""
          width="32"
          height="32"
          onError={() => setFailed(true)}
        />
      ) : (
        Icon.user
      )}
    </span>
  );
}
