import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import type { Settings } from '@/shared/settings/settings';
import { THEMES, THEME_LIST } from '@/shared/config/themes';

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
      <div className="admin-card">
        <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
          <h2>{t('appearance.title')}</h2>
          <span className="font-mono text-xs/relaxed text-muted p-[3px_8px] rounded-[6px] [border:1px_solid_var(--line)] bg-surface">
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
                  'flex flex-col items-center gap-[8px] p-[18px_14px] rounded-[14px] [border:1px_solid_var(--line-strong)] ' +
                    'bg-surface text-ink cursor-pointer text-center ' +
                    '[transition:border-color_0.2s,_transform_0.2s_var(--ease),_background-color_0.2s] ' +
                    'hover:[transform:translateY(-2px)] hover:[border-color:rgba(var(--bright-rgb),_0.55)] ' +
                    '[&.is-active]:[border-color:var(--accent-bright)] [&.is-active]:[background:rgba(var(--accent-rgb),_0.16)] ' +
                    '[&_span]:text-xs/relaxed [&_span]:text-muted',
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
      </div>

      <div className="admin-card">
        <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
          <h2>{t('appearance.map')}</h2>
          <Link
            to={paths.map}
            className={
              'text-ink underline [text-underline-offset:4px] [text-decoration-color:rgba(var(--bright-rgb),_0.55)] ' +
              '[transition:color_0.2s,_text-decoration-color_0.2s] hover:text-accent-bright ' +
              'hover:[text-decoration-color:var(--accent-bright)]'
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
                  'grid gap-[3px] text-left p-[14px_16px] rounded-[12px] [border:1px_solid_var(--line)] bg-surface text-ink ' +
                    'cursor-pointer [transition:border-color_0.2s,_background-color_0.2s] ' +
                    'hover:[border-color:rgba(var(--bright-rgb),_0.45)] [&.is-active]:[border-color:var(--accent-bright)] ' +
                    '[&.is-active]:[background:rgba(var(--accent-rgb),_0.16)] [&_span]:text-sm/relaxed [&_span]:text-muted',
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
      </div>
    </div>
  );
}
