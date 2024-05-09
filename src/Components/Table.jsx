import React, { useState } from 'react';
import { Button, Table, Upload, InputNumber } from 'antd';
import Image_Upload from './Image_Uploader';

  const columns = [
    {
      title: 'Sr#',
      dataIndex: 'key',
      key: 'key',
      
    },
    {
      title: 'Image Name',
      dataIndex: 'image_name',
      key: 'image_name',
    },
    {
      title: 'Upload Image',
      dataIndex: 'upload',
      key: 'address',
    },
    
    {
        title: 'height',
        dataIndex: 'height',
        key: 'height',
      },

      {
        title: 'width',
        dataIndex: 'widht',
        key: 'width',
      },

      {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
  ];
  

const TableComponent = () => {
    const [counter, setCounter] = useState(1);
    const [dataSource, setDataSource] = useState( [
        {
          key: counter,
          image_name: "Sublimation 2x3",
          upload: <Image_Upload />, 
          height: 0,
          widht: 0,
          price: <InputNumber />,
          quantity: <InputNumber />,
          amount: 0,

        } ])
   
      const handleAdd = () => {
        setCounter(counter+1);
        setDataSource(prev => [...prev, {key: counter+1, image_name: '', upload: <Image_Upload />, height: '-', widht: '-', price: <InputNumber />, quantity: <InputNumber />, amount: 0}]);
      }
      
      return (
        <>
        <Table bordered={false} dataSource={dataSource} size={'small'} pagination={true} columns={columns} />
        <Button onClick={handleAdd}>Add New Record</Button>
        </>

  )
}

export default TableComponent;