const typography = require("@tailwindcss/typography");
const jumpu = require("@jumpu-ui/tailwindcss");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,njk,md}"],
  important: true,
  theme: {
    extend: {
      spacing: {
        98: "32rem",
      },
      fontSize: {
        "5xl": ["3rem", "1.25"],
        "6xl": ["3.75rem", "1.25"],
        "7xl": ["4.5rem", "2.25"],
        "8xl": ["6rem", "2.25"],
        "9xl": ["8rem", "2.25"],
      },
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
        tq: {
          50: "#FFE6EB",
          100: "#FFCCD5",
          200: "#FF99AB",
          300: "#FF6682",
          400: "#FF3358",
          500: "#FF002E",
          600: "#BF0023",
          700: "#800017",
          800: "#40000C",
          900: "#1A0005",
        },
      },
      screens: {
        "2xl": { max: "1280px" },
        "3xl": { max: "1280px" },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          sm: "1rem",
          md: "4rem",
          lg: "1rem",
          xl: "4rem",
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.800"),
            pre: {
              backgroundColor: theme("colors.gray.100"),
              color: theme("colors.gray.800"),
            },
            "ol > li::before": {
              color: theme("colors.gray.600"),
            },
            "ul > li::before": {
              backgroundColor: theme("colors.gray.500"),
            },
            dl: {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },
            dt: {
              fontWeight: "bold",
            },
            blockquote: {
              fontStyle: "normal",
              borderLeft: "none",
              fontWeight: "inherit",
              backgroundColor: theme("colors.gray.100"),
              color: theme("colors.gray.800"),
              padding: "1.5rem 1.5rem 1.5rem 3rem",
              position: "relative",
              borderRadius: "0.5rem",
            },
            "blockquote::before": {
              content: "open-quote",
              fontWeight: "bold",
              fontSize: "4rem",
              position: "absolute",
              top: ".2rem",
              left: ".6rem",
              lineHeight: 1,
              opacity: 0.2,
              color: theme("colors.gray.800"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.white"),
            '[class~="lead"]': { color: theme("colors.white") },
            a: { color: theme("colors.white") },
            strong: { color: theme("colors.white") },
            "ul > li::before": { backgroundColor: theme("colors.gray.700") },
            hr: { borderColor: theme("colors.gray.800") },
            blockquote: {
              color: theme("colors.white"),
              borderLeftColor: theme("colors.gray.800"),
            },
            h1: { color: theme("colors.white") },
            h2: { color: theme("colors.white") },
            h3: { color: theme("colors.white") },
            h4: { color: theme("colors.white") },
            code: { color: theme("colors.white") },
            "a code": { color: theme("colors.white") },
            pre: {
              code: {
                color: theme("colors.gray.800"),
              },
            },
            thead: {
              color: theme("colors.white"),
              borderBottomColor: theme("colors.gray.700"),
            },
            "tbody tr": { borderBottomColor: theme("colors.gray.800") },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      fontFamily: ["hover", "focus"],
      typography: ["dark"],
      backgroundColor: ["active"],
    },
  },
  plugins: [typography, ...jumpu],
};
