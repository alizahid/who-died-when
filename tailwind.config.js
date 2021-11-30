const colors = require('tailwindcss/colors')
const typography = require('@tailwindcss/typography')

module.exports = {
  darkMode: false,
  mode: 'jit',
  plugins: [typography],
  purge: ['app/**/*.{tsx,mdx}'],
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
