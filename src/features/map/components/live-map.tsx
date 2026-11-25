import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
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
    <section
      className={classes(
        'relative min-h-[100svh] ' +
          '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden ' +
          '[background:radial-gradient(620px_380px_at_85%_20%,_rgba(var(--accent-rgb),_0.12),_transparent_72%),_var(--bg)]',
        `map-page-frame-${frameStyle}`,
      )}
    >
      <SectionDecor
        theme={theme}
        variant="both"
        labelLeft="DYNMAP // LIVE"
        labelRight={t('map.scale')}
      />

      <div
        className={classes(
          frameStyle === 'fullscreen'
            ? 'relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)] max-w-[1580px]'
            : 'relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]',
        )}
      >
        <div className="flex flex-wrap justify-between items-end gap-5 mb-[32px]">
          <div>
            <Link
              to={paths.home}
              className="inline-flex items-center min-h-[36px] text-[0.9rem] font-medium text-muted no-underline [transition:color_0.2s] hover:text-accent-bright"
            >
              {t('nav.back')}
            </Link>
            <h1 className="text-[clamp(2.4rem,_5vw,_4rem)] mt-[10px]">
              {t('map.heading')}
              <span className="text-accent-bright">{t('map.live')}</span>
            </h1>
            <p className="mt-4 max-w-[58ch] text-muted text-[1.08rem]">{t('map.description')}</p>
          </div>

          <div className="flex max-sm:w-full max-sm:[&_.btn]:w-full flex-wrap gap-3">
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-[0.9rem]/none')}
              onClick={reload}
            >
              {icons.refresh}
              <span>{status === 'loading' ? t('map.loading') : t('map.refresh')}</span>
            </button>
            <a
              className={buttonClasses('primary', 'min-h-[44px] px-4 py-0 text-[0.9rem]/none')}
              href={site.dynmapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <span>{t('map.fullscreen')}</span>
              {icons.external}
            </a>
          </div>
        </div>

        <div
          className={classes(
            'relative z-[10] rounded-[14px] [border:1px_solid_var(--line-strong)] bg-surface overflow-hidden [box-shadow:0_24px_60px_-24px_rgba(0,_0,_0,_0.85)]',
            frameStyle === 'tactical' &&
              '![border-color:rgba(var(--bright-rgb),_0.55)] [box-shadow:0_0_42px_-14px_rgba(var(--accent-rgb),_0.5)]',
          )}
        >
          <div className="flex items-center gap-2.5 p-[12px_18px] [border-bottom:1px_solid_var(--line)] text-[0.88rem]">
            <span
              className={
                'relative w-[8px] h-[8px] rounded-[50%] [background:var(--ok)] [box-shadow:0_0_10px_rgba(34,_197,_94,_0.7)] ' +
                "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%] " +
                '[&::after]:[border:1.5px_solid_var(--ok)] [&::after]:animate-status-ping'
              }
              aria-hidden="true"
            />
            <span className="font-semibold whitespace-nowrap">Dynmap · EarthSMP</span>
            <code className="ml-auto font-mono text-[0.8rem] text-muted whitespace-nowrap">
              {site.dynmapDisplayPath}
            </code>
          </div>

          <div className="relative h-[min(74vh,_760px)] w-full overflow-hidden bg-map-frame max-sm:aspect-[4_/_3]">
            <PixelMap theme={theme} />
            {status !== 'unavailable' && (
              <iframe
                key={attempt}
                ref={frameRef}
                src={new URL(site.dynmapUrl).pathname}
                title={t('map.frameTitle')}
                allow="fullscreen"
                className={classes(
                  'absolute inset-0 h-full w-full [border:0] transition-opacity duration-400 ease-site',
                  status === 'ready' ? 'opacity-100' : 'pointer-events-none opacity-0',
                  frameStyle === 'tactical' && '[filter:contrast(1.08)_saturate(1.12)]',
                )}
                aria-hidden={status !== 'ready'}
                tabIndex={status === 'ready' ? 0 : -1}
              />
            )}
            {status !== 'ready' && (
              <span
                className="absolute left-1/2 top-1/2 [transform:translate(-50%,_-50%)] p-[10px_18px] rounded-[999px] bg-map-status [border:1px_solid_var(--line-strong)] text-[0.9rem] font-medium text-ink pointer-events-none"
                aria-live="polite"
              >
                {t(status === 'loading' ? 'map.connecting' : 'map.unavailable')}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
