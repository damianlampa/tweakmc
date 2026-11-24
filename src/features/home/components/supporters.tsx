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
    <section className="sec sec-dark" id="topki">
      <SectionDecor
        theme={settings.theme}
        variant="both"
        labelLeft={t('supporters.tag')}
        labelRight={t('supporters.shopTag')}
      />

      <div className="wrap">
        <div className="tw-flex tw-flex-wrap tw-justify-between tw-items-end tw-gap-[24px] tw-mb-[32px]">
          <div>
            <KineticHeading text={t('supporters.title')} accentWord="TweakMC" />
            <p className="tw-mt-[16px] tw-max-w-[58ch] tw-text-muted tw-text-[1.08rem]">
              {t('supporters.intro')}
              <code className="inline-code">/portfel</code>
              {t('supporters.more')}
            </p>
          </div>
          {settings.sections.shopPage && (
            <Link to={paths.shop} className="btn btn-primary">
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
