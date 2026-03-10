/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf0dc',
          200: '#bce2bc',
          300: '#8ecc8e',
          400: '#5cad5c',
          500: '#3a8f3a',
          600: '#2c742c',
          700: '#255c25',
          800: '#214a21',
          900: '#1c3d1c',
          950: '#0d210d',
        },
        secondary: {
          50: '#fdf8ef',
          100: '#faefd9',
          200: '#f4dbb2',
          300: '#edc281',
          400: '#e4a24e',
          500: '#dd8a2c',
          600: '#cf7022',
          700: '#ac561e',
          800: '#8a4520',
          900: '#703a1d',
          950: '#3c1c0d',
        },
        earth: {
          50: '#f7f5f0',
          100: '#ebe7db',
          200: '#d9d1ba',
          300: '#c3b593',
          400: '#b09d74',
          500: '#a18c63',
          600: '#8a7454',
          700: '#715d46',
          800: '#5f4e3e',
          900: '#524436',
          950: '#2e241d',
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      keyframes: {
        'kenburns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        'count-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'kenburns': 'kenburns 20s ease-in-out infinite alternate',
        'count-up': 'count-up 0.4s ease-out both',
      },
    },
  },
  plugins: [],
};
