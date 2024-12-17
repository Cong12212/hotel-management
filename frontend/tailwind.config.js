/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-pink-1': '#EEC6CC', 
        'custom-pink-2': 'rgb(224, 81, 112)',
        'custom-gray': 'rgb(204, 206, 199)',
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
      }

    },
  },
  plugins: [],
}