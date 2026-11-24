import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Link, useLocation, useMatch } from 'react-router';
import { paths } from '@/router/paths';
import { homeSectionPath } from '@/router/utils/home-section-path';
import { site } from '@/shared/config/site';
import { THEMES } from '@/shared/config/themes';
import type { Settings } from '@/shared/settings/settings';
import { useCopyIp } from '@/shared/server-ip/hooks/use-copy-ip';
import { IpText } from '@/shared/server-ip';
import { Icon } from '@/shared/components/icons';

export function SiteNavigation({ settings }: { settings: Settings }) {
  const { t } = useTranslation();

  const { pathname } = useLocation();
  const mapActive = useMatch({ path: paths.map, caseSensitive: true }) !== null;
  const shopActive = useMatch({ path: paths.shop, caseSensitive: true }) !== null;
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const { copied, handleCopy } = useCopyIp();
  const activeTheme = THEMES[settings.theme] || THEMES.default;

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  const navItems = [
    {
      href: homeSectionPath('modes'),
      label: t('nav.modes'),
      active: false,
      show: settings.sections.modes,
    },
    {
      href: homeSectionPath('earthSmp'),
      label: 'EarthSMP',
      active: false,
      show: settings.sections.earthsmp,
    },
    { href: paths.map, label: t('nav.map'), active: mapActive, show: settings.sections.mapPage },
    {
      href: homeSectionPath('join'),
      label: t('nav.join'),
      active: false,
      show: settings.sections.join,
    },
    {
      href: paths.shop,
      label: t('nav.shop'),
      active: shopActive,
      show: settings.sections.shopPage,
    },
  ].filter((x) => x.show);

  return (
    <header className="nav-wrap">
      <div className="wrap">
        <div className="nav">
          <div className="tw-inline-flex tw-items-center tw-gap-[14px]">
            <Link
              className="brand"
              to={paths.home}
              aria-label={t('nav.brand')}
              onClick={() => setOpen(false)}
            >
              <img src={activeTheme.logo} alt="TweakMC" height="44" />
            </Link>
            <button
              type="button"
              className="nav-status"
              onClick={handleCopy}
              title={t('nav.copyHint')}
            >
              <span className="live-dot" aria-hidden="true" />
              <IpText />
            </button>
          </div>

          <nav aria-label={t('nav.main')} className={`nav-links ${open ? 'is-open' : ''}`}>
            {navItems.map((navItem) => {
              return (
                <Link
                  key={navItem.href}
                  aria-current={navItem.active ? 'page' : undefined}
                  to={navItem.href}
                  className={`nav-link ${navItem.active ? 'is-current' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {navItem.label}
                </Link>
              );
            })}
            <a href={site.discordUrl} className="nav-link" target="_blank" rel="noreferrer">
              Discord
            </a>
          </nav>

          <button type="button" className="btn btn-primary nav-cta" onClick={handleCopy}>
            {copied ? Icon.check : Icon.copy}
            <span>{copied ? t('nav.copied') : t('nav.copy')}</span>
          </button>
          <button
            type="button"
            className="menu-toggle tw-hidden"
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.open')}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
          <span className="nav-progress" style={{ width: `${scrollPct}%` }} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
