/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'core-bg': '#FFFFFF',
        'core-purple': '#423189',
        'core-purple-dark': '#2F2168',
        'core-dark': '#1E213D',
        'core-surface': '#25284B',
        'core-accent': '#8B6FF0',
        'core-line': '#E4E0F2',
        'core-muted': '#7B7890',
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
