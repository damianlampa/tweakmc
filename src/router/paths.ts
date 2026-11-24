export const paths = {
  home: '/',
  shop: '/sklep',
  map: '/mapa',
  admin: '/admin',
} as const;

export const homeSections = {
  modes: 'tryby',
  earthSmp: 'earthsmp',
  join: 'dolacz',
} as const;

export function homeSectionPath(section: keyof typeof homeSections) {
  return `${paths.home}#${homeSections[section]}`;
}
