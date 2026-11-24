/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: Object.fromEntries(
        [
          'bg',
          'bg-elev',
          'surface',
          'surface-hover',
          'ink',
          'muted',
          'accent',
          'accent-hover',
          'accent-bright',
          'line',
          'line-strong',
          'decor',
          'war',
          'ok',
        ].map((name) => [name, `var(--${name})`]),
      ),
      fontFamily: { body: 'var(--body)', display: 'var(--display)', mono: 'var(--mono)' },
    },
  },
};
