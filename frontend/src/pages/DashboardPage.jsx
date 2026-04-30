import { PageShell } from "../shared/PageShell";
import { useTheme } from "../shared/useTheme";

const stats = [
  { label: "Ventas del dia", value: "$24,800", change: "+8.4%", tone: "text-app-success" },
  { label: "Pedidos", value: "126", change: "+12 hoy", tone: "text-app-accent" },
  { label: "Gasto del dia", value: "$3,240", change: "Controlado", tone: "text-app-warning" },
  { label: "Inventario bajo", value: "04", change: "Atender", tone: "text-app-danger" },
];

const activity = [
  "Venta registrada en mostrador principal hace 4 min",
  "Compra de insumos enviada a aprobacion",
  "Alerta de stock bajo para tortilla y refrescos",
  "Cliente mayorista agregado a la base de datos",
];

const tableRows = [
  { item: "Barbacoa kilo", status: "Alta demanda", amount: "$8,400" },
  { item: "Tacos surtidos", status: "Estable", amount: "$6,120" },
  { item: "Consome", status: "Reponer", amount: "$1,280" },
];

export function DashboardPage() {
  const { isDark } = useTheme();

  return (
    <PageShell
      title="Dashboard"
      description="Resumen ejecutivo del negocio con indicadores diarios, actividad reciente y acceso rapido a los flujos operativos."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <article
            key={item.label}
            className="rounded-[30px] border border-app-border bg-app-surface p-6 shadow-card transition-all duration-200 ease-apple hover:-translate-y-0.5 hover:shadow-float"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-app-muted">{item.label}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-app-surface-soft text-sm font-medium text-app-text">
                0{index + 1}
              </span>
            </div>
            <p className="mt-6 text-4xl font-semibold tracking-tight text-app-text">
              {item.value}
            </p>
            <p className={`mt-3 text-sm font-medium ${item.tone}`}>{item.change}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[32px] border border-app-border bg-app-surface p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-app-muted">Tendencia semanal</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
                Flujo de ventas e ingresos
              </h3>
            </div>
            <button className="rounded-xl border border-app-border bg-app-surface px-4 py-2.5 text-sm font-medium text-app-text transition hover:bg-app-surface-soft">
              Ver detalle
            </button>
          </div>

          <div className="mt-8 grid h-[300px] grid-cols-7 items-end gap-3 rounded-[28px] bg-app-surface-soft p-6">
            {[42, 58, 46, 72, 64, 88, 76].map((value, index) => (
              <div key={value} className="flex flex-col items-center gap-3">
                <div className="flex h-56 items-end">
                  <div
                    className={[
                      "w-10 rounded-full transition-all duration-300 ease-apple hover:opacity-85",
                      isDark
                        ? "bg-gradient-to-t from-[#334155] via-[#475569] to-[#94a3b8] shadow-[0_10px_28px_rgba(15,23,42,0.28)]"
                        : "bg-gradient-to-t from-[#111827] to-[#4b5563]",
                    ].join(" ")}
                    style={{ height: `${value * 2}px` }}
                  />
                </div>
                <span className="text-xs text-app-muted">
                  {["L", "M", "M", "J", "V", "S", "D"][index]}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-app-border bg-app-surface p-6 shadow-card">
          <p className="text-sm text-app-muted">Actividad reciente</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
            Operacion del dia
          </h3>
          <div className="mt-6 space-y-3">
            {activity.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-2xl bg-app-surface-soft px-4 py-4"
              >
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-app-accent" />
                <div>
                  <p className="text-sm leading-6 text-app-text">{item}</p>
                  <p className="mt-1 text-xs text-app-muted">
                    Evento #{index + 1}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-[32px] border border-app-border bg-app-surface p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-app-muted">Productos destacados</p>
              <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
                Rendimiento por categoria
              </h3>
            </div>
            <span className="rounded-full bg-app-accent-soft px-3 py-1 text-xs font-medium text-app-accent">
              Hoy
            </span>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-app-border">
            <div className="grid grid-cols-3 bg-app-surface-soft px-5 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-app-muted">
              <span>Producto</span>
              <span>Estado</span>
              <span className="text-right">Ingreso</span>
            </div>

            {tableRows.map((row) => (
              <div
                key={row.item}
                className="grid grid-cols-3 items-center border-t border-app-border px-5 py-4 text-sm transition-colors hover:bg-app-surface-soft"
              >
                <span className="font-medium text-app-text">{row.item}</span>
                <span className="text-app-muted">{row.status}</span>
                <span className="text-right font-medium text-app-text">
                  {row.amount}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[32px] border border-app-border bg-app-surface p-6 shadow-card">
          <p className="text-sm text-app-muted">Pendientes</p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
            Acciones inmediatas
          </h3>

          <div className="mt-6 space-y-4">
            {[
              ["Configurar roles finos de acceso", "Seguridad"],
              ["Conectar dashboard al endpoint real", "Integracion"],
              ["Definir plantillas JasperReports", "Reportes"],
            ].map(([title, tag]) => (
              <div
                key={title}
                className="rounded-2xl border border-app-border bg-app-surface-soft p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-app-text">{title}</p>
                  <span className="rounded-full bg-app-surface px-3 py-1 text-xs text-app-muted">
                    {tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </PageShell>
  );
}
