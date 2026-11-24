import { paths, homeSections } from '../paths';

export function homeSectionPath(section: keyof typeof homeSections) {
  return `${paths.home}#${homeSections[section]}`;
}
