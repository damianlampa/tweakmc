import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import type { Settings } from '@/shared/settings/settings';
import { THEMES, THEME_LIST } from '@/shared/config/themes';
import { AdminCard } from './admin-card';

const MAP_FRAME_OPTIONS = [
  { id: 'hud', label: 'appearance.hud', desc: 'appearance.hudDescription' },
  { id: 'fullscreen', label: 'appearance.wide', desc: 'appearance.wideDescription' },
  {
    id: 'tactical',
    label: 'appearance.tactical',
    desc: 'appearance.tacticalDescription',
  },
] as const;

export function AppearanceSettings({
  settings,
  patch,
}: {
  settings: Settings;
  patch: (next: Settings) => void;
}) {
  const { t } = useTranslation();

  const activeTheme = THEMES[settings.theme] || THEMES.default;

  return (
    <div className="grid gap-5">
      <AdminCard>
        <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
          <h2>{t('appearance.title')}</h2>
          <span
            className={
              'font-mono text-xs/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted p-[3px_8px] rounded-[6px] ' +
              '[border:1px_solid_theme(colors.white/9%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface'
            }
          >
            {t('appearance.active')}
            {t(activeTheme.label)}
          </span>
        </div>

        <div className="max-lg:grid-cols-[1fr_1fr] max-sm:grid-cols-[1fr] grid grid-cols-[repeat(4,_minmax(0,_1fr))] gap-[14px]">
          {THEME_LIST.map((theme) => {
            return (
              <button
                key={theme.id}
                type="button"
                className={classes(
                  'flex flex-col items-center gap-[8px] p-[18px_14px] rounded-[14px] [border:1px_solid_theme(colors.white/18%)] ' +
                    'bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface text-ink cursor-pointer text-center ' +
                    '[transition:border-color_0.2s,_transform_0.2s_var(--ease),_background-color_0.2s] ' +
                    'hover:[transform:translateY(-2px)] hover:border-purple-400/55 christmas:hover:border-sky-300/55 halloween:hover:border-orange-300/55 spring:hover:border-emerald-300/55 ' +
                    '[&.is-active]:border-purple-400 christmas:[&.is-active]:border-sky-300 halloween:[&.is-active]:border-orange-300 ' +
                    'spring:[&.is-active]:border-emerald-300 [&.is-active]:bg-purple-600/[0.16] christmas:[&.is-active]:bg-sky-500/[0.16] ' +
                    'halloween:[&.is-active]:bg-orange-600/[0.16] spring:[&.is-active]:bg-emerald-500/[0.16] ' +
                    '[&_span]:text-xs/relaxed [&_span]:text-muted christmas:[&_span]:text-christmas-muted halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted',
                  settings.theme === theme.id ? 'is-active' : '',
                )}
                onClick={() => patch({ ...settings, theme: theme.id })}
              >
                <div className="[&_img]:max-h-[54px] [&_img]:max-w-[82px] [&_img]:object-contain flex items-center justify-center gap-2.5 h-[62px]">
                  <img src={theme.logo} alt={`Logo ${t(theme.label)}`} />
                  <img src={theme.earthLogo} alt={`EarthSMP ${t(theme.label)}`} />
                </div>

                <strong>{t(theme.label)}</strong>
                <span>
                  {settings.theme === theme.id
                    ? t('appearance.activeTheme')
                    : t('appearance.activate')}
                </span>
              </button>
            );
          })}
        </div>
      </AdminCard>

      <AdminCard>
        <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
          <h2>{t('appearance.map')}</h2>
          <Link
            to={paths.map}
            className={
              'text-ink underline [text-underline-offset:4px] decoration-purple-400/55 christmas:decoration-sky-300/55 halloween:decoration-orange-300/55 spring:decoration-emerald-300/55 ' +
              '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-purple-400 christmas:hover:text-sky-300 halloween:hover:text-orange-300 spring:hover:text-emerald-300 ' +
              'hover:decoration-purple-400 christmas:hover:decoration-sky-300 halloween:hover:decoration-orange-300 spring:hover:decoration-emerald-300'
            }
          >
            {t('appearance.preview')}
          </Link>
        </div>

        <div className="max-lg:grid-cols-[minmax(0,_1fr)] grid grid-cols-[repeat(3,_minmax(0,_1fr))] gap-3">
          {MAP_FRAME_OPTIONS.map((frameOption) => {
            return (
              <button
                key={frameOption.id}
                type="button"
                className={classes(
                  'grid gap-[3px] text-left p-[14px_16px] rounded-[12px] [border:1px_solid_theme(colors.white/9%)] bg-surface christmas:bg-christmas-surface ' +
                    'halloween:bg-halloween-surface spring:bg-spring-surface text-ink ' +
                    'cursor-pointer [transition:border-color_0.2s,_background-color_0.2s] ' +
                    'hover:border-purple-400/45 christmas:hover:border-sky-300/45 halloween:hover:border-orange-300/45 spring:hover:border-emerald-300/45 ' +
                    '[&.is-active]:border-purple-400 christmas:[&.is-active]:border-sky-300 halloween:[&.is-active]:border-orange-300 ' +
                    'spring:[&.is-active]:border-emerald-300 ' +
                    '[&.is-active]:bg-purple-600/[0.16] christmas:[&.is-active]:bg-sky-500/[0.16] halloween:[&.is-active]:bg-orange-600/[0.16] ' +
                    'spring:[&.is-active]:bg-emerald-500/[0.16] [&_span]:text-sm/relaxed [&_span]:text-muted christmas:[&_span]:text-christmas-muted ' +
                    'halloween:[&_span]:text-halloween-muted spring:[&_span]:text-spring-muted',
                  settings.mapFrame === frameOption.id ? 'is-active' : '',
                )}
                onClick={() => patch({ ...settings, mapFrame: frameOption.id })}
              >
                <strong>{t(frameOption.label)}</strong>
                <span>{t(frameOption.desc)}</span>
              </button>
            );
          })}
        </div>
      </AdminCard>
    </div>
  );
}
