import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { lazy, Suspense } from 'react';
import { homeSections } from '@/router/paths';
import { type Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon } from '@/shared/components/icons';
import { KineticHeading } from './kinetic-heading';

const Tank = lazy(() => import('../scenes/tank'));

const FEATURES = [
  {
    icon: Icon.flag,
    title: 'earth.nations',
    text: 'earth.nationsText',
  },
  {
    icon: Icon.trade,
    title: 'earth.trade',
    text: 'earth.tradeText',
  },
  {
    icon: Icon.shield,
    title: 'earth.diplomacy',
    text: 'earth.diplomacyText',
  },
  {
    icon: Icon.tank,
    title: 'earth.vehicles',
    text: 'earth.vehiclesText',
  },
];

export function EarthSMP({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  return (
    <section
      className={
        'relative overflow-hidden [padding-block:clamp(72px,_10vh,_116px)] [border-top:1px_solid_var(--line)] ' +
        '[background:radial-gradient(620px_380px_at_85%_20%,_rgba(var(--accent-rgb),_0.12),_transparent_72%),_var(--bg)]'
      }
      id={homeSections.earthSmp}
    >
      <SectionDecor
        theme={settings.theme}
        variant="right"
        grid
        labelLeft={t('earth.tag')}
        labelRight={t('earth.modelTag')}
      />

      <div
        className={classes(
          'relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] ' +
            '[padding-inline:var(--pad)] grid grid-cols-[minmax(0,_1fr)_minmax(0,_1fr)] gap-[clamp(32px,_5vw,_72px)] ' +
            'items-center max-wide:grid-cols-[minmax(0,_1fr)]',
          settings.sections.tank3d ? '' : 'grid-cols-[minmax(0,_760px)]',
        )}
      >
        <div className="earth-copy">
          <KineticHeading text={t('earth.title')} accentWord="EarthSMP" />
          <p className="mt-4 max-w-[58ch] text-muted text-[1.08rem]">{t('earth.description')}</p>

          <ul
            className={
              '[&_li]:grid [&_li]:grid-cols-[44px_1fr] [&_li]:gap-[18px] [&_li]:p-[20px_0] ' +
              '[&_li]:[border-top:1px_solid_var(--line)] [&_li:last-child]:[border-bottom:1px_solid_var(--line)] ' +
              '[&_h3]:mb-[4px] [&_p]:text-muted [&_p]:text-[0.96rem] list-none m-[36px_0_0] p-0'
            }
          >
            {FEATURES.map((feature) => {
              return (
                <li key={feature.title}>
                  <span className="grid place-items-center w-[44px] h-[44px] rounded-[10px] bg-surface [border:1px_solid_var(--line-strong)] text-accent-bright">
                    {feature.icon}
                  </span>
                  <div>
                    <h3>{t(feature.title)}</h3>
                    <p>{t(feature.text)}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {settings.sections.tank3d && (
          <div
            className={
              'relative w-full aspect-[1_/_0.92] rounded-[16px] [border:1px_solid_var(--line-strong)] ' +
              '[background:radial-gradient(360px_320px_at_50%_54%,_rgba(var(--accent-rgb),_0.22),_transparent_72%),_var(--bg-elev)] ' +
              'overflow-hidden'
            }
          >
            <span
              className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] top-[10px] left-[10px] border-t-2 border-l-2"
              aria-hidden="true"
            />
            <span
              className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] top-[10px] right-[10px] border-t-2 border-r-2"
              aria-hidden="true"
            />
            <span
              className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] bottom-[10px] left-[10px] border-b-2 border-l-2"
              aria-hidden="true"
            />
            <span
              className="absolute w-[18px] h-[18px] [border-color:rgba(var(--bright-rgb),_0.5)] [border-style:solid] border-0 pointer-events-none z-[3] bottom-[10px] right-[10px] border-b-2 border-r-2"
              aria-hidden="true"
            />
            <span
              className="hud-chip text-ink max-sm:p-[5px_10px] max-sm:text-[0.68rem] top-[18px] right-[18px] animate-hud-float"
              aria-hidden="true"
            >
              {t('earth.model')}
            </span>
            <Suspense
              fallback={
                <div className="tank absolute inset-0 [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:block [&_canvas]:touch-pan-y [&_canvas]:cursor-grab [&_canvas:active]:cursor-grabbing" />
              }
            >
              <Tank theme={settings.theme} motion={settings.motion} />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}
