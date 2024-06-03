import React, { useEffect, useState } from 'react';
import LayoutMain from "@/components/layouts/Base";
import { Spin } from 'antd';

function Dashboard() {
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
      <LayoutMain>
        <h2 className='p-2 h-2'>Dashboard</h2>
      </LayoutMain>
    </ Spin>
  );
}

export default Dashboard;
