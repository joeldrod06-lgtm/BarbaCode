import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { AuthGuard } from "../shared/AuthGuard";
import { AppLayout } from "../shared/AppLayout";
import { CashPage } from "../pages/CashPage";
import { CustomersPage } from "../pages/CustomersPage";
import { DashboardPage } from "../pages/DashboardPage";
import { ExpensesPage } from "../pages/ExpensesPage";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { ProductsPage } from "../pages/ProductsPage";
import { PurchasesPage } from "../pages/PurchasesPage";
import { ReportsPage } from "../pages/ReportsPage";
import { SalesPage } from "../pages/SalesPage";
import { UsersPage } from "../pages/UsersPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LoginPage /> },
      {
        element: <AuthGuard />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { path: "dashboard", element: <DashboardPage /> },
              { path: "ventas", element: <SalesPage /> },
              { path: "productos", element: <ProductsPage /> },
              { path: "inventario", element: <InventoryPage /> },
              { path: "compras", element: <PurchasesPage /> },
              { path: "gastos", element: <ExpensesPage /> },
              { path: "caja", element: <CashPage /> },
              { path: "clientes", element: <CustomersPage /> },
              { path: "reportes", element: <ReportsPage /> },
              { path: "usuarios", element: <UsersPage /> }
            ]
          }
        ]
      },
      { path: "*", element: <NotFoundPage /> }
    ]
  }
]);
