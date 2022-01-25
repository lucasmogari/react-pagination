const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  content: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      spacing: {
        '8px': '8px',
      },
    },
  },
  variants: {
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};
