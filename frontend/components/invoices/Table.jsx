import { useEffect, useState, useCallback } from "react";
import { Table as AntDTable, Typography, InputNumber, Modal, Popover } from "antd";
import { useBillContext } from "@/context/BillContext";
import Editable from "@/components/invoices/Editable.jsx";
import Order from "@/components/invoices/Order";
import { PlusOutlined } from "@ant-design/icons";
import ImageSelector from "@/components/invoices/ImageSelector";
import { MinusCircleOutlined } from '@ant-design/icons';


import React from "react";

function Table({ tableId }) {
  const {
    state: { billData },
    dispatch,
  } = useBillContext();

  const [rowsTable, setRowsTable] = useState([]);
  const [actualRows, setActualRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [deleteRow, setDeleteRow] = useState(null);


  useEffect(() => {
    setTableLoading(false);
  }, [actualRows]);

  useEffect(() => {
    let tableData = rowsTable.filter((item) => item.tableId === tableId);
    for (let i = 0; i < tableData.length; i++) {
      tableData[i].order = i + 1;
    }
    setActualRows(tableData);
  }, [rowsTable]);

  useEffect(() => {
    if (billData.length > 1) setTableLoading(true);

    setRowsTable(billData);
  }, [billData]);

  const handleAddRows = () => {
    dispatch({
      type: "ADD_ROW",
      payload: {
        tableId,
      },
    });
  };

  const handleSave = useCallback(
    (row, cellSource) => {
      dispatch({
        type: "UPDATE_ROW",
        payload: { row, key: row.key, cellSource, tableId },
      });
    },
    [dispatch]
  );

  const handleDeleteRow = () => {
    dispatch({
      type: 'REMOVE_ROW',
      payload: {
        key: deleteRow,
      },
    });
    setDeleteRow()
  }

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
      dataIndex: "order",
      key: "order",
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
        return row.type === 'item' ? <ImageSelector
          id={row.key}
          reRender={true}
          renderSource={row.image_src}
          tableId={Number(1)}
        /> : ''
      }
    },
    {
      title: "Height",
      dataIndex: "height",
      key: "height",
      align: "center",
      editable: true,
    },
    {
      title: "Width",
      dataIndex: "width",
      key: "width",
      align: "center",
      editable: true,
    },
    {
      title: "Area (Sq.ft)",
      dataIndex: "area",
      key: "area",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render(text, row) {
        return row.type === 'item' ? <InputNumber
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
          max={1000}
          variant="filled" precision={2} /> : ''
      }
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render(text, row) {
        return row.type === 'item' ? <InputNumber
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
          variant="filled" precision={0} /> : ''
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (value) => Number(value.toFixed(2))
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
        handleSave,
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
      <AntDTable
        components={components}
        className="invoice-table max-h-[50vh] overflow-auto border rounded-md shadow-md"
        pagination={false}
        loading={tableLoading}
        dataSource={actualRows}
        columns={columnsConfig}
        size="small"
        rowClassName={() => "editable-row"}
        onRow={() => ({
          style: { height: "40px" },
        })}
        expandable={{
          expandedRowRender: (row) => <Order tableId={row.orderId} />,
          rowExpandable: (row) => {
            if (row.type === "order") return true;
          },
        }}
      />
      <div className="flex gap-2 mt-2">
        <Typography.Text
          onClick={handleAddRows}
          className="text-primary px-2 hover:bg-primary hover:text-white border border-primary rounded-md"
          strong
        >
          <PlusOutlined />
          Add item
        </Typography.Text>

        <Typography.Text
          onClick={() =>
            dispatch({
              type: "ORDER_ADD",
              payload: {
                tableId,
              },
            })
          }
          className="text-primary  px-2  hover:bg-primary hover:text-white border border-primary rounded-md"
          strong
        >
          <PlusOutlined />
          Add Order
        </Typography.Text>
      </div>
    </>
  );
}

export default Table;
