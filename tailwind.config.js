import plugin from 'tailwindcss/plugin.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        ...Object.fromEntries(
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
        'map-frame': '#090712',
        'map-status': 'rgba(7, 6, 10, 0.88)',
        'phone-bar': 'rgba(7, 6, 10, 0.94)',
      },
      fontFamily: { body: 'var(--body)', display: 'var(--display)', mono: 'var(--mono)' },
      backgroundImage: {
        navigation:
          'linear-gradient(135deg, rgba(var(--accent-rgb), 0.22) 0%, color-mix(in srgb, var(--bg-elev) 72%, transparent) 52%, rgba(var(--accent-rgb), 0.14) 100%)',
      },
      boxShadow: { navigation: '0 16px 38px -18px rgba(0, 0, 0, 0.72)' },
      backdropBlur: { navigation: '18px' },
      screens: { wide: '901px' },
      transitionTimingFunction: { site: 'var(--ease)' },
      transitionDuration: { 280: '280ms', 400: '400ms' },
      animation: {
        'button-sheen': 'btn-sheen 5.5s ease-in-out infinite',
        'status-ping': 'status-ping 2.2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'discord-sheen': 'btn-sheen 4.8s ease-in-out infinite',
        'typing-pulse': 'typing-pulse 1.4s cubic-bezier(0.16, 1, 0.3, 1) infinite',
        'channel-glide': 'channel-glide 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.75s var(--ease) both',
        'fade-scale': 'fade-scale 1s var(--ease) both',
        'text-pulse': 'text-pulse 4.2s ease-in-out infinite',
        marquee: 'marquee 34s linear infinite',
        'char-wave': 'char-wave 3.4s cubic-bezier(0.37, 0, 0.63, 1) infinite',
        'decor-breathe': 'decor-breathe 9s ease-in-out infinite',
        'mark-float': 'mark-float 11s ease-in-out infinite',
        'rotating-line': 'slot-in 0.55s var(--ease) both',
        'mode-float': 'float-y 5.5s ease-in-out infinite',
        'hud-float': 'float-y 6s ease-in-out infinite',
        'hud-float-offset': 'float-y 6s ease-in-out -3s infinite',
      },
      keyframes: {
        'decor-breathe': {
          '0%, 100%': {
            opacity: '0.78',
            transform: 'translate3d(0, 0, 0)',
          },
          '50%': {
            opacity: '1',
            transform: 'translate3d(0, -6px, 0)',
          },
        },
        'mark-float': {
          '0%, 100%': {
            transform: 'translateY(0) rotate(0deg)',
          },
          '50%': {
            transform: 'translateY(-8px) rotate(6deg)',
          },
        },
        'btn-sheen': {
          '0%, 72%, 100%': {
            left: '-120%',
          },
          '88%': {
            left: '140%',
          },
        },
        'char-wave': {
          '0%, 100%': {
            transform: 'translateY(0)',
            filter: 'brightness(1)',
          },
          '25%': {
            transform: 'translateY(-0.11em)',
            filter: 'brightness(1.22)',
          },
          '55%': {
            transform: 'translateY(0.02em)',
            filter: 'brightness(1)',
          },
        },
        'text-pulse': {
          '0%, 100%': {
            filter: 'brightness(1)',
          },
          '50%': {
            filter: 'brightness(1.24)',
          },
        },
        'fade-up': {
          from: {
            opacity: '0',
            transform: 'translateY(16px)',
          },
        },
        'fade-scale': {
          from: {
            opacity: '0',
            transform: 'scale(0.94)',
          },
        },
        'status-ping': {
          '0%': {
            transform: 'scale(0.7)',
            opacity: '0.9',
          },
          '80%, 100%': {
            transform: 'scale(2.1)',
            opacity: '0',
          },
        },
        marquee: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-33.3333%)',
          },
        },
        'typing-pulse': {
          '0%, 80%, 100%': {
            transform: 'translateY(0)',
            opacity: '0.35',
          },
          '40%': {
            transform: 'translateY(-4px)',
            opacity: '1',
          },
        },
        'channel-glide': {
          '0%, 100%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(5px)',
          },
        },
        'slot-in': {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-y': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-9px)' },
        },
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.code-label': {
          fontFamily: 'var(--mono)',
          fontSize: '0.9em',
          padding: '0.12em 0.45em',
          borderRadius: '6px',
          background: 'var(--surface)',
          border: '1px solid var(--line-strong)',
          color: 'var(--accent-bright)',
        },
        '.admin-card': {
          minWidth: '0',
          padding: 'clamp(20px, 2.6vw, 26px)',
          borderRadius: '16px',
          border: '1px solid var(--line-strong)',
          background: 'var(--bg-elev)',
        },
        '.hud-chip': {
          position: 'absolute',
          zIndex: '4',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '7px 12px',
          borderRadius: '999px',
          background: 'color-mix(in srgb, var(--bg-elev) 88%, transparent)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(var(--bright-rgb), 0.32)',
          fontFamily: 'var(--mono)',
          fontSize: '0.74rem',
          letterSpacing: '0.03em',
          pointerEvents: 'none',
          boxShadow: '0 10px 26px -10px rgba(0, 0, 0, 0.8)',
        },
      });
    }),
  ],
};
