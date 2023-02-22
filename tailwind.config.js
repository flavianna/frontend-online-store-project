/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: 'Lexend Deca, sans-serif',
    },
    extend: { colors: {

      mygreen: '#00413C',
    },
    },
  },
  plugins: [],
};
