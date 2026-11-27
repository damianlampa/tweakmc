import { classes } from '@/shared/utils/classes';
import { pageGlow, elevatedPageGlow } from '@/shared/styles/background-classes';
import { buttonClasses } from '@/shared/components/button-classes';
import { CodeLabel } from '@/shared/components/code-label';
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
        className={classes([
          'relative min-h-[100svh]',
          '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden',
          pageGlow,
        ])}
      >
        <SectionDecor
          theme={settings.theme}
          variant="both"
          labelLeft={t('shop.offlineTag')}
          labelRight="TWEAKMC.PL"
        />

        <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
          <div
            className={classes([
              'max-w-[640px] m-[clamp(32px,_8vh,_80px)_auto] p-[clamp(28px,_4vw,_44px)] rounded-[18px] [border:1px_solid_theme(colors.white/18%)]',
              'bg-background-elevated christmas:bg-christmas-background-elevated halloween:bg-halloween-background-elevated spring:bg-spring-background-elevated',
            ])}
          >
            <span className="inline-block mb-[14px] p-[5px_10px] rounded-[7px] bg-red-500/[0.16] [border:1px_solid_theme(colors.red.500/40%)] font-mono text-xs/relaxed text-red-300">
              {t('shop.unavailable')}
            </span>
            <h1>{t('shop.disabled')}</h1>
            <p className="mt-4 max-w-[58ch] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-base/relaxed">
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
      className={classes([
        'relative min-h-[100svh]',
        '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden',
        elevatedPageGlow,
      ])}
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
              className={classes([
                'inline-flex items-center min-h-[36px] text-sm/relaxed font-medium text-muted christmas:text-christmas-muted halloween:text-halloween-muted',
                'spring:text-spring-muted no-underline [transition:color_0.2s] hover:text-purple-400',
                'christmas:hover:text-sky-300 halloween:hover:text-orange-300 spring:hover:text-emerald-300',
              ])}
            >
              {t('nav.back')}
            </Link>
            <h1 className="text-page-title mt-[10px]">
              {t('shop.title')}
              <span className="text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300">
                {t('shop.wallet')}
              </span>
            </h1>
            <p className="mt-4 max-w-[58ch] text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted text-base/relaxed">
              {t('shop.description')} <CodeLabel>/portfel</CodeLabel>
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
