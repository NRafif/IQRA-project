/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'forest': {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        'earth': {
          100: '#d4a574',
          200: '#c4956a',
          300: '#a67c52',
          400: '#8b6914',
          500: '#6b4423',
          600: '#5c3a1e',
          700: '#4a2c17',
          800: '#3d2414',
          900: '#2d1a0f',
        }
      },
    },
  },
  plugins: [],
}
