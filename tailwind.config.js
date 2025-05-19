/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#0A1828',
          accent: '#178582',
          gold: '#BFA181',
        },
      },
    },
    plugins: [],
  }
  