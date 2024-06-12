import { createBrowserRouter } from "react-router-dom";
import Customers from "@/pages/Customers";
import Dashboard from "@/pages/Dashboard";
import Invoices from "@/pages/Invoices";
import Login from "@/pages/Login";
import LayoutMain from "@/components/layouts/Base";
import NotFound from "@/pages/NotFound";
import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import SignUp from "@/pages/Signup";


function ProtectedRoute({ element }) {
  const [cookie] = useCookies()
  return !cookie.accessToken ? <Navigate to="login" /> : element;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<LayoutMain />} />,
    children: [
      {
        index: true,
        path: "",
        element: <Dashboard />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
