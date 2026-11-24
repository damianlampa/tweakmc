import { useState } from 'react';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { useRouteSettings } from '@/router/use-route-settings';
import type { Settings } from '@/shared/settings/settings';
import { resetSettings } from '@/shared/settings/settings';
import { AppearanceSettings } from './components/appearance-settings';
import { SectionSettings } from './components/section-settings';
import { RevenueOverview } from './components/revenue-overview';
import { syncAdminSettings } from './api';
import { AdminLogin } from './components/admin-login';
import { usePreviewSession } from './hooks/use-preview-session';
import { useAdminStats } from './hooks/use-admin-stats';

export default function AdminPage() {
  const { settings, updateSettings } = useRouteSettings();
  const { authed, handleLogin, handleLogout } = usePreviewSession();
  const [tab, setTab] = useState<'overview' | 'toggles' | 'appearance'>('overview');
  const stats = useAdminStats(authed);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2600);
  };

  const patch = async (next: Settings) => {
    updateSettings(next);
    const res = await syncAdminSettings(next);
    showToast(res.synced ? 'Zapisano na serwerze' : 'Zastosowano na żywo');
  };

  const handleReset = () => {
    const fresh = resetSettings();
    updateSettings(fresh);
    showToast('Przywrócono domyślne ustawienia');
  };

  if (!authed) return <AdminLogin settings={settings} onLogin={handleLogin} />;

  return (
    <section className="page-shell sec-dark admin-page">
      <div className="wrap">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[18px] tw-mb-[26px]">
          <div>
            <Link to={paths.home} className="back-link">
              ← Podgląd strony głównej
            </Link>
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

        {tab === 'overview' && stats && <RevenueOverview stats={stats} />}

        {tab === 'toggles' && <SectionSettings settings={settings} patch={patch} />}

        {tab === 'appearance' && <AppearanceSettings settings={settings} patch={patch} />}
      </div>
    </section>
  );
}
