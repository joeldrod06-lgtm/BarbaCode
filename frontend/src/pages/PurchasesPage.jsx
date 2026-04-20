import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function PurchasesPage() {
  return (
    <ModulePlaceholder
      title="Compras"
      description="Registro de ordenes de compra, proveedores, recepcion de insumos y costos."
      highlights={["Nueva compra", "Proveedores", "Recepcion"]}
    />
  );
}
