import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function ExpensesPage() {
  return (
    <ModulePlaceholder
      title="Gastos"
      description="Control de gastos operativos, clasificacion, comprobantes y autorizaciones."
      highlights={["Registrar gasto", "Categorias", "Comprobantes"]}
    />
  );
}
