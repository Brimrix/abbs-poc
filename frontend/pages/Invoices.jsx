import LayoutMain from '@/components/layouts/Base';
import Table from '@/components/invoice/Table';
import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';


const Invoices = () => {
    const [spinning, setSpinning] = useState(false);
    const [mount, setMount] = useState(true);
    useEffect(() => {
        setSpinning(true);
    }, []);

    useEffect(() => {
        setMount(false);
    }, [spinning]);

    return <Spin spinning={mount} tip="Loading...">
        <LayoutMain SecondChild={<Table />} />
    </Spin>
}

export default Invoices
