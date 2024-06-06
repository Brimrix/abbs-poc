import { createBrowserRouter } from "react-router-dom";
import Customers from "@/pages/Customers";
import Dashboard from "@/pages/Dashboard";
import Invoices from "@/pages/Invoices";
import Login from "@/pages/Login";
import LayoutMain from "@/components/layouts/Base";
import NotFound from "@/pages/NotFound";
import { useAuth } from "@hooks/AuthHook";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element }) {
  const [isLogin] = useAuth();

  return isLogin ? element : <Navigate to="/login" />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<LayoutMain />} />,
    children: [
      {
        index: true,
        path: "",
        element: <ProtectedRoute element={<Dashboard />} />,
      },
      {
        path: "customers",
        element: <ProtectedRoute element={<Customers />} />,
      },
      {
        path: "invoices",
        element: <ProtectedRoute element={<Invoices />} />,
      }

    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
