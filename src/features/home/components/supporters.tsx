import { buttonClasses } from '@/shared/components/button-classes';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import type { Settings } from '@/shared/settings/settings';
import { SectionDecor } from '@/shared/components/section-decor';
import { Supporters } from '@/features/supporters';
import { Icon } from '@/shared/components/icons';
import { KineticHeading } from './kinetic-heading';

export function HomeBoards({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  return (
    <section
      className={
        'relative overflow-hidden [padding-block:clamp(72px,_10vh,_116px)] [border-top:1px_solid_var(--line)] ' +
        '[background:radial-gradient(620px_380px_at_85%_20%,_rgba(var(--accent-rgb),_0.12),_transparent_72%),_var(--bg)]'
      }
      id="topki"
    >
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft={t('supporters.tag')}
        labelRight={t('supporters.shopTag')}
      />

      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="flex flex-wrap justify-between items-end gap-[24px] mb-[32px]">
          <div>
            <KineticHeading text={t('supporters.title')} accentWord="TweakMC" />
            <p className="mt-4 max-w-[58ch] text-muted text-base/relaxed">
              {t('supporters.intro')}
              <code className="code-label">/portfel</code>
              {t('supporters.more')}
            </p>
          </div>
          {settings.sections.shopPage && (
            <Link to={paths.shop} className={buttonClasses('primary')}>
              <span>{t('supporters.shop')}</span>
              {Icon.arrow}
            </Link>
          )}
        </div>
        <Supporters />
      </div>
    </section>
  );
}
