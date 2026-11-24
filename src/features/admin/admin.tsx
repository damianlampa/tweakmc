import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { AppearanceSettings } from './components/appearance-settings';
import { SectionSettings } from './components/section-settings';
import { RevenueOverview } from './components/revenue-overview';
import { useAdminSettings } from './hooks/use-admin-settings';
import { AdminLogin } from './components/admin-login';
import { usePreviewSession } from './hooks/use-preview-session';

export default function AdminPage() {
  const { t } = useTranslation();

  const { authed, handleLogin, handleLogout } = usePreviewSession();
  const { settings, applySettings, restoreDefaults, message } = useAdminSettings();
  const [tab, setTab] = useState<'overview' | 'toggles' | 'appearance'>('overview');

  if (!authed) return <AdminLogin settings={settings} onLogin={handleLogin} />;

  return (
    <section className="page-shell sec-dark admin-page">
      <div className="wrap">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[18px] tw-mb-[26px]">
          <div>
            <Link to={paths.home} className="back-link">
              {t('admin.homePreview')}
            </Link>
            <h1 className="tw-text-[clamp(2.4rem,_5vw,_4rem)] tw-mt-[10px]">{t('admin.title')}</h1>
          </div>

          <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-[10px]">
            {message && (
              <span className="admin-toast" role="status">
                {t(message)}
              </span>
            )}
            <button type="button" className="btn btn-secondary btn-sm" onClick={restoreDefaults}>
              {t('admin.reset')}
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleLogout}>
              {t('admin.logout')}
            </button>
          </div>
        </div>

        <nav className="admin-tabs" aria-label={t('admin.sections')}>
          <button
            type="button"
            className={`admin-tab ${tab === 'overview' ? 'is-active' : ''}`}
            onClick={() => setTab('overview')}
          >
            {t('admin.overview')}
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === 'toggles' ? 'is-active' : ''}`}
            onClick={() => setTab('toggles')}
          >
            {t('admin.toggles')}
          </button>
          <button
            type="button"
            className={`admin-tab ${tab === 'appearance' ? 'is-active' : ''}`}
            onClick={() => setTab('appearance')}
          >
            {t('admin.appearance')}
          </button>
        </nav>

        {tab === 'overview' && <RevenueOverview />}

        {tab === 'toggles' && <SectionSettings settings={settings} patch={applySettings} />}

        {tab === 'appearance' && <AppearanceSettings settings={settings} patch={applySettings} />}
      </div>
    </section>
  );
}
