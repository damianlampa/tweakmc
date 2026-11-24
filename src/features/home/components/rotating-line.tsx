import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const HERO_ROLES = ['rotation.world', 'rotation.nations', 'rotation.vehicles', 'rotation.more'];

export function RotatingLine() {
  const { t } = useTranslation();

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
        {t(HERO_ROLES[idx])}
      </span>
    </div>
  );
}
