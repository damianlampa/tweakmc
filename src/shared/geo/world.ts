// The hero globe and map preview share the same land mask and regions.

import type { Topology, GeometryCollection } from 'topojson-specification';
import { feature } from 'topojson-client';
import { geoEquirectangular, geoPath } from 'd3-geo';
import land110 from 'world-atlas/land-110m.json';

const W = 720;
const H = 360;
let cache: ReturnType<typeof buildWorld> | undefined;

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function toVec(lat: number, lon: number) {
  const la = (lat * Math.PI) / 180;
  const lo = (lon * Math.PI) / 180;
  return [Math.cos(la) * Math.cos(lo), Math.sin(la), -Math.cos(la) * Math.sin(lo)];
}

export function getWorld() {
  return (cache ??= buildWorld());
}

function buildWorld() {
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('A 2D canvas context is required for the world map.');
  const proj = geoEquirectangular()
    .scale(W / (2 * Math.PI))
    .translate([W / 2, H / 2]);
  const path = geoPath(proj, ctx);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  const topology = land110 as Topology<{ land: GeometryCollection }>;
  path(feature(topology, topology.objects.land));
  ctx.fill();
  const data = ctx.getImageData(0, 0, W, H).data;

  const isLand = (lat: number, lon: number) => {
    const x = Math.min(W - 1, Math.max(0, Math.floor(((lon + 180) / 360) * W)));
    const y = Math.min(H - 1, Math.max(0, Math.floor(((90 - lat) / 180) * H)));
    return data[(y * W + x) * 4] > 127;
  };

  const rand = rng(1410);
  const seeds: { lat: number; lon: number; v: number[] }[] = [];
  while (seeds.length < 54) {
    const lat = Math.asin(rand() * 2 - 1) * (180 / Math.PI);
    const lon = rand() * 360 - 180;
    if (lat > -58 && lat < 76 && isLand(lat, lon)) seeds.push({ lat, lon, v: toVec(lat, lon) });
  }

  const nearest = (lat: number, lon: number) => {
    const v = toVec(lat, lon);
    let best = 0;
    let bd = -2;
    seeds.forEach((s, i) => {
      const d = s.v[0] * v[0] + s.v[1] * v[1] + s.v[2] * v[2];
      if (d > bd) {
        bd = d;
        best = i;
      }
    });
    return best;
  };

  // Active fronts in Central Europe and East Asia.
  const fronts = new Set([nearest(51, 19), nearest(38, 112)]);

  return { isLand, seeds, fronts, regionOf: nearest };
}
