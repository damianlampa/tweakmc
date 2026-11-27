import { classes } from '@/shared/utils/classes';
import { pageGlow } from '@/shared/styles/background-classes';
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
      className={classes([
        'relative min-h-[100svh]',
        '[padding-block:calc(var(--nav-h)_+_clamp(32px,_5vh,_64px))_clamp(80px,_10vh,_120px)] overflow-hidden',
        pageGlow,
      ])}
    >
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft={t('map.offlineTag')}
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
            {t('map.unavailable')}
          </span>
          <h1>{t('map.disabled')}</h1>
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
