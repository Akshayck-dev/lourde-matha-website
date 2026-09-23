/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#4A0715',
          deep: '#2E040C',
          rich: '#650D1B',
          soft: '#7A1B2C',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E7C66A',
          pale: '#F3E5BC',
          dark: '#9A7B1B',
        },
        ivory: '#FFF8E7',
        cream: '#F5EBD5',
        sand: '#EFE3C8',
        charcoal: '#222222',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'sans-serif'],
        malayalam: ['"Noto Serif Malayalam"', '"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        luxe: '0.32em',
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(46, 4, 12, 0.25)',
        card: '0 12px 40px -16px rgba(46, 4, 12, 0.18)',
      },
    },
  },
  plugins: [],
};
