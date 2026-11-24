import { useTranslation } from 'react-i18next';
import type { Settings } from '@/shared/settings/settings';
import { DEFAULT_SETTINGS } from '@/shared/settings/settings';

const SECTION_TOGGLES: { key: keyof Settings['sections']; label: string; desc: string }[] = [
  {
    key: 'mapPage',
    label: 'sections.map',
    desc: 'sections.mapDescription',
  },
  {
    key: 'shopPage',
    label: 'sections.shop',
    desc: 'sections.shopDescription',
  },
  {
    key: 'topboards',
    label: 'sections.rankings',
    desc: 'sections.rankingsDescription',
  },
  { key: 'hero', label: 'sections.hero', desc: 'sections.heroDescription' },
  {
    key: 'heroGlobe',
    label: 'sections.globe',
    desc: 'sections.globeDescription',
  },
  {
    key: 'ticker',
    label: 'sections.ticker',
    desc: 'sections.tickerDescription',
  },
  {
    key: 'modes',
    label: 'sections.modes',
    desc: 'sections.modesDescription',
  },
  {
    key: 'earthsmp',
    label: 'sections.flagship',
    desc: 'sections.flagshipDescription',
  },
  { key: 'tank3d', label: 'sections.tank', desc: 'sections.tankDescription' },
  {
    key: 'join',
    label: 'sections.join',
    desc: 'sections.joinDescription',
  },
  {
    key: 'discord',
    label: 'sections.discord',
    desc: 'sections.discordDescription',
  },
  {
    key: 'seasonFx',
    label: 'sections.particles',
    desc: 'sections.particlesDescription',
  },
];

export function SectionSettings({
  settings,
  patch,
}: {
  settings: Settings;
  patch: (next: Settings) => void;
}) {
  const { t } = useTranslation();

  const toggleSection = (key: keyof Settings['sections']) => {
    patch({
      ...settings,
      sections: {
        ...settings.sections,
        [key]: !settings.sections[key],
      },
    });
  };

  return (
    <div className="tw-grid tw-gap-[20px]">
      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>{t('sections.title')}</h2>

          <div className="tw-flex tw-flex-wrap tw-gap-[8px]">
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => patch({ ...settings, sections: { ...DEFAULT_SETTINGS.sections } })}
            >
              {t('sections.all')}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() =>
                patch({
                  ...settings,
                  sections: { ...settings.sections, mapPage: false, shopPage: false },
                })
              }
            >
              {t('sections.disableMapShop')}
            </button>
          </div>
        </div>

        <div className="toggle-grid tw-grid tw-grid-cols-[repeat(2,_minmax(0,_1fr))] tw-gap-[12px]">
          {SECTION_TOGGLES.map((sectionToggle) => {
            const isEnabled = settings.sections[sectionToggle.key];

            return (
              <label
                key={sectionToggle.key}
                className={`toggle-row ${isEnabled ? 'is-on' : 'is-off'}`}
              >
                <div>
                  <strong>{t(sectionToggle.label)}</strong>
                  <span>{t(sectionToggle.desc)}</span>
                </div>
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => toggleSection(sectionToggle.key)}
                />
                <span className="switch-ui" aria-hidden="true" />
              </label>
            );
          })}

          <label className={`toggle-row ${settings.motion ? 'is-on' : 'is-off'}`}>
            <div>
              <strong>{t('sections.motion')}</strong>
              <span>{t('sections.motionDescription')}</span>
            </div>
            <input
              type="checkbox"
              checked={settings.motion}
              onChange={() => patch({ ...settings, motion: !settings.motion })}
            />
            <span className="switch-ui" aria-hidden="true" />
          </label>
        </div>
      </div>

      <div className="admin-box">
        <div className="admin-box-head tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-gap-[12px] tw-mb-[18px]">
          <h2>{t('sections.maintenance')}</h2>
        </div>

        <div className="nick-wrap">
          <input
            type="text"
            value={
              settings.maintenanceMsg === DEFAULT_SETTINGS.maintenanceMsg
                ? t('common.maintenance')
                : settings.maintenanceMsg
            }
            onChange={(e) => patch({ ...settings, maintenanceMsg: e.target.value })}
            placeholder={t('sections.placeholder')}
          />
        </div>
      </div>
    </div>
  );
}
