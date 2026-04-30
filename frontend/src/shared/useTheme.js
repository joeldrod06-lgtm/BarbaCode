import { useEffect, useState } from "react";

const STORAGE_KEY = "barbacode-theme";

function resolveTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(STORAGE_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.body.dataset.theme = theme;
  document.body.style.colorScheme = theme;
}

export function useTheme() {
  const [theme, setTheme] = useState(resolveTheme);

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return {
    isDark: theme === "dark",
    toggleTheme: () =>
      setTheme((currentTheme) =>
        currentTheme === "dark" ? "light" : "dark",
      ),
  };
}
