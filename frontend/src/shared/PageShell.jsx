export function PageShell({ title, description, children }) {
  return (
    <section className="space-y-8">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-app-muted">
          Modulo
        </p>
        <h2 className="text-3xl font-semibold tracking-tight text-app-text md:text-4xl">
          {title}
        </h2>
        <p className="max-w-3xl text-sm leading-7 text-app-muted md:text-[15px]">
          {description}
        </p>
      </header>
      {children}
    </section>
  );
}
