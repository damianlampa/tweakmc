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
        '[background:radial-gradient(760px_600px_at_76%_48%,_rgba(var(--accent-rgb),_0.34),_transparent_70%),_radial-gradient(620px_480px_at_14%_20%,_rgba(var(--accent-rgb),_0.22),_transparent_72%),_radial-gradient(560px_420px_at_10%_84%,_rgba(var(--accent-rgb),_0.18),_transparent_72%),_var(--bg)]'
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
            'gap-[clamp(24px,_4vw,_56px)] [padding-block:clamp(36px,_5vh,_64px)] max-wide:grid-cols-[minmax(0,_1fr)]',
          settings.sections.heroGlobe ? '' : 'grid-cols-[minmax(0,_760px)]',
        )}
      >
        <div className="relative z-[2] [[data-enter]_&]:animate-fade-up">
          <h1 className="hero-title">
            <span className="hero-line">{t('hero.title')}</span>{' '}
            <WaveWord text="TweakMC" className="text-accent-bright" />
          </h1>
          <RotatingLine />
          <p className="mt-[22px] max-w-[52ch] text-muted text-lg/relaxed">
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

          <p className="flex flex-wrap items-center gap-3 mt-[26px] text-muted text-sm/relaxed">
            <span>{active.badge ? t(active.badge) : 'Minecraft Java'}</span>
            {settings.sections.mapPage && (
              <>
                <span className="w-1 h-1 rounded-[50%] bg-accent-bright" aria-hidden="true" />
                <Link
                  to={paths.map}
                  className={
                    'text-ink underline [text-underline-offset:4px] [text-decoration-color:rgba(var(--bright-rgb),_0.55)] ' +
                    '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-accent-bright ' +
                    'hover:[text-decoration-color:var(--accent-bright)]'
                  }
                >
                  {t('hero.map')}
                </Link>
              </>
            )}
            {settings.sections.shopPage && (
              <>
                <span className="w-1 h-1 rounded-[50%] bg-accent-bright" aria-hidden="true" />
                <Link
                  to={paths.shop}
                  className={
                    'text-ink underline [text-underline-offset:4px] [text-decoration-color:rgba(var(--bright-rgb),_0.55)] ' +
                    '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-accent-bright ' +
                    'hover:[text-decoration-color:var(--accent-bright)]'
                  }
                >
                  {t('hero.topUp')}
                </Link>
              </>
            )}
          </p>
        </div>

        {settings.sections.heroGlobe && (
          <div className="hero-visual [[data-enter]_&]:animate-fade-scale [[data-enter]_&]:[animation-delay:0.08s] relative max-wide:mx-auto max-wide:max-w-[460px] w-full aspect-[1_/_1] max-h-[620px]">
            <div
              className="absolute max-sm:inset-[8px] inset-[24px] pointer-events-none z-[3]"
              aria-hidden="true"
            >
              <span className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] top-[10px] left-[10px] border-t-2 border-l-2" />
              <span className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] top-[10px] right-[10px] border-t-2 border-r-2" />
              <span className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] bottom-[10px] left-[10px] border-b-2 border-l-2" />
              <span className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] bottom-[10px] right-[10px] border-b-2 border-r-2" />
              <span className="hud-chip text-ink max-sm:p-[5px_10px] max-sm:text-xs/relaxed top-[18px] right-[18px] animate-hud-float">
                <span
                  className={
                    'relative w-[8px] h-[8px] rounded-[50%] [background:var(--ok)] [box-shadow:0_0_10px_rgba(34,_197,_94,_0.7)] ' +
                    "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%] " +
                    '[&::after]:[border:1.5px_solid_var(--ok)] [&::after]:animate-status-ping'
                  }
                />
                <span>{t('hero.globe')}</span>
              </span>
              <span className="hud-chip max-sm:p-[5px_10px] max-sm:text-xs/relaxed bottom-[18px] left-[18px] text-muted animate-hud-float-offset">
                {t('hero.rotate')}
              </span>
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
