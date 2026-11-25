import { navigationLinkClasses } from '@/layout/components/navigation-link-classes';
import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
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
    if (!open) return;

    const mobileMenu = window.matchMedia('(max-width: 900px)');
    const closeOnDesktop = () => {
      if (!mobileMenu.matches) setOpen(false);
    };

    document.body.classList.add('menu-open');
    mobileMenu.addEventListener('change', closeOnDesktop);
    closeOnDesktop();

    return () => {
      mobileMenu.removeEventListener('change', closeOnDesktop);
      document.body.classList.remove('menu-open');
    };
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
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-transparent pt-3">
      <div className="relative z-[2] w-full max-w-[calc(var(--max)_+_var(--pad)_*_2)] [margin-inline:auto] [padding-inline:var(--pad)]">
        <div
          className={
            'pointer-events-auto relative flex h-[64px] items-center gap-[18px] overflow-visible rounded-[16px] ' +
            'bg-navigation p-[0_14px_0_18px] [box-shadow:theme(boxShadow.navigation)] ' +
            '[backdrop-filter:blur(theme(backdropBlur.navigation))] [border:0]'
          }
        >
          <div className="inline-flex items-center gap-[14px]">
            <Link
              className={
                'brand inline-flex items-center min-h-[44px] no-underline [transition:transform_0.25s_var(--ease)] ' +
                'hover:[transform:scale(1.06)] [&_img]:w-auto [&_img]:h-[44px] [&_img]:object-contain'
              }
              to={paths.home}
              aria-label={t('nav.brand')}
              onClick={() => setOpen(false)}
            >
              <img src={activeTheme.logo} alt="TweakMC" height="44" />
            </Link>
            <button
              type="button"
              className={
                'inline-flex items-center gap-[9px] min-h-[36px] px-[13px] py-0 rounded-[999px] [border:0] ' +
                '[background:rgba(255,_255,_255,_0.045)] text-sm/relaxed cursor-pointer ' +
                '[transition:background-color_0.2s,_transform_0.2s_var(--ease)] ' +
                'hover:[background:rgba(var(--accent-rgb),_0.2)] hover:[transform:translateY(-1px)] max-wide:hidden'
              }
              onClick={handleCopy}
              title={t('nav.copyHint')}
            >
              <span
                className={
                  'relative w-[8px] h-[8px] rounded-[50%] [background:var(--ok)] [box-shadow:0_0_10px_rgba(34,_197,_94,_0.7)] ' +
                  "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%] " +
                  '[&::after]:[border:1.5px_solid_var(--ok)] [&::after]:animate-status-ping'
                }
                aria-hidden="true"
              />
              <IpText />
            </button>
          </div>

          <nav
            aria-label={t('nav.main')}
            className={classes(
              'nav-links flex items-center gap-[6px] [margin-inline:auto] p-0 bg-transparent [border:0] max-wide:fixed ' +
                'max-wide:inset-[var(--nav-h)_0_0_0] max-wide:flex-col max-wide:items-start max-wide:gap-0 max-wide:m-0 ' +
                'max-wide:p-[20px_var(--pad)] max-wide:bg-bg max-wide:invisible max-wide:opacity-[0] ' +
                'max-wide:[transition:opacity_0.22s,_visibility_0.22s] max-wide:[&.is-open]:visible ' +
                'max-wide:[&.is-open]:opacity-[1]',
              open ? 'is-open' : '',
            )}
          >
            {navItems.map((navItem) => {
              return (
                <Link
                  key={navItem.href}
                  aria-current={navItem.active ? 'page' : undefined}
                  to={navItem.href}
                  className={classes(navigationLinkClasses, navItem.active ? 'is-current' : '')}
                  onClick={() => setOpen(false)}
                >
                  {navItem.label}
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

          <button
            type="button"
            className={buttonClasses(
              'primary',
              'min-h-[44px] px-[18px] py-0 text-sm/none max-wide:ml-auto max-sm:hidden',
            )}
            onClick={handleCopy}
          >
            {copied ? Icon.check : Icon.copy}
            <span>{copied ? t('nav.copied') : t('nav.copy')}</span>
          </button>
          <button
            type="button"
            className={
              'max-wide:inline-flex max-wide:flex-col max-wide:justify-center max-wide:gap-[6px] max-wide:w-[44px] ' +
              'max-wide:h-[44px] max-wide:px-2.5 max-wide:py-0 max-wide:rounded-[8px] ' +
              'max-wide:[border:1px_solid_var(--line-strong)] max-wide:bg-surface max-wide:cursor-pointer ' +
              'max-wide:[&_span]:block max-wide:[&_span]:h-[2px] max-wide:[&_span]:[background:var(--ink)] ' +
              'max-wide:[&_span]:[transition:transform_0.25s_var(--ease)] ' +
              'max-wide:[&[aria-expanded=true]_span:first-child]:[transform:translateY(4px)_rotate(45deg)] ' +
              'max-wide:[&[aria-expanded=true]_span:last-child]:[transform:translateY(-4px)_rotate(-45deg)] ' +
              'max-sm:ml-auto hidden'
            }
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.open')}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
          <span
            className={
              'absolute left-[14px] bottom-0 h-0.5 max-w-[calc(100%_-_28px)] rounded-[2px] ' +
              '[background:linear-gradient(90deg,_var(--accent),_var(--accent-bright))] ' +
              '[box-shadow:0_0_12px_rgba(var(--bright-rgb),_0.8)] [transition:width_0.12s_linear] pointer-events-none'
            }
            style={{ width: `${scrollPct}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
