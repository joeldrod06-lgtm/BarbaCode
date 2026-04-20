import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function ReportsPage() {
  return (
    <ModulePlaceholder
      title="Reportes"
      description="Reportes operativos y financieros con exportacion futura a PDF y Excel."
      highlights={["Ventas", "Inventario", "Finanzas"]}
    />
  );
}
