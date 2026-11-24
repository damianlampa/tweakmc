import { useEffect, useState } from 'react';
import { site } from '../config';
import { THEMES } from '../themes';
import { type PageProps, type Route } from '../types/page';
import { copyIp, useCopied } from '../hooks/use-copy-ip';
import { IpText } from './server-ip';
import { Icon } from './icons';

export function SiteNavigation({ route, navigate, settings }: PageProps & { route: Route }) {
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const copied = useCopied();
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
  }, [route]);

  const navItems = [
    { href: '/#tryby', label: 'Tryby', active: false, show: settings.sections.modes },
    { href: '/#earthsmp', label: 'EarthSMP', active: false, show: settings.sections.earthsmp },
    { href: '/mapa', label: 'Mapa', active: route === '/mapa', show: settings.sections.mapPage },
    { href: '/#dolacz', label: 'Jak dołączyć', active: false, show: settings.sections.join },
    {
      href: '/sklep',
      label: 'Sklep',
      active: route === '/sklep',
      show: settings.sections.shopPage,
    },
  ].filter((x) => x.show);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    navigate(href);
  };

  return (
    <header className="nav-wrap">
      <div className="wrap">
        <div className="nav">
          <div className="tw-inline-flex tw-items-center tw-gap-[14px]">
            <a
              className="brand"
              href="/"
              aria-label="TweakMC.pl — strona główna"
              onClick={(e) => handleLink(e, '/')}
            >
              <img src={activeTheme.logo} alt="TweakMC" height="44" />
            </a>
            <button
              type="button"
              className="nav-status"
              onClick={copyIp}
              title="Kliknij, aby skopiować IP"
            >
              <span className="live-dot" aria-hidden="true" />
              <IpText />
            </button>
          </div>
          <nav aria-label="Główna nawigacja" className={`nav-links ${open ? 'is-open' : ''}`}>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link ${item.active ? 'is-current' : ''}`}
                onClick={(e) => handleLink(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a href={site.discordUrl} className="nav-link" target="_blank" rel="noreferrer">
              Discord
            </a>
          </nav>
          <button type="button" className="btn btn-primary nav-cta" onClick={copyIp}>
            {copied ? Icon.check : Icon.copy}
            <span>{copied ? 'Skopiowano' : 'Skopiuj IP'}</span>
          </button>
          <button
            type="button"
            className="menu-toggle tw-hidden"
            aria-expanded={open}
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
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
