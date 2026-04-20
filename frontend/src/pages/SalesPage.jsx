import { PageShell } from "../shared/PageShell";

const products = [
  { name: "Barbacoa kilo", price: "$520", stock: "Disponible" },
  { name: "Tacos surtidos", price: "$28", stock: "Alta demanda" },
  { name: "Consome chico", price: "$35", stock: "Disponible" },
  { name: "Quesabirrias", price: "$52", stock: "Disponible" },
  { name: "Refresco lata", price: "$25", stock: "Stock bajo" },
  { name: "Paquete familiar", price: "$890", stock: "Reservado" },
];

const ticket = [
  { name: "Tacos surtidos", qty: 4, amount: "$112" },
  { name: "Consome chico", qty: 2, amount: "$70" },
  { name: "Refresco lata", qty: 2, amount: "$50" },
];

export function SalesPage() {
  return (
    <PageShell
      title="Ventas"
      description="Punto de venta con busqueda rapida de productos, seleccion visual y resumen de ticket siempre visible."
    >
      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <section className="space-y-6">
          <article className="rounded-[30px] border border-app-border bg-white p-6 shadow-card">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-app-muted">Busqueda inteligente</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
                  Productos disponibles
                </h3>
              </div>

              <div className="flex gap-3">
                <input
                  className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-300 focus:ring-4 focus:ring-zinc-200/50"
                  placeholder="Buscar producto o codigo"
                />
                <button className="rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50">
                  Filtros
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
              {products.map((product) => (
                <button
                  key={product.name}
                  className="rounded-[28px] border border-app-border bg-[#fafafb] p-5 text-left transition-all duration-200 ease-apple hover:-translate-y-0.5 hover:border-zinc-300 hover:bg-white hover:shadow-card"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-sm font-medium text-app-text shadow-card">
                      {product.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs text-app-muted">
                      {product.stock}
                    </span>
                  </div>
                  <h4 className="mt-5 text-lg font-semibold tracking-tight text-app-text">
                    {product.name}
                  </h4>
                  <p className="mt-2 text-sm text-app-muted">
                    Preparado para agregarse al ticket con una accion.
                  </p>
                  <p className="mt-5 text-2xl font-semibold tracking-tight text-app-text">
                    {product.price}
                  </p>
                </button>
              ))}
            </div>
          </article>
        </section>

        <aside className="space-y-6">
          <article className="rounded-[30px] border border-app-border bg-white p-6 shadow-card">
            <p className="text-sm text-app-muted">Ticket actual</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
              Venta en proceso
            </h3>

            <div className="mt-6 space-y-4">
              {ticket.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between rounded-2xl bg-[#fafafb] px-4 py-4"
                >
                  <div>
                    <p className="text-sm font-medium text-app-text">{item.name}</p>
                    <p className="mt-1 text-xs text-app-muted">
                      Cantidad {item.qty}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-app-text">
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[28px] bg-[#111827] p-6 text-white">
              <p className="text-sm text-zinc-300">Total</p>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                $232
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="rounded-xl bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100">
                  Cobrar
                </button>
                <button className="rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Limpiar
                </button>
              </div>
            </div>
          </article>

          <article className="rounded-[30px] border border-app-border bg-white p-6 shadow-card">
            <p className="text-sm text-app-muted">Pago</p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
              Metodo de cobro
            </h3>
            <div className="mt-6 grid gap-3">
              {["Efectivo", "Tarjeta", "Transferencia"].map((method) => (
                <button
                  key={method}
                  className="rounded-2xl border border-app-border bg-[#fafafb] px-4 py-4 text-left text-sm font-medium text-app-text transition hover:bg-white hover:shadow-card"
                >
                  {method}
                </button>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </PageShell>
  );
}
