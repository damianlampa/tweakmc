import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import type { Settings } from '@/shared/settings/settings';
import { DEFAULT_SETTINGS } from '@/shared/settings/settings';
import { AdminCard } from './admin-card';

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
    <div className="grid gap-5">
      <AdminCard>
        <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
          <h2>{t('sections.title')}</h2>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-sm/none')}
              onClick={() => patch({ ...settings, sections: { ...DEFAULT_SETTINGS.sections } })}
            >
              {t('sections.all')}
            </button>
            <button
              type="button"
              className={buttonClasses('secondary', 'min-h-[44px] px-4 py-0 text-sm/none')}
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

        <div className="max-lg:grid-cols-[minmax(0,_1fr)] grid grid-cols-[repeat(2,_minmax(0,_1fr))] gap-3">
          {SECTION_TOGGLES.map((sectionToggle) => {
            const isEnabled = settings.sections[sectionToggle.key];

            return (
              <label
                key={sectionToggle.key}
                className={classes(
                  'relative flex items-center justify-between gap-[14px] p-[14px_16px] rounded-[12px] ' +
                    '[border:1px_solid_theme(colors.white/9%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface cursor-pointer ' +
                    '[transition:border-color_0.2s,_background-color_0.2s] hover:border-purple-400/40 christmas:hover:border-sky-300/40 halloween:hover:border-orange-300/40 spring:hover:border-emerald-300/40 ' +
                    '[&.is-off]:opacity-[0.65] [&_strong]:block [&_strong]:text-base/relaxed [&_span:not(.switch-ui)]:block ' +
                    '[&_span:not(.switch-ui)]:text-xs/relaxed [&_span:not(.switch-ui)]:text-muted christmas:[&_span:not(.switch-ui)]:text-christmas-muted ' +
                    'halloween:[&_span:not(.switch-ui)]:text-halloween-muted spring:[&_span:not(.switch-ui)]:text-spring-muted ' +
                    '[&_span:not(.switch-ui)]:mt-[2px] [&_input]:absolute [&_input]:opacity-[0] [&_input]:pointer-events-none',
                  isEnabled ? 'is-on' : 'is-off',
                )}
              >
                <div>
                  <strong>{t(sectionToggle.label)}</strong>
                  <span>{t(sectionToggle.desc)}</span>
                </div>
                <input
                  type="checkbox"
                  className="peer"
                  checked={isEnabled}
                  onChange={() => toggleSection(sectionToggle.key)}
                />
                <span
                  className={
                    'switch-ui relative w-[46px] h-[26px] shrink-0 rounded-[999px] bg-white/[0.14] ' +
                    "[transition:background-color_0.22s] [&::after]:[content:''] [&::after]:absolute [&::after]:left-[3px] " +
                    '[&::after]:top-[3px] [&::after]:w-[20px] [&::after]:h-[20px] [&::after]:rounded-[50%] ' +
                    '[&::after]:bg-white [&::after]:[transition:transform_0.22s_var(--ease)] ' +
                    'peer-checked:bg-purple-600 christmas:peer-checked:bg-sky-600 halloween:peer-checked:bg-orange-600 spring:peer-checked:bg-emerald-600 peer-checked:[&::after]:[transform:translateX(20px)]'
                  }
                  aria-hidden="true"
                />
              </label>
            );
          })}

          <label
            className={classes(
              'relative flex items-center justify-between gap-[14px] p-[14px_16px] rounded-[12px] ' +
                '[border:1px_solid_theme(colors.white/9%)] bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface cursor-pointer ' +
                '[transition:border-color_0.2s,_background-color_0.2s] hover:border-purple-400/40 christmas:hover:border-sky-300/40 halloween:hover:border-orange-300/40 spring:hover:border-emerald-300/40 ' +
                '[&.is-off]:opacity-[0.65] [&_strong]:block [&_strong]:text-base/relaxed [&_span:not(.switch-ui)]:block ' +
                '[&_span:not(.switch-ui)]:text-xs/relaxed [&_span:not(.switch-ui)]:text-muted christmas:[&_span:not(.switch-ui)]:text-christmas-muted ' +
                'halloween:[&_span:not(.switch-ui)]:text-halloween-muted spring:[&_span:not(.switch-ui)]:text-spring-muted ' +
                '[&_span:not(.switch-ui)]:mt-[2px] [&_input]:absolute [&_input]:opacity-[0] [&_input]:pointer-events-none',
              settings.motion ? 'is-on' : 'is-off',
            )}
          >
            <div>
              <strong>{t('sections.motion')}</strong>
              <span>{t('sections.motionDescription')}</span>
            </div>
            <input
              type="checkbox"
              className="peer"
              checked={settings.motion}
              onChange={() => patch({ ...settings, motion: !settings.motion })}
            />
            <span
              className={
                'switch-ui relative w-[46px] h-[26px] shrink-0 rounded-[999px] bg-white/[0.14] ' +
                "[transition:background-color_0.22s] [&::after]:[content:''] [&::after]:absolute [&::after]:left-[3px] " +
                '[&::after]:top-[3px] [&::after]:w-[20px] [&::after]:h-[20px] [&::after]:rounded-[50%] ' +
                '[&::after]:bg-white [&::after]:[transition:transform_0.22s_var(--ease)] ' +
                'peer-checked:bg-purple-600 christmas:peer-checked:bg-sky-600 halloween:peer-checked:bg-orange-600 spring:peer-checked:bg-emerald-600 peer-checked:[&::after]:[transform:translateX(20px)]'
              }
              aria-hidden="true"
            />
          </label>
        </div>
      </AdminCard>

      <AdminCard>
        <div className="[&_h2]:text-xl/none flex flex-wrap items-center justify-between gap-3 mb-[18px]">
          <h2>{t('sections.maintenance')}</h2>
        </div>

        <div
          className={
            'flex items-center gap-[12px] p-[6px_14px_6px_8px] rounded-[12px] [border:1px_solid_theme(colors.white/18%)] ' +
            'bg-surface christmas:bg-christmas-surface halloween:bg-halloween-surface spring:bg-spring-surface [transition:border-color_0.2s] ' +
            'focus-within:border-purple-400 christmas:focus-within:border-sky-300 halloween:focus-within:border-orange-300 spring:focus-within:border-emerald-300 ' +
            '[&.has-error]:border-red-500 [&_input]:w-full [&_input]:min-h-[42px] [&_input]:bg-transparent ' +
            '[&_input]:[border:0] [&_input]:text-ink [&_input]:font-display [&_input]:font-semibold [&_input]:text-base/none ' +
            '[&_input]:[outline:none] [&_input::placeholder]:text-muted christmas:[&_input::placeholder]:text-christmas-muted ' +
            'halloween:[&_input::placeholder]:text-halloween-muted spring:[&_input::placeholder]:text-spring-muted [&_input::placeholder]:font-normal ' +
            '[&_input::placeholder]:font-body'
          }
        >
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
      </AdminCard>
    </div>
  );
}
