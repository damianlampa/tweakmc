import { useTranslation } from 'react-i18next';
import { LanguageSelect } from './language-select';
import { Link } from 'react-router';
import { paths } from '@/router/paths';
import { homeSectionPath } from '@/router/utils/home-section-path';
import { site } from '@/shared/config/site';
import { THEMES } from '@/shared/config/themes';
import type { Settings } from '@/shared/settings/settings';
import { IpBar } from '@/shared/server-ip';

export function SiteFooter({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  const activeTheme = THEMES[settings.theme] || THEMES.default;
  const footItems = [
    { href: homeSectionPath('modes'), label: t('nav.modes'), show: settings.sections.modes },
    { href: homeSectionPath('earthSmp'), label: 'EarthSMP', show: settings.sections.earthsmp },
    { href: paths.map, label: t('nav.map'), show: settings.sections.mapPage },
    { href: paths.shop, label: t('nav.shop'), show: settings.sections.shopPage },
  ].filter((x) => x.show);

  return (
    <footer className="close">
      <div className="wrap">
        <div className="foot">
          <Link className="brand" to={paths.home} aria-label={t('nav.brand')}>
            <img src={activeTheme.logo} alt="TweakMC" height="36" />
          </Link>
          <div className="foot-ip">
            <IpBar compact />
          </div>

          <nav
            aria-label={t('nav.footer')}
            className="foot-links tw-flex tw-flex-wrap tw-gap-[6px_22px]"
          >
            {footItems.map((footerLink) => {
              return (
                <Link key={footerLink.href} to={footerLink.href} className="nav-link">
                  {footerLink.label}
                </Link>
              );
            })}
            <a href={site.discordUrl} className="nav-link" target="_blank" rel="noreferrer">
              Discord
            </a>
          </nav>

          <p className="legal tw-ml-auto tw-text-[0.86rem] tw-text-muted">{t('nav.legal')}</p>

          <LanguageSelect />
        </div>
      </div>
    </footer>
  );
}
