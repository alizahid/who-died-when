const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: false,
  mode: 'jit',
  plugins: [],
  purge: ['app/**/*.tsx'],
  theme: {
    colors,
    extend: {
      colors: {
        primary: colors.indigo
      },
      minHeight: {
        main: 'calc(100vh - 4rem)'
      }
    },
    fontFamily: {
      body: ['Satoshi', 'sans-serif']
    }
  },
  variants: {
    extend: {}
  }
}
