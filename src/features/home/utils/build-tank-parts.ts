import type { TankPart, TankPalette } from '../types/tank-part';

export function buildHullParts(palette: TankPalette): TankPart[] {
  return [
    [0, 1.0, 4.7, 16.4, 2.2, 2.4, palette.dark],
    [0, 1.0, -4.7, 16.4, 2.2, 2.4, palette.dark],
    [8.5, 1.5, 4.7, 1.1, 1.5, 2.4, palette.dark],
    [-8.5, 1.5, 4.7, 1.1, 1.5, 2.4, palette.dark],
    [8.5, 1.5, -4.7, 1.1, 1.5, 2.4, palette.dark],
    [-8.5, 1.5, -4.7, 1.1, 1.5, 2.4, palette.dark],
    [0, 2.1, 5.95, 14.8, 1.2, 0.35, palette.armor],
    [0, 2.1, -5.95, 14.8, 1.2, 0.35, palette.armor],
    [0, 2.9, 0, 15.2, 1.9, 11.4, palette.hull],
    [6.8, 2.5, 0, 3.2, 1.2, 9.2, palette.armor],
    [-0.8, 4.1, 0, 12.2, 0.65, 8.2, palette.armor],
    [-6.8, 4.45, 0, 2.4, 0.35, 6.2, palette.dark],
  ];
}

// Turret geometry is relative to the pivot at (-1, 0, 0).
export function buildTurretParts(palette: TankPalette): TankPart[] {
  return [
    [0, 5.5, 0, 7.6, 2.3, 6.8, palette.hull],
    [4.0, 5.3, 0, 1.6, 1.7, 4.0, palette.armor],
    [0, 6.8, 0, 5.4, 0.45, 4.8, palette.armor],
    [-1.6, 7.2, 1.4, 2.0, 0.6, 2.0, palette.trim],
    [4.85, 5.7, 1.1, 0.25, 0.45, 1.1, palette.optic],
    [9.8, 5.35, 0, 10.6, 0.82, 0.82, palette.armor],
    [6.2, 5.35, 0, 2.2, 1.1, 1.1, palette.trim],
    [15.3, 5.35, 0, 1.4, 1.15, 1.15, palette.dark],
    [-3.2, 9.6, -2.4, 0.22, 6.2, 0.22, palette.dark],
  ];
}
