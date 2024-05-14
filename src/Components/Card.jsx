import React, { useState } from 'react';
import { Typography, Card, Button, InputNumber } from 'antd';
import { useSelector } from 'react-redux';

const CardResult = () => {

  
  const { totalAmount, totalArea } = useSelector(state => state.billSlice.billingInfo);





  const buttonStyle = {backgroundColor: "#FA9F42", color: "white", width: "135px", height: "38px"};
  
  return (
    <Card style={{width: "416px", height: "201px", backgroundColor: "#F6F6F6"}}>
           
    <div className="container">
   <div className="row gx-5 gy-5">
   <div className="col">

    <Typography.Text strong={true}>Sub Total</Typography.Text> 
                    
   </div>
   <div className="col">
   <Typography.Text strong={true}>{totalAmount}</Typography.Text> 
   
         
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
   <InputNumber />
   
         
   </div>
   </div>


   <div className="row gx-5 mt-2" >
   <div className="col">
   <Typography.Text style={{color: "#0B6E4F"}} strong={true}>Grand Total</Typography.Text> 
                
   </div>
   <div className="col">
   <Typography.Text style={{color: "#0B6E4F"}} strong={true}>432,00</Typography.Text> 
   
   
         
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