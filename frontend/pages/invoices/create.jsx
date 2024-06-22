import React, { useEffect, useState } from "react";
import CardComponent from "@/components/invoices/CardComponent";
import { Spin } from "antd";
import Table from "@/components/invoices/Table";


const InvoiceCreate = () => {
  const [spinning, setSpinning] = useState(false);
  const [mount, setMount] = useState(true);

  useEffect(() => {
    setSpinning(true);
  }, []);

  useEffect(() => {
    setMount(false);
  }, [spinning]);

  return mount ? (
    <Spin spinning={mount} />
  ) : (
    <Table />
  );
};

export default InvoiceCreate;
