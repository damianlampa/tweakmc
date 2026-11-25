import { classes } from '@/shared/utils/classes';
import { useMemo } from 'react';

export function PixelHalftone({
  corner = 'bl',
  id,
}: {
  corner?: 'bl' | 'br' | 'tl' | 'tr';
  id: string;
}) {
  const cells = useMemo(() => {
    const out = [];
    const cols = 12;
    const rows = 12;
    const step = 22;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const nx = c / (cols - 1);
        const ny = 1 - r / (rows - 1);
        const dist = Math.hypot(nx, ny);

        if (dist > 1.02) continue;

        const t = Math.max(0, 1 - dist);
        const size = Math.max(2, Math.round((3 + t * 13) * 10) / 10);
        const offset = (step - size) / 2;
        const filled = (r * 7 + c * 13) % 7 === 0 && t > 0.25;
        const opacity = Math.round((0.18 + t * 0.78) * 100) / 100;
        out.push({
          key: `${r}-${c}`,
          x: c * step + offset,
          y: r * step + offset,
          size,
          filled,
          opacity,
        });
      }
    }

    return out;
  }, []);

  const transformMap = {
    bl: '',
    br: 'scale(-1 1)',
    tl: 'scale(1 -1)',
    tr: 'scale(-1 -1)',
  };

  return (
    <svg
      className={classes(
        'absolute w-[clamp(190px,_20vw,_310px)] h-auto text-decor [transition:color_0.35s_var(--ease)] animate-decor-breathe',
        corner === 'bl' ? 'bottom-0 left-0' : 'right-0 top-0 [animation-delay:-4.5s]',
      )}
      viewBox="0 0 264 264"
      aria-hidden="true"
      focusable="false"
      data-id={id}
    >
      <g transform={transformMap[corner] || undefined} className="origin-[132px_132px]">
        {cells.map((cell) => {
          return (
            <rect
              key={cell.key}
              x={cell.x}
              y={cell.y}
              width={cell.size}
              height={cell.size}
              fill={cell.filled ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth={cell.filled ? 0 : 1.15}
              opacity={cell.opacity}
            />
          );
        })}
      </g>
    </svg>
  );
}
