import type { ThemeId } from '@/shared/config/themes';
import { OrbitalArcs } from './orbital-arcs';
import { PixelHalftone } from './pixel-halftone';
import { SeasonalCorner } from './seasonal-corner';

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
      {grid && <OrbitalArcs />}
      <div className="absolute top-0 left-[50%] [transform:translateX(-50%)] w-[min(680px,_78%)] h-[1px] [background:linear-gradient(90deg,_transparent,_rgba(var(--bright-rgb),_0.55),_transparent)] [#start_&]:hidden">
        <span className="absolute left-1/2 top-[-3px] w-[7px] h-[7px] bg-accent-bright [transform:translateX(-50%)_rotate(45deg)] [box-shadow:0_0_14px_rgba(var(--bright-rgb),_0.85)]" />
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
        <span
          className={
            'absolute top-[50%] inline-flex items-center gap-[8px] font-mono text-[0.7rem] tracking-[0.16em] ' +
            '[color:rgba(255,_255,_255,_0.24)] [writing-mode:vertical-rl] [user-select:none] ' +
            '[@media(max-width:1380px)]:hidden left-[16px] [transform:translateY(-50%)_rotate(180deg)]'
          }
        >
          <span className="text-accent-bright opacity-75">+</span>
          {labelLeft}
        </span>
      )}
      {labelRight && (
        <span
          className={
            'absolute top-[50%] inline-flex items-center gap-[8px] font-mono text-[0.7rem] tracking-[0.16em] ' +
            '[color:rgba(255,_255,_255,_0.24)] [writing-mode:vertical-rl] [user-select:none] ' +
            '[@media(max-width:1380px)]:hidden right-[16px] [transform:translateY(-50%)]'
          }
        >
          {labelRight}
          <span className="text-accent-bright opacity-75">+</span>
        </span>
      )}
    </div>
  );
}
