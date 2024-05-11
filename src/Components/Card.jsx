import React from 'react';
import { Typography, Card, Button, InputNumber } from 'antd';

const CardResult = () => {

  const buttonStyle = {backgroundColor: "#FA9F42", color: "white", width: "135px", height: "38px"};
  return (
    <Card style={{width: "416px", height: "201px", backgroundColor: "#F6F6F6"}}>
           
    <div class="container">
   <div class="row gx-5 gy-5">
   <div class="col">
    <Typography.Text strong={true}>Sub Total</Typography.Text> 
                
   </div>
   <div class="col">
   <Typography.Text strong={true}>432,00</Typography.Text> 
   
         
   </div>
   </div>

   <div class="row gx-5 mt-2">
   <div class="col">
   <Typography.Text strong={true}>Total Area</Typography.Text> 
                
   </div>
   <div class="col">
   <Typography.Text strong={true}>432,00</Typography.Text> 
   
         
   </div>
   </div>


   <div class="row mt-2">
   <div class="col">
   <Typography.Text strong={true}>Add Discount</Typography.Text> 
                
   </div>
   <div class="col">
   <InputNumber />
   
         
   </div>
   </div>


   <div class="row gx-5 mt-2" >
   <div class="col">
   <Typography.Text style={{color: "#0B6E4F"}} strong={true}>Grand Total</Typography.Text> 
                
   </div>
   <div class="col">
   <Typography.Text style={{color: "#0B6E4F"}} strong={true}>432,00</Typography.Text> 
   
   
         
   </div>
   </div>

   <div class="row gx-4 mt-1">
   <div class="col">
   <Button style={buttonStyle}>Print Slip</Button>


   </div>
   <div class="col">

   <Button style={buttonStyle} >Save</Button>
     
   
         
   </div>
   </div>

   
</div>
                                                     
   </Card>    
  )
}

export default CardResult;