import { useEffect, useState, useRef } from 'react';

export function WaveWord({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`wave-word ${className}`} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} className="wave-char" style={{ '--ci': i }} aria-hidden="true">
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

export function KineticHeading({ text, accentWord }: { text: string; accentWord: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const words = text.split(' ');
  return (
    <h2 ref={ref} className={`kinetic-h2 ${shown ? 'is-in' : ''}`}>
      {words.map((word, i) => {
        const isAcc = accentWord && word.toLowerCase().includes(accentWord.toLowerCase());
        return (
          <span className="tw-inline-flex tw-overflow-hidden tw-pb-[0.08em]" key={`${word}-${i}`}>
            <span className={`kw ${isAcc ? 'kw-accent' : ''}`} style={{ '--wi': i }}>
              {word}
            </span>
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </h2>
  );
}
