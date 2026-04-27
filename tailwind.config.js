/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08070a',
          900: '#0f0c0a',
          800: '#1a1410',
          700: '#241c17',
          600: '#332821',
        },
        amber: {
          50:  '#fbf3df',
          100: '#f6e2b3',
          200: '#eecb7c',
          300: '#e6b04a',
          400: '#d4881f',
          500: '#b56d10',
          600: '#8c520a',
          700: '#5e3706',
        },
        foam: {
          50:  '#fbf8ee',
          100: '#f4e9c8',
          200: '#e8d59a',
        },
        burgundy: {
          500: '#8b1e2b',
          600: '#6d1721',
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'mega': '-0.04em',
      },
      keyframes: {
        'fill-up': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        'foam-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-3px)' },
        },
        'shimmer': {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-amber': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 136, 31, 0.6)' },
          '50%':      { boxShadow: '0 0 0 14px rgba(212, 136, 31, 0)' },
        },
      },
      animation: {
        'fill-up':     'fill-up 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'foam-bob':    'foam-bob 2.4s ease-in-out infinite',
        'shimmer':     'shimmer 3.5s linear infinite',
        'fade-up':     'fade-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-amber': 'pulse-amber 2s ease-in-out infinite',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
