import LayoutMain from '@/components/layouts/Base';
import Table from '@/components/invoice/Table';
import { BillProvider } from '@/context/BillContext.jsx';

function CreateBill() {
  return (
    <BillProvider>
      <LayoutMain children={<Table />} />
    </BillProvider>
  );
}
export default CreateBill;
