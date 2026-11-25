import { navigationLinkClasses } from '@/layout/components/navigation-link-classes';
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
    <footer className="[border-top:1px_solid_theme(colors.white/9%)] bg-background christmas:bg-christmas-background halloween:bg-halloween-background spring:bg-spring-background">
      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div className="flex flex-wrap items-center gap-[20px_32px] [padding-block:32px_76px]">
          <Link
            className={
              'brand inline-flex items-center min-h-[44px] no-underline [transition:transform_0.25s_var(--ease)] ' +
              'hover:[transform:scale(1.06)] [&_img]:w-auto [&_img]:h-9 [&_img]:object-contain'
            }
            to={paths.home}
            aria-label={t('nav.brand')}
          >
            <img src={activeTheme.logo} alt="TweakMC" height="36" />
          </Link>
          <div className="foot-ip">
            <IpBar compact />
          </div>

          <nav aria-label={t('nav.footer')} className="foot-links flex flex-wrap gap-[6px_22px]">
            {footItems.map((footerLink) => {
              return (
                <Link key={footerLink.href} to={footerLink.href} className={navigationLinkClasses}>
                  {footerLink.label}
                </Link>
              );
            })}
            <a
              href={site.discordUrl}
              className={navigationLinkClasses}
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </nav>

          <p className="max-lg:ml-0 ml-auto text-sm/relaxed text-muted christmas:text-christmas-muted halloween:text-halloween-muted spring:text-spring-muted">
            {t('nav.legal')}
          </p>

          <LanguageSelect />
        </div>
      </div>
    </footer>
  );
}
