/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ku-blue': '#0a192f',
        'ku-gold': '#d4af37',
        'ku-light': '#f8f9fa'
      }
    },
  },
  plugins: [],
}
