import { useState } from 'react';
import { site } from '../config';
import PixelMap from '../three/pixel-map';
import { SectionDecor } from '../components/side-decor';

import { Icon as icons } from '../components/icons';
import type { PageProps } from '../types/page';

export default function MapPage({ settings, navigate }: PageProps) {
  const frameStyle = settings.mapFrame || 'hud';
  const [loaded, setLoaded] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = () => {
    setLoaded(false);
    setReloadKey((k) => k + 1);
  };

  if (!settings.sections.mapPage) {
    return (
      <section className="page-shell sec-dark">
        <SectionDecor
          theme={settings.theme}
          variant="both"
          labelLeft="MAPA // OFFLINE"
          labelRight="TWEAKMC.PL"
        />
        <div className="wrap">
          <div className="disabled-card">
            <span className="disabled-tag">Mapa tymczasowo niedostępna</span>
            <h1>Mapa EarthSMP chwilowo wyłączona</h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {settings.maintenanceMsg}
            </p>
            <div className="tw-flex tw-flex-wrap tw-gap-[12px] tw-mt-[28px]">
              <a
                href="/"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
              >
                Wróć na stronę główną
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`page-shell sec-dark map-page-frame-${frameStyle}`}>
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft="DYNMAP // LIVE"
        labelRight="ZIEMIA 1:1000"
      />
      <div className={frameStyle === 'fullscreen' ? 'wrap wrap-wide' : 'wrap'}>
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[20px] tw-mb-[32px]">
          <div>
            <a
              href="/"
              className="back-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              ← Powrót na stronę główną
            </a>
            <h1 className="tw-text-[clamp(2.4rem,_5vw,_4rem)] tw-mt-[10px]">
              Mapa EarthSMP <span className="tw-text-accent-bright">na żywo</span>
            </h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              Podgląd Dynmap w czasie rzeczywistym: granice państw, miasta i gracze na prawdziwej
              mapie Ziemi.
            </p>
          </div>
          <div className="map-controls tw-flex tw-flex-wrap tw-gap-[12px]">
            <button type="button" className="btn btn-secondary btn-sm" onClick={reload}>
              {icons.refresh}
              <span>{loaded ? 'Odśwież mapę' : 'Ładowanie…'}</span>
            </button>
            <a
              className="btn btn-primary btn-sm"
              href={site.dynmapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>Pełny ekran</span>
              {icons.external}
            </a>
          </div>
        </div>

        <div className={`map-shell map-shell-${frameStyle}`}>
          <div className="map-bar">
            <span className="live-dot" aria-hidden="true" />
            <span className="tw-font-semibold tw-whitespace-nowrap">Dynmap · EarthSMP</span>
            <code className="tw-ml-auto tw-font-mono tw-text-[0.8rem] tw-text-muted tw-whitespace-nowrap">
              {site.dynmapDisplayPath}
            </code>
          </div>
          <div className="map-frame map-frame-tall">
            <PixelMap theme={settings.theme} />
            <iframe
              key={reloadKey}
              src={site.dynmapUrl}
              title="Mapa serwera TweakMC na żywo (Dynmap)"
              allow="fullscreen"
              className={loaded ? 'is-ready' : ''}
              onLoad={() => setLoaded(true)}
            />
            {!loaded && (
              <span className="map-status" aria-live="polite">
                Łączenie z Dynmapą serwera…
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
