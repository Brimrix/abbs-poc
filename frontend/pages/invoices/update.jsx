import { useParams } from "react-router-dom";
import Table from "@/components/invoices/Table";

const InvoiceUpdate = () => {
    const { id } = useParams()
    return <Table
        invoiceId={id}
        title={`Edit invoice`}
    />
}
export default InvoiceUpdate
