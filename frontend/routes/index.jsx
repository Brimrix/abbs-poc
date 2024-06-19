import { createBrowserRouter } from "react-router-dom";
import Customers from "@/pages/Customers";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import LayoutMain from "@/components/layouts/Base";
import Context from "@/components/invoices/Context";

import Index from "@/pages/invoices/index";
import InvoiceCreate from "@/pages/invoices/create";
import InvoiceUpdate from "@/pages/invoices/update";

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
        element: <Context />,
        children: [
          {
            path: '',
            element: <Index />,
          },
          {
            path: "create",
            element: <InvoiceCreate />
          },
          {
            path: ":id",
            element: <InvoiceUpdate />
          }
        ]
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
