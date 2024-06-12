import { useState, useEffect } from 'react';
import {
  Typography, Card, Button, InputNumber,
} from 'antd';
import { useBillContext } from '@/context/BillContext';

function CardComponent() {
  const { state } = useBillContext()

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

  return (
    <Card className='flex flex-col shadow border bg-stone-100'>
      <table className='w-full'>
        <tbody>
          <tr>
            <td>
              Sub Total
            </td>
            <td>
              <Typography.Text className='float-right' strong>{subTotal}</Typography.Text>
            </td>
          </tr>
          <tr>
            <td>
              Total Total
            </td>
            <td>
              <Typography.Text className='float-right' strong>{totalArea}</Typography.Text>
            </td>
          </tr>
          <tr>
            <td>
              Discount
            </td>
            <td>
              <InputNumber className='float-right' onChange={handleDiscountChange} />
            </td>
          </tr>
          <tr>
            <td>
              Grand Total
            </td>
            <td>
              <Typography.Text className='float-right' strong>{grandTotal}</Typography.Text>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="space-x-3 mt-5">
        <Button className='!bg-secondary border-none text-white w-[135px] h-[38px] hover:!bg-hover-color-secondary'>Print Slip</Button>
        <Button className="!bg-secondary border-none text-white w-[135px] h-[38px] hover:!bg-hover-color-secondary">Save</Button>
      </div>
    </Card>
  );
}

export default CardComponent;
