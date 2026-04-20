import { Navigate, Outlet } from "react-router-dom";

export function AuthGuard() {
  const hasSession = true;

  if (!hasSession) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
