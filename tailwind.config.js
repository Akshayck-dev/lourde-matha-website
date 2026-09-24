/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Theme: reference-site UI — navy / coral / orange / amber / cyan (token names kept for compatibility)
        maroon: {
          DEFAULT: '#232A45',
          deep: '#171B2D',
          rich: '#2E3657',
          soft: '#3C3950',
        },
        gold: {
          DEFAULT: '#F99740',
          light: '#FFB25E',
          pale: '#FFE9D1',
          dark: '#D97B1F',
        },
        accent: {
          coral: '#E15260',
          amber: '#FFCD54',
          cyan: '#00B7CD',
          teal: '#40BABD',
          blue: '#34A2D9',
        },
        ivory: '#FFFFFF',
        cream: '#F2F2F2',
        sand: '#F1F2F4',
        charcoal: '#3B3B3B',
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'sans-serif'],
        malayalam: ['"Noto Serif Malayalam"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        luxe: '0.22em',
      },
      boxShadow: {
        soft: '0 8px 28px -12px rgba(23,27,45,0.18)',
        card: '0 4px 18px -6px rgba(23,27,45,0.12)',
      },
    },
  },
  plugins: [],
};
