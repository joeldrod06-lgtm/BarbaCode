import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function UsersPage() {
  return (
    <ModulePlaceholder
      title="Usuarios"
      description="Gestion de usuarios, roles, permisos y politicas de acceso."
      highlights={["Alta de usuario", "Roles", "Permisos"]}
    />
  );
}
