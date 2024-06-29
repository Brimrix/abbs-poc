import { PlusOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Table, Modal, Button, AutoComplete, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useBillContext } from "@/context/BillContext";
import { useEffect, useState } from "react";
import { useFetch } from '@/hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const Index = () => {
    const { Column } = Table
    const { state: { invoices, selectedInvoice }, dispatch, handleLoadInvoices } = useBillContext();
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        handleLoadInvoices();
        dispatch({
            type: "resetSelectedInvoice",
        })
    }, []);

    useEffect(() => {
        open && (async function () {
            const { data } = await useFetch('api/companies/')
            setCustomers(data.map(customer => ({ value: customer.name, data: { rate: customer.defaultRate, id: customer.id } })))
        }())
    }, [open])

    return <>
        <div className='mb-2'>
            <span className="text-3xl">Invoices</span>
            <Button
                className="text-primary font-bold hover:bg-primary hover:text-white border-2 border-primary float-right px-2 rounded-md"
                icon={<PlusOutlined />}
                onClick={() => setOpen(true)}
            >New Invoice</Button>
        </div>
        <Table
            dataSource={invoices}
            size="small"
            className='shadow border rounded'
            scroll={{ y: 900 }}
            pagination={{ pageSize: 15 }}
        >
            <Column
                width="3%"
                title="Sr#"
                align='center'
                dataIndex='id'
                key='id'
                render={srNo => <Link to={`${srNo}`}
                    className="text-primary font-bold">{srNo}
                </Link>}
            />
            <Column title="Customer" dataIndex='company' key='company'
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
        {open && <Modal
            width={400}
            open={open}
            okText="Proceed"
            onOk={() => navigate('create')}
            onCancel={() => setOpen(false)}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
            )}
        >
            <p className='text-2xl font-bold'>New Invoice</p>
            <Form layout='vertical mt-5'>
                <Form.Item
                    label="Customer"
                    required
                >
                    <AutoComplete
                        autoFocus={true}
                        options={customers}
                        value={selectedInvoice.company.name}
                        placeholder="Select a customer, staring typing for suggestions"
                        onChange={(value) => dispatch({
                            type: "setCustomerDetails",
                            payload: {
                                name: value,
                                defaultRate: 0
                            }
                        })}
                        onSelect={(value, option) => dispatch({
                            type: "setCustomerDetails",
                            payload: {
                                id: option.data.id,
                                name: value,
                                defaultRate: option.data.rate
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item
                    label="Default Price"
                    required
                >
                    <Input type='number' value={selectedInvoice.company.defaultRate} onInput={(event) => dispatch({
                        type: 'setCustomerRate',
                        payload: {
                            defaultRate: event.currentTarget.value
                        }
                    })} />
                </Form.Item>
            </Form>
        </Modal>}
    </ >
}

export default Index
