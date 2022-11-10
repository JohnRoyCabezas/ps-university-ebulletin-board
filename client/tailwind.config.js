/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#162750", 
        "dark-blue": "#0B1428", 
        "custom-gray": "#F5F5F5", 

        "background": "#002B5B",
        "secondary-background": "#2B4865",
        "third-background": "#256D85",
        "fourth-background": "#8FE3CF",
      },
    },
  },
  plugins: [],
};
