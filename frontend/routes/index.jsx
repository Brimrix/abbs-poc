import { createBrowserRouter } from "react-router-dom";
import Home from '@/pages/Home'
import Customers from '@/pages/Customers'
import CreateBill from '@/components/layouts/CreateBill';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    }, {
        path: "customers",
        element: <Customers />
    }, {
        path:'invoices',
        element: <CreateBill />
    }
])

export default router
