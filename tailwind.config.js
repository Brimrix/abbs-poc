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

        // hover colors for cursor-pointers.
        "hover-color-secondary": "#ed963f",
        "hover-color-accent": "#be253f",
      }
    },
  },
  plugins: [],
}
