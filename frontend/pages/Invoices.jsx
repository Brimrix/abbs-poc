import React, { useEffect, useState } from "react";
import Table from "@/components/invoices/Table";
import ClientSearch from "@/components/common/ClientSearch";
import CardComponent from "@/components/invoices/CardComponent";
import { Spin, Divider } from "antd";
import { BillProvider } from '@/context/BillContext.jsx';
import { Grid } from "../components/invoices/Grid";
// import { useBillContext } from "@/context/BillContext";


const Invoices = () => {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);
  // const [orderCounter, setOrderCounter] = useState(0);

  // const { state: { orderCount }, dispatch, } = useBillContext();

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
      <div className="grow">
        <Grid />
      </div>
      <div className="self-end">
        <CardComponent />
      </div>
    </BillProvider>
};

export default Invoices;
