import { useBillContext } from "@/context/BillContext";
import { useParams } from "react-router-dom";
import Table from "@/components/invoices/Table";

const InvoiceUpdate = () => {
    const { id } = useParams()
    return ( <Table objectId={id} invoiceId={id} title={`Edit invoice: ${id}`} /> )
}
export default InvoiceUpdate
