import { lazy, Suspense, useEffect, useState } from 'react';
import { site } from '@/shared/config/site';
import { THEMES } from '@/shared/config/themes';
import { type PageProps } from '@/shared/types/page';
import { SectionDecor } from '@/shared/components/side-decor';
import { IpBar } from '@/shared/server-ip/server-ip';
import { Icon } from '@/shared/components/icons';
import { WaveWord } from './animated-heading';

const Globe = lazy(() => import('../scenes/globe'));

const HERO_ROLES = [
  'EarthSMP · prawdziwa mapa Ziemi',
  'Państwa, sojusze i wojny o granice',
  'Czołgi i pojazdy wojskowe na froncie',
  'Nowe tryby sieci już w przygotowaniu',
];

function RotatingLine() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((v) => (v + 1) % HERO_ROLES.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      className="tw-inline-flex tw-items-center tw-gap-[10px] tw-mt-[18px] tw-min-h-[28px] tw-overflow-hidden tw-font-mono tw-text-[0.92rem] tw-font-semibold tw-text-accent-bright"
      aria-live="polite"
    >
      <span className="rotate-dot" aria-hidden="true" />
      <span key={idx} className="rotate-text">
        {HERO_ROLES[idx]}
      </span>
    </div>
  );
}

export function Hero({ settings, navigate }: PageProps) {
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
            <span className="hero-line">Sieć serwerów</span>{' '}
            <WaveWord text="TweakMC" className="tw-text-accent-bright" />
          </h1>
          <RotatingLine />
          <p className="tw-mt-[22px] tw-max-w-[52ch] tw-text-muted tw-text-[1.12rem]">
            Nowoczesny Minecraft Java bez zbędnych modów. Startujemy z flagowym trybem{' '}
            <strong>EarthSMP</strong> — a kolejne tryby sieci są już w przygotowaniu.
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
              <span>Wbij na Discorda</span>
            </a>
          </div>
          <p className="tw-flex tw-flex-wrap tw-items-center tw-gap-[12px] tw-mt-[26px] tw-text-muted tw-text-[0.92rem]">
            <span>{active.badge || 'Minecraft Java'}</span>
            {settings.sections.mapPage && (
              <>
                <span className="dot" aria-hidden="true" />
                <a
                  href="/mapa"
                  className="inline-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/mapa');
                  }}
                >
                  Mapa na żywo
                </a>
              </>
            )}
            {settings.sections.shopPage && (
              <>
                <span className="dot" aria-hidden="true" />
                <a
                  href="/sklep"
                  className="inline-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/sklep');
                  }}
                >
                  Doładuj /portfel
                </a>
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
                <span>EarthSMP · Mapa Ziemi</span>
              </span>
              <span className="hud-chip hud-chip-bot">Obróć globus 3D</span>
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
