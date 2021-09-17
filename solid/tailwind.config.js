const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    options: {
      safelist: [/data-theme$/],
    },
  },
  // darkMode: "media", // or 'media' or 'class'
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "blue-vurt": {
        DEFAULT: "#5DA5A4",
        50: "#F1F7F7",
        100: "#E0EEEE",
        200: "#BFDCDB",
        300: "#9FC9C9",
        400: "#7EB7B6",
        500: "#5DA5A4",
        600: "#4A8584",
        700: "#386464",
        800: "#254443",
        900: "#132323",
      },
      "red-punch": {
        DEFAULT: "#DF382A",
        50: "#FDF2F2",
        100: "#FADEDB",
        200: "#F3B4AF",
        300: "#EC8B83",
        400: "#E66156",
        500: "#DF382A",
        600: "#BA281C",
        700: "#8E1F15",
        800: "#61150F",
        900: "#350B08",
      },
      "yellow-lemon": {
        50: "#f6f9fa",
        100: "#e5f0fb",
        200: "#c7dbf7",
        300: "#9db8ec",
        400: "#7491de",
        500: "#5c6ed0",
        600: "#4b52bd",
        700: "#3a3d99",
        800: "#282a6e",
        900: "#171a44",
      },
      "teal-aqua": {
        DEFAULT: "#56A87C",
        50: "#EDF6F1",
        100: "#DDEDE4",
        200: "#BBDCCA",
        300: "#99CBB0",
        400: "#77BA96",
        500: "#56A87C",
        600: "#458663",
        700: "#33654A",
        800: "#224331",
        900: "#112118",
      },
      "green-pea": {
        DEFAULT: "#1C6E39",
        50: "#8DE2AB",
        100: "#79DD9C",
        200: "#50D37E",
        300: "#31BF63",
        400: "#26974E",
        500: "#1C6E39",
        600: "#124524",
        700: "#071D0F",
        800: "#000000",
        900: "#000000",
      },
    },
    fontFamily: {
      sans: ["Ubuntu Mono", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
