import { classes } from '@/shared/utils/classes';
import type { ThemeId } from '@/shared/config/themes';

export function SeasonalCorner({ theme, side }: { theme: ThemeId; side: 'tl' | 'br' }) {
  if (theme === 'christmas') {
    return (
      <svg
        className={classes(
          'absolute w-[clamp(92px,_10vw,_138px)] h-auto text-sky-300 opacity-[0.42] animate-mark-float',
          side === 'tl'
            ? 'left-[18px] top-[18px]'
            : 'bottom-[18px] right-[18px] [transform:rotate(180deg)] [animation-delay:-5.5s]',
        )}
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
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
      <svg
        className={classes(
          'absolute w-[clamp(92px,_10vw,_138px)] h-auto text-orange-300 opacity-[0.42] animate-mark-float',
          side === 'tl'
            ? 'left-[18px] top-[18px]'
            : 'bottom-[18px] right-[18px] [transform:rotate(180deg)] [animation-delay:-5.5s]',
        )}
        viewBox="0 0 140 140"
        aria-hidden="true"
      >
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
      <svg
        className={classes(
          'absolute w-[clamp(92px,_10vw,_138px)] h-auto text-emerald-300 opacity-[0.42] animate-mark-float',
          side === 'tl'
            ? 'left-[18px] top-[18px]'
            : 'bottom-[18px] right-[18px] [transform:rotate(180deg)] [animation-delay:-5.5s]',
        )}
        viewBox="0 0 120 120"
        aria-hidden="true"
      >
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
