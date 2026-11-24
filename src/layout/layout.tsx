import SeasonFx from './components/season-fx';
import { CopyStatus } from '@/shared/server-ip/server-ip';
import { SiteNavigation } from './components/site-navigation';
import { SiteFooter } from './components/site-footer';
import { PhoneBar } from './components/phone-bar';
import type { ReactNode } from 'react';
import type { PageProps, Route } from '@/shared/types/page';

export function Layout({
  route,
  navigate,
  settings,
  children,
}: PageProps & { route: Route; children: ReactNode }) {
  return (
    <>
      <a className="skip" href="#main">
        Przejdź do treści
      </a>
      {settings.sections.seasonFx && <SeasonFx theme={settings.theme} motion={settings.motion} />}
      <SiteNavigation route={route} navigate={navigate} settings={settings} />

      <main id="main">{children}</main>
      <SiteFooter settings={settings} navigate={navigate} />
      {route === '/' && <PhoneBar />}
      <CopyStatus />
    </>
  );
}
