import React, { useEffect, useState } from 'react';
import { Button, Table, Upload, InputNumber } from 'antd';
import Image_Upload from './Image_Uploader';

  

const TableComponent = () => {

    const [counter, setCounter] = useState(1);
    const [tableLoading, setTableLoading] = useState(false);
    const [dimensions, setDimensions] = useState({
      image_name: '',
      height: 0,
      widht: 0,
      rowIndex: 0
    })



    const columns = [
      {
        title: 'Sr#',
        dataIndex: 'key',
        key: 'key',
        widht: 10,
        
        
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








   
    const [dataSource, setDataSource] = useState( [
        {
          key: counter,
          image_name: "Sublimation 2x3",
          upload: <Image_Upload rowIndex={counter} setDimensions={setDimensions} />, 
          height: 0,
          widht: 0,
          price: <InputNumber min={0} max={1000} precision={2}  />,
          quantity: <InputNumber />,
          amount: 0,
          

        } ])
   
      const handleAdd = () => {
        setCounter(counter+1);
        setDataSource(prev => [...prev, {key: counter+1, image_name: '', upload: <Image_Upload rowIndex={counter} setDimensions={setDimensions} />, height: 0, widht:0, price: <InputNumber min={0} max={1000} precision={2} />, quantity: <InputNumber />, amount: 0}]);
      }


      


      useEffect(() => {
        
        console.log(dimensions);

        const modifiedArray = dataSource.map((item, index) => {

          if (index === dimensions.rowIndex) {

            return {...item, height: dimensions.Image_height, widht: dimensions.Image_width, image_name: dimensions.image_name}
          
          }
          else

          return item;

        });
      
        setDataSource(modifiedArray);
        // console.log(modifiedArray);
      }, [dimensions]);
    
    
      
      return (
        <>
        <Table 
        onScroll={true}
        loading={tableLoading} key={counter}  dataSource={dataSource} size={'small'} columns={columns} />
        <Button onClick={handleAdd}>Add New Record</Button>

        </>

  )
}

export default TableComponent;