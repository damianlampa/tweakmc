import { useEffect, useRef, useState } from 'react';

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
      {words.map((word, wordIndex) => {
        const isAccentWord = accentWord && word.toLowerCase().includes(accentWord.toLowerCase());

        return (
          <span
            className="tw-inline-flex tw-overflow-hidden tw-pb-[0.08em]"
            key={`${word}-${wordIndex}`}
          >
            <span className={`kw ${isAccentWord ? 'kw-accent' : ''}`} style={{ '--wi': wordIndex }}>
              {word}
            </span>
            {wordIndex < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </h2>
  );
}
