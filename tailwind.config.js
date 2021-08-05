const typography = require("@tailwindcss/typography");
//const plugin = require("tailwindcss/plugin");
const forms = require("./src/ui_components");

module.exports = {
  purge: ["src/**/*.js", "src/**/*.njk", "src/**/*.md"],
  important: true,
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
    },
  },
  variants: {},
  plugins: [typography, forms],
};
