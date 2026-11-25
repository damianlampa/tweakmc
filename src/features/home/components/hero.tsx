import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { site } from '@/shared/config/site';
import { THEMES } from '@/shared/config/themes';
import type { Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { IpBar } from '@/shared/server-ip';
import { Icon } from '@/shared/components/icons';
import { HudChip } from './hud-chip';
import { RotatingLine } from './rotating-line';
import { WaveWord } from './wave-word';

const Globe = lazy(() => import('../scenes/globe'));

export function Hero({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  const active = THEMES[settings.theme] || THEMES.default;

  return (
    <section
      className={
        'relative min-h-[100svh] pt-[calc(var(--nav-h)_+_18px)] flex items-center overflow-hidden ' +
        '[background:radial-gradient(760px_600px_at_76%_48%,_theme(colors.purple.600/34%),_transparent_70%),_radial-gradient(620px_480px_at_14%_20%,_theme(colors.purple.600/22%),_transparent_72%),_radial-gradient(560px_420px_at_10%_84%,_theme(colors.purple.600/18%),_transparent_72%),_theme(colors.background)] ' +
        'christmas:[background:radial-gradient(760px_600px_at_76%_48%,_theme(colors.sky.500/34%),_transparent_70%),_radial-gradient(620px_480px_at_14%_20%,_theme(colors.sky.500/22%),_transparent_72%),_radial-gradient(560px_420px_at_10%_84%,_theme(colors.sky.500/18%),_transparent_72%),_theme(colors.christmas.background)] ' +
        'halloween:[background:radial-gradient(760px_600px_at_76%_48%,_theme(colors.orange.600/34%),_transparent_70%),_radial-gradient(620px_480px_at_14%_20%,_theme(colors.orange.600/22%),_transparent_72%),_radial-gradient(560px_420px_at_10%_84%,_theme(colors.orange.600/18%),_transparent_72%),_theme(colors.halloween.background)] ' +
        'spring:[background:radial-gradient(760px_600px_at_76%_48%,_theme(colors.emerald.500/34%),_transparent_70%),_radial-gradient(620px_480px_at_14%_20%,_theme(colors.emerald.500/22%),_transparent_72%),_radial-gradient(560px_420px_at_10%_84%,_theme(colors.emerald.500/18%),_transparent_72%),_theme(colors.spring.background)]'
      }
      id="start"
      data-enter
    >
      <SectionDecor
        theme={settings.theme}
        variant="both"
        grid
        labelLeft="TWEAKMC // NET"
        labelRight="52°N · 21°E"
      />

      <div
        className={classes(
          'relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] ' +
            '[padding-inline:var(--pad)] grid grid-cols-[minmax(0,_1.05fr)_minmax(0,_0.95fr)] items-center ' +
            'gap-[clamp(24px,_4vw,_56px)] [padding-block:clamp(36px,_5vh,_64px)] max-lg:grid-cols-[minmax(0,_1fr)]',
          settings.sections.heroGlobe ? '' : 'grid-cols-[minmax(0,_760px)]',
        )}
      >
        <div className="relative z-[2] [[data-enter]_&]:animate-fade-up">
          <h1 className="hero-title">
            <span className="hero-line">{t('hero.title')}</span>{' '}
            <WaveWord
              text="TweakMC"
              className="text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300"
            />
          </h1>
          <RotatingLine />
          <p className="mt-[22px] max-w-[52ch] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-lg/relaxed">
            {t('hero.intro')} <strong>EarthSMP</strong>
            {t('hero.more')}
          </p>

          <div className="hero-actions flex flex-wrap items-center gap-[14px] mt-[32px]">
            <IpBar id="hero-copy" />
            <a
              className={buttonClasses('secondary')}
              href={site.discordUrl}
              target="_blank"
              rel="noreferrer"
            >
              {Icon.discord}
              <span>{t('hero.join')}</span>
            </a>
          </div>

          <p className="flex flex-wrap items-center gap-3 mt-[26px] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-sm/relaxed">
            <span>{active.badge ? t(active.badge) : 'Minecraft Java'}</span>
            {settings.sections.mapPage && (
              <>
                <span
                  className="w-1 h-1 rounded-[50%] bg-purple-400 christmas:bg-sky-300 halloween:bg-orange-300 spring:bg-emerald-300"
                  aria-hidden="true"
                />
                <Link
                  to={paths.map}
                  className={
                    'text-ink underline [text-underline-offset:4px] decoration-purple-400/55 christmas:decoration-sky-300/55 halloween:decoration-orange-300/55 spring:decoration-emerald-300/55 ' +
                    '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-purple-400 christmas:hover:text-sky-300 halloween:hover:text-orange-300 spring:hover:text-emerald-300 ' +
                    'hover:decoration-purple-400 christmas:hover:decoration-sky-300 halloween:hover:decoration-orange-300 spring:hover:decoration-emerald-300'
                  }
                >
                  {t('hero.map')}
                </Link>
              </>
            )}
            {settings.sections.shopPage && (
              <>
                <span
                  className="w-1 h-1 rounded-[50%] bg-purple-400 christmas:bg-sky-300 halloween:bg-orange-300 spring:bg-emerald-300"
                  aria-hidden="true"
                />
                <Link
                  to={paths.shop}
                  className={
                    'text-ink underline [text-underline-offset:4px] decoration-purple-400/55 christmas:decoration-sky-300/55 halloween:decoration-orange-300/55 spring:decoration-emerald-300/55 ' +
                    '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-purple-400 christmas:hover:text-sky-300 halloween:hover:text-orange-300 spring:hover:text-emerald-300 ' +
                    'hover:decoration-purple-400 christmas:hover:decoration-sky-300 halloween:hover:decoration-orange-300 spring:hover:decoration-emerald-300'
                  }
                >
                  {t('hero.topUp')}
                </Link>
              </>
            )}
          </p>
        </div>

        {settings.sections.heroGlobe && (
          <div className="hero-visual [[data-enter]_&]:animate-fade-scale [[data-enter]_&]:[animation-delay:0.08s] relative max-lg:mx-auto max-lg:max-w-[460px] w-full aspect-[1_/_1] max-h-[620px]">
            <div
              className="absolute max-sm:inset-[8px] inset-[24px] pointer-events-none z-[3]"
              aria-hidden="true"
            >
              <span
                className={
                  'absolute w-[18px] h-[18px] border-purple-400/50 christmas:border-sky-300/50 halloween:border-orange-300/50 spring:border-emerald-300/50 ' +
                  '[border-style:solid] border-0 pointer-events-none z-[3] top-[10px] left-[10px] border-t-2 border-l-2'
                }
              />
              <span
                className={
                  'absolute w-[18px] h-[18px] border-purple-400/50 christmas:border-sky-300/50 halloween:border-orange-300/50 spring:border-emerald-300/50 ' +
                  '[border-style:solid] border-0 pointer-events-none z-[3] top-[10px] right-[10px] border-t-2 border-r-2'
                }
              />
              <span
                className={
                  'absolute w-[18px] h-[18px] border-purple-400/50 christmas:border-sky-300/50 halloween:border-orange-300/50 spring:border-emerald-300/50 ' +
                  '[border-style:solid] border-0 pointer-events-none z-[3] bottom-[10px] left-[10px] border-b-2 border-l-2'
                }
              />
              <span
                className={
                  'absolute w-[18px] h-[18px] border-purple-400/50 christmas:border-sky-300/50 halloween:border-orange-300/50 spring:border-emerald-300/50 ' +
                  '[border-style:solid] border-0 pointer-events-none z-[3] bottom-[10px] right-[10px] border-b-2 border-r-2'
                }
              />
              <HudChip className="top-[18px] right-[18px] animate-hud-float text-ink">
                <span
                  className={
                    'relative w-[8px] h-[8px] rounded-[50%] bg-green-500 [box-shadow:0_0_10px_theme(colors.green.500/70%)] ' +
                    "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%] " +
                    '[&::after]:[border:1.5px_solid_theme(colors.green.500)] [&::after]:animate-status-ping'
                  }
                />
                <span>{t('hero.globe')}</span>
              </HudChip>
              <HudChip className="bottom-[18px] left-[18px] animate-hud-float-offset text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
                {t('hero.rotate')}
              </HudChip>
            </div>
            <Suspense
              fallback={
                <div className="globe absolute inset-0 [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:block [&_canvas]:touch-pan-y [&_canvas]:cursor-grab [&_canvas:active]:cursor-grabbing" />
              }
            >
              <Globe theme={settings.theme} motion={settings.motion} />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}
