import React, { useEffect, useState } from "react";
import Table from "@/components/invoices/Table";
import ClientSearch from "@/components/common/ClientSearch";
import CardComponent from "@/components/invoices/CardComponent";
import { Spin, Divider } from "antd";
import { BillProvider } from '@/context/BillContext.jsx';

const Invoices = () => {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);
  useEffect(() => {
    setSpinning(true);
  }, []);

  useEffect(() => {
    setMount(false);
  }, [spinning]);

  return mount
    ? <Spin spinning={mount} tip="Loading..." />
    : <BillProvider>
      <ClientSearch />
      <Divider className="m-0 border-2" />
      <div className="flex-grow-1">
        <Table />
      </div>
      <div className="align-self-end">
        <CardComponent />
      </div>
    </BillProvider>
};

export default Invoices;
