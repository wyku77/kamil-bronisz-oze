/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        // Granat / niebieski – subtelny akcent
        brand: {
          50: '#eef3fb',
          100: '#d5e2f3',
          200: '#b0c8e8',
          300: '#82a6d7',
          400: '#5180bf',
          500: '#3461a0',
          600: '#274b80',
          700: '#1e3a64',
          800: '#162b4b',
          900: '#101f38',
          950: '#0a1628',
        },
        // Złoto – główny kolor akcentowy premium
        gold: {
          50: '#fbf6e9',
          100: '#f5e8c4',
          200: '#ecd28a',
          300: '#e1bd5b',
          400: '#d4a017',
          500: '#bb8718',
          600: '#9a6c18',
          700: '#7b5417',
          800: '#5e4118',
          900: '#4e3615',
        },
        // Grafit / czerń – ciemne tła
        ink: {
          DEFAULT: '#0a1018',
          950: '#070b12',
          900: '#0a1018',
          800: '#10161f',
          700: '#1a212c',
          600: '#27303d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(81, 128, 191, 0.45)',
        'glow-gold': '0 0 60px -12px rgba(212, 160, 23, 0.5)',
        card: '0 18px 40px -20px rgba(7, 11, 18, 0.45)',
        'card-hover': '0 28px 60px -24px rgba(7, 11, 18, 0.6)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        'gradient-pan': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        'pulse-ring': 'pulse-ring 2.5s cubic-bezier(0.4,0,0.2,1) infinite',
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}
