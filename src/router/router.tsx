import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { HomePage } from '@/features/home';
import { Layout } from '@/layout';
import { paths } from './paths';

const ShopPage = lazy(() => import('@/features/shop'));
const MapPage = lazy(() => import('@/features/map'));
const AdminPage = lazy(() => import('@/features/admin'));

const home = { Component: HomePage, handle: 'home' };

export const router = createBrowserRouter([
  {
    path: paths.home,
    Component: Layout,
    children: [
      { index: true, ...home },
      { path: paths.shop, caseSensitive: true, Component: ShopPage },
      { path: paths.map, caseSensitive: true, Component: MapPage },
      { path: paths.admin, caseSensitive: true, Component: AdminPage },
      { path: '*', ...home },
    ],
  },
]);
