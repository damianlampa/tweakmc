import { site } from '../config';
import { THEMES } from '../themes';
import { type PageProps } from '../types/page';
import { IpBar } from './server-ip';

export function SiteFooter({ settings, navigate }: PageProps) {
  const activeTheme = THEMES[settings.theme] || THEMES.default;
  const footItems = [
    { href: '/#tryby', label: 'Tryby', show: settings.sections.modes },
    { href: '/#earthsmp', label: 'EarthSMP', show: settings.sections.earthsmp },
    { href: '/mapa', label: 'Mapa', show: settings.sections.mapPage },
    { href: '/sklep', label: 'Sklep', show: settings.sections.shopPage },
  ].filter((x) => x.show);
  return (
    <footer className="close">
      <div className="wrap">
        <div className="foot">
          <a
            className="brand"
            href="/"
            aria-label="TweakMC.pl — strona główna"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            <img src={activeTheme.logo} alt="TweakMC" height="36" />
          </a>
          <div className="foot-ip">
            <IpBar compact />
          </div>
          <nav
            aria-label="Nawigacja w stopce"
            className="foot-links tw-flex tw-flex-wrap tw-gap-[6px_22px]"
          >
            {footItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.href);
                }}
              >
                {item.label}
              </a>
            ))}
            <a href={site.discordUrl} className="nav-link" target="_blank" rel="noreferrer">
              Discord
            </a>
          </nav>
          <p className="legal tw-ml-auto tw-text-[0.86rem] tw-text-muted">
            TweakMC.pl nie jest powiązany z Mojang AB ani Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
