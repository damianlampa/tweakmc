import { classes } from '@/shared/utils/classes';
import { useEffect, useState } from 'react';
import { IpBar } from '@/shared/server-ip';

export function PhoneBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('start');

    if (!hero) return;

    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), {
      threshold: 0.12,
    });
    io.observe(hero);

    return () => io.disconnect();
  }, []);

  return (
    <div
      className={classes([
        'fixed inset-x-0 bottom-0 z-40 hidden bg-overlay/[0.94]',
        'p-[10px_var(--pad)_calc(10px_+_env(safe-area-inset-bottom))] [border-top:1px_solid_theme(colors.white/18%)]',
        '[backdrop-filter:blur(12px)] transition-transform duration-280 ease-site max-sm:block',
        visible
          ? '[transform:translateY(0)]'
          : 'pointer-events-none invisible [transform:translateY(110%)]',
      ])}
      aria-hidden={!visible}
    >
      <IpBar compact />
    </div>
  );
}
