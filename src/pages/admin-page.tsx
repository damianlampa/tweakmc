import type { PageProps } from '../types/page';
import type { Settings } from '../store/settings';
import type { AdminStats } from '../api/admin';
import { useEffect, useState } from 'react';
import { THEMES, THEME_LIST } from '../themes';
import { fetchAdminStats, syncAdminSettings } from '../api/admin';
import { DEFAULT_SETTINGS, resetSettings } from '../store/settings';
import { SectionDecor } from '../components/side-decor';

// Hasło lokalnego podglądu UI — na produkcji autoryzacja musi odbywać się po stronie backendu!
const DEMO_PIN = 'tweakmc2026';

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

const MAP_FRAME_OPTIONS = [
  { id: 'hud', label: 'Obsydian HUD', desc: 'Ciemna ramka z paskiem statusu i obramowaniem' },
  { id: 'fullscreen', label: 'Szeroki ekran', desc: 'Maksymalna szerokość podglądu mapy na /mapa' },
  {
    id: 'tactical',
    label: 'Taktyczny kontrast',
    desc: 'Wyrazisty ciemny filtr i podświetlona ramka',
  },
];

function formatPln(val: number) {
  return (
    Number(val || 0).toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + ' PLN'
  );
}

export default function AdminPage({
  settings,
  updateSettings,
  navigate,
}: PageProps & { updateSettings: (settings: Settings) => void }) {
  const [authed, setAuthed] = useState(() => {
    try {
      return window.sessionStorage.getItem('tweakmc-admin-auth') === '1';
    } catch {
      return false;
    }
  });
  const [pin, setPin] = useState('');
  const [pinErr, setPinErr] = useState('');
  const [tab, setTab] = useState('overview'); // 'overview' | 'toggles' | 'appearance'
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!authed) return;
    const ctrl = new AbortController();
    fetchAdminStats(ctrl.signal)
      .then((d) => setStats(d))
      .catch(() => {});
    return () => ctrl.abort();
  }, [authed]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin.trim() === DEMO_PIN) {
      setAuthed(true);
      setPinErr('');
      try {
        window.sessionStorage.setItem('tweakmc-admin-auth', '1');
      } catch {
        // ignore
      }
    } else {
      setPinErr('Niepoprawne hasło. W trybie podglądu użyj: tweakmc2026');
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    setPin('');
    try {
      window.sessionStorage.removeItem('tweakmc-admin-auth');
    } catch {
      // ignore
    }
  };

  const patch = async (next: Settings) => {
    updateSettings(next);
    const res = await syncAdminSettings(next);
    showToast(res.synced ? 'Zapisano na serwerze' : 'Zastosowano na żywo');
  };

  const toggleSection = (key: keyof Settings['sections']) => {
    patch({
      ...settings,
      sections: {
        ...settings.sections,
        [key]: !settings.sections[key],
      },
    });
  };

  const handleReset = () => {
    const fresh = resetSettings();
    updateSettings(fresh);
    showToast('Przywrócono domyślne ustawienia');
  };

  if (!authed) {
    return (
      <section className="page-shell sec-dark admin-login-page">
        <SectionDecor
          theme={settings.theme}
          variant="both"
          labelLeft="ADMIN // AUTH"
          labelRight="TWEAKMC.PL"
        />
        <div className="wrap">
          <form className="admin-login-card" onSubmit={handleLogin}>
            <a
              href="/"
              className="back-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              ← Powrót na stronę
            </a>
            <h1>Panel Administratora</h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              Zarządzanie zarobkami, sezonem, logotypami, mapą i widocznością wszystkich sekcji
              TweakMC.pl.
            </p>
            <div className="field tw-grid tw-gap-[10px]">
              <label htmlFor="admin-pin">Hasło dostępu</label>
              <div className={`nick-wrap ${pinErr ? 'has-error' : ''}`}>
                <input
                  id="admin-pin"
                  type="password"
                  placeholder="Wpisz hasło administratora..."
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (pinErr) setPinErr('');
                  }}
                />
              </div>
              {pinErr && <p className="field-error">{pinErr}</p>}
            </div>
            <button type="submit" className="btn btn-primary pay-submit">
              Zaloguj się do panelu
            </button>
            <p className="tw-text-[0.82rem] tw-text-muted">
              Hasło testowe (podgląd lokalny): <code className="inline-code">{DEMO_PIN}</code> · Na
              produkcji podepnij logowanie sesyjne po stronie backendu.
            </p>
          </form>
        </div>
      </section>
    );
  }

  const maxDay = stats ? Math.max(...stats.daily.map((d) => d.amount), 1) : 1;
  const activeTheme = THEMES[settings.theme] || THEMES.default;

  return (
    <section className="page-shell sec-dark admin-page">
      <div className="wrap">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[18px] tw-mb-[26px]">
          <div>
            <a
              href="/"
              className="back-link"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              ← Podgląd strony głównej
            </a>
            <h1 className="tw-text-[clamp(2.4rem,_5vw,_4rem)] tw-mt-[10px]">
              Admin Panel · TweakMC
            </h1>
          </div>
          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-[10px]">
            {toast && (
              <span className="admin-toast" role="status">
                {toast}
              </span>
            )}
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleReset}>
              Resetuj domyślne
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
              Wyloguj
            </button>
          </div>
        </div>

        <nav className="admin-tabs" aria-label="Sekcje panelu admina">
          <button
            type="button"
            className={`admin-tab ${tab === 'overview' ? 'is-active' : ''}`}
            onClick={() => setTab('overview')}
          >
            Zarobki i transakcje
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === 'toggles' ? 'is-active' : ''}`}
            onClick={() => setTab('toggles')}
          >
            Włącz / Wyłącz moduły
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === 'appearance' ? 'is-active' : ''}`}
            onClick={() => setTab('appearance')}
          >
            Sezon, logo i wygląd mapy
          </button>
        </nav>

        {/* ───── TAB 1: ZAROBKI ───── */}
        {tab === 'overview' && stats && (
          <div className="tw-grid tw-gap-[20px]">
            {stats.isPreview && (
              <div className="admin-banner">
                <strong>Tryb podglądu danych:</strong>
                {' liczby poniżej są przykładowe. Po włączeniu '}
                <code className="inline-code">shopApiEnabled: true</code> panel automatycznie czyta
                realne zarobki z <code className="inline-code">/api/admin/stats</code> (Stripe +
                plugin MC).
              </div>
            )}

            <div className="kpi-grid tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[16px]">
              <div className="kpi-card">
                <span>Łączne zarobki</span>
                <strong>{formatPln(stats.totalRevenue)}</strong>
              </div>
              <div className="kpi-card">
                <span>Zarobki (ten miesiąc)</span>
                <strong className="tw-text-accent-bright">{formatPln(stats.monthRevenue)}</strong>
              </div>
              <div className="kpi-card">
                <span>Liczba wpłat</span>
                <strong>{stats.totalTransactions}</strong>
              </div>
              <div className="kpi-card">
                <span>Średnie doładowanie</span>
                <strong>{formatPln(stats.avgOrder)}</strong>
              </div>
            </div>

            <div className="admin-two-col tw-grid tw-grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)] tw-gap-[20px]">
              <div className="admin-box">
                <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
                  <h2>Wpłaty z ostatnich 7 dni</h2>
                  <span className="board-tag">PLN / dzień</span>
                </div>
                <div
                  className="tw-grid tw-grid-cols-[repeat(7,_minmax(0,_1fr))] tw-gap-[10px] tw-h-[210px] [align-items:end] tw-pt-[10px]"
                  role="img"
                  aria-label="Wykres dziennych wpłat z ostatnich 7 dni"
                >
                  {stats.daily.map((d) => (
                    <div
                      className="tw-flex tw-flex-col tw-items-center tw-gap-[6px] tw-h-full"
                      key={d.day}
                    >
                      <span className="tw-font-mono tw-text-[0.72rem] tw-text-muted">
                        {d.amount}
                      </span>
                      <div className="bar-track">
                        <div
                          className="bar-fill"
                          style={{ height: `${Math.round((d.amount / maxDay) * 100)}%` }}
                        />
                      </div>
                      <span className="tw-text-[0.78rem] tw-text-muted">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-box">
                <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
                  <h2>Ostatnie transakcje Stripe → MC</h2>
                  <a
                    href="/sklep"
                    className="inline-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/sklep');
                    }}
                  >
                    Otwórz sklep
                  </a>
                </div>
                <div className="tw-overflow-x-auto">
                  <table className="tx-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Gracz</th>
                        <th>Kwota</th>
                        <th>Metoda</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td>
                            <code>{tx.id}</code>
                          </td>
                          <td>
                            <strong>{tx.nick}</strong>
                          </td>
                          <td className="tw-font-mono tw-font-semibold tw-text-accent-bright">
                            +{formatPln(tx.amount)}
                          </td>
                          <td>{tx.method}</td>
                          <td>
                            <span className="tx-ok">{tx.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ───── TAB 2: WŁĄCZ / WYŁĄCZ WSZYSTKO ───── */}
        {tab === 'toggles' && (
          <div className="tw-grid tw-gap-[20px]">
            <div className="admin-box">
              <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
                <h2>Przełączniki podstron i sekcji</h2>
                <div className="tw-flex tw-flex-wrap tw-gap-[8px]">
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                      patch({ ...settings, sections: { ...DEFAULT_SETTINGS.sections } })
                    }
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
                {SECTION_TOGGLES.map((item) => {
                  const on = !!settings.sections[item.key];
                  return (
                    <label key={item.key} className={`toggle-row ${on ? 'is-on' : 'is-off'}`}>
                      <div>
                        <strong>{item.label}</strong>
                        <span>{item.desc}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() => toggleSection(item.key)}
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
        )}

        {/* ───── TAB 3: SEZON, LOGO I WYGLĄD MAPY ───── */}
        {tab === 'appearance' && (
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
                    <span>
                      {settings.theme === t.id ? 'Aktywny motyw' : 'Kliknij, aby włączyć'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-box">
              <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
                <h2>Wygląd strony z mapą (/mapa)</h2>
                <a
                  href="/mapa"
                  className="inline-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/mapa');
                  }}
                >
                  Podgląd /mapa
                </a>
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
        )}
      </div>
    </section>
  );
}
