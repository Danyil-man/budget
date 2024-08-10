import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/Layout";
import { ErrorPage } from "../pages/ErrorPage";
import { TransactionsPage } from "../pages/Transactions";
import { CategoriesPage } from "../pages/Categories";
import { AuthPage } from "../pages/Auth";
import { ProtectedRoute } from "../components/ProtectedRoute";
import {
  categoriesAction,
  getUserCategories,
} from "../helpers/categoriesAction";
import {
  getUserCategoriesAndTransactions,
  transactionsAction,
} from "../helpers/transactionsActions";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "transactions",
        index: true,
        action: transactionsAction,
        loader: getUserCategoriesAndTransactions,
        element: (
          <ProtectedRoute>
            <TransactionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        action: categoriesAction,
        loader: getUserCategories,
        element: (
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
]);
