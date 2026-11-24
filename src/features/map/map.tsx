import { DEFAULT_SETTINGS } from '@/shared/settings/settings';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { SectionDecor } from '@/shared/components/section-decor';
import { useRouteSettings } from '@/router/use-route-settings';
import { LiveMap } from './components/live-map';

export default function MapPage() {
  const { t } = useTranslation();

  const { settings } = useRouteSettings();

  if (settings.sections.mapPage) {
    return <LiveMap theme={settings.theme} frameStyle={settings.mapFrame} />;
  }

  return (
    <section className="page-shell sec-dark">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft={t('map.offlineTag')}
        labelRight="TWEAKMC.PL"
      />

      <div className="wrap">
        <div className="disabled-card">
          <span className="disabled-tag">{t('map.unavailable')}</span>
          <h1>{t('map.disabled')}</h1>
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
