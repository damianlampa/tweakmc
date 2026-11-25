import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
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
    <section
      className={
        'relative min-h-[100svh] ' +
        '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden ' +
        '[background:radial-gradient(620px_380px_at_85%_20%,_rgba(var(--accent-rgb),_0.12),_transparent_72%),_var(--bg)] ' +
        'admin-page'
      }
    >
      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="flex flex-wrap justify-between items-end gap-[18px] mb-[26px]">
          <div>
            <Link
              to={paths.home}
              className="inline-flex items-center min-h-[36px] text-[0.9rem] font-medium text-muted no-underline [transition:color_0.2s] hover:text-accent-bright"
            >
              {t('admin.homePreview')}
            </Link>
            <h1 className="text-[clamp(2.4rem,_5vw,_4rem)] mt-[10px]">{t('admin.title')}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {message && (
              <span
                className="p-[8px_14px] rounded-[8px] [background:rgba(34,_197,_94,_0.16)] [border:1px_solid_rgba(34,_197,_94,_0.4)] [color:#86efac] text-[0.84rem] font-semibold"
                role="status"
              >
                {t(message)}
              </span>
            )}
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-[0.9rem]/none')}
              onClick={restoreDefaults}
            >
              {t('admin.reset')}
            </button>
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-[0.9rem]/none')}
              onClick={handleLogout}
            >
              {t('admin.logout')}
            </button>
          </div>
        </div>

        <nav
          className="flex flex-wrap gap-2 mb-[24px] pb-[16px] [border-bottom:1px_solid_var(--line)]"
          aria-label={t('admin.sections')}
        >
          <button
            type="button"
            className={classes(
              'min-h-[44px] px-[18px] py-0 rounded-[10px] [border:1px_solid_var(--line-strong)] bg-surface text-muted ' +
                '[font:600_0.9rem/1_var(--body)] cursor-pointer ' +
                '[transition:background-color_0.2s,_color_0.2s,_border-color_0.2s] hover:text-ink [&.is-active]:bg-accent ' +
                '[&.is-active]:[border-color:var(--accent-bright)] [&.is-active]:[color:#ffffff]',
              tab === 'overview' ? 'is-active' : '',
            )}
            onClick={() => setTab('overview')}
          >
            {t('admin.overview')}
          </button>
          <button
            type="button"
            className={classes(
              'min-h-[44px] px-[18px] py-0 rounded-[10px] [border:1px_solid_var(--line-strong)] bg-surface text-muted ' +
                '[font:600_0.9rem/1_var(--body)] cursor-pointer ' +
                '[transition:background-color_0.2s,_color_0.2s,_border-color_0.2s] hover:text-ink [&.is-active]:bg-accent ' +
                '[&.is-active]:[border-color:var(--accent-bright)] [&.is-active]:[color:#ffffff]',
              tab === 'toggles' ? 'is-active' : '',
            )}
            onClick={() => setTab('toggles')}
          >
            {t('admin.toggles')}
          </button>
          <button
            type="button"
            className={classes(
              'min-h-[44px] px-[18px] py-0 rounded-[10px] [border:1px_solid_var(--line-strong)] bg-surface text-muted ' +
                '[font:600_0.9rem/1_var(--body)] cursor-pointer ' +
                '[transition:background-color_0.2s,_color_0.2s,_border-color_0.2s] hover:text-ink [&.is-active]:bg-accent ' +
                '[&.is-active]:[border-color:var(--accent-bright)] [&.is-active]:[color:#ffffff]',
              tab === 'appearance' ? 'is-active' : '',
            )}
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
