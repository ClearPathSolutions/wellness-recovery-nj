import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Warm brand palette derived from the WRC-NJ logo mark
        clay: {
          50: '#faf3ec',
          100: '#f3e4d5',
          200: '#e8c9ad',
          300: '#dcac83',
          400: '#cf9463',
          500: '#c0814f', // primary terracotta
          600: '#a96b40',
          700: '#8a5536',
          800: '#6f4530',
          900: '#5c3b2b',
        },
        rose: {
          50: '#faf1f1',
          100: '#f3dfdf',
          200: '#e7c2c3',
          300: '#d7a0a1',
          400: '#c88384',
          500: '#bc7c7d', // secondary dusty rose
          600: '#a5605f',
          700: '#894c4c',
          800: '#714141',
          900: '#5f3939',
        },
        sand: {
          50: '#fbf8f4',
          100: '#f6efe6',
          200: '#ecdfce',
          300: '#e0d0ba',
          400: '#d2bda0',
          500: '#c2a684',
        },
        ink: {
          DEFAULT: '#2a2320',
          50: '#f6f4f2',
          100: '#e7e2dd',
          200: '#cfc6bd',
          700: '#463b34',
          800: '#332b27',
          900: '#241e1b',
        },
        cream: '#fbf7f2',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        prose: '68ch',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 20px -8px rgba(42, 35, 32, 0.15)',
        card: '0 12px 40px -18px rgba(42, 35, 32, 0.28)',
        lift: '0 24px 60px -24px rgba(42, 35, 32, 0.35)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.9s ease both',
      },
    },
  },
  plugins: [],
};

export default config;
