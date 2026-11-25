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
      className="inline-flex items-center gap-2.5 mt-[18px] min-h-[28px] overflow-hidden font-mono text-[0.92rem] font-semibold text-accent-bright"
      aria-live="polite"
    >
      <span
        className="w-[7px] h-[7px] shrink-0 rounded-[50%] bg-accent-bright [box-shadow:0_0_10px_rgba(var(--bright-rgb),_0.75)]"
        aria-hidden="true"
      />
      <span key={idx} className="inline-block animate-rotating-line">
        {t(HERO_ROLES[idx])}
      </span>
    </div>
  );
}
