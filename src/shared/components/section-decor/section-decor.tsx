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
