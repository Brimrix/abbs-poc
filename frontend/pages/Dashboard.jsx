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
    mount ? <Spin spinning={mount} tip="Loading..." /> :
      <>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <div className='flex flex-wrap gap-4 mt-5 '>
          {
            [
              { name: 'Invoices', className: 'grow bg-violet-100' },
              { name: 'Customer', className: 'w-2/5 bg-red-100' },
              { name: 'Ledger', className: 'bg-green-100 w-1/4' },
              { name: 'Users', className: ' bg-indigo-100 w-3/5' },
              { name: 'Growth', className: ' bg-yellow-100 grow' },
            ].map(item => <div className={`h-80 rounded-md p-3 shadow hover:bg-violet-900 hover:text-white ${item?.className}`}>
              <p className='text-3xl'>{item.name}</p>
            </div>)
          }
        </div>
      </>
  );
}

export default Dashboard;
