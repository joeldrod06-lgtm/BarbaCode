import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { ModuleIcon } from "./ModuleIcon";
import { modules } from "./modules";

function getPageTitle(pathname) {
  const current = modules.find((module) => module.path === pathname);
  return current?.label ?? "Dashboard";
}

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageTitle = getPageTitle(location.pathname);

  function handleLogout() {
    navigate("/");
  }

  return (
    <div className="h-screen overflow-hidden bg-app-bg text-app-text">
      <div className="mx-auto flex h-full max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden h-[calc(100vh-2rem)] w-[276px] shrink-0 flex-col rounded-[32px] border border-white/80 bg-white/78 shadow-card backdrop-blur-xl lg:flex">
          <div className="border-b border-app-border/80 px-7 pb-6 pt-6">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111827] text-sm font-semibold text-white shadow-card">
              BB
            </div>
            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-app-text">
              BarbaCode
            </h1>
          </div>

          <nav className="flex-1 space-y-1.5 overflow-y-auto px-5 py-5">
            {modules.map((module) => (
              <NavLink
                key={module.path}
                to={module.path}
                className={({ isActive }) =>
                  [
                    "group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all duration-200 ease-apple",
                    isActive
                      ? "border border-blue-100/80 bg-gradient-to-br from-white to-blue-50/70 text-app-text shadow-card"
                      : "text-app-muted hover:bg-white hover:text-app-text",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={[
                        "flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-200 ease-apple",
                        isActive
                          ? "border-blue-100 bg-blue-50 text-app-accent"
                          : "border-app-border bg-[#fafafb] text-app-muted group-hover:border-blue-100/80 group-hover:bg-blue-50/40 group-hover:text-app-text",
                      ].join(" ")}
                    >
                      <ModuleIcon
                        name={module.icon}
                        className="h-[18px] w-[18px]"
                      />
                    </span>
                    <div>
                      <p className="font-medium">{module.label}</p>
                      <p className="text-xs text-app-muted">Gestion operativa</p>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-app-border/80 px-5 py-5">
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-app-border bg-white px-4 py-3 text-sm font-medium text-app-text transition-all duration-200 ease-apple hover:border-zinc-300 hover:bg-[#fafafb] hover:shadow-card"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-app-muted"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
              >
                <path d="M15 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3M10 17l5-5-5-5M15 12H4" />
              </svg>
              Cerrar sesion
            </button>
          </div>
        </aside>

        <div className="flex h-[calc(100vh-2rem)] min-w-0 flex-1 flex-col gap-5 overflow-hidden">
          <header className="shrink-0 rounded-[30px] border border-white/80 bg-white/72 px-5 py-4 shadow-card backdrop-blur-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-app-muted">Buen dia, equipo</p>
                <h2 className="text-2xl font-semibold tracking-tight text-app-text">
                  {pageTitle}
                </h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="flex min-w-[280px] items-center gap-3 rounded-2xl border border-blue-100/70 bg-gradient-to-r from-[#fafafb] to-blue-50/40 px-4 py-3">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 text-app-muted"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                  </svg>
                  <input
                    className="w-full bg-transparent text-sm text-app-text outline-none placeholder:text-app-muted"
                    placeholder="Buscar ventas, productos o clientes"
                  />
                </label>

                <div className="flex items-center gap-3">
                  <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-white text-app-muted transition-all duration-200 ease-apple hover:border-blue-100 hover:bg-blue-50/40 hover:shadow-card">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0h6z" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-3 rounded-2xl border border-app-border bg-white px-3 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                    <div className="text-right">
                      <p className="text-sm font-medium text-app-text">
                        Admin General
                      </p>
                      <p className="text-xs text-app-muted">Sucursal matriz</p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111827] text-sm font-semibold text-white">
                      AG
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="rounded-[34px] border border-white/80 bg-white/58 p-4 shadow-card backdrop-blur-xl md:p-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
