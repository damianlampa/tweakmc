import { useEffect, useState } from 'react';
import { IpBar } from './server-ip';

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
    <div className={`phone-bar ${visible ? 'is-visible' : ''}`} aria-hidden={!visible}>
      <IpBar compact />
    </div>
  );
}
