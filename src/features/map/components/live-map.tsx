import { pageGlow } from '@/shared/styles/background-classes';
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
      className={classes([
        'relative min-h-[100svh]',
        '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden',
        pageGlow,
        `map-page-frame-${frameStyle}`,
      ])}
    >
      <SectionDecor
        theme={theme}
        variant="both"
        labelLeft="DYNMAP // LIVE"
        labelRight={t('map.scale')}
      />

      <div
        className={classes([
          frameStyle === 'fullscreen'
            ? 'relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)] max-w-[1580px]'
            : 'relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]',
        ])}
      >
        <div className="flex flex-wrap justify-between items-end gap-5 mb-[32px]">
          <div>
            <Link
              to={paths.home}
              className={classes([
                'inline-flex items-center min-h-[36px] text-sm/relaxed font-medium text-muted christmas:text-christmas-muted halloween:text-halloween-muted',
                'spring:text-spring-muted no-underline [transition:color_0.2s] hover:text-purple-400',
                'christmas:hover:text-sky-300 halloween:hover:text-orange-300 spring:hover:text-emerald-300',
              ])}
            >
              {t('nav.back')}
            </Link>
            <h1 className="text-page-title mt-[10px]">
              {t('map.heading')}
              <span className="text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300">
                {t('map.live')}
              </span>
            </h1>
            <p className="mt-4 max-w-[58ch] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-base/relaxed">
              {t('map.description')}
            </p>
          </div>

          <div className="flex max-sm:w-full max-sm:[&_.btn]:w-full flex-wrap gap-3">
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-sm/none')}
              onClick={reload}
            >
              {icons.refresh}
              <span>{status === 'loading' ? t('map.loading') : t('map.refresh')}</span>
            </button>
            <a
              className={buttonClasses('primary', 'min-h-[44px] px-4 py-0 text-sm/none')}
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
          className={classes([
            'relative z-[10] rounded-[14px] [border:1px_solid_theme(colors.white/18%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface',
            'spring:bg-spring-surface overflow-hidden [box-shadow:0_24px_60px_-24px_theme(colors.black/85%)]',
            frameStyle === 'tactical' && [
              '!border-purple-400/55 christmas:!border-sky-300/55 halloween:!border-orange-300/55 spring:!border-emerald-300/55',
              '[box-shadow:0_0_42px_-14px_theme(colors.purple.600/50%)] christmas:[box-shadow:0_0_42px_-14px_theme(colors.sky.500/50%)]',
              'halloween:[box-shadow:0_0_42px_-14px_theme(colors.orange.600/50%)] spring:[box-shadow:0_0_42px_-14px_theme(colors.emerald.500/50%)]',
            ],
          ])}
        >
          <div className="flex items-center gap-2.5 p-[12px_18px] [border-bottom:1px_solid_theme(colors.white/9%)] text-sm/relaxed">
            <span
              className={classes([
                'relative w-[8px] h-[8px] rounded-[50%] bg-green-500 [box-shadow:0_0_10px_theme(colors.green.500/70%)]',
                "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%]",
                '[&::after]:[border:1.5px_solid_theme(colors.green.500)] [&::after]:animate-status-ping',
              ])}
              aria-hidden="true"
            />
            <span className="font-semibold whitespace-nowrap">Dynmap · EarthSMP</span>
            <code className="ml-auto font-mono text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted whitespace-nowrap">
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
                className={classes([
                  'absolute inset-0 h-full w-full [border:0] transition-opacity duration-400 ease-site',
                  status === 'ready' ? 'opacity-100' : 'pointer-events-none opacity-0',
                  frameStyle === 'tactical' && '[filter:contrast(1.08)_saturate(1.12)]',
                ])}
                aria-hidden={status !== 'ready'}
                tabIndex={status === 'ready' ? 0 : -1}
              />
            )}
            {status !== 'ready' && (
              <span
                className="absolute left-1/2 top-1/2 [transform:translate(-50%,_-50%)] p-[10px_18px] rounded-[999px] bg-overlay/[0.88] [border:1px_solid_theme(colors.white/18%)] text-sm/relaxed font-medium text-ink pointer-events-none"
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
