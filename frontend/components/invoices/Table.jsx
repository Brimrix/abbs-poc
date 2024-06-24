import { useEffect, useState, useCallback } from "react";
import { Table as AntDTable, Typography, InputNumber, Modal, Popover } from "antd";
import { useBillContext } from "@/context/BillContext";
import Editable from "@/components/invoices/Editable.jsx";
import Order from "@/components/invoices/Order";
import { PlusOutlined } from "@ant-design/icons";
import ImageSelector from "@/components/invoices/ImageSelector";
import { MinusCircleOutlined } from '@ant-design/icons';

import {
  MessageOutlined,
  CloudDownloadOutlined,
  MailOutlined,
  PrinterOutlined,
} from "@ant-design/icons";


const IconLink = ({ icon }) => (
  <div className="text-white text-lg flex justify-center !bg-secondary p-[6px] rounded-lg cursor-pointer h-[30px] w-[30px]">
    {icon}
  </div>
);

function Table({ tableId = 'root' }) {
  const {
    state: { selectedInvoice },
    dispatch,
  } = useBillContext();

  const [tableLoading, setTableLoading] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);

  const subTotal = selectedInvoice.items.reduce((acc, item) => acc + item.amount, 0)
  const areaTotal = selectedInvoice.items.reduce((acc, item) => acc + Number(item.area), 0)
  const total = subTotal - selectedInvoice.discount

  const handleAddRow = (order = null) => {
    dispatch({
      type: "addItem",
      payload: {
        order,
        tableId,
      },
    });
  };

  const handleSaveRow = useCallback(
    (row, cellSource) => {
      dispatch({
        type: "updateRow",
        payload: { row, key: row.key, cellSource, tableId },
      });
    },
    [dispatch]
  );

  const handleDeleteRow = () => {
    dispatch({
      type: 'deleteRow',
      payload: {
        key: deleteRow,
      },
    });
    setDeleteRow()
  }

  const isOrderRow = (row) => row.order

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
            onClick={() => setDeleteRow(row.key)} />
        </Popover>
      }
    },
    {
      title: "Sr#",
      dataIndex: "key",
      key: "key",
      width: "3%",
      align: "center",
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
          id={row.key}
          renderSource={row.image_src}
          tableId={tableId}
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
      render: (text, row) => isOrderRow(row) ? 'Order Area' : text
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render(text, row) {
        return isOrderRow(row) ? "" : <InputNumber
          value={text}
          onInput={(value) => dispatch({
            type: 'setPrice',
            payload: {
              key: row.key,
              tableId: row.tableId,
              price: value,
            },
          })}
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
          onInput={(value) => dispatch({
            type: 'setQuantity',
            payload: {
              key: row.key,
              tableId: row.tableId,
              quantity: value,
            },
          })}
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
      render: (value, row) => isOrderRow(row) ? 'Order Total' : Number(value.toFixed(2))
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
        onOk={handleDeleteRow}
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
      <div className="flex flex-col py-2 bg-stone-100 shadow-lg border rounded space-y-2 max-h-full">
        <div className="flex justify-between gap-2 mt-2 px-2">
          <p className="text-2xl font-bold">New Invoice</p>

          <div className="flex items-center gap-1">
            <IconLink icon={<MessageOutlined />} />
            <IconLink icon={<CloudDownloadOutlined />} />
            <IconLink icon={<MailOutlined />} />
            <IconLink icon={<PrinterOutlined />} />
          </div>
        </div>
        <AntDTable
          sticky={true}
          components={components}
          className="invoice-table max-h-[75vh] overflow-auto border-y-2"
          dataSource={selectedInvoice.items.filter(item => item.tableId === 'root')}
          columns={columnsConfig}
          size="small"
          expandable={{
            columnWidth: "2%",
            expandedRowRender: (row) => <Order tableId={row.key} />,
            rowExpandable: (row) => isOrderRow(row),
            expandedRowClassName: () => 'bg-sky-50'
          }}
        />
        <div className="flex gap-2 px-10 items-center justify-between">
          <div className="space-x-2">
            <Typography.Text
              onClick={() => handleAddRow()}
              className="text-primary p-2 hover:bg-primary hover:text-white border border-primary rounded-md"
              strong
            >
              <PlusOutlined />
              Add item
            </Typography.Text>

            <Typography.Text
              onClick={() => handleAddRow('order')}
              className="text-primary  p-2  hover:bg-primary hover:text-white border border-primary rounded-md"
              strong
            >
              <PlusOutlined />
              Add Order
            </Typography.Text>
          </div>

          <div className="flex space-x-4 items-center">
            <span>SubTotal: <Typography.Text className='float-right ' >{subTotal}</Typography.Text></span> <div className="border border-2 border-primary h-4 rounded-md"></div>
            <span>Total Area: <Typography.Text className='float-right'>{areaTotal.toFixed(2)}</Typography.Text></span> <div className="border border-2 border-primary h-4 rounded-md"></div>
            <span className="align-bottom">Discount: <InputNumber
              min={0}
              max={subTotal}
              value={selectedInvoice.discount} onChange={(value) => dispatch({
                type: 'setDiscount',
                payload: {
                  discount: value
                }
              }
              )} />
            </span> <div className="border border-2 border-primary h-4 rounded-md"></div>
            <span>Grand Total: <Typography.Text className='float-right' >{total}</Typography.Text></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
