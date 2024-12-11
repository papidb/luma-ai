/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "rgba(233, 234, 235, 1)",
        "grey-text": "rgba(83, 88, 98, 1)"
      },
    },
  },
  plugins: [],
};
