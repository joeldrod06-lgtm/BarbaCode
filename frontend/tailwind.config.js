/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-bg": "rgb(var(--app-bg) / <alpha-value>)",
        "app-surface": "rgb(var(--app-surface) / <alpha-value>)",
        "app-surface-soft": "rgb(var(--app-surface-soft) / <alpha-value>)",
        "app-surface-strong": "rgb(var(--app-surface-strong) / <alpha-value>)",
        "app-text": "rgb(var(--app-text) / <alpha-value>)",
        "app-muted": "rgb(var(--app-muted) / <alpha-value>)",
        "app-border": "rgb(var(--app-border) / <alpha-value>)",
        "app-accent": "rgb(var(--app-accent) / <alpha-value>)",
        "app-accent-soft": "rgb(var(--app-accent-soft) / <alpha-value>)",
        "app-success": "rgb(var(--app-success) / <alpha-value>)",
        "app-warning": "rgb(var(--app-warning) / <alpha-value>)",
        "app-danger": "rgb(var(--app-danger) / <alpha-value>)",
        "app-contrast": "rgb(var(--app-contrast) / <alpha-value>)",
        "app-contrast-text": "rgb(var(--app-contrast-text) / <alpha-value>)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
        soft: "var(--shadow-soft)",
      },
      backgroundImage: {
        ambient: "var(--app-ambient)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
