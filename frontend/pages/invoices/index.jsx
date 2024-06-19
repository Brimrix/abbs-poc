import { Button } from "antd"
import { PlusOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Table } from "antd";
import { Link } from "react-router-dom";


const Index = () => {
    const { Column } = Table
    const invocies = [
        { key: 1, srNo: '1', customer: "Khalid Jamil", paid: true, createdAt: "now" },
        { key: 2, srNo: '2', customer: "Sajid Jamil", paid: false, createdAt: "2 hours ago" },
        { key: 3, srNo: '3', customer: "Farooq Jamil", paid: true, createdAt: "Yesterday" },
        { key: 4, srNo: '4', customer: "Akbar Jamil", paid: true, createdAt: "Last Week" },
        { key: 1, srNo: '1', customer: "Khalid Jamil", paid: true, createdAt: "now" },
        { key: 2, srNo: '2', customer: "Sajid Jamil", paid: false, createdAt: "2 hours ago" },
        { key: 3, srNo: '3', customer: "Farooq Jamil", paid: true, createdAt: "Yesterday" },
        { key: 4, srNo: '4', customer: "Akbar Jamil", paid: true, createdAt: "Last Week" },
        { key: 1, srNo: '1', customer: "Khalid Jamil", paid: true, createdAt: "now" },
        { key: 2, srNo: '2', customer: "Sajid Jamil", paid: false, createdAt: "2 hours ago" },
        { key: 3, srNo: '3', customer: "Farooq Jamil", paid: true, createdAt: "Yesterday" },
        { key: 4, srNo: '4', customer: "Akbar Jamil", paid: true, createdAt: "Last Week" },
        { key: 1, srNo: '1', customer: "Khalid Jamil", paid: true, createdAt: "now" },
        { key: 2, srNo: '2', customer: "Sajid Jamil", paid: false, createdAt: "2 hours ago" },
        { key: 3, srNo: '3', customer: "Farooq Jamil", paid: true, createdAt: "Yesterday" },
        { key: 4, srNo: '4', customer: "Akbar Jamil", paid: true, createdAt: "Last Week" },
    ]
    return <>
        <div><span className="text-3xl">Invoices</span>
            <Link
                to='create'
                className="text-primary font-bold hover:bg-primary border-2 border-primary float-right p-2 rounded-md"
            >New Invoice <PlusOutlined /></Link></div>
        <Table dataSource={invocies} size="small" scroll={{ y: 600 }}>
            <Column width="5%" title="Sr#" dataIndex='srNo' key='srNo'
                render={srNo => <Link to={`${srNo}/edit`} className="text-primary font-bold">{srNo}</Link>} />
            <Column title="Customer" dataIndex='customer' key='customer' />
            <Column
                title='Paid'
                dataIndex='paid'
                key='paid'
                render={paid => paid
                    ? <CheckCircleFilled className="text-green-600 text-xl" />
                    : <CloseCircleFilled className="text-red-600 text-xl" />}
                filters={[{ text: 'Paid', value: true }, { text: 'Pending', value: false }]}
                onFilter={(value, record) => record.paid === value}
            />
            <Column title="Created At" dataIndex='createdAt' key='createdAt' />
        </Table>
    </ >
}

export default Index
