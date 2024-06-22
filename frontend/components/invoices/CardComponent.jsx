import {
  Typography, Card, Button, InputNumber,
} from 'antd';
import { useBillContext } from '@/context/BillContext';

function CardComponent() {
  const { state: { selectedInvoice }, dispatch } = useBillContext()

  const subTotal = selectedInvoice.items.reduce((acc, item) => acc + item.amount, 0)
  const areaTotal = selectedInvoice.items.reduce((acc, item) => acc + Number(item.area), 0)
  const total = subTotal - selectedInvoice.discount

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
              Total Area
            </td>
            <td>
              <Typography.Text className='float-right' strong>{areaTotal.toFixed(2)}</Typography.Text>
            </td>
          </tr>
          <tr>
            <td>
              Discount
            </td>
            <td>
              <InputNumber
                className='float-right'
                min={0}
                max={subTotal}
                value={selectedInvoice.discount} onChange={(value) => dispatch({
                  type: 'setDiscount',
                  payload: {
                    discount: value
                  }
                }
                )} />
            </td>
          </tr>
          <tr>
            <td>
              Grand Total
            </td>
            <td>
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
