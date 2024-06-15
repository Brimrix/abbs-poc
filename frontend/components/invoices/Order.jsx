import React from 'react';
import { Table as AntDTable } from 'antd';
import MainTable from './Table';

const Order = () => {


    const dataSource = [

        {
          key: 1,
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: 2,
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];

      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
  return (
    <AntDTable
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      className='order-table'
      expandable={{
        expandedRowRender: (row) => <MainTable tableId={row.key} />,
        rowExpandable: () => true,
      }}
    />
  );
};

export default Order;
