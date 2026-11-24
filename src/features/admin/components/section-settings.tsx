import type { Settings } from '@/shared/settings/settings';
import { DEFAULT_SETTINGS } from '@/shared/settings/settings';

const SECTION_TOGGLES: { key: keyof Settings['sections']; label: string; desc: string }[] = [
  {
    key: 'mapPage',
    label: 'Podstrona Mapa (/mapa)',
    desc: 'Włącza lub wyłącza dostęp do mapy Dynmap na żywo',
  },
  {
    key: 'shopPage',
    label: 'Podstrona Sklep (/sklep)',
    desc: 'Włącza lub wyłącza formularz doładowań /portfel',
  },
  {
    key: 'topboards',
    label: 'Top 3 wpłat i 5 ostatnich zakupów',
    desc: 'Podium i ostatnie zakupy na głównej oraz w sklepie',
  },
  { key: 'hero', label: 'Sekcja Hero', desc: 'Główny ekran powitalny sieci na stronie głównej' },
  {
    key: 'heroGlobe',
    label: 'Interaktywna kula Ziemi 3D',
    desc: 'Obracający się globus 3D po prawej stronie Hero',
  },
  {
    key: 'ticker',
    label: 'Kinetyczny pasek (Ticker)',
    desc: 'Płynący pasek z informacjami o sieci pod Hero',
  },
  {
    key: 'modes',
    label: 'Sekcja Tryby sieci',
    desc: 'Karta EarthSMP i zapowiedzi kolejnych trybów',
  },
  {
    key: 'earthsmp',
    label: 'Sekcja Flagowy tryb: EarthSMP',
    desc: 'Lista mechanik EarthSMP na stronie głównej',
  },
  { key: 'tank3d', label: 'Model 3D czołgu', desc: 'Interaktywna diorama 3D w sekcji EarthSMP' },
  {
    key: 'join',
    label: 'Sekcja Jak dołączyć (4 kroki)',
    desc: 'Instrukcja wejścia na serwer Minecraft Java',
  },
  {
    key: 'discord',
    label: 'Zakładka Discord na dole',
    desc: 'Niebieska karta społeczności z kanałami i zaproszeniem',
  },
  {
    key: 'seasonFx',
    label: 'Efekty cząsteczek w tle',
    desc: 'Śnieg w Święta, żar w Halloween, świetliki w Wiosnę',
  },
];

export function SectionSettings({
  settings,
  patch,
}: {
  settings: Settings;
  patch: (next: Settings) => void;
}) {
  const toggleSection = (key: keyof Settings['sections']) => {
    patch({
      ...settings,
      sections: {
        ...settings.sections,
        [key]: !settings.sections[key],
      },
    });
  };

  return (
    <div className="tw-grid tw-gap-[20px]">
      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>Przełączniki podstron i sekcji</h2>

          <div className="tw-flex tw-flex-wrap tw-gap-[8px]">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => patch({ ...settings, sections: { ...DEFAULT_SETTINGS.sections } })}
            >
              Włącz wszystko
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() =>
                patch({
                  ...settings,
                  sections: { ...settings.sections, mapPage: false, shopPage: false },
                })
              }
            >
              Wyłącz Mapę i Sklep
            </button>
          </div>
        </div>

        <div className="toggle-grid tw-grid tw-grid-cols-[repeat(2,_minmax(0,_1fr))] tw-gap-[12px]">
          {SECTION_TOGGLES.map((sectionToggle) => {
            const isEnabled = settings.sections[sectionToggle.key];

            return (
              <label
                key={sectionToggle.key}
                className={`toggle-row ${isEnabled ? 'is-on' : 'is-off'}`}
              >
                <div>
                  <strong>{sectionToggle.label}</strong>
                  <span>{sectionToggle.desc}</span>
                </div>
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => toggleSection(sectionToggle.key)}
                />
                <span className="switch-ui" aria-hidden="true" />
              </label>
            );
          })}

          <label className={`toggle-row ${settings.motion ? 'is-on' : 'is-off'}`}>
            <div>
              <strong>Animacje i obrót 3D</strong>
              <span>Globalne sterowanie ruchem 3D i animacjami napisów dla graczy</span>
            </div>
            <input
              type="checkbox"
              checked={settings.motion}
              onChange={() => patch({ ...settings, motion: !settings.motion })}
            />
            <span className="switch-ui" aria-hidden="true" />
          </label>
        </div>
      </div>

      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>Komunikat przy wyłączonej Mapie lub Sklepie</h2>
        </div>

        <div className="nick-wrap">
          <input
            type="text"
            value={settings.maintenanceMsg}
            onChange={(e) => patch({ ...settings, maintenanceMsg: e.target.value })}
            placeholder="Wpisz komunikat dla graczy..."
          />
        </div>
      </div>
    </div>
  );
}
