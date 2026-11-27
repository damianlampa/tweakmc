import { classes } from '@/shared/utils/classes';
import { elevatedPageGlow, cardSpotlight } from '@/shared/styles/background-classes';
import { useTranslation } from 'react-i18next';
import { homeSections } from '@/router/paths';
import { type Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { IpText, IpBar } from '@/shared/server-ip';
import { onCardMove } from '@/shared/utils/card-glow';
import { KineticHeading } from './kinetic-heading';

const STEPS = [
  ['join.launch', 'join.launchText'],
  ['join.multiplayer', 'join.multiplayerText'],
  ['join.address', null],
  ['join.play', 'join.playText'],
] as const;

export function Join({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  return (
    <section
      className={classes([
        'relative overflow-hidden [padding-block:clamp(72px,_10vh,_116px)] [border-top:1px_solid_theme(colors.white/9%)]',
        elevatedPageGlow,
      ])}
      id={homeSections.join}
    >
      <SectionDecor
        theme={settings.theme}
        variant="left"
        labelLeft="START // JAVA"
        labelRight="TWEAKMC.PL"
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="max-w-[60ch]">
          <KineticHeading text={t('join.title')} accentWord={t('join.accent')} />
          <p className="mt-4 max-w-[58ch] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-base/relaxed">
            {t('join.description')}
          </p>
        </div>

        <ol className="relative sm:max-lg:grid-cols-2 max-sm:grid-cols-1 list-none m-[40px_0_0] p-0 grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-4">
          {STEPS.map(([title, description], stepIndex) => {
            return (
              <li
                key={title}
                className={classes([
                  'p-[24px] rounded-[14px] [border:1px_solid_theme(colors.white/18%)] bg-background-elevated christmas:bg-christmas-background-elevated',
                  'halloween:bg-halloween-background-elevated spring:bg-spring-background-elevated',
                  '[box-shadow:inset_0_1px_0_theme(colors.purple.400/16%)] christmas:[box-shadow:inset_0_1px_0_theme(colors.sky.300/16%)]',
                  'halloween:[box-shadow:inset_0_1px_0_theme(colors.orange.300/16%)] spring:[box-shadow:inset_0_1px_0_theme(colors.emerald.300/16%)]',
                  '[transition:transform_0.25s_var(--ease),_border-color_0.25s] hover:[transform:translateY(-3px)]',
                  "hover:border-purple-400/45 christmas:hover:border-sky-300/45 halloween:hover:border-orange-300/45 spring:hover:border-emerald-300/45 relative [&::before]:[content:''] [&::before]:absolute",
                  '[&::before]:inset-0 [&::before]:rounded-[inherit]',
                  cardSpotlight,
                  '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none',
                  '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1]',
                  '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]',
                ])}
                onPointerMove={onCardMove}
              >
                <span
                  className={classes([
                    'inline-grid place-items-center min-w-[38px] h-[32px] px-2.5 py-0 rounded-[8px]',
                    'bg-purple-600/[0.16] christmas:bg-sky-500/[0.16] halloween:bg-orange-600/[0.16] spring:bg-emerald-500/[0.16]',
                    '[border:1px_solid_theme(colors.purple.400/35%)] christmas:[border:1px_solid_theme(colors.sky.300/35%)]',
                    'halloween:[border:1px_solid_theme(colors.orange.300/35%)] spring:[border:1px_solid_theme(colors.emerald.300/35%)] font-mono',
                    'text-sm/relaxed font-bold text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 mb-[16px]',
                  ])}
                  aria-hidden="true"
                >
                  0{stepIndex + 1}
                </span>
                <h3 className="mb-2">{t(title)}</h3>
                <p className="text-base/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
                  {description ? (
                    t(description)
                  ) : (
                    <>
                      {t('join.addressPrefix')}
                      <IpText
                        className={classes([
                          'p-[0.08em_0.42em] rounded-[6px] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface',
                          '[border:1px_solid_theme(colors.white/18%)] text-base/relaxed',
                        ])}
                      />
                      {t('join.addressSuffix')}
                    </>
                  )}
                </p>
              </li>
            );
          })}
        </ol>

        <div className="mt-[40px]">
          <IpBar />
        </div>
      </div>
    </section>
  );
}
