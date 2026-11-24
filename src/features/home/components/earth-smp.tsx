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
    <section className="sec sec-dark" id={homeSections.earthSmp}>
      <SectionDecor
        theme={settings.theme}
        variant="right"
        grid
        labelLeft={t('earth.tag')}
        labelRight={t('earth.modelTag')}
      />

      <div className={`wrap earth-grid ${settings.sections.tank3d ? '' : 'hero-grid-single'}`}>
        <div className="earth-copy">
          <KineticHeading text={t('earth.title')} accentWord="EarthSMP" />
          <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
            {t('earth.description')}
          </p>

          <ul className="features tw-list-none tw-m-[36px_0_0] tw-p-0">
            {FEATURES.map((feature) => {
              return (
                <li key={feature.title}>
                  <span className="feat-icon">{feature.icon}</span>
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
          <div className="earth-visual">
            <span className="hud-corner hud-tl" aria-hidden="true" />
            <span className="hud-corner hud-tr" aria-hidden="true" />
            <span className="hud-corner hud-bl" aria-hidden="true" />
            <span className="hud-corner hud-br" aria-hidden="true" />
            <span className="hud-chip hud-chip-top" aria-hidden="true">
              {t('earth.model')}
            </span>
            <Suspense fallback={<div className="tank" />}>
              <Tank theme={settings.theme} motion={settings.motion} />
            </Suspense>
          </div>
        )}
      </div>
    </section>
  );
}
