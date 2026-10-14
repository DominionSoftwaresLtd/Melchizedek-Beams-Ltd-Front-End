/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0F383E",
          dark:    "#0A2428",
          light:   "#1A5260",
        },
        secondary: {
          DEFAULT: "#D97706",
          dark:    "#B45309",
          light:   "#F59E0B",
        },
        accent: {
          DEFAULT: "#E6F4F1",
          dark:    "#C7E8E2",
        },
        neutral: {
          DEFAULT: "#374151",
          light:   "#6B7280",
          dark:    "#1F2937",
        },
      },
      fontFamily: {
        sans:  ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
