import { useState } from 'react';
import { Icon } from '@/shared/components/icons';
import { NICK_RE } from '@/shared/utils/player-name';

export function PlayerAvatar({ nick }: { nick: string }) {
  const [failed, setFailed] = useState(false);
  const valid = NICK_RE.test(nick || '');

  return (
    <span
      className={
        '[.podium-slot_&]:w-[46px] [.podium-slot_&]:h-[46px] [.podium-slot_&]:rounded-[10px] ' +
        '[.podium-slot_&]:[transition:transform_0.25s_var(--ease)] [.podium-slot.podium-place-1_&]:w-[56px] ' +
        '[.podium-slot.podium-place-1_&]:h-[56px] ' +
        '[.podium-slot.podium-place-1_&]:border-amber-400/65 ' +
        '[.podium-slot.podium-place-1_&]:[box-shadow:0_0_22px_-4px_theme(colors.amber.400/45%)] ' +
        '[.podium-slot:hover_&]:[transform:translateY(-4px)_scale(1.06)] w-[32px] h-[32px] shrink-0 rounded-[7px] ' +
        'bg-background christmas:bg-christmas-background halloween:bg-halloween-background spring:bg-spring-background ' +
        '[border:1px_solid_theme(colors.white/9%)] grid place-items-center text-muted christmas:text-christmas-muted halloween:text-halloween-muted ' +
        'spring:text-spring-muted overflow-hidden [&_img]:w-full ' +
        '[&_img]:h-full [&_img]:[image-rendering:pixelated]'
      }
      aria-hidden="true"
    >
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
