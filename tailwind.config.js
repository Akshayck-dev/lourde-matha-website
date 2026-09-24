/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme: sky blue + white (token names kept for compatibility)
        maroon: {
          DEFAULT: '#0369A1',
          deep: '#0C4A6E',
          rich: '#0284C7',
          soft: '#0EA5E9',
        },
        gold: {
          DEFAULT: '#C9A227',
          light: '#E7C66A',
          pale: '#F3E5BC',
          dark: '#9A7B1B',
        },
        ivory: '#FFFFFF',
        cream: '#F0F9FF',
        sand: '#E0F2FE',
        charcoal: '#222222',
      },
      fontFamily: {
        display: ['Lora', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        malayalam: ['"Noto Serif Malayalam"', 'Lora', 'Georgia', 'serif'],
      },
      letterSpacing: {
        luxe: '0.32em',
      },
      boxShadow: {
        soft: '0 24px 60px -24px rgba(12, 74, 110, 0.25)',
        card: '0 12px 40px -16px rgba(12, 74, 110, 0.18)',
      },
    },
  },
  plugins: [],
};
