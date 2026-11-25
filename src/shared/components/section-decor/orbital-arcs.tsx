export function OrbitalArcs() {
  return (
    <svg
      className="absolute inset-0 w-full h-full text-purple-400 christmas:text-sky-300 halloween:text-orange-300 spring:text-emerald-300 pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" opacity="0.16">
        <circle cx="1040" cy="450" r="340" strokeDasharray="4 8" />
        <circle cx="1040" cy="450" r="460" opacity="0.65" />
        <circle cx="1040" cy="450" r="610" strokeDasharray="2 12" opacity="0.45" />
        <path d="M 1040 40 V 860 M 620 450 H 1420" opacity="0.35" />
      </g>
    </svg>
  );
}
