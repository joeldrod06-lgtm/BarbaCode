import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function CashPage() {
  return (
    <ModulePlaceholder
      title="Caja"
      description="Apertura y cierre de caja, movimientos, cortes y conciliacion."
      highlights={["Apertura", "Movimientos", "Cierre"]}
    />
  );
}
