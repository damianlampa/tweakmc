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
    <section className="hero" id="start" data-enter>
      <SectionDecor
        theme={settings.theme}
        variant="both"
        grid
        labelLeft="TWEAKMC // NET"
        labelRight="52°N · 21°E"
      />

      <div className={`wrap hero-grid ${settings.sections.heroGlobe ? '' : 'hero-grid-single'}`}>
        <div className="hero-copy">
          <h1 className="hero-title">
            <span className="hero-line">{t('hero.title')}</span>{' '}
            <WaveWord text="TweakMC" className="tw-text-accent-bright" />
          </h1>
          <RotatingLine />
          <p className="tw-mt-[22px] tw-max-w-[52ch] tw-text-muted tw-text-[1.12rem]">
            {t('hero.intro')} <strong>EarthSMP</strong>
            {t('hero.more')}
          </p>

          <div className="hero-actions tw-flex tw-flex-wrap tw-items-center tw-gap-[14px] tw-mt-[32px]">
            <IpBar id="hero-copy" />
            <a
              className="btn btn-secondary"
              href={site.discordUrl}
              target="_blank"
              rel="noreferrer"
            >
              {Icon.discord}
              <span>{t('hero.join')}</span>
            </a>
          </div>

          <p className="tw-flex tw-flex-wrap tw-items-center tw-gap-[12px] tw-mt-[26px] tw-text-muted tw-text-[0.92rem]">
            <span>{active.badge ? t(active.badge) : 'Minecraft Java'}</span>
            {settings.sections.mapPage && (
              <>
                <span className="dot" aria-hidden="true" />
                <Link to={paths.map} className="inline-link">
                  {t('hero.map')}
                </Link>
              </>
            )}
            {settings.sections.shopPage && (
              <>
                <span className="dot" aria-hidden="true" />
                <Link to={paths.shop} className="inline-link">
                  {t('hero.topUp')}
                </Link>
              </>
            )}
          </p>
        </div>

        {settings.sections.heroGlobe && (
          <div className="hero-visual tw-relative tw-w-full tw-aspect-[1_/_1] tw-max-h-[620px]">
            <div
              className="globe-hud tw-absolute tw-inset-[24px] tw-pointer-events-none tw-z-[3]"
              aria-hidden="true"
            >
              <span className="hud-corner hud-tl" />
              <span className="hud-corner hud-tr" />
              <span className="hud-corner hud-bl" />
              <span className="hud-corner hud-br" />
              <span className="hud-chip hud-chip-top">
                <span className="live-dot" />
                <span>{t('hero.globe')}</span>
              </span>
              <span className="hud-chip hud-chip-bot">{t('hero.rotate')}</span>
            </div>
            <Suspense fallback={<div className="globe" />}>
              <Globe theme={settings.theme} motion={settings.motion} />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}
