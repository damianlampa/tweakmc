import { useTranslation } from 'react-i18next';
import { Outlet, ScrollRestoration, useMatches } from 'react-router';
import { getScrollKey } from '@/router/utils/get-scroll-key';
import { useSettings } from '@/shared/settings/hooks/use-settings';
import { CopyStatus } from '@/shared/server-ip';
import SeasonFx from './components/season-fx';
import { SiteNavigation } from './components/site-navigation';
import { SiteFooter } from './components/site-footer';
import { PhoneBar } from './components/phone-bar';

export function Layout() {
  const { t } = useTranslation();

  const routeSettings = useSettings();
  const { settings } = routeSettings;
  const isHome = useMatches().some(({ handle }) => handle === 'home');

  return (
    <>
      <a className="skip" href="#main">
        {t('nav.skip')}
      </a>
      {settings.sections.seasonFx && <SeasonFx theme={settings.theme} motion={settings.motion} />}

      <SiteNavigation settings={settings} />

      <main id="main">
        <Outlet context={routeSettings} />
      </main>

      <SiteFooter settings={settings} />

      {isHome && <PhoneBar />}

      <CopyStatus />

      <ScrollRestoration getKey={getScrollKey} />
    </>
  );
}
