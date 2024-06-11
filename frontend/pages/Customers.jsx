import React, { useEffect, useState } from 'react';
import Table from '@/components/customers/Table';
import { Spin } from 'antd';


function Customer() {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);

  useEffect(() => {
    setMount(false);
  }, [spinning]);

  return (
    <Spin spinning={mount}  tip="Loading...">
        <Table />
    </ Spin>
  );
}

export default Customer;
