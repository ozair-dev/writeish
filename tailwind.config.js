/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        moon: "6px 1px rgb(0,0,0 / 0.1)",
      },
      fontFamily: {
        rubik: "'Oleo Script Swash Caps', cursive",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
