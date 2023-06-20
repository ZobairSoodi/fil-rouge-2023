/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "var(--primary)",
        "secondary": "var(--secondary)",
        "bg1": "var(--bg1)",
        "bg2": "var(--bg2)",
      },
      backgroundImage: {
        "grad": "var(--bg-gradient)",
      },
      screens: {
        '3xl': '5000px',
      },
    },
  },
  plugins: [],
}