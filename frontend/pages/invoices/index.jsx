import { PlusOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Table } from "antd";
import { Link } from "react-router-dom";
import { useBillContext } from "@/context/BillContext";
import { useEffect, useState } from "react";

const Index = () => {
    const { Column } = Table
    const {dispatch} = useBillContext();
    const [invoices, setInvoices] = useState([])

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_SERVER}api/invoices/`);
                if (!response.ok) {
                    throw new Error('Response was not ok');
                }
                const data = await response.json();
                setInvoices(data);
            } catch (error) {
                console.error('Failed to fetch invoices:', error);
            }
        };

        fetchInvoices();
    }, []);
    useEffect(() => {
        dispatch({
            type: "SET_INVOICES",
            payload: {
                data: invoices
            }
        })
    }, [invoices])

    return <>
        <div className='mb-2'>
            <span className="text-3xl">Invoices</span>
            <Link
                to='create'
                className="text-primary font-bold hover:bg-primary hover:text-white border-2 border-primary float-right p-2 rounded-md"
            >New Invoice <PlusOutlined /></Link>
        </div>
        <Table
            dataSource={invoices}
            size="small"
            scroll={{ y: 900 }}
            pagination={{ pageSize: 15 }}
        >
            <Column width="5%" title="Sr#" dataIndex='id' key='id'
                render={srNo => <Link to={`${srNo}`} className="text-primary font-bold">{srNo}</Link>} />
            <Column title="Customer" dataIndex='company_name' key='company_name'
            />
            <Column
                title='Paid'
                dataIndex='paid'
                key='paid'
                render={paid => paid
                    ? <CheckCircleFilled className="text-green-600 text-xl" />
                    : <CloseCircleFilled className="text-red-600 text-xl" />}
                filters={[{ text: 'Paid', value: true }, { text: 'Pending', value: false }]}
                filterOnClose={false}
                onFilter={(value, record) => record.paid === value}
            />
            <Column title="Created At" dataIndex='created_at' key='created_at' />
        </Table>
    </ >
}

export default Index
