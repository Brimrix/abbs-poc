import { useEffect, useState, useCallback } from "react";
import { Table as AntDTable, Typography } from "antd";
import { useBillContext } from "@/context/BillContext";
import Editable from "@/components/invoices/Editable.jsx";

import React from 'react';



function Table({tableId}) {
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
    for(let i=0; i<tableData.length; i++){
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
      }
    });
  };

  // const handleOrderAdd = () => {
  //   dispatch({
  //     type: "ADD_ORDER"
  //   });
  // }

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
      width: "5%",
      align: "center",
    },
    {
      title: "Sr#",
      dataIndex: "order",
      key: "order",
      width: "5%",
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
      {/* <Button
      className="float-end mx-4 my-3 btn-app-primary"
      type="primary"
      onClick={handleOrderAdd}
      icon={<PlusOutlined />}
    >
      Add Order
    </Button> */}

      <AntDTable
        components={components}
        className="invoice-table"
        style={{ marginBottom: "20px" }}
        pagination={false}
        loading={tableLoading}
        dataSource={actualRows}
        columns={columnsConfig}
        size="small"
        rowClassName={() => "editable-row"}
      />
      <Typography.Text
        onClick={handleAddRows}
        className="!text-primary !cursor-pointer !ml-[120px]"
        strong
      >
        Add More Rows
      </Typography.Text>
    </>
  );
}

export default Table;
