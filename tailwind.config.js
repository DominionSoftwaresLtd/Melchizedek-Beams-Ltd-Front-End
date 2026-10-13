/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Melchizedek Beams Ltd Brand Colors
        primary: {
          DEFAULT: "#1A2B4C", // Deep Royal Navy
          dark: "#0F1829",
          light: "#2A3B5C",
        },
        secondary: {
          DEFAULT: "#D4AF37", // Warm Amber Gold
          dark: "#B89620",
          light: "#E0C45E",
        },
        accent: {
          DEFAULT: "#6B1D2F", // Deep Wine Burgundy
          dark: "#4A1420",
          light: "#8B2D3F",
        },
        neutral: {
          DEFAULT: "#334155", // Slate Gray
          light: "#64748B",
          dark: "#1E293B",
        },
        background: {
          DEFAULT: "#F8F9FA", // Soft Warm Off-White
          alt: "#FAFAF7",
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
