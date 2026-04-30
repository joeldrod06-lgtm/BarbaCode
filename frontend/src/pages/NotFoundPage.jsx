import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-3xl border border-app-border bg-app-surface p-8 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-app-accent">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-app-text">
          Pagina no encontrada
        </h1>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-2xl bg-app-contrast px-5 py-3 font-semibold text-app-contrast-text"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
