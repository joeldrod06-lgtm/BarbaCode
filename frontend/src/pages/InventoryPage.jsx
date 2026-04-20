import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function InventoryPage() {
  return (
    <ModulePlaceholder
      title="Inventario"
      description="Control de existencias, mermas, stock minimo y movimientos por insumo."
      highlights={["Entradas y salidas", "Stock minimo", "Movimientos"]}
    />
  );
}
