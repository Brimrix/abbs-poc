import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import Table from "@/components/invoices/Table";


const InvoiceCreate = () => {
  const [spinning, setSpinning] = useState(true);
  const [mount, setMount] = useState(true);

  useEffect(() => {
    setMount(false);
  }, [spinning]);

  return mount ? (
    <Spin spinning={mount} />
  ) : (
    <Table title='New Invoice' />
  );
};

export default InvoiceCreate;
