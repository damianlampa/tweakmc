import { classes } from '@/shared/utils/classes';
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
      className={classes([
        'inline-flex items-center gap-2.5 mt-[18px] min-h-[28px] overflow-hidden font-mono text-sm/relaxed font-semibold text-purple-400',
        'christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300',
      ])}
      aria-live="polite"
    >
      <span
        className={classes([
          'w-[7px] h-[7px] shrink-0 rounded-[50%] bg-purple-400 christmas:bg-sky-300 halloween:bg-orange-300 spring:bg-emerald-300',
          '[box-shadow:0_0_10px_theme(colors.purple.400/75%)] christmas:[box-shadow:0_0_10px_theme(colors.sky.300/75%)]',
          'halloween:[box-shadow:0_0_10px_theme(colors.orange.300/75%)] spring:[box-shadow:0_0_10px_theme(colors.emerald.300/75%)]',
        ])}
        aria-hidden="true"
      />
      <span key={idx} className="inline-block animate-rotating-line">
        {t(HERO_ROLES[idx])}
      </span>
    </div>
  );
}
