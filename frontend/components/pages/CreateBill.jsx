import React from 'react';
import LayoutMain from '@/components/LayoutMain';
import Table from '@/components/Table';

function CreateBill() {
  return (
    <LayoutMain children={<Table />} />
  );
}

export default CreateBill;
