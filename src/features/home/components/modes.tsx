import { classes } from '@/shared/utils/classes';
import { elevatedPageGlow, cardSpotlight } from '@/shared/styles/background-classes';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths, homeSections } from '@/router/paths';
import { homeSectionPath } from '@/router/utils/home-section-path';
import { THEMES } from '@/shared/config/themes';
import type { Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon } from '@/shared/components/icons';
import { onCardMove } from '@/shared/utils/card-glow';
import { KineticHeading } from './kinetic-heading';

export function Modes({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  const activeTheme = THEMES[settings.theme] || THEMES.default;

  return (
    <section
      className={classes([
        'relative overflow-hidden [padding-block:clamp(72px,_10vh,_116px)] [border-top:1px_solid_theme(colors.white/9%)]',
        elevatedPageGlow,
      ])}
      id={homeSections.modes}
    >
      <SectionDecor
        theme={settings.theme}
        variant="left"
        labelLeft={t('modes.tag')}
        labelRight="EARTHSMP"
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <KineticHeading text={t('modes.title')} accentWord="TweakMC" />
        <p className="mt-4 max-w-[58ch] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-base/relaxed">
          {t('modes.description')}
        </p>

        <div className="grid max-lg:grid-cols-1 grid-cols-[minmax(0,_1.3fr)_minmax(0,_0.9fr)] gap-5 mt-[40px]">
          <article
            className={classes([
              'rounded-[14px] [border:1px_solid_theme(colors.purple.400/35%)] christmas:[border:1px_solid_theme(colors.sky.300/35%)]',
              'halloween:[border:1px_solid_theme(colors.orange.300/35%)] spring:[border:1px_solid_theme(colors.emerald.300/35%)] overflow-hidden grid',
              'grid-cols-[minmax(0,_0.92fr)_minmax(0,_1.05fr)]',
              '[background:radial-gradient(420px_300px_at_22%_50%,_theme(colors.purple.600/24%),_transparent_72%),_theme(colors.background)]',
              'christmas:[background:radial-gradient(420px_300px_at_22%_50%,_theme(colors.sky.500/24%),_transparent_72%),_theme(colors.christmas.background)]',
              'halloween:[background:radial-gradient(420px_300px_at_22%_50%,_theme(colors.orange.600/24%),_transparent_72%),_theme(colors.halloween.background)]',
              'spring:[background:radial-gradient(420px_300px_at_22%_50%,_theme(colors.emerald.500/24%),_transparent_72%),_theme(colors.spring.background)]',
              "max-lg:grid-cols-[minmax(0,_1fr)] relative [&::before]:[content:''] [&::before]:absolute",
              '[&::before]:inset-0 [&::before]:rounded-[inherit]',
              cardSpotlight,
              '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none',
              '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1]',
              '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]',
              'group',
            ])}
            onPointerMove={onCardMove}
          >
            <div className="grid max-lg:p-[28px_24px_8px] place-items-center p-8">
              <img
                src={activeTheme.earthLogo}
                alt={t('modes.logo')}
                className="animate-mode-float w-full max-w-[270px] transition-transform duration-500 ease-site group-hover:[transform:scale(1.04)]"
              />
            </div>

            <div className="flex max-lg:p-[16px_24px_28px] flex-col justify-center p-[32px_32px_32px_8px]">
              <div className="inline-flex items-center gap-2 text-sm/relaxed font-semibold text-ink mb-[12px]">
                <span
                  className={classes([
                    'relative w-[8px] h-[8px] rounded-[50%] bg-green-500 [box-shadow:0_0_10px_theme(colors.green.500/70%)]',
                    "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%]",
                    '[&::after]:[border:1.5px_solid_theme(colors.green.500)] [&::after]:animate-status-ping',
                  ])}
                  aria-hidden="true"
                />
                <span>{t('modes.active')}</span>
              </div>
              <h3 className="mb-[10px] text-3xl/tight">EarthSMP</h3>
              <p className="text-base/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
                {t('modes.descriptionEarth')}
              </p>

              <div className="flex flex-wrap gap-[8px_22px] mt-5">
                <Link
                  className={classes([
                    'inline-flex items-center gap-2 min-h-11 font-semibold no-underline [transition:gap_0.2s_var(--ease),color_0.2s] hover:gap-3 hover:text-ink',
                    'text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300',
                  ])}
                  to={homeSectionPath('earthSmp')}
                >
                  <span>{t('modes.features')}</span>
                  {Icon.arrow}
                </Link>
                {settings.sections.mapPage && (
                  <Link
                    className={classes([
                      'inline-flex items-center gap-2 min-h-11 font-semibold no-underline [transition:gap_0.2s_var(--ease),color_0.2s] hover:gap-3 hover:text-ink text-muted',
                      'christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted',
                    ])}
                    to={paths.map}
                  >
                    <span>{t('modes.map')}</span>
                  </Link>
                )}
              </div>
            </div>
          </article>

          <div className="grid sm:max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
            <article
              className={classes([
                'rounded-[14px] [border:1px_dashed_theme(colors.white/18%)] overflow-hidden flex flex-col justify-center',
                'p-[26px_28px] bg-background christmas:bg-christmas-background halloween:bg-halloween-background spring:bg-spring-background [&_h3]:mb-[8px]',
                '[&_p]:text-muted christmas:[&_p]:text-christmas-muted halloween:[&_p]:text-halloween-muted spring:[&_p]:text-spring-muted [&_p]:text-base/relaxed',
                'relative',
                "[&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 [&::before]:rounded-[inherit]",
                cardSpotlight,
                '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none',
                '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1]',
                '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]',
              ])}
              onPointerMove={onCardMove}
            >
              <span className="font-mono text-xs/relaxed text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 mb-[10px]">
                {t('modes.upcoming')}
              </span>
              <h3>{t('modes.second')}</h3>
              <p>{t('modes.secondText')}</p>
            </article>

            <article
              className={classes([
                'rounded-[14px] [border:1px_dashed_theme(colors.white/18%)] overflow-hidden flex flex-col justify-center',
                'p-[26px_28px] bg-background christmas:bg-christmas-background halloween:bg-halloween-background spring:bg-spring-background [&_h3]:mb-[8px]',
                '[&_p]:text-muted christmas:[&_p]:text-christmas-muted halloween:[&_p]:text-halloween-muted spring:[&_p]:text-spring-muted [&_p]:text-base/relaxed',
                'relative',
                "[&::before]:[content:''] [&::before]:absolute [&::before]:inset-0 [&::before]:rounded-[inherit]",
                cardSpotlight,
                '[&::before]:opacity-[0] [&::before]:[transition:opacity_0.3s] [&::before]:pointer-events-none',
                '[&::before]:z-0 [&:hover::before]:opacity-[1] [&>*]:relative [&>*]:z-[1]',
                '[.discord-card&::before]:[background:radial-gradient(_340px_circle_at_var(--mx,_50%)_var(--my,_50%),_theme(colors.indigo.400/20%),_transparent_62%_)]',
              ])}
              onPointerMove={onCardMove}
            >
              <span className="font-mono text-xs/relaxed text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 mb-[10px]">
                {t('modes.upcoming')}
              </span>
              <h3>{t('modes.third')}</h3>
              <p>{t('modes.thirdText')}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
