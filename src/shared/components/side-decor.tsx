import type { ThemeId } from '@/shared/config/themes';
import { useMemo } from 'react';

function PixelHalftone({ corner = 'bl', id }: { corner?: 'bl' | 'br' | 'tl' | 'tr'; id: string }) {
  const cells = useMemo(() => {
    const out = [];
    const cols = 12;
    const rows = 12;
    const step = 22;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Distance from the lower-left corner in normalized coordinates.
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
      className={`halftone halftone-${corner}`}
      viewBox="0 0 264 264"
      aria-hidden="true"
      focusable="false"
      data-id={id}
    >
      <g transform={transformMap[corner] || undefined} className="tw-origin-[132px_132px]">
        {cells.map((cell) => (
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
        ))}
      </g>
    </svg>
  );
}

function SeasonalCorner({ theme, side }: { theme: ThemeId; side: 'tl' | 'br' }) {
  if (theme === 'christmas') {
    return (
      <svg className={`season-mark season-mark-${side}`} viewBox="0 0 120 120" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="square">
          <path d="M60 10v100M10 60h100M25 25l70 70M95 25 25 95" opacity="0.45" />
          <path d="M52 22l8 8 8-8M52 98l8-8 8 8M22 52l8 8-8 8M98 52l-8 8 8 8" opacity="0.7" />
          <rect x="52" y="52" width="16" height="16" transform="rotate(45 60 60)" opacity="0.85" />
        </g>
      </svg>
    );
  }
  if (theme === 'halloween') {
    return (
      <svg className={`season-mark season-mark-${side}`} viewBox="0 0 140 140" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.5">
          <path d="M0 0 140 0M0 0 130 48M0 0 98 98M0 0 48 130M0 0 0 140" />
          <path d="M36 0 33 13 25 25 13 33 0 36" />
          <path d="M72 0 66 25 50 50 25 66 0 72" />
          <path d="M110 0 101 38 77 77 38 101 0 110" />
        </g>
      </svg>
    );
  }
  if (theme === 'spring') {
    return (
      <svg className={`season-mark season-mark-${side}`} viewBox="0 0 120 120" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.55">
          <rect x="44" y="14" width="32" height="32" transform="rotate(45 60 30)" />
          <rect x="44" y="74" width="32" height="32" transform="rotate(45 60 90)" />
          <rect x="14" y="44" width="32" height="32" transform="rotate(45 30 60)" />
          <rect x="74" y="44" width="32" height="32" transform="rotate(45 90 60)" />
          <rect x="54" y="54" width="12" height="12" fill="currentColor" opacity="0.6" />
        </g>
      </svg>
    );
  }
  return null;
}

function OrbitalArcs() {
  return (
    <svg
      className="tw-absolute tw-inset-0 tw-w-full tw-h-full tw-text-accent-bright tw-pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.16">
        <circle cx="1040" cy="450" r="340" strokeDasharray="4 8" />
        <circle cx="1040" cy="450" r="460" opacity="0.65" />
        <circle cx="1040" cy="450" r="610" strokeDasharray="2 12" opacity="0.45" />
        <path d="M 1040 40 V 860 M 620 450 H 1420" opacity="0.35" />
      </g>
    </svg>
  );
}

export function SectionDecor({
  theme = 'default',
  variant = 'both',
  labelLeft,
  labelRight,
  grid = false,
}: {
  theme?: ThemeId;
  variant?: 'left' | 'right' | 'both';
  labelLeft?: string;
  labelRight?: string;
  grid?: boolean;
}) {
  return (
    <div
      className="tw-absolute tw-inset-0 tw-overflow-hidden tw-pointer-events-none tw-z-[1]"
      aria-hidden="true"
    >
      {grid && <OrbitalArcs />}
      <div className="sec-seam">
        <span className="seam-node" />
      </div>
      {(variant === 'both' || variant === 'left') && <PixelHalftone corner="bl" id="l" />}
      {(variant === 'both' || variant === 'right') && <PixelHalftone corner="tr" id="r" />}
      {theme !== 'default' && (
        <>
          <SeasonalCorner theme={theme} side="tl" />
          <SeasonalCorner theme={theme} side="br" />
        </>
      )}
      {labelLeft && (
        <span className="rail-tag rail-tag-left">
          <span className="tw-text-accent-bright tw-opacity-[0.75]">+</span>
          {labelLeft}
        </span>
      )}
      {labelRight && (
        <span className="rail-tag rail-tag-right">
          {labelRight}
          <span className="tw-text-accent-bright tw-opacity-[0.75]">+</span>
        </span>
      )}
    </div>
  );
}
