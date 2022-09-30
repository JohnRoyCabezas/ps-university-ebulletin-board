/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#162750",
        "dark-blue": "#0B1428",
        "custom-gray": "#F5F5F5",
      },
    },
  },
  plugins: [],
};
