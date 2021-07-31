const typography = require("@tailwindcss/typography");
const forms = require("@tailwindcss/forms");

module.exports = {
  purge: ["src/**/*.js", "src/**/*.njk", "src/**/*.md"],
  important: true,
  theme: {
    extend: {
      container: {
        center: true,
      }
    },
  },
  variants: {},
  plugins: [typography, forms],
};
