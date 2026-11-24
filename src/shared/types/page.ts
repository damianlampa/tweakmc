import type { Settings } from '@/shared/settings/settings';

export type Route = '/' | '/sklep' | '/mapa' | '/admin';
export type Navigate = (href: string) => void;
export interface PageProps {
  settings: Settings;
  navigate: Navigate;
}
