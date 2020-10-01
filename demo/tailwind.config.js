const defaultConfig = require('tailwindcss/defaultConfig');

module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      spacing: {
        '8px': '8px',
      },
    },
  },
  variants: {
    textColor: [...defaultConfig.variants.textColor, 'disabled'],
    pointerEvents: [...defaultConfig.variants.pointerEvents, 'disabled'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
  },
};
