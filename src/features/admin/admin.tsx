import { pageGlow } from '@/shared/styles/background-classes';
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
        pageGlow +
        ' ' +
        'admin-page'
      }
    >
      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="flex flex-wrap justify-between items-end gap-[18px] mb-[26px]">
          <div>
            <Link
              to={paths.home}
              className={
                'inline-flex items-center min-h-[36px] text-sm/relaxed font-medium text-muted christmas:text-christmas-muted halloween:text-halloween-muted ' +
                'spring:text-spring-muted no-underline [transition:color_0.2s] hover:text-purple-400 ' +
                'christmas:hover:text-sky-300 halloween:hover:text-orange-300 spring:hover:text-emerald-300'
              }
            >
              {t('admin.homePreview')}
            </Link>
            <h1 className="text-page-title mt-[10px]">{t('admin.title')}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {message && (
              <span
                className="p-[8px_14px] rounded-[8px] bg-green-500/[0.16] [border:1px_solid_theme(colors.green.500/40%)] text-green-300 text-sm/relaxed font-semibold"
                role="status"
              >
                {t(message)}
              </span>
            )}
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-sm/none')}
              onClick={restoreDefaults}
            >
              {t('admin.reset')}
            </button>
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-sm/none')}
              onClick={handleLogout}
            >
              {t('admin.logout')}
            </button>
          </div>
        </div>

        <nav
          className="flex flex-wrap gap-2 mb-[24px] pb-[16px] [border-bottom:1px_solid_theme(colors.white/9%)]"
          aria-label={t('admin.sections')}
        >
          <button
            type="button"
            className={classes(
              'min-h-[44px] px-[18px] py-0 rounded-[10px] [border:1px_solid_theme(colors.white/18%)] bg-surface christmas:bg-christmas-surface ' +
                'halloween:bg-halloween-surface spring:bg-spring-surface text-muted christmas:text-christmas-muted halloween:text-halloween-muted ' +
                'spring:text-spring-muted ' +
                'font-body font-semibold text-sm/none cursor-pointer ' +
                '[transition:background-color_0.2s,_color_0.2s,_border-color_0.2s] hover:text-ink [&.is-active]:bg-purple-600 christmas:[&.is-active]:bg-sky-600 ' +
                'halloween:[&.is-active]:bg-orange-600 spring:[&.is-active]:bg-emerald-600 ' +
                '[&.is-active]:border-purple-400 christmas:[&.is-active]:border-sky-300 halloween:[&.is-active]:border-orange-300 spring:[&.is-active]:border-emerald-300 [&.is-active]:text-white',
              tab === 'overview' ? 'is-active' : '',
            )}
            onClick={() => setTab('overview')}
          >
            {t('admin.overview')}
          </button>
          <button
            type="button"
            className={classes(
              'min-h-[44px] px-[18px] py-0 rounded-[10px] [border:1px_solid_theme(colors.white/18%)] bg-surface christmas:bg-christmas-surface ' +
                'halloween:bg-halloween-surface spring:bg-spring-surface text-muted christmas:text-christmas-muted halloween:text-halloween-muted ' +
                'spring:text-spring-muted ' +
                'font-body font-semibold text-sm/none cursor-pointer ' +
                '[transition:background-color_0.2s,_color_0.2s,_border-color_0.2s] hover:text-ink [&.is-active]:bg-purple-600 christmas:[&.is-active]:bg-sky-600 ' +
                'halloween:[&.is-active]:bg-orange-600 spring:[&.is-active]:bg-emerald-600 ' +
                '[&.is-active]:border-purple-400 christmas:[&.is-active]:border-sky-300 halloween:[&.is-active]:border-orange-300 spring:[&.is-active]:border-emerald-300 [&.is-active]:text-white',
              tab === 'toggles' ? 'is-active' : '',
            )}
            onClick={() => setTab('toggles')}
          >
            {t('admin.toggles')}
          </button>
          <button
            type="button"
            className={classes(
              'min-h-[44px] px-[18px] py-0 rounded-[10px] [border:1px_solid_theme(colors.white/18%)] bg-surface christmas:bg-christmas-surface ' +
                'halloween:bg-halloween-surface spring:bg-spring-surface text-muted christmas:text-christmas-muted halloween:text-halloween-muted ' +
                'spring:text-spring-muted ' +
                'font-body font-semibold text-sm/none cursor-pointer ' +
                '[transition:background-color_0.2s,_color_0.2s,_border-color_0.2s] hover:text-ink [&.is-active]:bg-purple-600 christmas:[&.is-active]:bg-sky-600 ' +
                'halloween:[&.is-active]:bg-orange-600 spring:[&.is-active]:bg-emerald-600 ' +
                '[&.is-active]:border-purple-400 christmas:[&.is-active]:border-sky-300 halloween:[&.is-active]:border-orange-300 spring:[&.is-active]:border-emerald-300 [&.is-active]:text-white',
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
