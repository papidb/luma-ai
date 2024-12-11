/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "rgba(233, 234, 235, 1)",
        "grey-text": "rgba(83, 88, 98, 1)",
        "purple-100": "rgba(249, 245, 255, 1)",
        "purple-600": "rgba(127, 86, 217, 1)",
      },
    },
  },
  plugins: [],
};
