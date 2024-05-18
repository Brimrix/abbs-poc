import React, {  useEffect, useState, useContext } from 'react';
import { Button, Table, Upload, InputNumber, Typography, message } from 'antd';
import ImageSelector from '@/components/ImageSelector';
import '@styles/TableStyle.css';

import {billContext} from '@/context/BillContext';



const TableComponent = () => {

 
    const [counter, setCounter] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    const [priceChange, setPriceChange] = useState(false);
    const [priceIndex, setPriceIndex] = useState(0);
    const [actualPrice, setActualPrice] = useState(0);
      
    const [quantityChange, setQuantityChange] = useState(false);
    const [quantityIndex, setQuantityIndex] = useState(0);
    const [actualQuantity, setActualQuantity] = useState(0);

    const { billData, setBillData } = useContext(billContext);


    const [dimensions, setDimensions] = useState({
      image_name: '',
      height: 0,
      width: 0,
      rowIndex: 0,

      xResolution: 0,
      yResolution: 0,
      resolutionUnit: '',
    })
    
        // Input tag change tracker
    let inputTagChangeTracker = 0;
    let quantityTagChangeTracker = 0;



    const setBillingInfo = () => {
      setBillData(dataSource);
    };

    const columns = [
      {

        title: 'Sr#',
        dataIndex: 'key',
        key: 'key',
        width: '10%',
        align: 'center',        
        
      },

       {
        title: <span className="column-underlined">Description and Upload Image</span>,
        dataIndex: 'image_name',
        key: 'image_name',
        ellipsis: true,
        width: '25%',
        align: 'start'        
       
      },
      {
        title: '',
        dataIndex: 'upload',
        key: 'address',
        align: 'center',
        width: '10%'
      },
      
      {
          title: 'Height',
          dataIndex: 'height',
          key: 'height',
          align: 'center'
        },
  
        {
          title: 'Width',
          dataIndex: 'width',
          key: 'width',
          align: 'center'
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

    let handleBlurChange = (getPriceIndex) => {      
          
         
            if(inputTagChangeTracker){
              
              setPriceIndex(getPriceIndex);
              setPriceChange((prev) => !prev); 

            }

            inputTagChangeTracker = 0;
        }

    let handleInputPriceChange = (value) => { 
      inputTagChangeTracker = 1;
      setActualPrice(value);
   
   
      }


    let handleQuantityBlurChange = (getQuantityIndexInputTag) => {

      if(quantityTagChangeTracker){
        setQuantityIndex(getQuantityIndexInputTag);
        setQuantityChange((prev) => !prev);
      }        
      
      quantityTagChangeTracker = 0;
     
    }

    let handleInputQuantityChange = (value) => {
      quantityTagChangeTracker = 1;
      setActualQuantity(value);
    }
    
    const [dataSource, setDataSource] = useState( [
      
     
        {
          key: counter+1,
          image_name: "",
          upload: <ImageSelector rowIndex={counter} setDimensions={setDimensions} />, 
          height: 0,
          width: 0,
          area: 0,
          actualPrice: 0,
          actualQuantity: 0,


          price: <InputNumber min={0} 
          onBlur={() => handleBlurChange(counter)} 
          onChange={handleInputPriceChange} variant='filled' max={1000} precision={2}  />,


          quantity: <InputNumber min={0} max={1000} variant='filled' precision={0}
          onBlur={() => handleQuantityBlurChange(counter)} onChange={handleInputQuantityChange}/>,
          amount: 0,
          

        }
      
      
      ])


   
      useEffect(()=> {

        setTableLoading(false);
                
        setDataSource(prev => 
          
          [...prev, 
     
     
          {key: counter, 

            image_name: '', 
            upload: <ImageSelector 
            rowIndex={counter-1} 
            setDimensions={setDimensions} />, 
            height: 0, width:0, area: 0,


             price: <InputNumber variant='filled'
             onBlur={ () => {handleBlurChange(counter-1)} }
             onChange={handleInputPriceChange} min={0} max={1000} precision={2}  />, 


             quantity: <InputNumber min={0} max={1000} variant='filled'
             onBlur={() => handleQuantityBlurChange(counter)} precision={0}
             onChange={handleInputQuantityChange}/>,

             amount: 0,
             actualPrice: 0,
             actualQuantity: 0
            
            }]);

       


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

          let previousIndex = 0;
          const modifiedArray = dataSource.map((item, index) => {
          
       

          if (index === dimensions.rowIndex) {

           

            let area = (dimensions.Image_height * dimensions.Image_width) / 144;
            area = Math.round(area * 100) / 100;
                  

            if(item.actualPrice!==0 || item.actualQuantity!==0){

              item.amount = item.actualPrice * item.actualQuantity * area;
              item.amount = Math.round(item.amount * 100) / 100;
             

            };

            previousIndex = index;

             return {

              ...item, 
              height: Math.round((dimensions.Image_height / dimensions.yResolution) * 100) / 100 , 
              width: Math.round((dimensions.Image_width / dimensions.xResolution) * 100) / 100, 
              area, 
              image_name: dimensions.image_name,
              
            
            }

         
          }
          
          else
          {
            return item;
          }
          
        });
        
       
        if(dimensions.height!==0 && dimensions.width!==0 && dataSource[previousIndex].height===0){
          handleAdd();
        }
        
        setDataSource(modifiedArray);
      }, [dimensions]);

    
       useEffect(()=> {
         
        const Obj = { ...dataSource[priceIndex - 1], amount: 0 };
        const price = <InputNumber variant='filled' onBlur={ () => {handleBlurChange(priceIndex)} }onChange={handleInputPriceChange} defaultValue={actualPrice} min={0} max={1000} precision={2}  />
      
        let amount = actualPrice;
        
        if(priceIndex==0){
        
          const updatedArray = [...dataSource ];
          const area = updatedArray[0].area;
          const quantity = updatedArray[0].actualQuantity;
          amount *= area;
          amount *= quantity;
          amount = Math.round(amount * 100) / 100;
          
          updatedArray[0] = {...updatedArray[0], amount, price, actualPrice};

          setDataSource(updatedArray);
        
        }
        else{

        
          const modifiedArray = dataSource.map((item, index) => {

            let area = item.area;
            let quantity = item.actualQuantity;
            if(index==Obj.key){
             amount *= area;
             amount *= quantity;
             amount = Math.round(amount * 100) / 100;


             return {...item, amount, price, actualPrice};
                  
            }
          
            else
            return item;
  
          })

          setDataSource(modifiedArray);
          
         

        }

              

       }, [priceChange])



       useEffect(()=> {
         
        
        const Obj = { ...dataSource[quantityIndex - 1], amount: 0 };
        const quantity =  <InputNumber min={0} max={1000} variant='filled' precision={0}
        onBlur={() => handleQuantityBlurChange(quantityIndex)} defaultValue={actualQuantity} onChange={handleInputQuantityChange}/>

        
        if(quantityIndex==0){

          const updatedArray = [...dataSource ];
          const area = updatedArray[0].area;

          let amount = actualQuantity * actualPrice;
          amount *= area;
          amount = Math.round(amount * 100) / 100;

          updatedArray[0] = {...updatedArray[0], amount, quantity, actualQuantity};
          
          setDataSource(updatedArray);

        }
        else{

        
          const modifiedArray = dataSource.map((item, index) => {

            let area = item.area;
            if(index==Obj.key-1){
                
                let amount =  actualQuantity * area * actualPrice;
                amount = Math.round(amount * 100) / 100;

                return {...item, amount, quantity, actualQuantity};
            }
          
            else

            return item;
  
          })
          
          setDataSource(modifiedArray);

        }
              
       

       }, [quantityChange]);



       useEffect(() => {
        setBillingInfo();
       }, [dataSource]);
  
    
      
      return (
        
        <>

        <Table 

    
      style={{marginBottom: "20px"}}
      scroll={{ y: 220 }}
      pagination={false}

      loading={tableLoading} 
      key={counter}  

      dataSource={dataSource} size={'small'} 
      columns={columns} />
    



      <Typography.Text 
      strong={true}
      style={{cursor: "pointer", color: "#0B6E4F", marginLeft: "120px"}} 
      onClick={handleAdd}>Add More Rows</Typography.Text>

      

        </>

  )
}

export default TableComponent;