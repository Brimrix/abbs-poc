import React, {  useEffect, useState } from 'react';
import { Button, Table, Upload, InputNumber, Typography, message } from 'antd';
import ImageSelector from './ImageSelector';
import './TableStyle.css';
import { useDispatch } from 'react-redux';
import { addBillingInfo } from '../redux/Reducers/billSlice';


const TableComponent = () => {

 
    const [counter, setCounter] = useState(0);
    const [tableLoading, setTableLoading] = useState(false);
    const [priceChange, setPriceChange] = useState(false);
    const [priceIndex, setPriceIndex] = useState(0);
    const [actualPrice, setActualPrice] = useState(0);
      
    const [quantityChange, setQuantityChange] = useState(false);
    const [quantityIndex, setQuantityIndex] = useState(0);
    const [actualQuantity, setActualQuantity] = useState(0);


    const dispatch = useDispatch();
    const [dimensions, setDimensions] = useState({
      image_name: '',
      height: 0,
      width: 0,
      rowIndex: 0
    })
    
        // Input tag change tracker
    let inputTagChangeTracker = 0;


    const setBillingInfo = () => {

      let totalAmount = 0;
      let totalArea = 0;

      dataSource.forEach(item => {
        totalAmount += item.amount;
      }) 
      dataSource.forEach(item => {
        totalArea += item.area;
      })

      dispatch(addBillingInfo({ totalArea, totalAmount }));
      console.log("Successfully Dispatched");

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
  
      setQuantityIndex(getQuantityIndexInputTag);
      setQuantityChange((prev) => !prev);
    }

    let handleInputQuantityChange = (value) => {
      setActualQuantity(value);
    }
    
    const [dataSource, setDataSource] = useState( [
      
     
        {
          key: counter+1,
          image_name: "Sublimation 2x3",
          upload: <ImageSelector rowIndex={counter} setDimensions={setDimensions} />, 
          height: 0,
          width: 0,
          area: 0,
          actualPrice: 0,


          price: <InputNumber min={0} 
          onBlur={() => handleBlurChange(counter)} 
          onChange={handleInputPriceChange} variant='filled' max={1000} precision={2}  />,


          quantity: <InputNumber min={0} max={1000} variant='filled'
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
             onBlur={() => handleQuantityBlurChange(counter)} 
             onChange={handleInputQuantityChange}/>,

             amount: 0,
             actualPrice: 0
            
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

          
       
         const modifiedArray = dataSource.map((item, index) => {
          
          
          if (index === dimensions.rowIndex) {
            
             return {

              ...item, 
              height: dimensions.Image_height, 
              width: dimensions.Image_width, 
              area: dimensions.Image_height * dimensions.Image_width, 
              image_name: dimensions.image_name
            
            }
                      
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
        const price = <InputNumber variant='filled' onBlur={ () => {handleBlurChange(priceIndex)} }onChange={handleInputPriceChange} defaultValue={actualPrice} min={0} max={1000} precision={2}  />
        const amount = actualPrice;
        
        if(priceIndex==0){
        
          const updatedArray = [...dataSource ];

          updatedArray[0] = {...updatedArray[0], amount, price, actualPrice};

          setDataSource(updatedArray);
        
        }
        else{

        
          const modifiedArray = dataSource.map((item, index) => {

            if(index==Obj.key){
                
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
        
        if(quantityIndex==0){

          const updatedArray = [...dataSource ];
          const amount = actualQuantity;
          updatedArray[0] = {...updatedArray[0], amount};
          
          setDataSource(updatedArray);

        }
        else{

        
          const modifiedArray = dataSource.map((item, index) => {
            
            if(index==Obj.key-1){
              
                const amount =  actualQuantity;
                return {...item, amount};
            }
          
            else

            return item;
  
          })
          
          setDataSource(modifiedArray);

        }
              
       

       }, [quantityChange]);



       useEffect(() => {
        setBillingInfo();
       }, [dataSource])
  
    
      
      return (
        <>
        <Table 

    

       scroll={{ y: 220 }}
       pagination={false}

        loading={tableLoading} 
        key={counter}  

        dataSource={dataSource} size={'small'} 
        columns={columns} />

 

        <Typography.Text 
        strong={true}
         style={{cursor: "pointer", color: "#0B6E4F"}} 
         onClick={handleAdd}>Add More Rows</Typography.Text>
     

        </>

  )
}

export default TableComponent;