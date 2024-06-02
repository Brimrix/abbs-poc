import { useState, useContext, useEffect } from 'react';
import {
  Typography, Card, Button, InputNumber,
} from 'antd';
import { billContext } from '@/context/BillContext';

function CardResult() {
  const { state } = useContext(billContext);

  const [totalArea, setTotalArea] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  const [grandTotal, setGrandTotal] = useState(0);
  const [discountInput, setDiscountInput] = useState(0);

  const handleDiscountChange = (value) => {
    setDiscountInput(value);
  };

  useEffect(() => {
    const grandTotal = Math.round((subTotal - discountInput) * 100) / 100;
    setGrandTotal(grandTotal);
  }, [discountInput]);

  useEffect(() => {
    let area = state.billData.reduce((accumulator, element) => {

      if (element && typeof element.area !== 'undefined') {
        return accumulator + element.area;
      } else {
        return accumulator + 0;
      }
    }, 0);

    let subTotal = state.billData.reduce((accumulator, element) => {
      if (element && typeof element.amount !== 'undefined') {
        return accumulator + element.amount;
      } else {
        return accumulator + 0;
      }
    }, 0);


    if (discountInput !== 0) {
      const subTotalValue = subTotal - discountInput;
      setGrandTotal(subTotalValue);
    }

    subTotal = Math.round(subTotal * 100) / 100;
    area = Math.round(area * 100) / 100;
    const grandTotal = Math.round((subTotal - discountInput) * 100) / 100;

    setTotalArea(area);
    setSubTotal(subTotal);
    setGrandTotal(grandTotal);
  }, [state]);

  const buttonStyle = {
    backgroundColor: '#FA9F42', color: 'white', width: '135px', height: '38px',
  };

  return (

    <Card style={{ width: '416px', height: '201px', backgroundColor: '#F6F6F6' }}>

      <div className="container">
        <div className="row gx-5 gy-5">
          <div className="col">

            <Typography.Text strong>Sub Total</Typography.Text>

          </div>
          <div className="col">
            <Typography.Text strong>{subTotal}</Typography.Text>

          </div>
        </div>

        <div className="row gx-5 mt-2">
          <div className="col">
            <Typography.Text strong>Total Area</Typography.Text>

          </div>
          <div className="col">
            <Typography.Text strong>{totalArea}</Typography.Text>

          </div>
        </div>

        <div className="row mt-2">
          <div className="col">
            <Typography.Text strong>Add Discount</Typography.Text>

          </div>
          <div className="col">
            <InputNumber onChange={handleDiscountChange} />

          </div>
        </div>

        <div className="row gx-5 mt-2">
          <div className="col">
            <Typography.Text style={{ color: '#0B6E4F' }} strong>Grand Total</Typography.Text>

          </div>
          <div className="col">
            <Typography.Text style={{ color: '#0B6E4F' }} strong>{grandTotal}</Typography.Text>

          </div>
        </div>

        <div className="row gx-4 mt-1">
          <div className="col">
            <Button style={buttonStyle}>Print Slip</Button>

          </div>
          <div className="col">

            <Button style={buttonStyle}>Save</Button>

          </div>
        </div>

      </div>

    </Card>

  );
}

export default CardResult;
