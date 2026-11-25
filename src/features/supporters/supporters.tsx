import { cardSpotlight } from '@/shared/styles/background-classes';
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
    <div className="grid max-lg:grid-cols-1 grid-cols-[minmax(0,_1fr)_minmax(0,_1.15fr)] gap-5 mt-9">
      <div
        className={
          'flex flex-col min-w-0 p-[clamp(18px,_2.4vw,_24px)] rounded-[16px] ' +
          '[border:1px_solid_theme(colors.purple.400/22%)] christmas:[border:1px_solid_theme(colors.sky.300/22%)] ' +
          'halloween:[border:1px_solid_theme(colors.orange.300/22%)] spring:[border:1px_solid_theme(colors.emerald.300/22%)] ' +
          '[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.purple.600/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.purple.600/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.background)] ' +
          'christmas:[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.sky.500/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.sky.500/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.christmas.background)] ' +
          'halloween:[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.orange.600/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.orange.600/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.halloween.background)] ' +
          'spring:[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.emerald.500/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.emerald.500/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.spring.background)] ' +
          "board-podium relative [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 " +
          '[&::before]:rounded-[inherit] ' +
          cardSpotlight +
          ' ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]'
        }
        onPointerMove={onCardMove}
      >
        <div className="[&_h3]:text-lg/relaxed flex items-center justify-between gap-3 mb-[16px]">
          <h3>{t('supporters.top')}</h3>
          {activity.isPreview && (
            <span
              className={
                'font-mono text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted p-[3px_8px] rounded-[6px] ' +
                '[border:1px_solid_theme(colors.white/9%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface'
              }
            >
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
                  <span className="[.podium-player_&]:max-w-full [.podium-player_&]:text-sm/relaxed font-semibold text-base/relaxed text-ink overflow-hidden [text-overflow:ellipsis] whitespace-nowrap">
                    {donor.nick}
                  </span>
                  <strong
                    className={
                      '[.podium-player_&]:ml-0 [.podium-player_&]:text-sm/relaxed ml-auto font-display text-base/relaxed [font-variant-numeric:tabular-nums] text-purple-400 ' +
                      'christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 whitespace-nowrap'
                    }
                  >
                    {formatPln(donor.amount, i18n.language)}
                  </strong>
                </div>

                <div
                  className={
                    'w-full grid place-items-center rounded-[10px_10px_6px_6px] [border:1px_solid_theme(colors.white/18%)] ' +
                    'bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface font-display font-bold text-xl/tight [.podium-place-1_&]:h-[112px] ' +
                    '[.podium-place-1_&]:border-amber-400/50 ' +
                    '[.podium-place-1_&]:[background:linear-gradient(180deg,_theme(colors.amber.400/20%),_theme(colors.amber.400/4%))] ' +
                    '[.podium-place-1_&]:text-amber-400 [.podium-place-2_&]:h-[80px] ' +
                    '[.podium-place-2_&]:border-slate-200/35 ' +
                    '[.podium-place-2_&]:[background:linear-gradient(180deg,_theme(colors.slate.200/14%),_theme(colors.slate.200/3%))] ' +
                    '[.podium-place-2_&]:text-slate-200 [.podium-place-3_&]:h-[58px] ' +
                    '[.podium-place-3_&]:border-orange-400/40 ' +
                    '[.podium-place-3_&]:[background:linear-gradient(180deg,_theme(colors.orange.400/16%),_theme(colors.orange.400/3%))] ' +
                    '[.podium-place-3_&]:text-orange-400'
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
          '[border:1px_solid_theme(colors.purple.400/22%)] christmas:[border:1px_solid_theme(colors.sky.300/22%)] ' +
          'halloween:[border:1px_solid_theme(colors.orange.300/22%)] spring:[border:1px_solid_theme(colors.emerald.300/22%)] ' +
          '[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.purple.600/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.purple.600/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.background)] ' +
          'christmas:[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.sky.500/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.sky.500/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.christmas.background)] ' +
          'halloween:[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.orange.600/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.orange.600/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.halloween.background)] ' +
          'spring:[background:radial-gradient(360px_220px_at_10%_0%,_theme(colors.emerald.500/20%),_transparent_70%),_linear-gradient(_155deg,_theme(colors.white/4%)_0%,_theme(colors.emerald.500/6%)_55%,_theme(colors.black/22%)_100%_),_theme(colors.spring.background)] ' +
          "relative [&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 [&::before]:rounded-[inherit] " +
          cardSpotlight +
          ' ' +
          '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none ' +
          '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1] ' +
          '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]'
        }
        onPointerMove={onCardMove}
      >
        <div className="[&_h3]:text-lg/relaxed flex items-center justify-between gap-3 mb-[16px]">
          <h3>{t('supporters.recent')}</h3>
          {activity.isPreview && (
            <span
              className={
                'font-mono text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted p-[3px_8px] rounded-[6px] ' +
                '[border:1px_solid_theme(colors.white/9%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface'
              }
            >
              {t('supporters.preview')}
            </span>
          )}
        </div>

        <ul
          className={
            '[&_li]:flex [&_li]:items-center [&_li]:gap-[12px] [&_li]:p-[7px_10px] [&_li]:rounded-[9px] [&_li]:bg-surface christmas:[&_li]:bg-christmas-surface ' +
            'halloween:[&_li]:bg-halloween-surface spring:[&_li]:bg-spring-surface [&_li]:[border:1px_solid_theme(colors.white/9%)] list-none m-0 p-0 grid gap-2'
          }
        >
          {activity.recentPurchases.map((purchase, purchaseIndex) => {
            return (
              <li key={`${purchase.nick}-${purchaseIndex}`}>
                <PlayerAvatar key={purchase.nick} nick={purchase.nick} />

                <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
                  <span className="[.podium-player_&]:max-w-full [.podium-player_&]:text-sm/relaxed font-semibold text-base/relaxed text-ink overflow-hidden [text-overflow:ellipsis] whitespace-nowrap">
                    {purchase.nick}
                  </span>
                  <span className="text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
                    {activity.isPreview ? t(purchase.timeAgo) : purchase.timeAgo}
                  </span>
                </div>

                <strong className="ml-auto font-mono text-sm/relaxed [font-variant-numeric:tabular-nums] text-ink whitespace-nowrap">
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
