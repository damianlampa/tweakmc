const TICKER_ITEMS = [
  'TweakMC.pl',
  'EarthSMP · Mapa Ziemi',
  'Państwa, sojusze i wojny',
  'Pojazdy wojskowe',
  'Nowe tryby w przygotowaniu',
  'discord.gg/tweakmc',
];

export function Ticker() {
  return (
    <div className="ticker" role="region" aria-label="Informacje o sieci TweakMC">
      <div className="ticker-track" aria-hidden="true">
        {[0, 1, 2].map((copy) => (
          <div className="tw-flex tw-items-center" key={copy}>
            {TICKER_ITEMS.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="tw-inline-flex tw-items-center tw-gap-[24px] tw-pr-[24px] tw-font-mono tw-text-[0.82rem] tw-font-semibold tw-tracking-[0.1em] tw-uppercase tw-text-muted tw-whitespace-nowrap"
              >
                <span>{item}</span>
                <span className="ticker-sep" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
