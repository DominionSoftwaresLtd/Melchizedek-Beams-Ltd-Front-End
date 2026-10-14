/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Melchizedek Beams Ltd — Warm Light-Mode Palette
        primary: {
          DEFAULT: "#0F383E", // Deep Slate/Teal
          dark: "#0A2428",
          light: "#1A5260",
        },
        secondary: {
          DEFAULT: "#D97706", // Ochre Gold
          dark: "#B45309",
          light: "#F59E0B",
        },
        accent: {
          DEFAULT: "#E6F4F1", // Soft Teal Tint
          dark: "#C7E8E2",
          text: "#0F383E",
        },
        neutral: {
          DEFAULT: "#374151", // Mid Gray for body text
          light: "#6B7280",
          dark: "#1F2937",
        },
        background: {
          DEFAULT: "#FAF9F5", // Warm Ivory
          alt: "#FFFFFF",
        },
        surface: {
          DEFAULT: "#FFFFFF", // Card surface
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
