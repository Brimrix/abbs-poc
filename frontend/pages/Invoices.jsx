import React, { useEffect, useState } from "react";
import LayoutMain from "@/components/layouts/Base";
import Table from "@/components/invoices/Table";
import ClientSearch from "@/components/common/ClientSearch";
import CardComponent from "@/components/invoices/CardComponent";
import { Spin } from "antd";


const Invoices = () => {
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
            <LayoutMain>
                <div className="p-4 d-flex flex-column">
                    <ClientSearch />
                    <Table />
                    <CardComponent className='align-self-end' />
                </div>
            </LayoutMain>
        </Spin>
    )
}

export default Invoices
