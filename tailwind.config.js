module.exports = {
  purge: ['./src/**/*.{ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1d4eb6'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
