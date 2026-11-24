import { Link } from 'react-router';
import { paths } from '@/router/paths';
import type { Settings } from '@/shared/settings/settings';
import { THEMES, THEME_LIST } from '@/shared/config/themes';

const MAP_FRAME_OPTIONS = [
  { id: 'hud', label: 'Obsydian HUD', desc: 'Ciemna ramka z paskiem statusu i obramowaniem' },
  { id: 'fullscreen', label: 'Szeroki ekran', desc: 'Maksymalna szerokość podglądu mapy na /mapa' },
  {
    id: 'tactical',
    label: 'Taktyczny kontrast',
    desc: 'Wyrazisty ciemny filtr i podświetlona ramka',
  },
] as const;

export function AppearanceSettings({
  settings,
  patch,
}: {
  settings: Settings;
  patch: (next: Settings) => void;
}) {
  const activeTheme = THEMES[settings.theme] || THEMES.default;

  return (
    <div className="tw-grid tw-gap-[20px]">
      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>Aktywny sezon i automatyczna zmiana logo</h2>
          <span className="board-tag">Aktywne: {activeTheme.label}</span>
        </div>
        <div className="season-cards tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[14px]">
          {THEME_LIST.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`season-admin-card ${settings.theme === t.id ? 'is-active' : ''}`}
              onClick={() => patch({ ...settings, theme: t.id })}
            >
              <div className="season-logo-pair tw-flex tw-items-center tw-justify-center tw-gap-[10px] tw-h-[62px]">
                <img src={t.logo} alt={`Logo ${t.label}`} />
                <img src={t.earthLogo} alt={`EarthSMP ${t.label}`} />
              </div>
              <strong>{t.label}</strong>
              <span>{settings.theme === t.id ? 'Aktywny motyw' : 'Kliknij, aby włączyć'}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>Wygląd strony z mapą (/mapa)</h2>
          <Link to={paths.map} className="inline-link">
            Podgląd /mapa
          </Link>
        </div>
        <div className="option-row tw-grid tw-grid-cols-[repeat(3,_minmax(0,_1fr))] tw-gap-[12px]">
          {MAP_FRAME_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`option-card ${settings.mapFrame === opt.id ? 'is-active' : ''}`}
              onClick={() => patch({ ...settings, mapFrame: opt.id })}
            >
              <strong>{opt.label}</strong>
              <span>{opt.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
