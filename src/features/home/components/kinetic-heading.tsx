import { classes } from '@/shared/utils/classes';
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
    <h2 ref={ref} className={classes('kinetic-h2 flex flex-wrap', shown ? 'is-in' : '')}>
      {words.map((word, wordIndex) => {
        const isAccentWord = accentWord && word.toLowerCase().includes(accentWord.toLowerCase());

        return (
          <span className="inline-flex overflow-hidden pb-[0.08em]" key={`${word}-${wordIndex}`}>
            <span
              className={classes(
                'inline-block [transform:translateY(115%)] opacity-0 ' +
                  '[transition:transform_0.7s_var(--ease),_opacity_0.55s_ease] [transition-delay:calc(var(--wi,_0)_*_65ms)] ' +
                  '[.kinetic-h2.is-in_&]:[transform:translateY(0)] [.kinetic-h2.is-in_&]:opacity-100 ' +
                  '[[data-motion=off]_&]:!transform-none [[data-motion=off]_&]:!opacity-100',
                isAccentWord
                  ? 'text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 animate-text-pulse'
                  : '',
              )}
              style={{ '--wi': wordIndex }}
            >
              {word}
            </span>
            {wordIndex < words.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </h2>
  );
}
