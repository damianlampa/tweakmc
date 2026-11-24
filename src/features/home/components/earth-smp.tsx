import { lazy, Suspense } from 'react';
import { type Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/side-decor';
import { Icon } from '@/shared/components/icons';
import { KineticHeading } from './animated-heading';

const Tank = lazy(() => import('../scenes/tank'));

const FEATURES = [
  {
    icon: Icon.flag,
    title: 'Własne państwa i miasta',
    text: 'Wybierasz miejsce na prawdziwym kontynencie, wyznaczasz granice i rozwijasz kraj ze swoją ekipą.',
  },
  {
    icon: Icon.trade,
    title: 'Ekonomia i handel surowcami',
    text: 'Każdy region ma inne zasoby. Handlujesz z sąsiadami albo przejmujesz szlaki siłą.',
  },
  {
    icon: Icon.shield,
    title: 'Dyplomacja, sojusze i wojny',
    text: 'Pakty, zdrady i bitwy o terytoria. Granice na mapie zmieniają się każdego dnia.',
  },
  {
    icon: Icon.tank,
    title: 'Pojazdy wojskowe',
    text: 'Na front nie ruszasz pieszo. Czołgi i maszyny bojowe decydują o losach oblężeń.',
  },
];

export function EarthSMP({ settings }: { settings: Settings }) {
  return (
    <section className="sec sec-dark" id="earthsmp">
      <SectionDecor
        theme={settings.theme}
        variant="right"
        grid
        labelLeft="GEOPOLITYKA"
        labelRight="POJAZDY // 3D"
      />
      <div className={`wrap earth-grid ${settings.sections.tank3d ? '' : 'hero-grid-single'}`}>
        <div className="earth-copy">
          <KineticHeading text="Flagowy tryb: EarthSMP" accentWord="EarthSMP" />
          <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
            Pierwszy tryb na TweakMC. Łączy klasyczny survival z geopolityką na prawdziwej mapie
            Ziemi — bez paczek modów na wejściu.
          </p>
          <ul className="features tw-list-none tw-m-[36px_0_0] tw-p-0">
            {FEATURES.map((f) => (
              <li key={f.title}>
                <span className="feat-icon">{f.icon}</span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {settings.sections.tank3d && (
          <div className="earth-visual">
            <span className="hud-corner hud-tl" aria-hidden="true" />
            <span className="hud-corner hud-tr" aria-hidden="true" />
            <span className="hud-corner hud-bl" aria-hidden="true" />
            <span className="hud-corner hud-br" aria-hidden="true" />
            <span className="hud-chip hud-chip-top" aria-hidden="true">
              Model 3D · Pojazd bojowy
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
