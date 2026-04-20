import { PageShell } from "./PageShell";

export function ModulePlaceholder({ title, description, highlights }) {
  return (
    <PageShell title={title} description={description}>
      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="space-y-6">
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item, index) => (
              <article
                key={item}
                className="rounded-3xl border border-app-border bg-white p-6 shadow-card transition-all duration-200 ease-apple hover:-translate-y-0.5 hover:shadow-float"
              >
                <p className="text-sm text-app-muted">Bloque {index + 1}</p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-app-text">
                  {item}
                </h3>
                <p className="mt-3 text-sm leading-6 text-app-muted">
                  Espacio listo para formularios amplios, acciones rapidas y
                  flujos de aprobacion.
                </p>
              </article>
            ))}
          </div>

          <article className="rounded-[30px] border border-app-border bg-white p-6 shadow-card">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-app-muted">Vista operativa</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
                  Tabla principal del modulo
                </h3>
              </div>
              <button className="rounded-xl border border-app-border bg-white px-4 py-2.5 text-sm font-medium text-app-text transition-all duration-200 ease-apple hover:bg-[#fafafb]">
                Exportar
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-app-border">
              <div className="grid grid-cols-4 bg-[#fafafb] px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-app-muted">
                <span>Concepto</span>
                <span>Estado</span>
                <span>Actualizado</span>
                <span className="text-right">Accion</span>
              </div>

              {highlights.map((item, index) => (
                <div
                  key={item}
                  className="grid grid-cols-4 items-center border-t border-app-border px-5 py-4 text-sm text-app-text transition-colors hover:bg-[#fafafb]"
                >
                  <span>{item}</span>
                  <span>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-app-accent">
                      Activo
                    </span>
                  </span>
                  <span className="text-app-muted">Hace {index + 1} horas</span>
                  <span className="text-right text-app-muted">Ver detalle</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="space-y-6">
          <article className="rounded-[30px] border border-app-border bg-white p-6 shadow-card">
            <p className="text-sm text-app-muted">Accion rapida</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
              Crear nuevo registro
            </h3>

            <form className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-app-text">
                  Nombre
                </label>
                <input
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-300 focus:ring-4 focus:ring-zinc-200/50"
                  placeholder={`Nuevo elemento de ${title.toLowerCase()}`}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-app-text">
                  Observaciones
                </label>
                <textarea
                  rows="4"
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-300 focus:ring-4 focus:ring-zinc-200/50"
                  placeholder="Notas internas, referencia o contexto operativo"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </article>

          <article className="rounded-[30px] border border-app-border bg-white p-6 shadow-card">
            <p className="text-sm text-app-muted">Notas</p>
            <div className="mt-4 space-y-4">
              {[
                "Mucho espacio visual y focos suaves para evitar una interfaz pesada.",
                "Cards, tablas y formularios comparten la misma jerarquia visual.",
                "Listo para conectarse a API con datos reales y estados de carga.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-app-border bg-[#fafafb] px-4 py-4 text-sm leading-6 text-app-muted"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </PageShell>
  );
}
