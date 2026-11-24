import { lazy, Suspense } from 'react';
import ShopPage from './pages/shop-page';
import SeasonFx from './components/season-fx';
import { CopyStatus } from './components/server-ip';
import { SiteNavigation } from './components/site-navigation';
import { SiteFooter } from './components/site-footer';
import { PhoneBar } from './components/phone-bar';
import { useNavigation } from './hooks/use-navigation';
import { useSettings } from './hooks/use-settings';
import { HomePage } from './pages/home-page';

const MapPage = lazy(() => import('./pages/map-page'));

const AdminPage = lazy(() => import('./pages/admin-page'));

export default function App() {
  const { settings, updateSettings } = useSettings();
  const { route, navigate } = useNavigation();
  return (
    <>
      <a className="skip" href="#main">
        Przejdź do treści
      </a>
      {settings.sections.seasonFx && <SeasonFx theme={settings.theme} motion={settings.motion} />}
      <SiteNavigation route={route} navigate={navigate} settings={settings} />

      <main id="main">
        {route === '/' && <HomePage settings={settings} navigate={navigate} />}
        {route === '/sklep' && <ShopPage settings={settings} navigate={navigate} />}

        {route === '/mapa' && (
          <Suspense fallback={null}>
            <MapPage settings={settings} navigate={navigate} />
          </Suspense>
        )}

        {route === '/admin' && (
          <Suspense fallback={null}>
            <AdminPage settings={settings} updateSettings={updateSettings} navigate={navigate} />
          </Suspense>
        )}
      </main>

      <SiteFooter settings={settings} navigate={navigate} />
      {route === '/' && <PhoneBar />}
      <CopyStatus />
    </>
  );
}
