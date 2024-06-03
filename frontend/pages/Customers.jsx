import React, { useEffect, useState } from 'react';
import LayoutMain from "@/components/layouts/Base";
import TableComponent from '@/components/customers/TableComponent';
import { Spin } from 'antd';

function Customer() {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);
  useEffect(() => {
    setSpinning(true);
  }, []);

  useEffect(() => {
    setMount(false);
  }, [spinning]);

  return (
    <Spin spinning={mount} tip="Loading...">
      <LayoutMain SecondChild={<TableComponent />} />
    </ Spin>
  );
}

export default Customer;
