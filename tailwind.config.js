const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Bai Jamjuree', ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}
