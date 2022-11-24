/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      margin: {
        100: "-1.2rem",
      },
      colors: {
        "regal-blue": "#162750",
        "dark-blue": "#0B1428",
        "custom-gray": "#F5F5F5",

        background: "#4C0033",
        "secondary-background": "#790252",
        "third-background": "#AF0171",
        "fourth-background": "#E80F88",

        primary: {
          100: "#3C2317",
          200: "#AC7D88",
        },
        secondary: {
          100: "#4C0033",
          200: "#790252",
        },
        tertiary: {
          100: "#2C3333",
          200: "#4C3575",
        },
        quinary: {
          100: "#247881",
          200: "#43919B",
        },
        senary: {
          100: "#345B63",
          200: "#D4ECDD",
        },
      },
      spacing: {
        "184px": "184px",
      },
    },
  },
  plugins: [],
  safelist: [
    "fill-regal-blue",
    "fill-primary-100",
    "fill-secondary-100",
    "fill-tertiary-100",
    "fill-quinary-100",
    "fill-senary-100",
  ],
};
