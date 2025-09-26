/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.jsx", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'green-custom': {
          50: '#d8f3dc',   // Lightest green
          100: '#b7e4c7',  // Very light green
          200: '#95d5b2',  // Light green
          300: '#74c69d',  // Medium light green
          400: '#52b788',  // Medium green
          500: '#40916c',  // Main green
          600: '#2d6a4f',  // Dark green
          700: '#1b4332',  // Very dark green
          800: '#081c15',  // Darkest green
        },
      },
    },
  },
  plugins: [],
}