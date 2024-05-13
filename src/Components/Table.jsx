import React, {  useEffect, useState } from 'react';
import { Button, Table, Upload, InputNumber, Typography, message } from 'antd';
import Image_Upload from './Image_Uploader';
import './TableStyle.css';


const TableComponent = () => {

 
    const [counter, setCounter] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    const [priceChange, setPriceChange] = useState(false);
    const [priceIndex, setPriceIndex] = useState(0);
    const [ActualPrice, setActualPrice] = useState(0);
    const [messageApi, contextHolder] = message.useMessage();
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


    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'Image Upload Successful',
      });
    };
    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'This is an error message',
      });
    };
    const warning = () => {
      messageApi.open({
        type: 'warning',
        content: 'Please Upload Image before setting Price',
      });
    };



    let handleBlurChange = (getPriceIndex) => {
      setPriceIndex(getPriceIndex);
      setPriceChange((prev) => !prev);
    }

    let handleInputPriceChange = (value) => {
        setActualPrice(value);
    }
    
    const [dataSource, setDataSource] = useState( [
      
     
        {
          key: counter+1,
          image_name: "Sublimation 2x3",
          upload: <Image_Upload rowIndex={counter} setDimensions={setDimensions} />, 
          height: 0,
          widht: 0,
          area: 0,
          price: <InputNumber min={0} onBlur={() => handleBlurChange(counter)} onChange={handleInputPriceChange} variant='borderless' max={1000} precision={2}  />,
          quantity: <InputNumber />,
          amount: 0,
          

        }
      
      
      ])


   
      useEffect(()=> {

        setTableLoading(false);
                
        setDataSource(prev => [...prev, 
          {key: counter, 
            image_name: '', 
            upload: <Image_Upload 
            rowIndex={counter-1} 
            setDimensions={setDimensions} />, 
            height: 0, widht:0, area: 0,
             price: <InputNumber variant='borderless' onBlur={ () => {handleBlurChange(counter-1)} } onChange={handleInputPriceChange} min={0} max={1000} precision={2} />, 
             quantity: <InputNumber />, 
             amount: 0}]);

       


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

    
       useEffect(()=> {
         
        const Obj = { ...dataSource[priceIndex - 1], amount: 0 };
        if(priceIndex==0){

          const updatedArray = [...dataSource ];
          const amount = updatedArray[0].area * ActualPrice;
          updatedArray[0] = {...updatedArray[0], amount};
          setDataSource(updatedArray);

        }
        else{

        
          const modifiedArray = dataSource.map((item, index) => {
            
            if(index==Obj.key){
              const amount = item.area * ActualPrice;
              return {...item, amount};
            }
          
            else
            return item;
  
          })
  
          setDataSource(modifiedArray);

        }
              
       


       }, [priceChange])
  
    
      
      return (
        <>
        <Table 
       scroll={{ y: 220 }}
       pagination={false}

        loading={tableLoading} 
        key={counter}  
        dataSource={dataSource} size={'small'} 
        columns={columns} />

        <Typography.Text strong={true} style={{cursor: "pointer", color: "#0B6E4F"}} onClick={handleAdd}>Add More Rows</Typography.Text>
     

        </>

  )
}

export default TableComponent;