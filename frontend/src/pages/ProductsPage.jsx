import { ModulePlaceholder } from "../shared/ModulePlaceholder";

export function ProductsPage() {
  return (
    <ModulePlaceholder
      title="Productos"
      description="Catalogo de productos, precios, categorias, recetas y estatus de disponibilidad."
      highlights={["Alta de producto", "Lista de precios", "Categorias"]}
    />
  );
}
