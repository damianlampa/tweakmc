import { classes } from '@/shared/utils/classes';
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
      <div
        className={classes([
          'absolute top-0 left-[50%] [transform:translateX(-50%)] w-[min(680px,_78%)] h-[1px]',
          '[background:linear-gradient(90deg,_transparent,_theme(colors.purple.400/55%),_transparent)]',
          'christmas:[background:linear-gradient(90deg,_transparent,_theme(colors.sky.300/55%),_transparent)]',
          'halloween:[background:linear-gradient(90deg,_transparent,_theme(colors.orange.300/55%),_transparent)]',
          'spring:[background:linear-gradient(90deg,_transparent,_theme(colors.emerald.300/55%),_transparent)] [#start_&]:hidden',
        ])}
      >
        <span
          className={classes([
            'absolute left-1/2 top-[-3px] w-[7px] h-[7px] bg-purple-400 christmas:bg-sky-300 halloween:bg-orange-300 spring:bg-emerald-300',
            '[transform:translateX(-50%)_rotate(45deg)] [box-shadow:0_0_14px_theme(colors.purple.400/85%)]',
            'christmas:[box-shadow:0_0_14px_theme(colors.sky.300/85%)] halloween:[box-shadow:0_0_14px_theme(colors.orange.300/85%)]',
            'spring:[box-shadow:0_0_14px_theme(colors.emerald.300/85%)]',
          ])}
        />
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
          className={classes([
            'absolute top-[50%] inline-flex items-center gap-[8px] font-mono text-xs/relaxed tracking-widest',
            'text-white/[0.24] [writing-mode:vertical-rl] [user-select:none]',
            '[@media(max-width:1380px)]:hidden left-[16px] [transform:translateY(-50%)_rotate(180deg)]',
          ])}
        >
          <span className="text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 opacity-75">
            +
          </span>
          {labelLeft}
        </span>
      )}
      {labelRight && (
        <span
          className={classes([
            'absolute top-[50%] inline-flex items-center gap-[8px] font-mono text-xs/relaxed tracking-widest',
            'text-white/[0.24] [writing-mode:vertical-rl] [user-select:none]',
            '[@media(max-width:1380px)]:hidden right-[16px] [transform:translateY(-50%)]',
          ])}
        >
          {labelRight}
          <span className="text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 opacity-75">
            +
          </span>
        </span>
      )}
    </div>
  );
}
