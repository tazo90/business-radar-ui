const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  plugins: [],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  }
}
  