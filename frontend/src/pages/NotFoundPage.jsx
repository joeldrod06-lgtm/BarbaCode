import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-brand-600">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-stone-900">
          Pagina no encontrada
        </h1>
        <Link
          to="/dashboard"
          className="mt-6 inline-flex rounded-2xl bg-brand-600 px-5 py-3 font-semibold text-white"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}
