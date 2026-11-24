export function WaveWord({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={`wave-word ${className}`} aria-label={text}>
      {[...text].map((character, characterIndex) => {
        return (
          <span
            key={characterIndex}
            className="wave-char"
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
