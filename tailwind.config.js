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
