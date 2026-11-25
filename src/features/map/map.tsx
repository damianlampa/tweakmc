import { buttonClasses } from '@/shared/components/button-classes';
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
        labelLeft={t('map.offlineTag')}
        labelRight="TWEAKMC.PL"
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="max-w-[640px] m-[clamp(32px,_8vh,_80px)_auto] p-[clamp(28px,_4vw,_44px)] rounded-[18px] [border:1px_solid_var(--line-strong)] bg-bg-elev">
          <span className="inline-block mb-[14px] p-[5px_10px] rounded-[7px] [background:rgba(239,_68,_68,_0.16)] [border:1px_solid_rgba(239,_68,_68,_0.4)] font-mono text-xs/relaxed [color:#fca5a5]">
            {t('map.unavailable')}
          </span>
          <h1>{t('map.disabled')}</h1>
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
