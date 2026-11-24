import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { site } from '@/shared/config/site';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon as icons } from '@/shared/components/icons';
import type { Settings } from '@/shared/settings/settings';
import { useDynmapFrame } from '../hooks/use-dynmap-frame';
import PixelMap from './pixel-map';

export function LiveMap({
  theme,
  frameStyle,
}: {
  theme: Settings['theme'];
  frameStyle: Settings['mapFrame'];
}) {
  const { t } = useTranslation();
  const { attempt, frameRef, status, reload } = useDynmapFrame();

  return (
    <section className={`page-shell sec-dark map-page-frame-${frameStyle}`}>
      <SectionDecor
        theme={theme}
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
              <span>{status === 'loading' ? t('map.loading') : t('map.refresh')}</span>
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
            <PixelMap theme={theme} />
            {status !== 'unavailable' && (
              <iframe
                key={attempt}
                ref={frameRef}
                src={new URL(site.dynmapUrl).pathname}
                title={t('map.frameTitle')}
                allow="fullscreen"
                className={status === 'ready' ? 'is-ready' : ''}
                aria-hidden={status !== 'ready'}
                tabIndex={status === 'ready' ? 0 : -1}
              />
            )}
            {status !== 'ready' && (
              <span className="map-status" aria-live="polite">
                {t(status === 'loading' ? 'map.connecting' : 'map.unavailable')}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
