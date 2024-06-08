/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './frontend/**/*.{html,js,jsx,ts,tsx}',  ],
  theme: {
    extend: {
      colors: {
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
