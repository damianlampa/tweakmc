import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/features/home';
import { Layout } from '@/layout';
import { paths } from './paths';

const home = { Component: HomePage, handle: 'home' };

export const router = createBrowserRouter([
  {
    path: paths.home,
    Component: Layout,
    HydrateFallback: () => null,
    children: [
      { index: true, ...home },
      {
        path: paths.shop,
        caseSensitive: true,
        lazy: { Component: async () => (await import('@/features/shop')).default },
      },
      {
        path: paths.map,
        caseSensitive: true,
        lazy: { Component: async () => (await import('@/features/map')).default },
      },
      {
        path: paths.admin,
        caseSensitive: true,
        lazy: { Component: async () => (await import('@/features/admin')).default },
      },
      { path: '*', ...home },
    ],
  },
]);
