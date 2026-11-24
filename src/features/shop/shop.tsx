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
      <section className="page-shell sec-dark">
        <SectionDecor
          theme={settings.theme}
          variant="both"
          labelLeft={t('shop.offlineTag')}
          labelRight="TWEAKMC.PL"
        />

        <div className="wrap">
          <div className="disabled-card">
            <span className="disabled-tag">{t('shop.unavailable')}</span>
            <h1>{t('shop.disabled')}</h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {settings.maintenanceMsg === DEFAULT_SETTINGS.maintenanceMsg
                ? t('common.maintenance')
                : settings.maintenanceMsg}
            </p>

            <div className="tw-flex tw-flex-wrap tw-gap-[12px] tw-mt-[28px]">
              <Link to={paths.home} className="btn btn-primary">
                {t('nav.home')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell sec-elev">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft={t('shop.label')}
        labelRight="STRIPE // AUTO"
      />

      <div className="wrap">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[20px] tw-mb-[32px]">
          <div>
            <Link to={paths.home} className="back-link">
              {t('nav.back')}
            </Link>
            <h1 className="tw-text-[clamp(2.4rem,_5vw,_4rem)] tw-mt-[10px]">
              {t('shop.title')}
              <span className="tw-text-accent-bright">{t('shop.wallet')}</span>
            </h1>
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {t('shop.description')} <code className="inline-code">/portfel</code>
              {t('shop.network')}
            </p>
          </div>
        </div>

        <TopUpForm />

        {settings.sections.topboards && (
          <div className="tw-mt-[32px]">
            <Supporters />
          </div>
        )}
      </div>
    </section>
  );
}
