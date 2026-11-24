import { lazy, Suspense } from 'react';
import { Layout, useNavigation } from '@/layout';
import { useSettings } from '@/shared/settings/hooks/use-settings';
import { HomePage } from '@/features/home';

const ShopPage = lazy(() => import('@/features/shop'));
const MapPage = lazy(() => import('@/features/map'));
const AdminPage = lazy(() => import('@/features/admin'));

export default function App() {
  const { settings, updateSettings } = useSettings();
  const { route, navigate } = useNavigation();
  return (
    <Layout settings={settings} navigate={navigate} route={route}>
      <Suspense fallback={null}>
        {route === '/' && <HomePage settings={settings} navigate={navigate} />}
        {route === '/sklep' && <ShopPage settings={settings} navigate={navigate} />}
        {route === '/mapa' && <MapPage settings={settings} navigate={navigate} />}
        {route === '/admin' && (
          <AdminPage settings={settings} updateSettings={updateSettings} navigate={navigate} />
        )}
      </Suspense>
    </Layout>
  );
}
