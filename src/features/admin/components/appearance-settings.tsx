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
    <div className="tw-grid tw-gap-[20px]">
      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>{t('appearance.title')}</h2>
          <span className="board-tag">
            {t('appearance.active')}
            {t(activeTheme.label)}
          </span>
        </div>

        <div className="season-cards tw-grid tw-grid-cols-[repeat(4,_minmax(0,_1fr))] tw-gap-[14px]">
          {THEME_LIST.map((theme) => {
            return (
              <button
                key={theme.id}
                type="button"
                className={`season-admin-card ${settings.theme === theme.id ? 'is-active' : ''}`}
                onClick={() => patch({ ...settings, theme: theme.id })}
              >
                <div className="season-logo-pair tw-flex tw-items-center tw-justify-center tw-gap-[10px] tw-h-[62px]">
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

      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>{t('appearance.map')}</h2>
          <Link to={paths.map} className="inline-link">
            {t('appearance.preview')}
          </Link>
        </div>

        <div className="option-row tw-grid tw-grid-cols-[repeat(3,_minmax(0,_1fr))] tw-gap-[12px]">
          {MAP_FRAME_OPTIONS.map((frameOption) => {
            return (
              <button
                key={frameOption.id}
                type="button"
                className={`option-card ${settings.mapFrame === frameOption.id ? 'is-active' : ''}`}
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
