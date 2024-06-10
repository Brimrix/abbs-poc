/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './frontend/**/*.{html,js,jsx,ts,tsx}',  ],
  theme: {
    extend: {
      colors: {

        primary: "#0B6E4F",
        secondary: "#FA9F42",
        accent: "#FA2D2D",

        "hover-color-secondary": "#ed963f",

        'green': "#0B6E4F",
        'orange': "#FA9F42",
        'orangeHover': "#ed963f",
        'red': "#db304d",
        'redHover': "#be253f"
      }
    },
  },
  plugins: [],
}
