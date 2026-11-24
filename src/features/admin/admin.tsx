import { AppearanceSettings } from './components/appearance-settings';
import { SectionSettings } from './components/section-settings';
import { RevenueOverview } from './components/revenue-overview';
import type { PageProps } from '@/shared/types/page';
import type { Settings } from '@/shared/settings/settings';
import { useState } from 'react';
import { syncAdminSettings } from './api';
import { resetSettings } from '@/shared/settings/settings';
import { AdminLogin } from './components/admin-login';

import { usePreviewSession } from './hooks/use-preview-session';
import { useAdminStats } from './hooks/use-admin-stats';
export default function AdminPage({
  settings,
  updateSettings,
  navigate,
}: PageProps & { updateSettings: (settings: Settings) => void }) {
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

  if (!authed) return <AdminLogin settings={settings} navigate={navigate} onLogin={handleLogin} />;
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

        {tab === 'overview' && stats && <RevenueOverview stats={stats} navigate={navigate} />}

        {tab === 'toggles' && <SectionSettings settings={settings} patch={patch} />}

        {tab === 'appearance' && (
          <AppearanceSettings settings={settings} patch={patch} navigate={navigate} />
        )}
      </div>
    </section>
  );
}
