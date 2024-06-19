import { BillProvider } from "@/context/BillContext.jsx";
import { Outlet } from 'react-router-dom';

const Context = () => {
    return (
        <BillProvider>
            <Outlet />
        </BillProvider>
    )
}
export default Context
