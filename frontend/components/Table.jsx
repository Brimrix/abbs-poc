import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Table as AntDTable, Typography, Form } from 'antd';
import '@styles/TableStyle.css';
import { billContext } from '@/context/BillContext';
import Editable from '@/components/Editable.jsx';

function Table() {
  const { state: { billData }, dispatch } = useContext(billContext);
  const [rowsTable, setRowsTable] = useState([]);
  const [actualRows, setActualRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(false);
    console.log(actualRows);
  }, [actualRows]);

  useEffect(() => {
    setActualRows(rowsTable);
  }, [rowsTable]);

  useEffect(() => {
    setTableLoading(true);
    setRowsTable(billData);
  }, [billData]);

  const handleAddRows = () => {
    dispatch({
      type: 'ADD_ROW',
    });
  };

  const handleSave = useCallback((row, cellSource) => {
    dispatch({
      type: 'UPDATE_ROW',
      payload: {row, key: row.key, cellSource},
    });
  }, [dispatch]);

  const columns = [
    {
      title: '',
      dataIndex: 'actions',
      key: 'actions',
      width: '5%',
      align: 'center',
    },
    {
      title: 'Sr#',
      dataIndex: 'order',
      key: 'order',
      width: '5%',
      align: 'center',
    },
    {
      title: <span className="column-underlined">Description and Upload Image</span>,
      dataIndex: 'image_name',
      key: 'image_name',
      ellipsis: true,
      width: '25%',
      align: 'start',
      editable: true,
    },
    {
      title: '',
      dataIndex: 'upload',
      key: 'upload',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      align: 'center',
      editable: true,

    },
    {
      title: 'Width',
      dataIndex: 'width',
      key: 'width',
      align: 'center',
      editable: true,
    },
    {
      title: 'Area (Sq.ft)',
      dataIndex: 'area',
      key: 'area',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
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
        style={{ marginBottom: '20px' }}
        scroll={{ y: 220 }}
        pagination={false}
        loading={tableLoading}
        dataSource={actualRows}
        columns={columnsConfig}
        size="small"
        rowClassName={() => 'editable-row'}
      />
      <Typography.Text
        onClick={handleAddRows}
        style={{ cursor: 'pointer', color: '#0B6E4F', marginLeft: '120px' }}
        strong
      >
        Add More Rows
      </Typography.Text>
    </>
  );
}

export default Table;
