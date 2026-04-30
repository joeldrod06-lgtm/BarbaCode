/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-bg": "#f5f5f7",
        "app-text": "#1d1d1f",
        "app-muted": "#6b7280",
        "app-border": "#e5e7eb",
        "app-accent": "#2563eb",
        "app-success": "#059669",
        "app-warning": "#d97706",
        "app-danger": "#dc2626",
      },
      boxShadow: {
        card: "0 16px 40px rgba(15, 23, 42, 0.08)",
        float: "0 20px 48px rgba(15, 23, 42, 0.14)",
        soft: "0 12px 32px rgba(15, 23, 42, 0.08)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
