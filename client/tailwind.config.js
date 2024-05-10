/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        'dark-gray': '#262626',
        'light-gray': '#383838',
        'dark-yellow': '#FAB23D',
        'light-yellow': '#FFC812',
      },
      fontSize: {
        'main': '16px',
        'title-1': '20px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

