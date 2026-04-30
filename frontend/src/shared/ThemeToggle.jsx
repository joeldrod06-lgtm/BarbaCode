export function ThemeToggle({
  isDark,
  onToggle,
  className = "",
  variant = "button",
}) {
  if (variant === "switch") {
    return (
      <button
        type="button"
        onClick={onToggle}
        className={[
          "flex w-full items-center justify-between gap-3 rounded-2xl border border-app-border bg-app-surface px-4 py-3 text-left transition-all duration-200 ease-apple hover:border-app-accent/25 hover:bg-app-surface-soft hover:shadow-card",
          className,
        ].join(" ")}
        aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
        aria-pressed={isDark}
      >
        <div className="min-w-0">
          <p className="text-sm font-medium text-app-text">Modo oscuro</p>
          <p className="mt-1 text-xs text-app-muted">
            {isDark ? "Activado" : "Desactivado"}
          </p>
        </div>

        <span
          className={[
            "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-all duration-200",
            isDark
              ? "border-app-accent/30 bg-app-accent"
              : "border-app-border bg-app-surface-soft",
          ].join(" ")}
        >
          <span
            className={[
              "absolute left-1 flex h-5 w-5 items-center justify-center rounded-full bg-app-contrast-text shadow-sm transition-all duration-200",
              isDark ? "translate-x-5" : "translate-x-0",
            ].join(" ")}
          >
            {isDark ? (
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 text-app-accent"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v2.5M12 18.5V21M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M3 12h2.5M18.5 12H21M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-3 w-3 text-app-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
              </svg>
            )}
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "inline-flex items-center gap-2 rounded-2xl border border-app-border bg-app-surface/88 px-3 py-2.5 text-sm font-medium text-app-text shadow-card transition-all duration-200 ease-apple hover:border-app-accent/25 hover:bg-app-accent-soft/45",
        className,
      ].join(" ")}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
    >
      <span
        className={[
          "flex h-8 w-8 items-center justify-center rounded-xl transition-colors duration-200",
          isDark
            ? "bg-app-accent-soft text-app-accent"
            : "bg-app-surface-soft text-app-contrast",
        ].join(" ")}
      >
        {isDark ? (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M12 3v2.5M12 18.5V21M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M3 12h2.5M18.5 12H21M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
            <circle cx="12" cy="12" r="4.5" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
          </svg>
        )}
      </span>
      <span className="hidden sm:inline">
        {isDark ? "Modo claro" : "Modo oscuro"}
      </span>
    </button>
  );
}
