import { useEffect, useRef } from 'react';
import { THEMES, type SceneProps } from '@/shared/config/themes';

export default function SeasonFx({ theme = 'default', motion = true }: SceneProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;

    if (!canvas || !motion) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const cfg = THEMES[theme]?.fx || THEMES.default.fx;

    let W = 0;
    let H = 0;
    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = canvas.width = Math.floor(window.innerWidth * dpr);
      H = canvas.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const count =
      cfg.kind === 'snow' ? 68 : cfg.kind === 'embers' ? 46 : cfg.kind === 'fireflies' ? 38 : 28;
    const parts = Array.from({ length: count }, (_, i) => {
      // Keep the center clear by placing most particles near the edges.
      const edgeBias =
        cfg.kind === 'voxels'
          ? i % 2 === 0
            ? Math.random() * 0.22
            : 0.78 + Math.random() * 0.22
          : Math.random();

      return {
        x: edgeBias * W,
        y: Math.random() * H,
        s: (cfg.kind === 'snow' ? 2.2 + Math.random() * 3.4 : 2 + Math.random() * 2.6) * dpr,
        vy:
          cfg.kind === 'snow'
            ? (0.45 + Math.random() * 0.9) * dpr
            : cfg.kind === 'embers'
              ? -(0.45 + Math.random() * 0.85) * dpr
              : -(0.16 + Math.random() * 0.28) * dpr,
        vx: (Math.random() - 0.5) * 0.35 * dpr,
        phase: Math.random() * Math.PI * 2,
        a: cfg.kind === 'snow' ? 0.28 + Math.random() * 0.5 : 0.18 + Math.random() * 0.42,
        c: cfg.colors[i % cfg.colors.length],
      };
    });

    let raf = 0;
    const tick = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.0008 + p.phase) * 0.22 * dpr;

        if (p.vy > 0 && p.y > H + 12) {
          p.y = -12;
          p.x = Math.random() * W;
        } else if (p.vy < 0 && p.y < -12) {
          p.y = H + 12;
          p.x =
            cfg.kind === 'voxels'
              ? (i % 2 === 0 ? Math.random() * 0.22 : 0.78 + Math.random() * 0.22) * W
              : Math.random() * W;
        }
        if (p.x < -12) p.x = W + 12;
        if (p.x > W + 12) p.x = -12;

        const pulse = cfg.kind === 'fireflies' ? 0.5 + 0.5 * Math.sin(t * 0.002 + p.phase) : 1;
        ctx.globalAlpha = p.a * pulse;
        ctx.fillStyle = p.c;

        ctx.fillRect(Math.round(p.x), Math.round(p.y), Math.round(p.s), Math.round(p.s));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [theme, motion]);

  if (!motion) return null;

  return <canvas ref={ref} className="season-fx" aria-hidden="true" />;
}
