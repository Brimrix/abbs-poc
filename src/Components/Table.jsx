import React, { useEffect, useState } from 'react';
import { Button, Table, Upload, InputNumber, Typography } from 'antd';
import Image_Upload from './Image_Uploader';
import './TableStyle.css';


  

const TableComponent = () => {

    const [counter, setCounter] = useState(0);
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
        widht: 5,
        
        
      },
      {
        title: 'Description',
        dataIndex: 'image_name',
        key: 'image_name',
        ellipsis: true
       
      },
      {
        title: 'Upload Image',
        dataIndex: 'upload',
        key: 'address',
        align: 'center'
      },
      
      {
          title: 'Height',
          dataIndex: 'height',
          key: 'height',
          align: 'center'
        },
  
        {
          title: 'Width',
          dataIndex: 'widht',
          key: 'width',
          align: 'center'
        },
        {
          title: 'Area',
          dataIndex: 'area',
          key: 'area',
          align: 'center',
        
        },
  
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          align: 'center'
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
          align: 'center'
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
          align: 'center'
        },
    ];








   
    const [dataSource, setDataSource] = useState( [
      
     
        {
          key: counter+1,
          image_name: "Sublimation 2x3",
          upload: <Image_Upload rowIndex={counter} setDimensions={setDimensions} />, 
          height: 0,
          widht: 0,
          area: 0,
          price: <InputNumber min={0} max={1000} precision={2}  />,
          quantity: <InputNumber />,
          amount: 0,
          

        }
      
      
      ])
   
      useEffect(()=> {

        setTableLoading(false);
                
        setDataSource(prev => [...prev, {key: counter, image_name: '', upload: <Image_Upload rowIndex={counter-1} setDimensions={setDimensions} />, height: 0, widht:0, area: 0, price: <InputNumber min={0} max={1000} precision={2} />, quantity: <InputNumber />, amount: 0}]);

       


      }, [counter]);

   

      const handleAdd = () => {

        setTableLoading((prev) => !prev);
        
        if(counter==0){

          setCounter((previous) => previous+2);
      

        }

        else{

          setCounter((previous) => previous + 1);
        

        }

             
      }


     
  

      useEffect(() => {
        
        if(counter!==0){
          setTableLoading((prev) => !prev);
        }

        const modifiedArray = dataSource.map((item, index) => {
          
          
          if (index === dimensions.rowIndex) {
            
            return {...item, height: dimensions.Image_height, widht: dimensions.Image_width, area: dimensions.Image_height*dimensions.Image_width, image_name: dimensions.image_name}
            
            
          }
          
          else
          {
            return item;
          }
          
        });
        setDataSource(modifiedArray);


                      
        
      }, [dimensions]);
    
    
      
      return (
        <>
        <Table 
       scroll={{ y: 220 }}
       pagination={false}

        loading={tableLoading} key={counter}  dataSource={dataSource} size={'small'} columns={columns} />

        <Typography.Text strong={true} style={{cursor: "pointer", color: "#0B6E4F"}} onClick={handleAdd}>Add More Rows</Typography.Text>
     

        </>

  )
}

export default TableComponent;