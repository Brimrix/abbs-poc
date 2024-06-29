import { useState, useCallback, useEffect } from "react";
import { Table as AntDTable, Typography, InputNumber, Popover, Button, Modal, Form, AutoComplete, Input } from "antd";
import { useBillContext } from "@/context/BillContext";
import Editable from "@/components/invoices/Editable.jsx";
import Order from "@/components/invoices/Order";
import { PlusOutlined } from "@ant-design/icons";
import ImageSelector from "@/components/invoices/ImageSelector";
import { useFetch } from '@/hooks/useFetch';


import { MinusCircleOutlined } from '@ant-design/icons';

import {
  PrinterOutlined,
} from "@ant-design/icons";

const IconLink = ({ icon }) => (
  <div className="text-white text-lg flex justify-center bg-secondary p-[6px] rounded-lg cursor-pointer h-[30px] w-[30px]">
    {icon}
  </div>
);

function Table({ title, invoiceId = null, objectId=null }) {
  const {
    state: { selectedInvoice },
    dispatch,
    handleSaveInvoice,
    handleLoadInvoiceDetail
  } = useBillContext();

  const [deleteRow, setDeleteRow] = useState(null);
  const [saveInvoice, setSaveInvoice] = useState(false)
  const [customers, setCustomers] = useState([])
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [deleteObjectId, setDeleteObjectId] = useState(null);

  const handleExpand = (expanded, record) => {
    const keys = expanded
      ? [...expandedRowKeys, record.id]
      : expandedRowKeys.filter(key => key !== record.id);
    setExpandedRowKeys(keys);
  };

  const [form] = Form.useForm()
  const subTotal = selectedInvoice.items.reduce((acc, item) => acc + item.amount, 0)
  const areaTotal = selectedInvoice.items.reduce((acc, item) => acc + Number(item.area), 0)
  const total = subTotal - selectedInvoice.discount;

  const handleAddRow = (parent_id, order = null) => {
    dispatch({
      type: "addItem",
      payload: {
        model: order? "order" : "invoice",
        objectId: parent_id,
      },
    });
  };

  const handleOrderItem = (parent_id, order = null) => {
    dispatch({
      type: "addInnerOrderItem",
      payload: {
        model: "order",
        objectId: parent_id,
      },
    });
  };



  const handleSaveRow = useCallback(
    (row, cellSource) => {
      debugger;
      dispatch({
        type: "updateRow",
        payload: { row, id: row.id, cellSource, objectId: row.objectId },
      });
    },
    [dispatch]
  );

  const handleUpdateRowCell = (row, payload, actionType) => {
    debugger;
    dispatch({
      type: actionType,
      payload: {
        id: row.id,
        objectId: row.objectId,
        ...payload
      },
    })
  }

  const isOrderRow = (row) => row.model==='order';

  useEffect(() => {
    invoiceId && handleLoadInvoiceDetail(invoiceId)
  }, [])

  useEffect(() => {
    saveInvoice && (async function () {
      const { data } = await useFetch('api/companies/')
      setCustomers(data.map(customer => ({ value: customer.name, data: { rate: customer.defaultRate, id: customer.id } })))
    }())
  }, [saveInvoice])


  const columns = [
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "2%",
      align: "left",
      render(_, row) {
        return <Popover
          placement="top"
          content="Remove Row"
        >
          <MinusCircleOutlined
            className="text-red-500"
            onClick={() =>  setDeleteRow(row.id)}
             />
        </Popover>
      }
    },
    {
      title: "Sr#",
      width: "3%",
      align: "center",
      render: (_, record, index) => {
        return index + 1;
      }
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      width: "25%",
      align: "start",
      editable: true,
    },
    {
      title: "Image",
      dataIndex: "upload",
      key: "upload",
      align: "center",
      width: "10%",
      render(_, row) {
        return isOrderRow(row) ? "" : <ImageSelector
          id={row.id}
          renderSource={row.image_src}
          objectId={1}
          record={row}
        />
      }
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      align: "center",
      editable: true,
      render: (text, row) => isOrderRow(row) ? '' : text
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
      align: "center",
      editable: true,
      render: (text, row) => isOrderRow(row) ? '' : text
    },
    {
      title: "Area (Sq.ft)",
      dataIndex: "area",
      key: "area",
      align: "center",
      render: (text, row) => isOrderRow(row) ? 'Order Area' : Number(text).toFixed(2)
    },
    {
      title: "Price",
      dataIndex: "unit_price",
      key: "unit_price",
      align: "center",
      render(text, row) {
        return isOrderRow(row) ? "" : <InputNumber
          value={row.price}
          onInput={(value) => handleUpdateRowCell(row, { unit_price: value }, 'setPrice')}
          min={1}
          variant="filled" precision={2} />
      }
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render(text, row) {
        return isOrderRow(row) ? "" : <InputNumber
          value={text}
          onInput={(value) => handleUpdateRowCell(row, { quantity: value }, 'setQuantity')}
          min={1}
          max={1000}
          variant="filled" precision={0} />
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (value, row) => isOrderRow(row) ? 'Order Total' : Number(value?.toFixed(2))
    },
  ];

  const components = {
    body: {
      cell: Editable,
    },
  };

  const columnsConfig = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSaveRow,
      }),
    };
  });

  return (
    <>
      <Modal
        open={Boolean(deleteRow)}
        okText="Delete"
        okButtonProps={{ className: 'btn-app-accent' }}
        cancelButtonProps={{ className: 'text-primary' }}
        title="Confirmation"
        onOk={() => {
          dispatch({
            type: 'deleteRow',
            payload: {
              key: deleteRow,
              objectId: deleteObjectId
            },
          })
          setDeleteRow(null);
          setDeleteObjectId(null);
        }}
        onCancel={() => setDeleteRow(null)}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <span>Are you sure you want to delete ? </span>
      </Modal>
      <Modal
        open={saveInvoice}
        okText="Save"
        cancelButtonProps={{ className: 'text-primary' }}
        okButtonProps={{ className: 'bg-primary' }}
        title="Save Invoice"
        onCancel={() => setSaveInvoice(false)}
        onOk={() => {
          form
            .validateFields()
            .then(values => {
              handleSaveInvoice()
              setSaveInvoice(false)
            })
        }}
      >
        <Form
          form={form}
          layout='vertical mt-5'
        >
          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true, message: 'Please select a customer!' }]}
            initialValue={selectedInvoice.company.name}
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
              })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
      <div className="flex flex-col py-2 bg-stone-100 shadow-lg border rounded space-y-2 max-h-full">
        <div className="flex justify-between gap-2 mt-2 px-3">
          <p className="text-2xl font-bold text-primary">{title}</p>
          <div className="flex items-center gap-1">
            <IconLink icon={<PrinterOutlined />} />
            <Button
              type="text"
              className="bg-primary border-0 text-white hover:bg-secondary"
              onClick={() => setSaveInvoice(true)}
              styles={{
                defaultHoverBg: "#ff4d4f"
              }}>Save</Button>

          </div>
        </div>
        <AntDTable
          sticky={true}
          pagination={false}
          components={components}
          className="invoice-table max-h-[75vh] overflow-auto border-y-2"
          dataSource={[...selectedInvoice.orders, ...selectedInvoice.items]}
          columns={columnsConfig}
          rowKey={record => record.id}
          size="small"
          expandable={{
            columnWidth: "2%",
            expandedRowRender: (row) => <Order
              objectId={row.id}
              rows={(selectedInvoice.orders.filter(item => item.id === row.id))[0].items}
              onRowAdd={(nestedobjectId) => handleOrderItem(nestedobjectId)}
              onRowSave={(nestedobjectId) => handleSaveRow(nestedobjectId)}
              onRowEdit={(row, payload, actionType) => handleUpdateRowCell(row, payload, actionType)}
              onRowDelete={(id, objectId) => {
                setDeleteRow(id);
                setDeleteObjectId(objectId);
              }}
            />,
            rowExpandable: (row) => isOrderRow(row),
            expandedRowClassName: () => 'bg-sky-50',
            expandedRowKeys: expandedRowKeys,
            onExpand: handleExpand



          }}
        />
        <div className="flex gap-2 px-10 items-center justify-between">
          <div className="space-x-2">
            <Typography.Text
              onClick={() => handleAddRow(objectId)}
              className="text-primary p-2 hover:bg-primary hover:text-white border border-primary rounded-md"
              strong
            >
              <PlusOutlined />
              Add item
            </Typography.Text>

            <Typography.Text
              onClick={() => handleAddRow(objectId, 'order')}
              className="text-primary  p-2  hover:bg-primary hover:text-white border border-primary rounded-md"
              strong
            >
              <PlusOutlined />
              Add Order
            </Typography.Text>
          </div>

          <div className="flex space-x-6 items-center">
            <span className="flex justify-between items-center w-35">
              SubTotal: <Typography.Text className="ml-2 font-bold text-primary p-1 border rounded-md shadow px-2">{subTotal.toFixed(2)}</Typography.Text>
            </span>
            <div className="border-2 border-primary h-4 rounded-md"></div>
            <span className="flex justify-between items-center w-35">
              Total Area: <Typography.Text className="ml-2 font-bold text-primary p-1 border rounded-md shadow px-2">{areaTotal.toFixed(2)}</Typography.Text>
            </span>
            <div className="border-2 border-primary h-4 rounded-md"></div>
            <span className="flex justify-between items-center w-35">
              Discount: <InputNumber
                min={0}
                max={subTotal}
                value={selectedInvoice.discount}
                onChange={(value) => dispatch({
                  type: 'setDiscount',
                  payload: { discount: value }
                })}
                className="ml-2"
              />
            </span>
            <div className="border-2 border-primary h-4 rounded-md"></div>
            <span className="flex justify-between items-center w-35">
              Grand Total: <Typography.Text className="ml-2 font-bold text-primary p-1 border rounded-md shadow px-2">{total.toFixed(2)}</Typography.Text>
            </span>
          </div>

        </div>
      </div>
    </>
  );
}

export default Table;
