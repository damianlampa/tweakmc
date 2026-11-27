import plugin from 'tailwindcss/plugin.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      colors: {
        background: '#0d0719',
        'background-elevated': '#150c26',
        surface: '#1d1133',
        'surface-hover': '#281845',
        muted: '#a19bb5',
        christmas: {
          background: '#050912',
          'background-elevated': '#0a1122',
          surface: '#101a30',
          'surface-hover': '#172542',
          muted: '#9eb2cf',
        },
        halloween: {
          background: '#08050a',
          'background-elevated': '#120916',
          surface: '#1a0f20',
          'surface-hover': '#25152d',
          muted: '#b8a3be',
        },
        spring: {
          background: '#050a08',
          'background-elevated': '#0a1410',
          surface: '#101f19',
          'surface-hover': '#162b22',
          muted: '#9eb9ad',
        },
        ink: '#f6f5fa',
        discord: '#5865f2',
        'discord-hover': '#6c77f7',
        'discord-light': '#8b95ff',
        overlay: '#07060a',
        'map-frame': '#090712',
      },
      fontFamily: { body: 'var(--body)', display: 'var(--display)', mono: 'var(--mono)' },
      fontSize: {
        'section-title': ['clamp(2.2rem, 4.3vw, 3.6rem)', '1'],
        'page-title': ['clamp(2.4rem, 5vw, 4rem)', '1'],
        'revenue-value': ['clamp(1.5rem, 2.6vw, 2.1rem)', '1.625'],
      },
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
    plugin(({ addVariant }) => {
      addVariant('christmas', ':where(html[data-theme="christmas"]) &');
      addVariant('halloween', ':where(html[data-theme="halloween"]) &');
      addVariant('spring', ':where(html[data-theme="spring"]) &');
    }),
  ],
};
