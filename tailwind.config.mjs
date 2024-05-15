/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import jumpu from "@jumpu-ui/tailwindcss";
export default {
  darkMode: "selector",
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      jumpu: {
        prefix: "",
      },
      colors: {
        brand: "#00AFB4",
        primary: {
          50: "#F8FDFD",
          100: "#F1FBFB",
          200: "#E6F8F8",
          300: "#CCEFF0",
          400: "#99DFE1",
          500: "#66CFD2",
          600: "#00AFB4",
          700: "#008488",
          800: "#006D73",
          900: "#00585A",
          950: "#003233",
        },
        review: "#C2410C",
        success: {
          DEFAULT: "#15803D",
          extralight: "#F7FEE7",
          light: "#84CC16",
        },
        caution: {
          DEFAULT: "#FACC15",
          extralight: "#FEFCE8",
          light: "#FDE047",
        },
        danger: {
          DEFAULT: "#B80000",
          extralight: "#FEF2F2",
          light: "#F87171",
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
    },
  },
  plugins: [typography, ...jumpu],
};
