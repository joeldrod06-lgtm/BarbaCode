/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#f5f5f7",
          card: "#ffffff",
          text: "#1d1d1f",
          muted: "#6e6e73",
          border: "#e5e5e7",
          accent: "#2563eb",
          success: "#16a34a",
          warning: "#f59e0b",
          danger: "#dc2626",
        },
      },
      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.06)",
        float: "0 12px 40px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        ambient:
          "radial-gradient(circle at top left, rgba(37,99,235,0.08), transparent 30%), radial-gradient(circle at bottom right, rgba(17,24,39,0.08), transparent 34%)",
      },
      fontFamily: {
        sans: [
          "Inter",
          "SF Pro Display",
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
