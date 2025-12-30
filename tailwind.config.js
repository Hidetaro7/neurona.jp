const typography = require("@tailwindcss/typography");
const lineClamp = require("@tailwindcss/line-clamp");
const jumpuui = require("@jumpu-ui/tailwindcss");

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,njk,md}",
    "./astro-src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./astro-src/styles/**/*.css"
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E9F1F9",
          100: "#C7DAEF",
          200: "#91B6E1",
          300: "#5990D1",
          400: "#60A5FA",
          500: "#0950C3",
          600: "#2563EB",
          700: "#113661",
          800: "#081B30",
          900: "#030B13",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "1rem",
          lg: "1rem",
          xl: "1rem",
        },
      },
    },
  },
  plugins: [typography, lineClamp, ...jumpuui],
};
