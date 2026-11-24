import { DEFAULT_SETTINGS } from '@/shared/settings/settings';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { site } from '@/shared/config/site';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon as icons } from '@/shared/components/icons';
import { useRouteSettings } from '@/router/use-route-settings';
import PixelMap from './components/pixel-map';

export default function MapPage() {
  const { t } = useTranslation();

  const { settings } = useRouteSettings();
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
          labelLeft={t('map.offlineTag')}
          labelRight="TWEAKMC.PL"
        />

        <div className="wrap">
          <div className="disabled-card">
            <span className="disabled-tag">{t('map.unavailable')}</span>
            <h1>{t('map.disabled')}</h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {settings.maintenanceMsg === DEFAULT_SETTINGS.maintenanceMsg
                ? t('common.maintenance')
                : settings.maintenanceMsg}
            </p>

            <div className="tw-flex tw-flex-wrap tw-gap-[12px] tw-mt-[28px]">
              <Link to={paths.home} className="btn btn-primary">
                {t('nav.home')}
              </Link>
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
        labelRight={t('map.scale')}
      />

      <div className={frameStyle === 'fullscreen' ? 'wrap wrap-wide' : 'wrap'}>
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[20px] tw-mb-[32px]">
          <div>
            <Link to={paths.home} className="back-link">
              {t('nav.back')}
            </Link>
            <h1 className="tw-text-[clamp(2.4rem,_5vw,_4rem)] tw-mt-[10px]">
              {t('map.heading')}
              <span className="tw-text-accent-bright">{t('map.live')}</span>
            </h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {t('map.description')}
            </p>
          </div>

          <div className="map-controls tw-flex tw-flex-wrap tw-gap-[12px]">
            <button type="button" className="btn btn-secondary btn-sm" onClick={reload}>
              {icons.refresh}
              <span>{loaded ? t('map.refresh') : t('map.loading')}</span>
            </button>
            <a
              className="btn btn-primary btn-sm"
              href={site.dynmapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t('map.fullscreen')}</span>
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
              title={t('map.frameTitle')}
              allow="fullscreen"
              className={loaded ? 'is-ready' : ''}
              onLoad={() => setLoaded(true)}
            />
            {!loaded && (
              <span className="map-status" aria-live="polite">
                {t('map.connecting')}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
