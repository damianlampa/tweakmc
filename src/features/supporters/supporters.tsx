import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { onCardMove } from '@/shared/utils/card-glow';
import { formatPln } from '@/shared/utils/format-shop-amount';
import { PlayerAvatar } from './components';
import { useShopActivity } from './hooks/use-shop-activity';

export function Supporters() {
  const { t, i18n } = useTranslation();

  const activity = useShopActivity();

  return (
    <div className="grid max-wide:grid-cols-1 grid-cols-[minmax(0,_1fr)_minmax(0,_1.15fr)] gap-5 mt-9">
      <div
        className={
          'flex flex-col min-w-0 p-[clamp(18px,_2.4vw,_24px)] rounded-[16px] ' +
          '[border:1px_solid_rgba(var(--bright-rgb),_0.22)] ' +
          '[background:radial-gradient(360px_220px_at_10%_0%,_rgba(var(--accent-rgb),_0.2),_transparent_70%),_linear-gradient(_155deg,_rgba(255,_255,_255,_0.04)_0%,_rgba(var(--accent-rgb),_0.06)_55%,_rgba(0,_0,_0,_0.22)_100%_),_var(--bg)] ' +
          "board-podium relative [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 " +
          '[&::before]:rounded-[inherit] ' +
          '[&::before]:[background:radial-gradient(_320px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(var(--bright-rgb),_0.12),_transparent_62%_)] ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(129,_140,_248,_0.2),_transparent_62%_)]'
        }
        onPointerMove={onCardMove}
      >
        <div className="[&_h3]:text-[1.12rem] flex items-center justify-between gap-3 mb-[16px]">
          <h3>{t('supporters.top')}</h3>
          {activity.isPreview && (
            <span className="font-mono text-[0.72rem] text-muted p-[3px_8px] rounded-[6px] [border:1px_solid_var(--line)] bg-surface">
              {t('supporters.preview')}
            </span>
          )}
        </div>

        <ol
          className="items-end list-none m-[auto_0_0] p-[12px_0_0] [flex:1] grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-3"
          aria-label={t('supporters.podium')}
        >
          {[1, 0, 2].map((rankId) => {
            const donor = activity.topDonors[rankId];

            if (!donor) return null;

            const place = rankId + 1;

            return (
              <li
                key={`${donor.nick}-${place}`}
                className={classes(
                  'podium-slot flex flex-col items-center min-w-0',
                  `podium-place-${place}`,
                )}
              >
                <div className="podium-player flex flex-col items-center gap-[6px] mb-[10px] w-full text-center">
                  <PlayerAvatar key={donor.nick} nick={donor.nick} />
                  <span className="[.podium-player_&]:max-w-full [.podium-player_&]:text-[0.9rem] font-semibold text-[0.94rem] text-ink overflow-hidden [text-overflow:ellipsis] whitespace-nowrap">
                    {donor.nick}
                  </span>
                  <strong className="[.podium-player_&]:ml-0 [.podium-player_&]:text-[0.92rem] ml-auto font-display text-[1rem] [font-variant-numeric:tabular-nums] text-accent-bright whitespace-nowrap">
                    {formatPln(donor.amount, i18n.language)}
                  </strong>
                </div>

                <div
                  className={
                    'w-full grid place-items-center rounded-[10px_10px_6px_6px] [border:1px_solid_var(--line-strong)] ' +
                    'bg-surface font-display font-bold text-[1.35rem] [.podium-place-1_&]:h-[112px] ' +
                    '[.podium-place-1_&]:[border-color:rgba(251,_191,_36,_0.5)] ' +
                    '[.podium-place-1_&]:[background:linear-gradient(180deg,_rgba(251,_191,_36,_0.2),_rgba(251,_191,_36,_0.04))] ' +
                    '[.podium-place-1_&]:[color:#fbbf24] [.podium-place-2_&]:h-[80px] ' +
                    '[.podium-place-2_&]:[border-color:rgba(226,_232,_240,_0.35)] ' +
                    '[.podium-place-2_&]:[background:linear-gradient(180deg,_rgba(226,_232,_240,_0.14),_rgba(226,_232,_240,_0.03))] ' +
                    '[.podium-place-2_&]:[color:#e2e8f0] [.podium-place-3_&]:h-[58px] ' +
                    '[.podium-place-3_&]:[border-color:rgba(251,_146,_60,_0.4)] ' +
                    '[.podium-place-3_&]:[background:linear-gradient(180deg,_rgba(251,_146,_60,_0.16),_rgba(251,_146,_60,_0.03))] ' +
                    '[.podium-place-3_&]:[color:#fb923c]'
                  }
                  aria-hidden="true"
                >
                  <span>#{place}</span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div
        className={
          'flex flex-col min-w-0 p-[clamp(18px,_2.4vw,_24px)] rounded-[16px] ' +
          '[border:1px_solid_rgba(var(--bright-rgb),_0.22)] ' +
          '[background:radial-gradient(360px_220px_at_10%_0%,_rgba(var(--accent-rgb),_0.2),_transparent_70%),_linear-gradient(_155deg,_rgba(255,_255,_255,_0.04)_0%,_rgba(var(--accent-rgb),_0.06)_55%,_rgba(0,_0,_0,_0.22)_100%_),_var(--bg)] ' +
          "relative [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 [&::before]:rounded-[inherit] " +
          '[&::before]:[background:radial-gradient(_320px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(var(--bright-rgb),_0.12),_transparent_62%_)] ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_rgba(129,_140,_248,_0.2),_transparent_62%_)]'
        }
        onPointerMove={onCardMove}
      >
        <div className="[&_h3]:text-[1.12rem] flex items-center justify-between gap-3 mb-[16px]">
          <h3>{t('supporters.recent')}</h3>
          {activity.isPreview && (
            <span className="font-mono text-[0.72rem] text-muted p-[3px_8px] rounded-[6px] [border:1px_solid_var(--line)] bg-surface">
              {t('supporters.preview')}
            </span>
          )}
        </div>

        <ul className="[&_li]:flex [&_li]:items-center [&_li]:gap-[12px] [&_li]:p-[7px_10px] [&_li]:rounded-[9px] [&_li]:bg-surface [&_li]:[border:1px_solid_var(--line)] list-none m-0 p-0 grid gap-2">
          {activity.recentPurchases.map((purchase, purchaseIndex) => {
            return (
              <li key={`${purchase.nick}-${purchaseIndex}`}>
                <PlayerAvatar key={purchase.nick} nick={purchase.nick} />

                <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
                  <span className="[.podium-player_&]:max-w-full [.podium-player_&]:text-[0.9rem] font-semibold text-[0.94rem] text-ink overflow-hidden [text-overflow:ellipsis] whitespace-nowrap">
                    {purchase.nick}
                  </span>
                  <span className="text-[0.78rem] text-muted">
                    {activity.isPreview ? t(purchase.timeAgo) : purchase.timeAgo}
                  </span>
                </div>

                <strong className="ml-auto font-mono text-[0.86rem] [font-variant-numeric:tabular-nums] text-ink whitespace-nowrap">
                  +{formatPln(purchase.amount, i18n.language)}
                </strong>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
