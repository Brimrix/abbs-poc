import { createBrowserRouter } from "react-router-dom";
import Customers from '@/pages/Customers'
import Dashboard from "@/pages/Dashboard"
import Invoices from '@/pages/Invoices'


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
    }
])

export default router
