import { createBrowserRouter } from "react-router-dom";
import Customers from '@/pages/Customers'
import Dashboard from "@/pages/Dashboard"
import Invoices from '@/pages/Invoices'
import Login from '@/pages/Login'



const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    }, {
        path: "customers",
        element: <Customers />
    }, {
        path: 'invoices',
        element: <Invoices />
    }, {
        path: 'login',
        element: <Login />
    }
])

export default router
