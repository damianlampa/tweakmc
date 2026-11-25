import { buttonClasses } from '@/shared/components/button-classes';
import { DEFAULT_SETTINGS } from '@/shared/settings/settings';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { useRouteSettings } from '@/router/use-route-settings';
import { Supporters } from '@/features/supporters';
import { SectionDecor } from '@/shared/components/section-decor';
import { TopUpForm } from './components/top-up-form';

export default function ShopPage() {
  const { t } = useTranslation();

  const { settings } = useRouteSettings();

  if (!settings.sections.shopPage) {
    return (
      <section
        className={
          'relative min-h-[100svh] ' +
          '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden ' +
          '[background:radial-gradient(620px_380px_at_85%_20%,_rgba(var(--accent-rgb),_0.12),_transparent_72%),_var(--bg)]'
        }
      >
        <SectionDecor
          theme={settings.theme}
          variant="both"
          labelLeft={t('shop.offlineTag')}
          labelRight="TWEAKMC.PL"
        />

        <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
          <div className="max-w-[640px] m-[clamp(32px,_8vh,_80px)_auto] p-[clamp(28px,_4vw,_44px)] rounded-[18px] [border:1px_solid_var(--line-strong)] bg-bg-elev">
            <span className="inline-block mb-[14px] p-[5px_10px] rounded-[7px] [background:rgba(239,_68,_68,_0.16)] [border:1px_solid_rgba(239,_68,_68,_0.4)] font-mono text-xs/relaxed [color:#fca5a5]">
              {t('shop.unavailable')}
            </span>
            <h1>{t('shop.disabled')}</h1>
            <p className="mt-4 max-w-[58ch] text-muted text-base/relaxed">
              {settings.maintenanceMsg === DEFAULT_SETTINGS.maintenanceMsg
                ? t('common.maintenance')
                : settings.maintenanceMsg}
            </p>

            <div className="flex flex-wrap gap-3 mt-[28px]">
              <Link to={paths.home} className={buttonClasses('primary')}>
                {t('nav.home')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={
        'relative min-h-[100svh] ' +
        '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden ' +
        '[background:radial-gradient(620px_380px_at_15%_25%,_rgba(var(--accent-rgb),_0.11),_transparent_72%),_var(--bg-elev)]'
      }
    >
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft={t('shop.label')}
        labelRight="STRIPE // AUTO"
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="flex flex-wrap justify-between items-end gap-5 mb-[32px]">
          <div>
            <Link
              to={paths.home}
              className="inline-flex items-center min-h-[36px] text-sm/relaxed font-medium text-muted no-underline [transition:color_0.2s] hover:text-accent-bright"
            >
              {t('nav.back')}
            </Link>
            <h1 className="text-page-title mt-[10px]">
              {t('shop.title')}
              <span className="text-accent-bright">{t('shop.wallet')}</span>
            </h1>
            <p className="mt-4 max-w-[58ch] text-muted text-base/relaxed">
              {t('shop.description')} <code className="code-label">/portfel</code>
              {t('shop.network')}
            </p>
          </div>
        </div>

        <TopUpForm />

        {settings.sections.topboards && (
          <div className="mt-[32px]">
            <Supporters />
          </div>
        )}
      </div>
    </section>
  );
}
