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
          50:  '#fffbe6',
          100: '#fef3b3',
          200: '#fde879',
          300: '#fbdb3d',
          400: '#f5cb19',
          500: '#d4a912',
          600: '#a8830d',
          700: '#705608',
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
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(245, 203, 25, 0.6)' },
          '50%':      { boxShadow: '0 0 0 14px rgba(245, 203, 25, 0)' },
        },
        'wave-pulse': {
          '0%, 100%': { transform: 'scaleY(0.82)' },
          '50%':      { transform: 'scaleY(1.18)' },
        },
      },
      animation: {
        'fill-up':     'fill-up 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'foam-bob':    'foam-bob 2.4s ease-in-out infinite',
        'shimmer':     'shimmer 3.5s linear infinite',
        'fade-up':     'fade-up 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'pulse-amber': 'pulse-amber 2s ease-in-out infinite',
        'wave-pulse':  'wave-pulse 1.1s ease-in-out infinite',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
