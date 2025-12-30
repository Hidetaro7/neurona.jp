const postcss = require("postcss");

module.exports = ({ env }) => ({
  map: false,
  from: undefined,
  plugins: [
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    env === "production" ? require("cssnano") : false,
  ],
});
