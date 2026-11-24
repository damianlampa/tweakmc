import type { THEMES } from '@/shared/config/themes';

export type TankPart = [
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  depth: number,
  color: string,
];
export type TankPalette = typeof THEMES.default.tank;
