/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFCE1A',
        'secondary' : "#0D0842",
        'blackBG': '#F3F3F3',
        'Favorite': '#FF5841',
        'customGold': '#e4b282',
        'mainbutton': '#000000',
      }, 
      fontFamily: {
        'primary' : ["Montserrat", "sans-serif"],
        'secondary' : ["Nunito Sans", "sans-serif"],
        'tertiary' : ["Sedgwick Ave Display"]
      },
      keyframes: {
        'running-gradient': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      },
      animation: {
        'running-gradient': 'running-gradient 4s infinite ease-in-out',
      }
    },
  },
  plugins: [],
}
