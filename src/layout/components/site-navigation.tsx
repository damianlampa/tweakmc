import { navigationLinkClasses } from '@/layout/components/navigation-link-classes';
import { buttonClasses } from '@/shared/components/button-classes';
import { classes } from '@/shared/utils/classes';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
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
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const { copied, handleCopy } = useCopyIp();
  const activeTheme = THEMES[settings.theme] || THEMES.default;

  useEffect(() => {
    const menuButton = menuButtonRef.current;
    if (!open || !menuButton) return;

    const closeOnDesktop = () => {
      if (!menuButton.getClientRects().length) setOpen(false);
    };
    const observer = new ResizeObserver(closeOnDesktop);

    document.body.classList.add('menu-open');
    observer.observe(menuButton);
    closeOnDesktop();

    return () => {
      observer.disconnect();
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
          className={classes([
            'pointer-events-auto relative flex h-[64px] items-center gap-[18px] overflow-visible rounded-[16px]',
            'p-[0_14px_0_18px] [box-shadow:0_16px_38px_-18px_theme(colors.black/72%)] [backdrop-filter:blur(18px)] [border:0]',
            '[background-image:linear-gradient(135deg,theme(colors.purple.600/22%)_0%,color-mix(in_srgb,theme(colors.background-elevated)_72%,transparent)_52%,theme(colors.purple.600/14%)_100%)]',
            'christmas:[background-image:linear-gradient(135deg,theme(colors.sky.500/22%)_0%,color-mix(in_srgb,theme(colors.christmas.background-elevated)_72%,transparent)_52%,theme(colors.sky.500/14%)_100%)]',
            'halloween:[background-image:linear-gradient(135deg,theme(colors.orange.600/22%)_0%,color-mix(in_srgb,theme(colors.halloween.background-elevated)_72%,transparent)_52%,theme(colors.orange.600/14%)_100%)]',
            'spring:[background-image:linear-gradient(135deg,theme(colors.emerald.500/22%)_0%,color-mix(in_srgb,theme(colors.spring.background-elevated)_72%,transparent)_52%,theme(colors.emerald.500/14%)_100%)]',
          ])}
        >
          <div className="inline-flex items-center gap-[14px]">
            <Link
              className={classes([
                'brand inline-flex items-center min-h-[44px] no-underline [transition:transform_0.25s_var(--ease)]',
                'hover:[transform:scale(1.06)] [&_img]:w-auto [&_img]:h-[44px] [&_img]:object-contain',
              ])}
              to={paths.home}
              aria-label={t('nav.brand')}
              onClick={() => setOpen(false)}
            >
              <img src={activeTheme.logo} alt="TweakMC" height="44" />
            </Link>
            <button
              type="button"
              className={classes([
                'inline-flex items-center gap-[9px] min-h-[36px] px-[13px] py-0 rounded-[999px] [border:0]',
                'bg-white/[0.045] text-sm/relaxed cursor-pointer',
                '[transition:background-color_0.2s,_transform_0.2s_var(--ease)]',
                'hover:bg-purple-600/20 christmas:hover:bg-sky-500/20 halloween:hover:bg-orange-600/20 spring:hover:bg-emerald-500/20 hover:[transform:translateY(-1px)] max-lg:hidden',
              ])}
              onClick={handleCopy}
              title={t('nav.copyHint')}
            >
              <span
                className={classes([
                  'relative w-[8px] h-[8px] rounded-[50%] bg-green-500 [box-shadow:0_0_10px_theme(colors.green.500/70%)]',
                  "[&::after]:[content:''] [&::after]:absolute [&::after]:inset-[-4px] [&::after]:rounded-[50%]",
                  '[&::after]:[border:1.5px_solid_theme(colors.green.500)] [&::after]:animate-status-ping',
                ])}
                aria-hidden="true"
              />
              <IpText />
            </button>
          </div>

          <nav
            aria-label={t('nav.main')}
            className={classes([
              'nav-links flex items-center gap-[6px] [margin-inline:auto] p-0 bg-transparent [border:0] max-lg:fixed',
              'max-lg:inset-[var(--nav-h)_0_0_0] max-lg:flex-col max-lg:items-start max-lg:gap-0 max-lg:m-0',
              'max-lg:p-[20px_var(--pad)] max-lg:bg-background christmas:max-lg:bg-christmas-background halloween:max-lg:bg-halloween-background',
              'spring:max-lg:bg-spring-background max-lg:invisible max-lg:opacity-[0]',
              'max-lg:[transition:opacity_0.22s,_visibility_0.22s] max-lg:[&.is-open]:visible',
              'max-lg:[&.is-open]:opacity-[1]',
              open ? 'is-open' : '',
            ])}
          >
            {navItems.map((navItem) => {
              return (
                <Link
                  key={navItem.href}
                  aria-current={navItem.active ? 'page' : undefined}
                  to={navItem.href}
                  className={classes([navigationLinkClasses, navItem.active ? 'is-current' : ''])}
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
              'min-h-[44px] px-[18px] py-0 text-sm/none max-lg:ml-auto max-sm:hidden',
            )}
            onClick={handleCopy}
          >
            {copied ? Icon.check : Icon.copy}
            <span>{copied ? t('nav.copied') : t('nav.copy')}</span>
          </button>
          <button
            type="button"
            className={classes([
              'max-lg:inline-flex max-lg:flex-col max-lg:justify-center max-lg:gap-[6px] max-lg:w-[44px]',
              'max-lg:h-[44px] max-lg:px-2.5 max-lg:py-0 max-lg:rounded-[8px]',
              'max-lg:[border:1px_solid_theme(colors.white/18%)] max-lg:bg-surface christmas:max-lg:bg-christmas-surface',
              'halloween:max-lg:bg-halloween-surface spring:max-lg:bg-spring-surface max-lg:cursor-pointer',
              'max-lg:[&_span]:block max-lg:[&_span]:h-[2px] max-lg:[&_span]:[background:theme(colors.ink)]',
              'max-lg:[&_span]:[transition:transform_0.25s_var(--ease)]',
              'max-lg:[&[aria-expanded=true]_span:first-child]:[transform:translateY(4px)_rotate(45deg)]',
              'max-lg:[&[aria-expanded=true]_span:last-child]:[transform:translateY(-4px)_rotate(-45deg)]',
              'max-sm:ml-auto hidden',
            ])}
            aria-expanded={open}
            ref={menuButtonRef}
            aria-label={open ? t('nav.close') : t('nav.open')}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
          <span
            className={classes([
              'absolute left-[14px] bottom-0 h-0.5 max-w-[calc(100%_-_28px)] rounded-[2px]',
              '[background:linear-gradient(90deg,_theme(colors.purple.600),_theme(colors.purple.400))]',
              'christmas:[background:linear-gradient(90deg,_theme(colors.sky.600),_theme(colors.sky.300))]',
              'halloween:[background:linear-gradient(90deg,_theme(colors.orange.600),_theme(colors.orange.300))]',
              'spring:[background:linear-gradient(90deg,_theme(colors.emerald.600),_theme(colors.emerald.300))]',
              '[box-shadow:0_0_12px_theme(colors.purple.400/80%)] christmas:[box-shadow:0_0_12px_theme(colors.sky.300/80%)]',
              'halloween:[box-shadow:0_0_12px_theme(colors.orange.300/80%)] spring:[box-shadow:0_0_12px_theme(colors.emerald.300/80%)]',
              '[transition:width_0.12s_linear] pointer-events-none',
            ])}
            style={{ width: `${scrollPct}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </header>
  );
}
