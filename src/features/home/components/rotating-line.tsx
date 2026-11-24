import { useEffect, useState } from 'react';

const HERO_ROLES = [
  'EarthSMP · prawdziwa mapa Ziemi',
  'Państwa, sojusze i wojny o granice',
  'Czołgi i pojazdy wojskowe na froncie',
  'Nowe tryby sieci już w przygotowaniu',
];

export function RotatingLine() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((v) => (v + 1) % HERO_ROLES.length), 3200);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="tw-inline-flex tw-items-center tw-gap-[10px] tw-mt-[18px] tw-min-h-[28px] tw-overflow-hidden tw-font-mono tw-text-[0.92rem] tw-font-semibold tw-text-accent-bright"
      aria-live="polite"
    >
      <span className="rotate-dot" aria-hidden="true" />
      <span key={idx} className="rotate-text">
        {HERO_ROLES[idx]}
      </span>
    </div>
  );
}
