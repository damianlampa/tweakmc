import { Link } from 'react-router';
import { paths, homeSections, homeSectionPath } from '@/router/paths';
import { THEMES } from '@/shared/config/themes';
import type { Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { Icon } from '@/shared/components/icons';
import { onCardMove } from '@/shared/utils/card-glow';
import { KineticHeading } from './kinetic-heading';

export function Modes({ settings }: { settings: Settings }) {
  const activeTheme = THEMES[settings.theme] || THEMES.default;

  return (
    <section className="sec sec-elev" id={homeSections.modes}>
      <SectionDecor
        theme={settings.theme}
        variant="left"
        labelLeft="TRYBY // 01"
        labelRight="EARTHSMP"
      />

      <div className="wrap">
        <KineticHeading text="Tryby sieci TweakMC" accentWord="TweakMC" />
        <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
          Budujemy wielotrybową sieć serwerów. Pierwszy tryb już działa na pełnych obrotach, a
          kolejne są w drodze.
        </p>

        <div className="modes-grid tw-grid tw-grid-cols-[minmax(0,_1.3fr)_minmax(0,_0.9fr)] tw-gap-[20px] tw-mt-[40px]">
          <article className="mode mode-active glow-card" onPointerMove={onCardMove}>
            <div className="mode-art tw-grid tw-place-items-center tw-p-[32px]">
              <img src={activeTheme.earthLogo} alt="Logo TweakMC EarthSMP" className="float-slow" />
            </div>

            <div className="mode-body tw-flex tw-flex-col tw-justify-center tw-p-[32px_32px_32px_8px]">
              <div className="tw-inline-flex tw-items-center tw-gap-[8px] tw-text-[0.85rem] tw-font-semibold tw-text-ink tw-mb-[12px]">
                <span className="live-dot" aria-hidden="true" />
                <span>Tryb aktywny</span>
              </div>
              <h3>EarthSMP</h3>
              <p>
                Prawdziwa mapa Ziemi, własne państwa, rozbudowana ekonomia, dyplomacja i wojny z
                pojazdami wojskowymi.
              </p>

              <div className="tw-flex tw-flex-wrap tw-gap-[8px_22px] tw-mt-[20px]">
                <Link className="mode-link" to={homeSectionPath('earthSmp')}>
                  <span>Poznaj mechaniki</span>
                  {Icon.arrow}
                </Link>
                {settings.sections.mapPage && (
                  <Link className="mode-link mode-link-muted" to={paths.map}>
                    <span>Otwórz mapę (/mapa)</span>
                  </Link>
                )}
              </div>
            </div>
          </article>

          <div className="modes-upcoming tw-grid tw-gap-[20px]">
            <article className="mode mode-soon glow-card" onPointerMove={onCardMove}>
              <span className="tw-font-mono tw-text-[0.8rem] tw-text-accent-bright tw-mb-[10px]">
                W przygotowaniu
              </span>
              <h3>Nowy tryb #2</h3>
              <p>
                Kolejny tryb sieci jest już projektowany. Zapowiedzi i testy dla graczy wrzucamy
                najpierw na Discorda.
              </p>
            </article>

            <article className="mode mode-soon glow-card" onPointerMove={onCardMove}>
              <span className="tw-font-mono tw-text-[0.8rem] tw-text-accent-bright tw-mb-[10px]">
                W przygotowaniu
              </span>
              <h3>Nowy tryb #3</h3>
              <p>
                Masz pomysł, w co chcesz zagrać na TweakMC? Zaproponuj kolejny tryb na naszym
                Discordzie.
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
