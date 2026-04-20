import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function CustomersPage() {
  return (
    <ModulePlaceholder
      title="Clientes"
      description="Base de clientes, historial de compra, credito y seguimiento comercial."
      highlights={["Alta de cliente", "Historial", "Credito"]}
    />
  );
}
