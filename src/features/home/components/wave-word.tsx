import { classes } from '@/shared/utils/classes';
export function WaveWord({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={classes(['wave-word inline-flex whitespace-nowrap', className])}>
      <span className="sr-only">{text}</span>
      {[...text].map((character, characterIndex) => {
        return (
          <span
            key={characterIndex}
            className="inline-block animate-char-wave [animation-delay:calc(var(--ci,_0)_*_0.11s)] [transition:transform_0.25s_var(--ease),_color_0.2s] [will-change:transform] [.wave-word:hover_&]:[animation-duration:1.4s]"
            style={{ '--ci': characterIndex }}
            aria-hidden="true"
          >
            {character === ' ' ? '\u00A0' : character}
          </span>
        );
      })}
    </span>
  );
}
