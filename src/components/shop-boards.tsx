import { useState } from 'react';
import type { ShopActivity } from '../api/shop';
import { onCardMove } from '../utils/card-glow';
import { formatPln } from '../utils/format-shop-amount';
import { NICK_RE } from '../utils/player-name';
export function ShopAvatar({ nick, userIcon }: { nick: string; userIcon: React.ReactNode }) {
  return <PlayerAvatar key={nick} nick={nick} userIcon={userIcon} />;
}

function PlayerAvatar({ nick, userIcon }: { nick: string; userIcon: React.ReactNode }) {
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
        userIcon
      )}
    </span>
  );
}

export function ShopBoards({
  activity,
  userIcon,
}: {
  activity: ShopActivity;
  userIcon: React.ReactNode;
}) {
  return (
    <div className="shop-board tw-grid tw-grid-cols-[minmax(0,_1fr)_minmax(0,_1.15fr)] tw-gap-[20px] tw-mt-[36px]">
      <div className="board-card board-podium glow-card" onPointerMove={onCardMove}>
        <div className="board-head tw-flex tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[16px]">
          <h3>Top 3 wpłat</h3>
          {activity.isPreview && <span className="board-tag">Podgląd UI</span>}
        </div>
        <ol className="podium" aria-label="Podium Top 3 wpłat">
          {[1, 0, 2].map((rankIdx) => {
            const d = activity.topDonors[rankIdx];
            if (!d) return null;
            const place = rankIdx + 1;
            return (
              <li key={`${d.nick}-${place}`} className={`podium-slot podium-place-${place}`}>
                <div className="podium-player tw-flex tw-flex-col tw-items-center tw-gap-[6px] tw-mb-[10px] tw-w-full tw-text-center">
                  <ShopAvatar nick={d.nick} userIcon={userIcon} />
                  <span className="donor-nick">{d.nick}</span>
                  <strong className="donor-amt">{formatPln(d.amount)}</strong>
                </div>
                <div className="podium-step" aria-hidden="true">
                  <span>#{place}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="board-card glow-card" onPointerMove={onCardMove}>
        <div className="board-head tw-flex tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[16px]">
          <h3>5 ostatnich zakupów</h3>
          {activity.isPreview && <span className="board-tag">Podgląd UI</span>}
        </div>
        <ul className="recent-list tw-list-none tw-m-0 tw-p-0 tw-grid tw-gap-[8px]">
          {activity.recentPurchases.map((p, idx) => (
            <li key={`${p.nick}-${idx}`}>
              <ShopAvatar nick={p.nick} userIcon={userIcon} />
              <div className="tw-flex tw-items-baseline tw-gap-[8px] tw-min-w-0 tw-flex-wrap">
                <span className="donor-nick">{p.nick}</span>
                <span className="tw-text-[0.78rem] tw-text-muted">{p.timeAgo}</span>
              </div>
              <strong className="recent-amt">+{formatPln(p.amount)}</strong>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
