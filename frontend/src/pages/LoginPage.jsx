import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ThemeToggle } from "../shared/ThemeToggle";
import { useTheme } from "../shared/useTheme";

const loginSchema = z.object({
  username: z.string().min(3, "Ingresa tu usuario"),
  password: z.string().min(4, "Ingresa tu contrasena"),
});

const metrics = [
  { label: "Ventas hoy", value: "$24,800", hint: "+8.4%" },
  { label: "Tickets activos", value: "126", hint: "12 pendientes" },
  { label: "Inventario bajo", value: "04", hint: "Atender hoy" },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async () => {
    navigate("/dashboard");
  };

  return (
    <div
      className={[
        "relative flex min-h-screen items-center justify-center overflow-hidden bg-app-bg px-3 py-6 sm:px-4 sm:py-10",
        isDark ? "theme-dark" : "theme-light",
      ].join(" ")}
    >
      <div className="absolute inset-0 bg-ambient opacity-90" />

      <div className="relative grid w-full max-w-7xl gap-4 rounded-[28px] border border-app-border/70 bg-app-surface/50 p-3 shadow-card backdrop-blur-xl sm:gap-6 sm:p-4 lg:grid-cols-[1.1fr_0.9fr] lg:rounded-[36px] lg:p-6">
        <section className="rounded-[24px] bg-app-surface-soft p-6 sm:p-8 md:rounded-[30px] md:p-10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-app-contrast text-sm font-semibold text-app-contrast-text">
                BB
              </div>
              <div>
                <p className="text-sm font-medium text-app-text">BarbaCode</p>
                <p className="text-sm text-app-muted">
                  Sistema de administracion
                </p>
              </div>
            </div>

            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>

          <div className="mt-10 max-w-xl sm:mt-12">
            <p className="text-sm text-app-muted">Experiencia refinada</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-app-text sm:text-4xl md:text-5xl">
              Controla tu operacion diaria con una interfaz limpia, suave y
              precisa.
            </h1>
            <p className="mt-5 text-base leading-8 text-app-muted">
              Dashboard, ventas, inventario, caja y reportes integrados en una
              experiencia visual sobria inspirada en aplicaciones de alto nivel.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {metrics.map((item) => (
              <article
                key={item.label}
                className="rounded-[28px] border border-app-border/80 bg-app-surface p-5 shadow-card"
              >
                <p className="text-sm text-app-muted">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-app-text">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-app-accent">{item.hint}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-app-border/80 bg-app-surface/80 p-5 backdrop-blur-xl sm:rounded-[30px] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-app-muted">Estado general</p>
                <h2 className="mt-1 text-xl font-semibold tracking-tight text-app-text">
                  Operacion estable
                </h2>
              </div>
              <span className="rounded-full bg-app-success/10 px-3 py-1 text-xs font-medium text-app-success">
                En linea
              </span>
            </div>

            <div className="mt-5 grid gap-3 text-sm text-app-muted">
              <div className="rounded-2xl bg-app-surface-soft px-4 py-4">
                Carga visual ligera, superficies limpias y navegacion clara.
              </div>
              <div className="rounded-2xl bg-app-surface-soft px-4 py-4">
                Disenado para crecer hacia reportes PDF, roles y flujos POS.
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[24px] border border-app-border/70 bg-app-surface p-6 shadow-card sm:p-8 md:rounded-[30px] md:p-10">
          <p className="text-sm font-medium text-app-muted">Acceso seguro</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-app-text">
            Inicia sesion
          </h2>
          <p className="mt-3 text-sm leading-7 text-app-muted">
            Ingresa con tu cuenta para acceder a ventas, inventario, clientes y
            reportes del negocio.
          </p>

          <form className="mt-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-2 block text-sm font-medium text-app-text">
                Usuario
              </label>
              <input
                {...register("username")}
                className="w-full rounded-xl border border-app-border bg-app-surface-soft px-4 py-3 text-sm text-app-text outline-none transition focus:border-app-accent/40 focus:ring-4 focus:ring-app-accent/10"
                placeholder="admin"
              />
              {errors.username ? (
                <p className="mt-2 text-sm text-app-danger">
                  {errors.username.message}
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-app-text">
                Contrasena
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full rounded-xl border border-app-border bg-app-surface-soft px-4 py-3 text-sm text-app-text outline-none transition focus:border-app-accent/40 focus:ring-4 focus:ring-app-accent/10"
                placeholder="Ingresa tu contrasena"
              />
              {errors.password ? (
                <p className="mt-2 text-sm text-app-danger">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div className="flex items-center justify-between text-sm text-app-muted">
              <span>Acceso con JWT y roles</span>
              <span>Entorno local</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-app-contrast px-5 py-3 text-sm font-medium text-app-contrast-text transition hover:opacity-92 disabled:opacity-70"
            >
              Entrar al sistema
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
