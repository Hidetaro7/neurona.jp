const typography = require('@tailwindcss/typography');

module.exports = {
  purge: [
    'src/script/**/*.js',
    'src/template/**/*.njk',
  ],
  important: true,
  theme: {
    extend: {
    },
    container: {
      center: true,
    }
  },
  variants: {},
  plugins: [
    typography,
  ],
};
