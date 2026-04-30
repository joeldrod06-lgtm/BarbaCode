import { useState } from "react";
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const pageTitle = getPageTitle(location.pathname);

  function handleLogout() {
    setIsMobileNavOpen(false);
    navigate("/");
  }

  function handleMobileNavToggle() {
    setIsMobileNavOpen((current) => !current);
  }

  function handleMobileNavClose() {
    setIsMobileNavOpen(false);
  }

  return (
    <div className="min-h-screen bg-app-bg text-app-text">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-4 px-3 py-3 sm:px-4 sm:py-4 lg:h-screen lg:min-h-0 lg:gap-6 lg:px-6">
        <div
          className={[
            "fixed inset-0 z-40 bg-[#111827]/28 backdrop-blur-sm transition duration-200 lg:hidden",
            isMobileNavOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          ].join(" ")}
          onClick={handleMobileNavClose}
          aria-hidden="true"
        />

        <aside
          className={[
            "fixed inset-y-3 left-3 z-50 flex w-[min(82vw,320px)] flex-col rounded-[28px] border border-white/80 bg-white/92 shadow-float backdrop-blur-xl transition duration-300 ease-apple lg:static lg:inset-auto lg:z-auto lg:h-[calc(100vh-2rem)] lg:w-[276px] lg:shrink-0 lg:translate-x-0 lg:rounded-[32px] lg:bg-white/78 lg:shadow-card",
            isMobileNavOpen ? "translate-x-0" : "-translate-x-[120%]",
          ].join(" ")}
        >
          <div className="border-b border-app-border/80 px-7 pb-6 pt-6">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111827] text-sm font-semibold text-white shadow-card">
                BB
              </div>
              <button
                type="button"
                onClick={handleMobileNavClose}
                className="flex h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-white text-app-muted transition duration-200 ease-apple hover:border-zinc-300 hover:text-app-text lg:hidden"
                aria-label="Cerrar menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <h1 className="mt-5 text-[28px] font-semibold tracking-tight text-app-text">
              BarbaCode
            </h1>
            <p className="mt-1 text-sm text-app-muted lg:hidden">
              Navegacion principal del sistema
            </p>
          </div>

          <nav className="flex-1 space-y-1.5 overflow-y-auto px-5 py-5">
            {modules.map((module) => (
              <NavLink
                key={module.path}
                to={module.path}
                onClick={handleMobileNavClose}
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
              className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-app-border bg-white px-4 py-3 text-sm font-medium text-app-text transition-all duration-200 ease-apple hover:border-red-200 hover:bg-red-50/70 hover:text-app-danger hover:shadow-card"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 text-app-muted transition-colors duration-200 group-hover:text-app-danger"
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

        <div className="flex min-w-0 flex-1 flex-col gap-4 lg:h-[calc(100vh-2rem)] lg:gap-5 lg:overflow-hidden">
          <header className="shrink-0 rounded-[26px] border border-white/80 bg-white/72 px-4 py-4 shadow-card backdrop-blur-xl sm:px-5 lg:rounded-[30px]">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-3 flex items-center justify-between gap-3 lg:mb-0">
                  <button
                    type="button"
                    onClick={handleMobileNavToggle}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-app-border bg-white text-app-text transition duration-200 ease-apple hover:border-zinc-300 hover:bg-[#fafafb] lg:hidden"
                    aria-label="Abrir menu"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                    >
                      <path d="M4 7h16M4 12h16M4 17h16" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="group inline-flex items-center gap-2 rounded-2xl border border-app-border bg-white px-4 py-2.5 text-sm font-medium text-app-text transition duration-200 ease-apple hover:border-red-200 hover:bg-red-50/70 hover:text-app-danger lg:hidden"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-app-muted transition-colors duration-200 group-hover:text-app-danger"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.9"
                    >
                      <path d="M15 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3M10 17l5-5-5-5M15 12H4" />
                    </svg>
                    Salir
                  </button>
                </div>
                <p className="text-sm text-app-muted">Buen dia, equipo</p>
                <h2 className="text-xl font-semibold tracking-tight text-app-text sm:text-2xl">
                  {pageTitle}
                </h2>
              </div>

              <div className="flex flex-col gap-3 xl:min-w-[520px] xl:max-w-[720px] xl:flex-1 xl:flex-row xl:items-center xl:justify-end">
                <label className="flex w-full items-center gap-3 rounded-2xl border border-blue-100/70 bg-gradient-to-r from-[#fafafb] to-blue-50/40 px-4 py-3 xl:max-w-[420px]">
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

                <div className="flex items-center justify-between gap-3 sm:justify-end">
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

                  <div className="flex min-w-0 items-center gap-3 rounded-2xl border border-app-border bg-white px-3 py-2.5 shadow-[0_1px_0_rgba(255,255,255,0.8)]">
                    <div className="min-w-0 text-right">
                      <p className="text-sm font-medium text-app-text">
                        Admin General
                      </p>
                      <p className="truncate text-xs text-app-muted">
                        Sucursal matriz
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#111827] text-sm font-semibold text-white">
                      AG
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:hidden">
              {modules.map((module) => {
                const isActive = location.pathname === module.path;

                return (
                  <NavLink
                    key={module.path}
                    to={module.path}
                    className={[
                      "flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium transition duration-200 ease-apple",
                      isActive
                        ? "border-blue-100 bg-blue-50 text-app-accent shadow-card"
                        : "border-white/70 bg-white/85 text-app-muted",
                    ].join(" ")}
                  >
                    <ModuleIcon name={module.icon} className="h-4 w-4" />
                    {module.label}
                  </NavLink>
                );
              })}
            </div>
          </header>

          <main className="min-h-0 flex-1 lg:overflow-y-auto lg:pr-1">
            <div className="rounded-[28px] border border-white/80 bg-white/58 p-4 shadow-card backdrop-blur-xl sm:p-5 md:p-6 lg:rounded-[34px]">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
