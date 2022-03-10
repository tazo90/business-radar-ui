const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
  ],
  theme: {
    screens: {
      'xs': '475px',
      ...defaultTheme.screens,
    },
  }
}
  