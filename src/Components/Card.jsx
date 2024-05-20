import React, { useState, useContext, useEffect } from 'react';
import { Typography, Card, Button, InputNumber } from 'antd';
import { billContext } from '@/context/BillContext';

const CardResult = () => {


  const { billData } = useContext(billContext);

  const [totalArea, setTotalArea] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);
  const [discountInput, setDiscountInput] = useState(0);

  const handleDiscountChange = (value) => {
    setDiscountInput(value);
  }

  const handleDiscountBlurChange = () => {
    const valueGrandTotal = subTotal-discountInput;
    setGrandTotal(valueGrandTotal);
  }

  useEffect(()=> {

   let area = 0;
   let subTotal = 0;

   billData.forEach(element => {
    area += element.area;
    
   });

   billData.forEach(element => {
    subTotal += element.amount;
   })

   if(discountInput!==0){
    let subTotalValue = subTotal-discountInput;
    setGrandTotal(subTotalValue);
   
   }
  
   subTotal = Math.round(subTotal * 100) / 100;
   area = Math.round(area * 100) / 100;
   
   setTotalArea(area);
   setSubTotal(subTotal);
   setGrandTotal(subTotal-discountInput);

  }, [billData]);

  

  const buttonStyle = {backgroundColor: "#FA9F42", color: "white", width: "135px", height: "38px"};
  
  return (

<Card style={{width: "416px", height: "201px", backgroundColor: "#F6F6F6"}}>
           
    <div className="container">
   <div className="row gx-5 gy-5">
   <div className="col">

    <Typography.Text strong={true}>Sub Total</Typography.Text> 
                    
   </div>
   <div className="col">
   <Typography.Text strong={true}>{subTotal}</Typography.Text> 
   
         
   </div>
   </div>

   <div className="row gx-5 mt-2">
   <div className="col">
   <Typography.Text strong={true}>Total Area</Typography.Text> 
                
   </div>
   <div className="col">
   <Typography.Text strong={true}>{totalArea}</Typography.Text> 

         
   </div>
   </div>


   <div className="row mt-2">
   <div className="col">
   <Typography.Text strong={true}>Add Discount</Typography.Text> 
                
   </div>
   <div className="col">
   <InputNumber onBlur={handleDiscountBlurChange} onChange={handleDiscountChange} />
   
         
   </div>
   </div>


   <div className="row gx-5 mt-2" >
   <div className="col">
   <Typography.Text style={{color: "#0B6E4F"}} strong={true}>Grand Total</Typography.Text> 
                
   </div>
   <div className="col">
   <Typography.Text style={{color: "#0B6E4F"}} strong={true}>{grandTotal}</Typography.Text> 
   
   
         
   </div>
   </div>

   <div className="row gx-4 mt-1">
   <div className="col">
   <Button style={buttonStyle}>Print Slip</Button>


   </div>
   <div className="col">

   <Button style={buttonStyle} >Save</Button>
     
   
         
   </div>
   </div>

   
</div>
                                                     
   </Card>    

  
 
    
  )
}

export default CardResult;