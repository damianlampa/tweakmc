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
    <div className="ticker" role="region" aria-label={t('ticker.label')}>
      <div className="ticker-track" aria-hidden="true">
        {[0, 1, 2].map((copyIndex) => {
          return (
            <div className="tw-flex tw-items-center" key={copyIndex}>
              {TICKER_ITEMS.map((message) => {
                return (
                  <span
                    key={`${copyIndex}-${message}`}
                    className="tw-inline-flex tw-items-center tw-gap-[24px] tw-pr-[24px] tw-font-mono tw-text-[0.82rem] tw-font-semibold tw-tracking-[0.1em] tw-uppercase tw-text-muted tw-whitespace-nowrap"
                  >
                    <span>{t(message, { defaultValue: message })}</span>
                    <span className="ticker-sep" />
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
