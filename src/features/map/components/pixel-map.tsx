import { useEffect, useRef } from 'react';
import { getWorld } from '@/shared/geo/world';
import { THEMES, type SceneProps } from '@/shared/config/themes';

export default function PixelMap({ theme = 'default' }: SceneProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;

    if (!c) return;

    const W = 192;
    const H = 96;
    c.width = W;
    c.height = H;
    const ctx = c.getContext('2d');

    if (!ctx) return;

    const world = getWorld();
    const pal = (THEMES[theme] || THEMES.default).globe;
    ctx.fillStyle = pal.ocean;
    ctx.fillRect(0, 0, W, H);
    for (let y = 0; y < H; y++) {
      const lat = 90 - ((y + 0.5) / H) * 180;
      for (let x = 0; x < W; x++) {
        const lon = ((x + 0.5) / W) * 360 - 180;

        if (!world.isLand(lat, lon)) continue;

        const r = world.regionOf(lat, lon);
        ctx.fillStyle = world.fronts.has(r) ? pal.war : pal.land[r % pal.land.length];
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }, [theme]);

  return <canvas ref={ref} className="pixel-map" aria-hidden="true" />;
}
