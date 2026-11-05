/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080E1B",
        inkSoft: "#111A2E",
        line: "#1E293B",
        accent: "#10B981",
        warn: "#F59E0B",
        info: "#3B82F6",
        muted: "#94A3B8"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 35px rgba(16,185,129,.12)"
      }
    }
  },
  plugins: []
};