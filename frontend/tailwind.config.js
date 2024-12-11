/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
      },
      boxShadow: {
        md: "0px 2px 4px -2px rgba(10, 13, 18, 0.06)",
        "md-strong": "0px 4px 8px -2px rgba(10, 13, 18, 0.1)",
      },
      colors: {
        grey: "rgba(233, 234, 235, 1)",
        "grey-text": "rgba(83, 88, 98, 1)",
        "purple-100": "rgba(249, 245, 255, 1)",
        "purple-600": "rgba(127, 86, 217, 1)",
        "grey-border": "rgba(213, 215, 218, 1)",
        "black-600": "rgba(24, 29, 39, 1)",
        "blue-500": "rgba(148, 163, 184, 1)",
        "gray-200": "rgba(226, 232, 240, 1)",
        "gray-700": "rgba(51, 65, 85, 1)",
      },
    },
  },
  plugins: [],
};
