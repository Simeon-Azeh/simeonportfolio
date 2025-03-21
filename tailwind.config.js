// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with a class
  theme: {
    extend: {
      fontFamily: {
        inter: ['"Inter"', 'sans-serif'],
        'montserrat-alt': ['"Montserrat Alternates"', 'sans-serif'],
      },
      colors: {
        'dark-body': '#171716',
        'logo-grey': '#6b7280',
        'light-body': '#F9FEFF',
        'light-text' : '#545e85'
      },
      
    },
  },
  plugins: [],
}
