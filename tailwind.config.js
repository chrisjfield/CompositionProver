const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'brand-primary': {
          DEFAULT: colors.blue['700'],
          dark: colors.blue['900']
        }

      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even', 'last'],
      borderRadius: ['last']
    },
  },
  plugins: [],
}
