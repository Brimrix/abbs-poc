import { useEffect, useState, useCallback } from "react";
import { Table as AntDTable, Typography } from "antd";
import { useBillContext } from "@/context/BillContext";
import Editable from "@/components/invoices/Editable.jsx";
import Order from "@/components/invoices/Order";
import { PlusOutlined } from "@ant-design/icons";

import React from "react";
function Table({ tableId }) {
  const {
    state: { billData },
    dispatch,
  } = useBillContext();

  const [rowsTable, setRowsTable] = useState([]);
  const [actualRows, setActualRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

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

  const columns = [
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
      width: "2%",
      align: "center",
    },
    {
      title: "Sr#",
      dataIndex: "order",
      key: "order",
      width: "3%",
      align: "center",
    },
    {
      title: (
        <span className="column-underlined">Description and Upload Image</span>
      ),
      dataIndex: "image_name",
      key: "image_name",
      ellipsis: true,
      width: "25%",
      align: "start",
      editable: true,
    },
    {
      title: "",
      dataIndex: "upload",
      key: "upload",
      align: "center",
      width: "10%",
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
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "center",
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
          className="text-primary p-2 hover:bg-primary hover:text-white border border-primary rounded-md"
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
          className="text-primary  p-2  hover:bg-primary hover:text-white border border-primary rounded-md"
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
