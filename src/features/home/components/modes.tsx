import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths, homeSections } from '@/router/paths';
import { homeSectionPath } from '@/router/utils/home-section-path';
import { THEMES } from '@/shared/config/themes';
import type { Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon } from '@/shared/components/icons';
import { onCardMove } from '@/shared/utils/card-glow';
import { KineticHeading } from './kinetic-heading';

export function Modes({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  const activeTheme = THEMES[settings.theme] || THEMES.default;

  return (
    <section className="sec sec-elev" id={homeSections.modes}>
      <SectionDecor
        theme={settings.theme}
        variant="left"
        labelLeft={t('modes.tag')}
        labelRight="EARTHSMP"
      />

      <div className="wrap">
        <KineticHeading text={t('modes.title')} accentWord="TweakMC" />
        <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
          {t('modes.description')}
        </p>

        <div className="modes-grid tw-grid tw-grid-cols-[minmax(0,_1.3fr)_minmax(0,_0.9fr)] tw-gap-[20px] tw-mt-[40px]">
          <article className="mode mode-active glow-card" onPointerMove={onCardMove}>
            <div className="mode-art tw-grid tw-place-items-center tw-p-[32px]">
              <img src={activeTheme.earthLogo} alt={t('modes.logo')} className="float-slow" />
            </div>

            <div className="mode-body tw-flex tw-flex-col tw-justify-center tw-p-[32px_32px_32px_8px]">
              <div className="tw-inline-flex tw-items-center tw-gap-[8px] tw-text-[0.85rem] tw-font-semibold tw-text-ink tw-mb-[12px]">
                <span className="live-dot" aria-hidden="true" />
                <span>{t('modes.active')}</span>
              </div>
              <h3>EarthSMP</h3>
              <p>{t('modes.descriptionEarth')}</p>

              <div className="tw-flex tw-flex-wrap tw-gap-[8px_22px] tw-mt-[20px]">
                <Link className="mode-link" to={homeSectionPath('earthSmp')}>
                  <span>{t('modes.features')}</span>
                  {Icon.arrow}
                </Link>
                {settings.sections.mapPage && (
                  <Link className="mode-link mode-link-muted" to={paths.map}>
                    <span>{t('modes.map')}</span>
                  </Link>
                )}
              </div>
            </div>
          </article>

          <div className="modes-upcoming tw-grid tw-gap-[20px]">
            <article className="mode mode-soon glow-card" onPointerMove={onCardMove}>
              <span className="tw-font-mono tw-text-[0.8rem] tw-text-accent-bright tw-mb-[10px]">
                {t('modes.upcoming')}
              </span>
              <h3>{t('modes.second')}</h3>
              <p>{t('modes.secondText')}</p>
            </article>

            <article className="mode mode-soon glow-card" onPointerMove={onCardMove}>
              <span className="tw-font-mono tw-text-[0.8rem] tw-text-accent-bright tw-mb-[10px]">
                {t('modes.upcoming')}
              </span>
              <h3>{t('modes.third')}</h3>
              <p>{t('modes.thirdText')}</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
