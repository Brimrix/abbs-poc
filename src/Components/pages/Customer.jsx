import React, { useEffect, useState } from 'react';
import LayoutMain from "@/components/LayoutMain";
import { Spin } from 'antd';

function Customer() {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);
  
  useEffect(() => {
    setMount(false);
  }, [spinning]);
  
  
  useEffect(() => {
    setSpinning(true);
  }, []);



  return (
    <Spin spinning={mount} tip="Loading...">
    <LayoutMain SecondChild={<h1>Customers</h1>}  />
     </ Spin>
  );
}

export default Customer;
