const postcss = require("postcss");

module.exports = ({ env }) => ({
  map: false,
  from: undefined,
  plugins: [
    {
      postcssPlugin: "grouped",
      Once(root, { result }) {
        return postcss([
          require("postcss-import")({ root: "src/style" }),
          require("postcss-mixins"),
        ]).process(root, result.opts);
      },
    },
    require("tailwindcss/nesting"),
    require("tailwindcss"),
    require("autoprefixer"),
    env === "production" ? require("cssnano") : false,
  ],
});
