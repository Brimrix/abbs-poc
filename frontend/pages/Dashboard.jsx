import React, { useEffect, useState } from 'react';
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
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <div className='bg-red-100 w-32 h-32'></div>
    </ Spin>
  );
}

export default Dashboard;
