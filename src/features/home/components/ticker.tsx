import { useTranslation } from 'react-i18next';
const TICKER_ITEMS = [
  'TweakMC.pl',
  'hero.globe',
  'ticker.nations',
  'earth.vehicles',
  'ticker.upcoming',
  'discord.gg/tweakmc',
];

export function Ticker() {
  const { t } = useTranslation();

  return (
    <div
      className="ticker relative flex items-center overflow-hidden [border-top:1px_solid_var(--line)] bg-bg-elev [padding-block:14px]"
      role="region"
      aria-label={t('ticker.label')}
    >
      <div
        className="flex w-[max-content] animate-marquee [.ticker:hover_&]:[animation-play-state:paused]"
        aria-hidden="true"
      >
        {[0, 1, 2].map((copyIndex) => {
          return (
            <div className="flex items-center" key={copyIndex}>
              {TICKER_ITEMS.map((message) => {
                return (
                  <span
                    key={`${copyIndex}-${message}`}
                    className="inline-flex items-center gap-[24px] pr-[24px] font-mono text-sm/relaxed font-semibold tracking-widest uppercase text-muted whitespace-nowrap"
                  >
                    <span>{t(message, { defaultValue: message })}</span>
                    <span className="w-[6px] h-[6px] bg-accent-bright [transform:rotate(45deg)] opacity-75" />
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
