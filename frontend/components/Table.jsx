import React, { useEffect, useState, useContext } from 'react';
import {
  Table as AntDTable, Typography,
} from 'antd';
import '@styles/TableStyle.css';

import { billContext } from '@/context/BillContext';

function Table() {
  const { state: { billData }, dispatch } = useContext(billContext);
  const [rowsTable, setRowsTable] = useState([]);
  const [actualRows, setActualRows] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    setTableLoading(false);
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

    },
    {
      title: '',
      dataIndex: 'upload',
      key: 'address',
      align: 'center',
      width: '10%',
    },
    {
      title: 'Height',
      dataIndex: 'height',
      key: 'height',
      align: 'center',
    },
    {
      title: 'Width',
      dataIndex: 'width',
      key: 'width',
      align: 'center',
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

  return (
    <>
      <AntDTable
        style={{ marginBottom: '20px' }}
        scroll={{ y: 220 }}
        pagination={false}
        loading={tableLoading}
        dataSource={actualRows}
        columns={columns}
        size="small"
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
